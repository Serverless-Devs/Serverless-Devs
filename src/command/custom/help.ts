import { Command } from 'commander';
import { ISpec } from './types';
import { parseArgv, getYamlContent } from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { get, isEmpty, each, find, first, map } from 'lodash';
import path from 'path';
import { tableLayout, emoji } from '../../utils'
import chalk from 'chalk';
import logger from '../../logger';


class Help {
  private customProgram: Command;
  constructor(private program: Command, private spec = {} as ISpec) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw } = parseArgv(argv);
    // s -h
    if (raw.length === 0) return await this.showHelp();
    this.customProgram = this.program.command(raw[0]);
    // s website -h || s deploy -h
    if (raw.length === 1) return await this.showRaw1Help();
    // s website deploy -h || s website deploy function -h
    if (raw.length > 1) return await this.showRaw2Help();
  }
  // s -h
  async showHelp() {
    const { steps, components } = this.spec;
    if (isEmpty(steps)) return;
    const helpInfo = [
      'Custom Commands',
      '  Can be used in projects with Serverless Devs Yaml. Usage：',
      '    - s <component_command>：Operate on the project, E.x: s deploy',
      '    - s <project_name> <component_command>：Operate on the resource, E.x: s website deploy',
      '  More information: https://serverless.help/custom',
      '',
    ];
    // 仅有一个组件时
    if (components.length === 1) {
      const instance = await loadComponent(first(components));
      helpInfo.push(this.customHelp(instance.commands));
      return helpInfo.join('\n');
    }
    // 多个组件
    helpInfo.push(tableLayout(map(steps, item => ({ command: `${item.projectName} [options]`, description: `Please use [s ${item.projectName} -h]  obtain the documentation.` }))));
    return helpInfo.join('\n');
  }
  private customHelp(commands: Record<string, any> = {}) {
    const result = [];
    each(commands, (item, key) => {
      result.push({ command: key, description: get(item, 'help.summary', get(item, 'help.description')) });
    });
    return tableLayout(result);
  }
  // s website -h || s deploy -h
  async showRaw1Help() {
    const { projectName, steps, components, method } = this.spec;
    // TODO:
    // s website -h
    if (projectName) {
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      const instance = await loadComponent(componentName);
      const publishPath = path.join(instance.__path, 'publish.yaml');
      const publishContent = getYamlContent(publishPath);
      const result = [`${emoji('🚀')} ${publishContent['Name']}@${publishContent['Version']}: ${publishContent['Description']}\n`];
      result.push(this.customHelp(instance.commands))
      if (publishContent['HomePage']) {
        result.push(`${emoji('🧭')} ${'More information: ' + chalk.underline(publishContent['HomePage'])}`);
      }
      this.customProgram.helpInformation = () => result.join('\n');
      return;
    }
    // s deploy -h
    // 仅有一个组件时
    if (components.length === 1) {
      return await this.singleComponentHelp(first(components), method);
    }
    // TODO: 多个组件
    for (const item of steps) {
      logger.info(`Start executing project ${item.projectName}`);
      const res = await this.singleComponentHelp(item.component, method);
      res.outputHelp();
      logger.info(`Project ${item.projectName} successfully to execute`);
    }
    this.customProgram.helpInformation = () => '';
  }
  private async singleComponentHelp(componentName: string, method: string) {
    const instance = await loadComponent(componentName);
    const data = get(instance, `commands.${method}`);
    const description = get(data, 'help.description');
   const currentProgram = this.customProgram.command(method).description(description).summary(get(data, 'help.summary', description))
    const subCommands = get(data, 'subCommands', {});
    each(subCommands, (item, key) => {
      const subDescription = get(item, 'help.description');
      const subCustomProgram = currentProgram.command(key).description(subDescription).summary(get(item, 'help.summary', subDescription));
      each(get(item, 'help.option', []), (item) => {
        const [start, ...rest] = item;
        subCustomProgram.option(start, ...rest)
      });
    });
    each(get(data, 'help.option', []), (item) => {
      const [start, ...rest] = item;
      currentProgram.option(start, ...rest)
    });
    return this.customProgram;
  }
  // s website deploy -h
  async showRaw2Help() {
    const { steps, projectName, method } = this.spec;
    const componentName = find(steps, item => item.projectName === projectName)?.component;
    await this.singleComponentHelp(componentName, method);
  }
}

export default Help;