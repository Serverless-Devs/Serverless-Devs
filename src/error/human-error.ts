import core from '../utils/core';
import { bgRed } from '../utils/common';

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
    console.log(`\n${bgRed('ERROR:')}`);
    console.log(`TypeError: ${errorMessage}\n`);
    tips && console.log(`${colors.gray(tips)}\n`);
  }

  async report(configs: IReport) {
    const { error } = configs;
    await core.report({
      type: 'jsError',
      content: `${this.errorMessage}||${error.stack}`,
    });
  }
}
