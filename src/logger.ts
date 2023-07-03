import _Logger from '@serverless-devs/logger';
import { includes } from 'lodash';
import path from 'path';
import { getRootHome } from '@serverless-devs/utils';

class Logger {
  loggerInstance: _Logger;
  log: (...args: any[]) => any;
  info: (...args: any[]) => any;
  debug: (...args: any[]) => any;
  warn: (...args: any[]) => any;
  write: (...args: any[]) => any;
  error: (...args: any[]) => any;
  output: (...args: any[]) => any;
  progress: (...args: any[]) => any;

  initialization = () => {
    const level = includes(process.argv, '--debug') ? 'DEBUG' : 'INFO';
    this.loggerInstance = new _Logger({
      traceId: process.env.serverless_devs_trace_id as string,
      logDir: path.join(getRootHome(), 'logs'),
      level,
    });

    const logger = this.loggerInstance.__generate('s_cli');

    this.log = (...args) => logger.log.apply(logger, args);
    this.info = (...args) => logger.info.apply(logger, args);
    this.debug = (...args) => logger.debug.apply(logger, args);
    this.warn = (...args) => logger.warn.apply(logger, args);
    this.write = (...args) => logger.write.apply(logger, args);
    this.error = (...args) => logger.error.apply(logger, args);
    this.output = (...args) => logger.output.apply(logger, args);
    this.progress = (...args) => logger.progress.apply(logger, args);
  };
}

export default new Logger();
