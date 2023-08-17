import { DevsError, getRootHome, isDebugMode } from '@serverless-devs/utils';
import logger from '../logger';
import chalk from 'chalk';
import path from 'path';
import { formatError } from '../utils';
import { IEngineError } from '@serverless-devs/engine';
import { get, isArray } from 'lodash';
export { default as HumanError } from './human-error';

const pkg = require('../../package.json');

export const HandleError = async (error: IEngineError | IEngineError[]) => {
  let exitCode = 1;
  if (isArray(error)) {
    for (const e of error) {
      doOneError(e);
      const code = get(e, 'exitCode')
      if (code) {
        exitCode = code;
      }
    }
  } else {
    doOneError(error);
    const code = get(error, 'exitCode')
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
      { key: 'Logs:', value: chalk.underline(path.join(getRootHome(), 'logs', process.env.serverless_devs_trace_id)) },
      { key: 'Get Help:', value: `DingTalk: 33947367` },
      { key: 'Feedback:', value: chalk.cyan.underline('https://feedback.serverless-devs.com') },
    ]),
  );
  process.exit(exitCode);
};

const doOneError = (error: IEngineError) => {
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
    return;
  }
  // 其它错误
  const e = error as Error;
  const arr = [chalk.red('Error Message:'), chalk.red(isDebugMode() ? e.stack : e.message)];
  logger.write(arr.join('\n'));
};
