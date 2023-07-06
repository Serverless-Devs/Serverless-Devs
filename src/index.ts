import { Command } from 'commander';
import { CLI_VERSION } from './constant';
import { checkNodeVersion, getPid, setProxy } from './utils';
import logger from './logger';
import { HandleError } from './error';
import root from './command';

const preRun = () => {
  // 添加环境变量
  process.env.CLI_VERSION = CLI_VERSION;
  process.env.serverless_devs_trace_id = `${getPid()}${Date.now()}`;

  // 初始化日志
  logger.initialization();
  logger.write(`run trace id: ${process.env.serverless_devs_trace_id}`);

  // 检查node版本是否过低
  checkNodeVersion();
  // 设置全局代理
  setProxy();
  // TODO: 更新处理  new UpdateNotifier().init().notify();
};

(async () => {
  preRun();

  // 处理指令
  const program = new Command();
  await root(program);
  await program.parseAsync(process.argv);
})().catch(async error => {
  await HandleError(error);
});

process.on('exit', code => {
  logger.debug(`process exitCode: ${code}`);
  logger.loggerInstance.__clear();
});
