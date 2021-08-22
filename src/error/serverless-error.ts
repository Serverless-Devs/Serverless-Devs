/** @format */

import getCore from '../utils/s-core';
const { Logger } = getCore();
const logger = new Logger('S-CLI-ERROR');

export class ServerlessError {
  constructor(phase: string, message: string, params?: any) {
    logger.error(phase + ': ' + message, params);
    process.exit(-1);
  }
}
