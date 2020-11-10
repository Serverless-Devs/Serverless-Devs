/** @format */

import {ServerlessError} from './serverless-error';

export class ConfigError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Config failed', message, params);
  }
}
