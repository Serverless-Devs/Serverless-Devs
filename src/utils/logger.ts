/** @format */

import getCore from './s-core';
const { Logger, spinner: LogSpinner } = getCore();

const logger = new Logger('S-CLI');

export default class ServerlessDevsCliLogger {
  static log(m) {
    logger.log(m);
  }
  static info(m) {
    logger.info(m);
  }

  static debug(m) {
    logger.debug(m);
  }

  static error(m) {
    logger.error(m);
  }

  static warning(m) {
    logger.warn(m);
  }

  static success(m) {
    logger.log(m, 'green');
  }

  static spinner(info) {
    return LogSpinner(info);
  }
  static output(info) {
    return logger.output(info);
  }
}
