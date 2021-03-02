/** @format */

import { ServerlessError } from './serverless-error';

export class SearchError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Search failed', message, params);
  }
}
