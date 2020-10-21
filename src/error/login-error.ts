import { ServerlessError } from './serverless-error';

export class LoginError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Login failed', message, params);
  }
}
