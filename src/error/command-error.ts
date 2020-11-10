/** @format */

import {ServerlessError} from './serverless-error';

export class CommandError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Error', message, params);
  }
}
