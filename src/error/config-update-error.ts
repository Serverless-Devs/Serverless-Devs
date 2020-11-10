import { ServerlessError } from "./serverless-error";

export class ConfigUpdateError extends ServerlessError {
  constructor(message: string, params?: any) {
    super("Update failed", message, params);
  }
}
