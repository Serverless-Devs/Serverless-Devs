import { Command } from 'commander';
import { loadComponent, makeUnderLine, publishHelp } from '@serverless-devs/core';
import path from 'path';
import { getYamlContent } from '@serverless-devs/utils';
import { get, isPlainObject, values, first, isEmpty, find, each } from 'lodash';
import { underline, bold } from 'chalk';
import { emoji } from '../../../utils'
import { parseArgv } from '@serverless-devs/utils';
import * as core from '@serverless-devs/core';
import { HandleError } from '../../../error';

class V1 {
  private customProgram: Command;
  constructor(private program: Command, private spec: Record<string, any> = {}) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, help } = parseArgv(argv);
    // s -h
    if (raw.length === 0 && help) return await this.showSimpleHelp();
    // s website -h || s deploy -h
    if (raw.length === 1) {
      this.customProgram = this.program.command(raw[0]).allowUnknownOption()
      if (help) return await this.showHelp();
    }
    // s website deploy -h
    if (raw.length > 1) {
      this.customProgram = this.program.command(raw[0]).allowUnknownOption()
      if (help) return await this.showComflexHelp();
    }

    this.customProgram.action(async () => {
      await this.doExecCommand();
    })
  }
  async doExecCommand() {
    const argv = process.argv.slice(2);
    const { template, help, access, skipActions, debug, output } = parseArgv(argv);
    try {
      return await core.execCommand({
        syaml: template,
        serverName: this.spec.projectName,
        method: this.spec.method,
        args: process.argv.slice(2),
        globalArgs: {
          access,
          skipActions,
          debug,
          help,
          output,
        },
      });
    } catch (error) {
      HandleError(error);
    }
  }
  // s -h
  async showSimpleHelp() {
    const { steps, components } = this.spec;
    if (isEmpty(steps)) return;
    const helpInfo = [
      'Custom Commands',
      '  Can be used in projects with Serverless Devs Yaml. Usage：',
      '    - s <component_command>：Operate on the project, E.x: s deploy',
      '    - s <project_name> <component_command>：Operate on the resource, E.x: s website deploy',
      '  More information: https://serverless.help/custom',
    ];
    // 仅有一个组件时
    if (components.length === 1) {
      const result = await commonHelp(first(components));
      return result.join('\n');
    }
    // 多个组件
    const obj = {};
    each(steps, item => {
      obj[`${item.projectName} [options]`] = `Please use [s ${item.projectName} -h]  obtain the documentation.`;
    });
    helpInfo.push(publishHelp.helpInfo(obj, '', 27));
    return helpInfo.join('\n');
  }
  // s website -h || s deploy -h
  async showHelp() {
    const { projectName, steps, components } = this.spec;
    this.customProgram.helpInformation = () => '';
    // s website -h
    if (projectName) {
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      return this.customProgram.addHelpText('after', await help(componentName));
    }
    // s deploy -h
    // 仅有一个组件
    if (components.length === 1) {
      return this.customProgram.addHelpText('after', await help(first(components)));
    }
    // 多个组件
    return await this.doExecCommand();

  }
  // s website deploy -h
  async showComflexHelp() {
    this.customProgram.helpInformation = () => '';
    return await this.doExecCommand();
  }
}

const commonHelp = async (name: string) => {
  const customDescription = [];
  const instance = await loadComponent(name);
  const publishPath = path.join(instance.__path, 'publish.yaml');
  const publishContent = getYamlContent(publishPath);
  const commands = publishContent.Commands;
  if (commands) {
    for (const key in commands) {
      customDescription.push({ [key]: commands[key] });
    }
  }
  const useObject = isPlainObject(first(values(get(customDescription, '[0]'))));
  const result = [];
  if (useObject) {
    result.push(underline(bold('Custom Commands\n\n')));
    for (const item of customDescription) {
      if (isPlainObject(item)) {
        for (const key in item) {
          const ele = item[key];
          result.push(publishHelp.helpInfo(ele, underline(bold(key)), 23, 4));
        }
      }
    }
  } else {
    result.push(publishHelp.helpInfo(customDescription, 'Custom Commands', 27));
  }
  return result;
}

const help = async (name: string) => {
  const instance = await loadComponent(name);
  const publishPath = path.join(instance.__path, 'publish.yaml');
  const publishContent = getYamlContent(publishPath);
  const result = [`${emoji('🚀')} ${publishContent['Name']}@${publishContent['Version']}: ${publishContent['Description']}\n`];
  const res = await commonHelp(name);
  result.push(...res);
  if (publishContent['HomePage']) {
    result.push(`${emoji('🧭')} ${makeUnderLine('More information: ' + publishContent['HomePage'])}`);
  }
  return result.join('\n');
}

export default V1;