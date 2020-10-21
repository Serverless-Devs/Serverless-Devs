import { ServerlessError } from './serverless-error';

export class PlatformPublishError extends ServerlessError {
  constructor(message: string) {
    super('Publishing failed', message);
  }
}
