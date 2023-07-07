import { Command } from 'commander';
import Engine, { IContext } from '@serverless-devs/engine';
import { parseArgv } from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { get, isEmpty, each, find, first } from 'lodash';
import ParseSpec, { IOutput } from '@serverless-devs/parse-spec';
import { execCommand } from '@serverless-devs/core';
import logger from '../../logger';
import yaml from 'js-yaml';
import { HandleError } from '../../error';

export default class Custom {
  private spec: Record<string, any> = {};
  constructor(private program: Command) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, template, help } = parseArgv(argv);
    // 工具内置命令不处理
    const systemCommandNames = this.program.commands.map(command => command.name());
    if (systemCommandNames.includes(raw[0])) return;
    this.spec = this.parseSpec();
    if (isEmpty(this.spec)) return;
    // help，无二级指令，二级指令为help
    if (help || raw.length === 0 || raw[0] === 'help') return await this.showHelp();
    const use3x = String(get(this.spec, 'yaml.content.edition')) === '3.0.0';
    logger.debug(`use3x: ${use3x}`);
    this.program.command(raw[0]).allowUnknownOption().action(async () => {
      // core
      if (!use3x) return await this.doExecCommand();
      // engine
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
      return await execCommand({
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
  // TODO: 新老版本 帮助信息是否可以用同一套。
  async showHelp() {
    const { projectName, steps, components } = this.spec;
    if (isEmpty(steps)) return;
    const helpInfo = [
      'Custom Commands',
      '  Can be used in projects with Serverless Devs Yaml. Usage：',
      '    - s <component_command>：Operate on the project, E.x: s deploy',
      '    - s <project_name> <component_command>：Operate on the resource, E.x: s website deploy',
      '  More information: https://serverless.help/custom',
      ''
    ];
    // 指定服务
    if (projectName) {
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      const instance = await loadComponent(componentName);
      // TODO: 读取组件的help信息
      helpInfo.push(`  path: ${instance.__path}`)
      return helpInfo.join('\n');
    }
    // 多个服务时，使用相同组件
    if (components.length === 1) {
      const instance = await loadComponent(first(components));
      // TODO: 读取组件的help信息
      helpInfo.push(`  path: ${instance.__path}`)
      return helpInfo.join('\n');
    }
    // 多个服务时，使用不同组件
    // TODO: 未对齐
    each(steps, item => {
      helpInfo.push(`  ${item.projectName} [options]          Please use [s ${projectName} -h]  obtain the documentation.`)
    })
    return helpInfo.join('\n');
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
      return {} as Record<string, any>;
    }
  }
}
