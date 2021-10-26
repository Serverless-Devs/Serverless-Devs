/** @format */

import core from '../utils/core';
const { Logger } = core;
const logger = new Logger('S-CLI-ERROR');

export class ServerlessError {
  constructor(phase: string, message: string, params?: any) {
    logger.error(phase + ': ' + message, params);
    process.exit(1);
  }
}
