import { Command } from 'commander';
import { CLI_VERSION } from './constant';
import { checkNodeVersion, getPid, setProxy } from './utils';
import { HandleError } from './error';

const preRun = () => {
  // 添加环境变量
  process.env.CLI_VERSION = CLI_VERSION;
  process.env.serverless_devs_trace_id = `${getPid()}${Date.now()}`;

  // 检查node版本是否过低
  checkNodeVersion(); 
  // 设置全局代理
  setProxy();
  // TODO: 更新处理  new UpdateNotifier().init().notify();
}

(async () => {
  preRun();

  const program = new Command();

  // 根命令
  await require('./command')(program);
  // 支持的系统命令
  await require('./command/config')(program);
  await require('./command/set')(program);
  await require('./command/clean')(program);

  program.parse(process.argv);
})().catch(async error => {
  await HandleError(error);
});

process.on('exit', code => {
  console.debug(`process exitCode: ${code}`);
});
