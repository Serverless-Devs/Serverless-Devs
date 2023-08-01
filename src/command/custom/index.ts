import { Command } from 'commander';
import Engine, { IContext } from '@serverless-devs/engine';
import { parseArgv, getRootHome, getGlobalConfig } from '@serverless-devs/utils';
import { get, each } from 'lodash';
import ParseSpec, { IOutput } from '@serverless-devs/parse-spec';
import V1 from './v1';
import logger from '../../logger';
import yaml from 'js-yaml';
import { HandleError } from '../../error';
import { ISpec } from './types';
import Help from './help';
import chalk from 'chalk';
import path from 'path';

export default class Custom {
  private spec = {} as ISpec;
  constructor(private program: Command) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, template, help, version } = parseArgv(argv);
    if (version) return;
    // 工具内置命令不处理
    const systemCommandNames = this.program.commands.map(command => command.name());
    if (systemCommandNames.includes(raw[0])) return;
    // help命令不处理
    if (raw[0] === 'help') return;
    try {
      this.spec = this.parseSpec();
    } catch (error) {
      if (!help) throw error;
    }
    if (!get(this.spec, 'yaml.use3x')) return await new V1(this.program, this.spec).init();
    if (help) return await new Help(this.program, this.spec).init();
    this.program
      .command(raw[0])
      .allowUnknownOption()
      .action(async () => {
        const engine = new Engine({
          template,
          logConfig: {
            customLogger: logger.loggerInstance,
          },
        });
        const context = await engine.start();
        get(context, 'status') === 'success' ? this.output(context) : HandleError(context.error);
      });
  }
  output(context: IContext) {
    const data = get(context, 'output', {});
    const argv = process.argv.slice(2);
    const { output = 'default' } = parseArgv(argv);
    logger.write(`\n🚀 Result for [${this.spec.command}] of [${get(this.spec, 'yaml.appName')}]\n${chalk.gray('====================')}`)
    if (output === IOutput.JSON) {
      return logger.log(JSON.stringify(data, null, 2));
    }
    if (output === IOutput.RAW) {
      return logger.log(JSON.stringify(data));
    }
    if (output === IOutput.YAML) {
      return logger.log(yaml.dump(data));
    }
    logger.output(data);
    if (getGlobalConfig('log', 'enable') === 'enable') {
      logger.write(`\nA complete log of this run can be found in: ${chalk.underline(path.join(getRootHome(), 'logs', process.env.serverless_devs_trace_id))}\n`)
    }
  }
  parseSpec() {
    const argv = process.argv.slice(2);
    const { template } = parseArgv(argv);
    const spec = new ParseSpec(template, argv).start();
    const components = new Set<string>();
    each(get(spec, 'steps', []), item => {
      components.add(item.component);
    });
    return { ...spec, components: Array.from(components) };
  }
}
