import { Command } from 'commander';
import { CLI_VERSION } from './constant';
import { checkNodeVersion, getPid, setProxy } from './utils';
import logger from './logger';
import { HandleError } from './error';
import root from './command';
import onboarding from './onboarding';
import UpdateNotifier from './update-notifier';

const preRun = () => {
  // 添加环境变量
  process.env.CLI_VERSION = CLI_VERSION;
  process.env.serverless_devs_trace_id = `${getPid()}${Date.now()}`;
  // 初始化日志
  logger.initialization();
  // 检查node版本是否过低
  checkNodeVersion();
  // 设置全局代理
  setProxy();
  // 检查更新
  new UpdateNotifier().init().notify();
};

(async () => {
  preRun();
  // 处理 onboarding
  if (process.argv.length === 2) {
    await onboarding();
    return;
  }

  // 处理指令
  const program = new Command();
  await root(program);
  await program.parseAsync(process.argv);
  // TODO: open-api 可以正常退出进程后，删除此行
  process.exit(0);
})().catch(async error => {
  await HandleError(error);
});

process.on('uncaughtException', async err => {
  await HandleError(err);
});

process.on('exit', code => {
  logger.debug(`Run traceId: ${process.env.serverless_devs_trace_id}`);
  logger.debug(`Process exitCode: ${code}`);
  // fix 光标位置
  logger.loggerInstance.__clear();
});

process.on('SIGINT', () => {
  logger.debug('Process SIGINT');
  process.exit();
});