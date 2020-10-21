import { ServerlessError } from './serverless-error';

export class SetLanguageError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Set Language failed', message, params);
  }
}
