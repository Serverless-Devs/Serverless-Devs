import { Command } from 'commander';
import Engine, { IContext, STEP_STATUS } from '@serverless-devs/engine';
import * as utils from '@serverless-devs/utils';
import { get, each, filter, uniqBy, isEmpty, join, keys, cloneDeep, find, set } from 'lodash';
import ParseSpec from '@serverless-devs/parse-spec';
import V1 from './v1';
import logger from '@/logger';
import handleError from '@/error';
import { ISpec } from './types';
import Help from './help';
import chalk from 'chalk';
import path from 'path';
import loadComponent from '@serverless-devs/load-component';
import execDaemon from '@/exec-daemon';
import { UPDATE_COMPONENT_CHECK_INTERVAL, CICD_ENV_KEY } from '@/constant';
import { EReportType } from '@/type';
import { emoji, showOutput, writeOutput, runEnv, deepObfuscate } from '@/utils';
import { ETrackerType, DevsError, getUserAgent, isCiCdEnvironment } from '@serverless-devs/utils';

export default class Custom {
  private spec = {} as ISpec;
  constructor(private program: Command) {}
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, template, help, version, verify = true, env, ...rest } = utils.parseArgv(argv);
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
      if (raw.length > 0) {
        throw new DevsError(error.message, {
          stack: error.stack,
          trackerType: ETrackerType.parseException,
        });
      }
    }
    if (!get(this.spec, 'yaml.use3x')) return await new V1(this.program, this.spec).init();
    if (help) return await new Help(this.program, this.spec).init();
    // 若带env参数以及是deploy或plan指令，运行env deploy
    if (raw[0] === 'deploy' || raw[0] === 'plan') await runEnv(env, template);
    this.program
      .command(raw[0])
      .allowUnknownOption()
      .action(async () => {
        const engine = new Engine({
          template,
          logConfig: {
            customLogger: logger.loggerInstance,
          },
          verify,
        });
        const context = await engine.start();
        await this.updateComponent(context);
        const reportComponent = await this.getReportComponent();
        const reportData = {
          uid: get(context, 'credential.AccountID'),
          argv,
          command: this.spec.command,
          component: reportComponent,
          userAgent: getUserAgent({ component: reportComponent }),
        };
        if (get(context, 'status') === 'success') {
          execDaemon('report.js', { ...reportData, type: EReportType.command });
          rest['output-file'] ? writeOutput(get(context, 'output')) : this.output(context);
          if (utils.getGlobalConfig('log') !== 'disable') {
            logger.write(`\nA complete log of this run can be found in: ${chalk.underline(path.join(utils.getRootHome(), 'logs', process.env.serverless_devs_traceid))}\n`);
          }
          return;
        }
        await handleError(context.error, reportData);
      });
  }
  private async getReportComponent() {
    const reportComponentList = [];
    const components = get(this.spec, 'components');
    for (const name of components) {
      if (isEmpty(name)) continue;
      const instance = await loadComponent(name, { logger });
      reportComponentList.push(instance.__info);
    }
    return join(reportComponentList, ',');
  }
  private async updateComponent(context: IContext) {
    let executedComponent = filter(get(context, 'steps'), item => item.status === STEP_STATUS.SUCCESS);
    executedComponent = uniqBy(executedComponent, item => item.component);
    for (const item of executedComponent) {
      const instance = await loadComponent(item.component, { logger });
      const lockPath = utils.getLockFile(instance.__path);
      const lockInfo = utils.readJson(lockPath);
      if (!lockInfo.lastUpdateCheck || Date.now() - lockInfo.lastUpdateCheck > UPDATE_COMPONENT_CHECK_INTERVAL) {
        execDaemon('update-component.js', { component: item.component });
      }
    }
  }
  // 当输出只有一条时，舍去key
  private parseOutput(data: Object) {
    if (keys(data).length === 1) return data[keys(data)[0]];
    return data;
  }
  private async output(context: IContext) {
    if (isEmpty(get(context, 'output'))) return;
    const data = await this.processOutput(context);
    logger.write(`\n${emoji('🚀')} Result for [${this.spec.command}] of [${get(this.spec, 'yaml.appName')}]\n${chalk.gray('====================')}`);
    showOutput(data);
  }
  // cicd环境下默认隐藏，选择性显示
  private async processOutput(context: IContext) {
    const { steps, command } = this.spec;
    if (process.env[CICD_ENV_KEY] == 'true' || isCiCdEnvironment()) {
      const showData = deepObfuscate(get(context, 'output'));
      const originalData = cloneDeep(get(context, 'output')); 
      for (const i in showData) {
        const obj = showData[i];
        const originalObj = originalData[i];
        const step = find(steps, item => item.projectName === i);
        const componentName = get(step, 'component');
        const instance = await loadComponent(componentName, { logger });
        if (instance.getShownProps) {
          const shownPropsObj = instance.getShownProps();
          const keyList = keys(shownPropsObj);
          const destKey = find(keyList, item => {
            try {
              return new RegExp(item).test(command);
            } catch {
              return false;
            }
          });
          const shownPropsList = get(shownPropsObj, destKey);
          for (const i of shownPropsList) {
            set(obj, i, get(originalObj, i));
          }
        }
      }
      return this.parseOutput(showData);
    }
    return this.parseOutput(get(context, 'output'));
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
