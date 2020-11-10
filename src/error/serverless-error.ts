/** @format */

import logger from '../utils/logger';

const i18n = require('i18n');

// export class ServerlessError extends Error {
//     constructor(phase: string, message: string, params?: any) {
//         super(i18n.__(phase) + ": " + i18n.__(message, params));
//         //super(message);
//     }
// }

export class ServerlessError {
  constructor(phase: string, message: string, params?: any) {
    logger.error(i18n.__(phase) + ': ' + i18n.__(message, params));
    process.exit(-1);
  }
}
