import { bgRed } from '../constant';
import colors from 'chalk';
import logger from '../logger';

interface IConfigs {
  errorMessage: string;
  tips?: string;
}

interface IReport {
  error: Error;
}

export class HumanError {
  private errorMessage: string;
  constructor(configs: IConfigs) {
    const { errorMessage, tips } = configs;
    this.errorMessage = errorMessage;
    logger.write(`\n${bgRed('ERROR:')}`);
    logger.write(`TypeError: ${errorMessage}\n`);
    tips && logger.write(`${colors.gray(tips)}\n`);
  }

  async report(configs: IReport) {
    const { error } = configs;
    console.log('TODO: 数据上报', {
      type: 'jsError',
      errorMessage: this.errorMessage,
      errorStack: error.stack,
    });
  }
}
