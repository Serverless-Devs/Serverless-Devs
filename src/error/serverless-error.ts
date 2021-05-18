import { HLogger, ILogger } from '@serverless-devs/core';

export class ServerlessError {
  @HLogger('S-CLI-ERROR') logger: ILogger;
  constructor(phase: string, message: string, params?: any) {
    this.logger.error(phase + ': ' + message, params);
    process.exit(-1);
  }
}
