
import { logger } from '@serverless-devs-cli/util';
import i18n from 'i18n';

export class ServerlessError {
  constructor(phase: string, message: string, params?: any) {
    i18n.configure({
      logDebugFn: function (msg) { },
      logWarnFn: function (msg) { },
      logErrorFn: function (msg) { },
      locales: ['en', 'zh'],

      register: global
    });
    logger.error(i18n.__(phase) + ': ' + i18n.__(message, params));
    process.exit(-1);
  }
}
