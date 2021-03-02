
import i18n from 'i18n';
import { HLogger, ILogger } from '@serverless-devs/core';


export class ServerlessError {
  @HLogger('S-CLI-ERROR') logger: ILogger;
  constructor(phase: string, message: string, params?: any) {
    i18n.configure({
      logDebugFn: function (msg) { },
      logWarnFn: function (msg) { },
      logErrorFn: function (msg) { },
      locales: ['en', 'zh'],
      register: global
    });
    this.logger.error(i18n.__(phase) + ': ' + i18n.__(message, params));
    process.exit(-1);
  }
}
