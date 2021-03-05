/** @format */

import { ServerlessError } from './serverless-error';

export class SetAnalysisError extends ServerlessError {
  constructor(message: string, params?: any) {
    super('Analysis failed', message, params);
  }
}
