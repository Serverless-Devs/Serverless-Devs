import { ServerlessError } from "./serverless-error";

export class PlatformInitError extends ServerlessError {
  constructor(message: string, params?: any) {
    super("Initialization failed", message, params);
  }
}
