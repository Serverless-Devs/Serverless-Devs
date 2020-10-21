import { ServerlessError } from './serverless-error';

export class PlatformDeleteError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Delete package failed', message, params);
  }
}
