import { DevsError, getRootHome, getUserAgent, isDebugMode } from '@serverless-devs/utils';
import logger from '@/logger';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { formatError } from '@/utils';
import { parseArgv } from '@serverless-devs/utils';
import { IEngineError } from '@serverless-devs/engine';
import { get, isArray } from 'lodash';
import execDaemon from '@/exec-daemon';
export { default as HumanError } from './human-error';
import * as utils from '@serverless-devs/utils';

const pkg = require('../../package.json');

const handleError = async (error: IEngineError | IEngineError[], params: Record<string, any> = {}) => {
  logger.unsilent();
  const { silent } = parseArgv(process.argv.slice(2));
  const errorFile = path.join(getRootHome(), 'logs', process.env.serverless_devs_traceid, 'error.json');
  fs.ensureFileSync(errorFile);
  fs.writeJSONSync(errorFile, [], { spaces: 2 });
  let exitCode = 1;
  if (isArray(error)) {
    for (const e of error) {
      doOneError(e, params);
      const code = get(e, 'exitCode');
      if (code) {
        exitCode = code;
      }
    }
  } else {
    doOneError(error, params);
    const code = get(error, 'exitCode');
    if (code) {
      exitCode = code;
    }
  }
  if (utils.getGlobalConfig('log') !== 'disable') {
    logger.write(' ');
    logger.write(chalk.gray(`A complete log of this run can be found in: ${chalk.underline(path.join(utils.getRootHome(), 'logs', process.env.serverless_devs_traceid))}`));
  }
  // 空出一行间隙
  logger.write(' ');
  logger.write(
    chalk.gray(
      formatError([
        {
          key: 'Env:',
          value: `${pkg.name}: ${pkg.version}, ${process.platform}-${process.arch} node-${process.version}`,
        },
        { key: 'Logs:', value: chalk.underline(path.join(getRootHome(), 'logs', process.env.serverless_devs_traceid)) },
        { key: 'Feedback:', value: chalk.cyan.underline('https://github.com/Serverless-Devs/Serverless-Devs/issues') },
      ]),
    ),
  );
  if (silent) {
    logger.silent();
  }
  process.exitCode = exitCode;
};

const doOneError = (error: IEngineError, params: Record<string, any> = {}) => {
  execDaemon('report.js', { argv: process.argv.slice(2), userAgent: getUserAgent(), ...params, type: get(error, 'trackerType'), message: error.message });
  writeError(error);
  // 空出一行间隙
  logger.write(' ');
  const devsError = error as DevsError;
  if (devsError.CODE === DevsError.CODE) {
    const arr = devsError.prefix ? [`${chalk.red('✖')} ${devsError.prefix}`, '===================='] : [];
    arr.push(chalk.red('Error Message:'), chalk.red(isDebugMode() ? devsError.stack : devsError.message));
    if (devsError.tips) {
      arr.push('\n🍼 Tips', '====================', chalk.yellow(`${devsError.tips}`));
    }
    logger.write(arr.join('\n'));
    showStack(devsError.stack);
    return;
  }
  // 其它错误
  const e = error as Error;
  const arr = [chalk.red('Error Message:'), chalk.red(isDebugMode() ? e.stack : e.message)];
  logger.write(arr.join('\n'));
  showStack(e.stack);
};

const writeError = (error: IEngineError) => {
  const getData = (error: IEngineError) => {
    const data = get(error, 'data');
    if (data) {
      return data;
    }
    const e = error as DevsError;
    if (e.CODE === DevsError.CODE) {
      return {
        prefix: e.prefix,
        message: e.message,
        exitCode: e.exitCode,
        tips: e.tips,
      };
    }
    return {
      message: e.message,
    };
  };

  const errorFile = path.join(getRootHome(), 'logs', process.env.serverless_devs_traceid, 'error.json');
  const errorInfo = fs.readJSONSync(errorFile);
  errorInfo.push(getData(error));
  fs.writeJSONSync(errorFile, errorInfo, { spaces: 2 });
};

const showStack = (msg: string) => {
  if (isDebugMode()) {
    return;
  }
  logger.debug(msg);
};

export default handleError;
