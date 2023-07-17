import { TipsError, getRootHome } from '@serverless-devs/utils';
import logger from '../logger';
import chalk from 'chalk';
import path from 'path';
import { errorFormat } from '../utils';
import { IEngineError } from '@serverless-devs/engine';
import { isArray } from 'lodash';

export { CommandError } from './command-error';
export { ConfigDeleteError } from './config-delete-error';
export { ConfigError } from './config-error';
export { ConfigGetError } from './config-get-error';
export { InitError } from './init-error';
export { ServerlessError } from './serverless-error';
export { HumanError } from './human-error';
export { HumanWarning } from './human-warning';

export const HandleError = async (error: IEngineError | IEngineError[] ) => {
  if (isArray(error)) {
    for (const e of error) {
       doOneError(e);
    }
  }else{
    doOneError(error);
  }
  logger.write(errorFormat([
    { key: 'Env:', value: `${process.platform}-${process.arch} node-${process.version}` },
    { key: 'Logs:', value: `${path.join(getRootHome(), 'logs', process.env.serverless_devs_trace_id)}` },
    { key: 'Get Help:', value: `DingTalk: 33947367` },
    { key: 'Feedback:', value: chalk.cyan.underline('https://feedback.serverless-devs.com') },
  ]))
};

const doOneError = (error: IEngineError) => {
  const tipsError = error as TipsError;
  if (tipsError.CODE === TipsError.CODE) {
    const arr = [
      `\n${chalk.red('✖')} ${tipsError.prefix}`,
      '====================',
      chalk.red('Error Message:'),
      chalk.red(tipsError.message),
      chalk.yellow('\n👀 Get detail log: s cli runlog xxxxxxxxxx\n'),
    ];
    if (tipsError.tips) {
      arr.push('🍼 Tips', '====================', chalk.yellow(`${tipsError.tips}\n`));
    }
    logger.write(arr.join('\n'));
    return;
  }
  // 其它错误
  const e = error as Error;
  const arr = [
    chalk.red('Error Message:'),
    chalk.red(e.message),
    chalk.yellow('\n👀 Get detail log: s cli runlog xxxxxxxxxx\n'),
  ];
  logger.write(arr.join('\n'));

}