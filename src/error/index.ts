import { DevsError, getRootHome, isDebugMode } from '@serverless-devs/utils';
import logger from '../logger';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { formatError } from '../utils';
import { IEngineError } from '@serverless-devs/engine';
import { get, isArray } from 'lodash';
export { default as HumanError } from './human-error';

const pkg = require('../../package.json');

const handleError = async (error: IEngineError | IEngineError[]) => {
  const errorFile = path.join(getRootHome(), 'logs', process.env.serverless_devs_traceid, 'error.json');
  fs.ensureFileSync(errorFile);
  fs.writeJSONSync(errorFile, [], { spaces: 2 });
  let exitCode = 1;
  if (isArray(error)) {
    for (const e of error) {
      doOneError(e);
      const code = get(e, 'exitCode');
      if (code) {
        exitCode = code;
      }
    }
  } else {
    doOneError(error);
    const code = get(error, 'exitCode');
    if (code) {
      exitCode = code;
    }
  }
  // 空出一行间隙
  logger.write(' ');
  logger.write(
    formatError([
      {
        key: 'Env:',
        value: `${pkg.name}: ${pkg.version}, ${process.platform}-${process.arch} node-${process.version}`,
      },
      { key: 'Logs:', value: chalk.underline(path.join(getRootHome(), 'logs', process.env.serverless_devs_traceid)) },
      { key: 'Get Help:', value: `DingTalk: 33947367` },
      { key: 'Feedback:', value: chalk.cyan.underline('https://feedback.serverless-devs.com') },
    ]),
  );
  process.exitCode = exitCode;
};

const doOneError = (error: IEngineError) => {
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
  if (isDebugMode()) return;
  logger.debug(msg)
};

export default handleError;
