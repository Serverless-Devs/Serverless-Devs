import { ServerlessError } from "./serverless-error";

export class ConfigDeleteError extends ServerlessError {
  constructor(message: string, params?: any) {
    super("Deletion failed", message, params);
  }
}
