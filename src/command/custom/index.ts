import { Command } from 'commander';
import Engine, { IContext } from '@serverless-devs/engine';
import { parseArgv } from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { get, isEmpty, each, find, first, map } from 'lodash';
import ParseSpec, { IOutput, ISpec as IParseSpec } from '@serverless-devs/parse-spec';
import V1 from './v1';
import * as core from '@serverless-devs/core';
import logger from '../../logger';
import yaml from 'js-yaml';
import { HandleError } from '../../error';
import { tableLayout } from '../../utils'

type ISpec = IParseSpec & { components: string[] };

export default class Custom {
  private customProgram: Command;
  private spec = {} as ISpec;
  constructor(private program: Command) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, template, help } = parseArgv(argv);
    // 工具内置命令不处理
    const systemCommandNames = this.program.commands.map(command => command.name());
    if (systemCommandNames.includes(raw[0])) return;
    // help命令不处理
    if (raw[0] === 'help') return;
    this.spec = this.parseSpec();
    if (isEmpty(this.spec)) return;
    if (!get(this.spec, 'yaml.use3x')) return await new V1(this.program, this.spec).init();
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
      const engine = new Engine({
        template,
        logConfig: {
          customLogger: logger.loggerInstance,
        }
      });
      const context = await engine.start();
      this.output(context);
      logger.loggerInstance.__clear();
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
      '',
    ];
    // 仅有一个组件时
    if (components.length === 1) {
      const instance = await loadComponent(first(components));
      helpInfo.push(tableLayout([{ command: 'TODO:', description: 'mock data' }, { command: 'deploy', description: 'Deploy a component' }, { command: 'remove', description: 'Remove a component' }]));
      return helpInfo.join('\n');
    }
    // 多个组件
    helpInfo.push(tableLayout(map(steps, item => ({ command: `${item.projectName} [options]`, description: `Please use [s ${item.projectName} -h]  obtain the documentation.` }))));
    return helpInfo.join('\n');
  }
  // s website -h || s deploy -h
  async showHelp() {
    const { projectName, steps, components } = this.spec;
    // TODO:
    // s website -h
    if (projectName) {
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      // const instance = await loadComponent(componentName);
      return this.customProgram.addHelpText('after', `  -a, --access  E.x: s cli --access=xxx\n`);
    }
    // s deploy -h
    // 仅有一个组件时
    if (components.length === 1) {
      // TODO: 读取组件的help信息
      const helpInfo = [];
      const instance = await loadComponent(first(components));
      helpInfo.push(...[{ key: 'deploy', value: 'Deploy a component' }, { key: 'remove', value: 'Remove a component' }])
      return helpInfo.join('\n');
    }
    // TODO: 多个组件
  }
  // s website deploy -h
  async showComflexHelp() {
    // TODO:

  }
  output(context: IContext) {
    if (get(context, 'status') === 'success') {
      const data = get(context, 'output', {})
      const argv = process.argv.slice(2);
      const { output = 'default' } = parseArgv(argv);
      if (output === IOutput.JSON) {
        return logger.log(JSON.stringify(data, null, 2));
      }
      if (output === IOutput.RAW) {
        return logger.log(JSON.stringify(data));
      }
      if (output === IOutput.YAML) {
        return logger.log(yaml.dump(data));
      }
      return logger.output(data);
    }
    HandleError(context.error);
  }
  parseSpec() {
    try {
      const argv = process.argv.slice(2);
      const { template } = parseArgv(argv);
      const spec = new ParseSpec(template, argv).start();
      const components = new Set<string>();
      each(get(spec, 'steps', []), item => {
        components.add(item.component);
      })
      return { ...spec, components: Array.from(components) }
    } catch (error) {
      return {} as ISpec;
    }
  }
}
