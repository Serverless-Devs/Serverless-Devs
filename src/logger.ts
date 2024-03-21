import _Logger from '@serverless-devs/logger';
import path from 'path';
import { getRootHome, isDebugMode } from '@serverless-devs/utils';

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
  tips: (...args: any[]) => any;
  unsilent: (...args: any[]) => any;
  silent: (...args: any[]) => any;
  tipsOnce: (...args: any[]) => any;
  warnOnce: (...args: any[]) => any;
  writeOnce: (...args: any[]) => any;

  initialization = () => {
    this.loggerInstance = new _Logger({
      traceId: process.env.serverless_devs_traceid as string,
      logDir: path.join(getRootHome(), 'logs'),
      level: isDebugMode() ? 'DEBUG' : undefined,
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
    this.tips = (...args) => logger.tips.apply(logger, args);
    this.unsilent = (...args) => logger.unsilent.apply(logger, args);
    this.silent = (...args) => logger.silent.apply(logger, args);
    this.tipsOnce = (...args) => logger.tipsOnce.apply(logger, args);
    this.warnOnce = (...args) => logger.warnOnce.apply(logger, args);
    this.writeOnce = (...args) => logger.writeOnce.apply(logger, args);
  };
}

export default new Logger();
