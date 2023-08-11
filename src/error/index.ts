import { DevsError, getRootHome, isDebugMode } from '@serverless-devs/utils';
import logger from '../logger';
import chalk from 'chalk';
import path from 'path';
import { formatError } from '../utils';
import { IEngineError } from '@serverless-devs/engine';
import { isArray } from 'lodash';
const pkg = require('../../package.json');


export { default as HumanError } from './human-error';
export const HandleError = async (error: IEngineError | IEngineError[]) => {
  if (isArray(error)) {
    for (const e of error) {
      doOneError(e);
    }
  } else {
    doOneError(error);
  }
  logger.write('\n')
  logger.write(formatError([
    { key: 'Env:', value: `${pkg.name}: ${pkg.version}, ${process.platform}-${process.arch} node-${process.version}` },
    { key: 'Logs:', value: chalk.underline(path.join(getRootHome(), 'logs', process.env.serverless_devs_trace_id)) },
    { key: 'Get Help:', value: `DingTalk: 33947367` },
    { key: 'Feedback:', value: chalk.cyan.underline('https://feedback.serverless-devs.com') },
  ]))
};

const doOneError = (error: IEngineError) => {
  const devsError = error as DevsError;
  if (devsError.CODE === DevsError.CODE) {
    const arr = [
      `\n${chalk.red('✖')} ${devsError.prefix}`,
      '====================',
      chalk.red('Error Message:'),
      chalk.red(isDebugMode() ? devsError.stack : devsError.message),
    ];
    if (devsError.tips) {
      arr.push('🍼 Tips', '====================', chalk.yellow(`${devsError.tips}\n`));
    }
    logger.write(arr.join('\n'));
    return;
  }
  // 其它错误
  const e = error as Error;
  const arr = [
    chalk.red('Error Message:'),
    chalk.red(isDebugMode() ? e.stack : e.message),

  ];
  logger.write(arr.join('\n'));

}