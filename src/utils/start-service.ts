/** @format */

const express = require('express');
const {execSync} = require('child_process');
import logger from './logger';

type Callback = (app: any) => void;

interface StartServiceData {
  port?: number;
  openBrowser?: boolean;
  callback: Callback;
}

export default class StartService {
  private app: any;
  private server: any;
  private port = 3000;
  private counter = 0;

  constructor(protected readonly context: StartServiceData) {
    this.app = express();
  }

  private randomNum(): number {
    return 3000 + Math.round(Math.random() * 2000);
  }

  start() {
    const {callback, port = 3000} = this.context;
    this.port = port;
    callback(this.app);
    this.listen();
  }

  private async listen() {
    this.counter += 1;
    this.server = this.app.listen(this.port, () => {
      const uri = `http://localhost:${this.port}`;

      logger.log(uri);

      if (this.context.openBrowser) {
        const startInstruction = process.platform === 'win32' ? 'start' : 'open';
        execSync(`${startInstruction} ${uri}`);
      }
    });

    this.server.on('error', (e: any) => {
      if (e.code === 'EADDRINUSE') {
        if (this.counter < 5) {
          this.port = this.randomNum();
          this.listen();
        } else {
          logger.error(e);
        }
      }
    });
  }

  async stop() {
    this.server.close();
  }
}
