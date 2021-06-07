/** @format */

import { Logger, spinner as LogSpinner } from '@serverless-devs/core';

const CLI_CONTENT = 'S-CLI';

export default class ServerlessDevsCliLogger {
  static log(m) {
    Logger.log(m);
  }
  static info(m) {
    Logger.info(CLI_CONTENT, m);
  }

  static debug(m) {
    Logger.debug(CLI_CONTENT, m);
  }

  static error(m) {
    Logger.error(CLI_CONTENT, m);
  }

  static warning(m) {
    Logger.warn(CLI_CONTENT, m);
  }

  static success(m) {
    Logger.log(m, 'green');
  }

  static spinner(info) {
    return LogSpinner(info);
  }
}
