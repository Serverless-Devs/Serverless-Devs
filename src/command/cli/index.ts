import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, getUid, isJson, showOutput, writeOutput } from '@/utils';
import * as utils from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import Credential from '@serverless-devs/credential';
import { each, filter, get, includes } from 'lodash';
import logger from '@/logger';
import Help from './help';
import execDaemon from '@/exec-daemon';
import { EReportType } from '@/type';
import { getUserAgent } from '@serverless-devs/utils';
import handleError from '@/error';

const description = `Directly use serverless devs to use components, develop and manage applications without yaml configuration.
  
  Example:
    $ s cli fc3 info --region cn-hangzhou --function-name  test -a myAccess
    $ s cli fc3 invoke --region cn-hangzhou --function-name  test -e "{\"key\" : \"val\"}" -a myAccess
    
${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/cli/')}`;

export default async (program: Command) => {
  const { _: raw = [], help } = utils.parseArgv(process.argv.slice(2));
  if (raw[0] !== 'cli') return;

  const cliProgram = program
    .command('cli')
    .description(description)
    .summary(`Command line operation without yaml mode`)
    .option('-p, --props <jsonString>', 'The json string of props', v => isJson(v))
    .option('-h, --help', 'Display help for command', undefined) // 避免自动调用help信息（s cli fc -h）
    .allowUnknownOption();
  // s cli or s cli -h
  if (raw.length === 1 || (raw.length === 1 && help)) {
    cliProgram.help();
  }
  const [componentName] = raw.slice(1);
  const v3 = await isFc3(componentName);
  if (!v3) {
    const v1 = (await import('./v1')).default;
    return v1(cliProgram);
  }
  // s cli fc3 or s cli fc3 -h
  if (help || raw.length === 2) return new Help(cliProgram).init();
  cliProgram.action(async () => {
    await doAction();
    logger.loggerInstance.__clear();
  });
};

const isFc3 = async (componentName: string) => {
  try {
    const componentLogger = logger.loggerInstance.__generate(componentName);
    const instance = await loadComponent(componentName, { logger: componentLogger });
    if (instance.__path) return true;
  } catch (error) {
    logger.warn(`error: ${error}`);
    return false;
  }
};

const doAction = async () => {
  const {
    _: raw = [],
    silent,
    ...rest
  } = utils.parseArgv(process.argv.slice(2), {
    alias: {
      props: 'p',
    },
    string: ['props', 'a'],
  });

  const [componentName, command] = raw.slice(1);
  const componentLogger = logger.loggerInstance.__generate(componentName);
  const instance = await loadComponent(componentName, { logger: componentLogger });
  const access = get(rest, 'access', 'default');
  const inputs = {
    cwd: process.cwd(),
    userAgent: utils.getUserAgent({ component: instance.__info }),
    name: 'default',
    props: get(rest, 'props', {}),
    command: command,
    args: filter(process.argv.slice(3), v => !includes([componentName, command], v)),
    resource: {
      name: 'default',
      component: componentName,
      access,
    },
    getCredential: async () => {
      const res = await new Credential({ logger: componentLogger }).get(access);
      const credential = get(res, 'credential', {});
      each(credential, v => {
        logger.loggerInstance.__setSecret([v]);
      });
      return credential;
    },
  };
  if (instance[command]) {
    const argv = process.argv.slice(2);
    const reportData = { uid: await getUid(access), argv, command, component: componentName, userAgent: getUserAgent({ component: componentName }) };
    try {
      const res = await instance[command](inputs);
      const argv = process.argv.slice(2);
      const argvData = utils.parseArgv(argv);
      const outputFile = get(argvData, 'output-file');
      outputFile ? writeOutput(res) : showOutput(res);
      execDaemon('report.js', { ...reportData, type: EReportType.command });
      return;
    } catch (error) {
      handleError(
        new utils.DevsError(error.message, {
          stack: error.stack,
          exitCode: 101,
          trackerType: utils.ETrackerType.runtimeException,
        }),
        reportData,
      );
      return;
    }
  }
  throw new utils.DevsError('The specified command cannot be found.', {
    exitCode: 100,
    tips: 'Please refer to the help document of [-h/--help] command.',
  });
};
