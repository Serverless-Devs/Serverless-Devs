import { bgRed } from '../constant';
import colors from 'chalk';

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
    console.log('TODO: 数据上报', {
      type: 'jsError',
      errorMessage: this.errorMessage,
      errorStack: error.stack,
    });
  }
}
