import { Command } from 'commander';
import Engine, { IContext, STEP_STATUS } from '@serverless-devs/engine';
import * as utils from '@serverless-devs/utils';
import { get, each, filter, uniqBy, isEmpty } from 'lodash';
import ParseSpec, { IOutput } from '@serverless-devs/parse-spec';
import V1 from './v1';
import logger from '../../logger';
import yaml from 'js-yaml';
import handleError from '../../error';
import { ISpec } from './types';
import Help from './help';
import chalk from 'chalk';
import path from 'path';
import loadComponent from '@serverless-devs/load-component';
import execDaemon from '../../exec-daemon';
import { UPDATE_COMPONENT_CHECK_INTERVAL } from '../../constant';
import { EReportType } from '../../type';
import { writeOutput } from './common';

export default class Custom {
  private spec = {} as ISpec;
  constructor(private program: Command) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, template, help, version } = utils.parseArgv(argv);
    if (version) return;
    // 工具内置命令不处理
    const systemCommandNames = this.program.commands.map(command => command.name());
    if (systemCommandNames.includes(raw[0])) return;
    // help命令不处理
    if (raw[0] === 'help') return;
    try {
      this.spec = await this.parseSpec();
    } catch (error) {
      /**
       * s -h 不强依赖yaml文件，不报错
       * s alias -h 强依赖yaml文件，报错
       */
      if (raw.length > 0) throw error;
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
        await this.updateComponent(context);
        execDaemon('report.js', { type: EReportType.command, uid: get(context, 'credential.AccountID'), argv });
        if (get(context, 'status') === 'success') {
          this.output(context);
          writeOutput(get(context, 'output'));
          if (utils.getGlobalConfig('log') !== 'disable') {
            logger.write(`\nA complete log of this run can be found in: ${chalk.underline(path.join(utils.getRootHome(), 'logs', process.env.serverless_devs_traceid))}\n`);
          }
          return;
        }
        await handleError(context.error);
      });
  }
  private async updateComponent(context: IContext) {
    let executedComponent = filter(get(context, 'steps'), item => item.status === STEP_STATUS.SUCCESS);
    executedComponent = uniqBy(executedComponent, item => item.component);
    for (const item of executedComponent) {
      const instance = await loadComponent(item.component);
      const lockPath = utils.getLockFile(instance.__path);
      const lockInfo = utils.readJson(lockPath);
      if (!lockInfo.lastUpdateCheck || Date.now() - lockInfo.lastUpdateCheck > UPDATE_COMPONENT_CHECK_INTERVAL) {
        execDaemon('update-component.js', { component: item.component });
      }
    }
  }
  private output(context: IContext) {
    const data = get(context, 'output');
    if (isEmpty(data)) return;
    const argv = process.argv.slice(2);
    const { output = 'default' } = utils.parseArgv(argv);
    logger.write(`\n🚀 Result for [${this.spec.command}] of [${get(this.spec, 'yaml.appName')}]\n${chalk.gray('====================')}`);
    if (output === IOutput.JSON) {
      return logger.write(JSON.stringify(data, null, 2));
    }
    if (output === IOutput.RAW) {
      return logger.write(JSON.stringify(data));
    }
    if (output === IOutput.YAML) {
      return logger.write(yaml.dump(data));
    }
    return logger.output(data);
  }
  private async parseSpec() {
    const argv = process.argv.slice(2);
    const { template } = utils.parseArgv(argv);
    const spec = await new ParseSpec(template, { argv, logger }).start();
    const components = new Set<string>();
    each(get(spec, 'steps', []), item => {
      components.add(item.component);
    });
    return { ...spec, components: Array.from(components) };
  }
}
