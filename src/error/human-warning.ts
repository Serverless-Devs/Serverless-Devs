import colors from 'chalk';

interface IConfigs {
  warningMessage: string;
  tips?: string;
}

export class HumanWarning {
  constructor(configs: IConfigs) {
    const { warningMessage, tips } = configs;
    console.log(`\n${colors.hex('#000').bgYellow('WARNING:')}`);
    console.log(`${warningMessage}\n`);
    tips && console.log(`${colors.gray(tips)}\n`);
  }
}
