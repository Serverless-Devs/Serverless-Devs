export class ServerlessError {
  constructor(phase: string, message: string, params?: any) {
    console.error(phase + ': ' + message, params);
    process.exit(1);
  }
}
