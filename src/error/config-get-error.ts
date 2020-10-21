import { ServerlessError } from './serverless-error';

export class ConfigGetError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Get failed', message, params);
  }
}
