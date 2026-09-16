import { Command } from 'commander';
import { checkNodeVersion, getPkgInfo, setProxy } from '@/utils';
import logger from './logger';
import handleError from './error';
import onboarding from './onboarding';
import UpdateNotifier from './update-notifier';
import * as utils from '@serverless-devs/utils';
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import path from 'path';

// 下游管道提前退出（如 `s ... | head`）后继续写 stdout/stderr 会触发 EPIPE uncaughtException，
// 而错误处理流程会再次写 stdout 并 spawn 遥测子进程，形成无限循环。遵循 Unix SIGPIPE 语义：EPIPE 时直接退出。
const exitOnEpipe = (err: Error) => {
  if ((err as NodeJS.ErrnoException).code === 'EPIPE') {
    process.exit(0);
  }
};
process.stdout?.on?.('error', exitOnEpipe);
process.stderr?.on?.('error', exitOnEpipe);

const preRun = () => {
  // 添加环境变量
  process.env.serverless_devs_version = getPkgInfo('version');
  process.env.serverless_devs_traceid = utils.traceid();
  // 初始化日志
  logger.initialization();
  // 不推荐使用管理员权限
  if (process.getuid && process.getuid() === 0 && !utils.isCiCdEnvironment()) {
    logger.warn('It is not recommended to run the command as root user.');
  }
  // 检查node版本是否过低
  checkNodeVersion();
  // 设置全局代理
  setProxy();
  // 检查更新
  if (!utils.isCiCdEnvironment()) {
    try {
      new UpdateNotifier().init().notify();
    } catch {}
  }
  // 加载.env文件
  expand(dotenv.config({ path: path.join(process.cwd(), '.env') }));
};

(async () => {
  preRun();
  // 处理 onboarding
  if (process.argv.slice(2).length === 0) {
    return await onboarding();
  }
  // 处理指令
  const program = new Command();
  // require: fix to catch error in low node version
  await require('./command')(program);
  await program.parseAsync(process.argv);
})().catch(async error => {
  await handleError(error);
});

process.on('uncaughtException', async err => {
  // EPIPE 说明管道下游已退出，进入错误处理流程只会再次写 stdout 造成无限循环
  if ((err as NodeJS.ErrnoException)?.code === 'EPIPE' || String(err?.message ?? '').includes('EPIPE')) {
    process.exit(1);
  }
  await handleError(err);
});

process.on('exit', code => {
  logger.debug(`Run traceid: ${process.env.serverless_devs_traceid}`);
  logger.debug(`Process exitCode: ${code}`);
  // fix 光标位置
  logger.loggerInstance.__clear();
  process.emit('DEVS:exit' as any);
  process.exit();
});

process.on('SIGINT', () => {
  logger.debug('Process SIGINT');
  process.emit('DEVS:SIGINT' as any);
  process.exit();
});
