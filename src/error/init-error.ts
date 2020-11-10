/** @format */

import {ServerlessError} from './serverless-error';

export class InitError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Initialization failed', message, params);
  }
}
