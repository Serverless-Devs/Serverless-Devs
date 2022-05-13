import core from '../utils/core';
import { logger } from '../utils';

const { colors } = core;

interface IConfigs {
  warningMessage: string;
  tips?: string;
}

export class HumanWarning {
  constructor(configs: IConfigs) {
    const { warningMessage, tips } = configs;
    logger.log(`\n${colors.hex('#000').bgYellow('WARNING:')}`);
    logger.log(`${warningMessage}\n`);
    tips && logger.log(`${colors.gray(tips)}\n`);
  }
}
