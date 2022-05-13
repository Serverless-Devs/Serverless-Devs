import core from '../utils/core';
import { bgRed, logger } from '../utils';

const { colors } = core;

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
    logger.log(`\n${bgRed('ERROR:')}`);
    logger.log(`TypeError: ${errorMessage}\n`);
    tips && logger.log(`${colors.gray(tips)}\n`);
  }

  async report(configs: IReport) {
    const { error } = configs;
    await core.report({
      type: 'jsError',
      content: `${this.errorMessage}||${error.stack}`,
    });
  }
}
