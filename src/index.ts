import program from '@serverless-devs/commander';
import { registerCommandChecker, logger } from './utils';
import { getVersion } from './utils/common';
import UpdateNotifier from './update-notifier';
import onboarding from './onboarding';
import { HandleError } from './error';
import SpecialCommad from './special-commad';
import help from './help';
import { COMMAND_LIST } from './constant';
import checkNodeVersion from './check-node-version';
import { setProxy } from './global-agent';
import core from './utils/core';
const pkg = require('../package.json');
const { lodash } = core;
const { join, includes } = lodash;

(async () => {
  process.env['CLI_VERSION'] = pkg.version;
  registerCommandChecker(program);
  // ignore warning
  (process as any).noDeprecation = true;
  // 检查node版本是否过低
  checkNodeVersion();
  setProxy();
  // 将参数argv存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv.slice(2));
  // TODO: 目前core和s并不依赖temp_params环境变量，只是提供给组件用，后续组件移除temp_params后，此行代码可以删掉
  process.env['temp_params'] = join(process.argv.slice(2), ' ');

  const system_command = program
    .version(getVersion(), '-v, --version', 'Output the version number.')
    .option('--debug', 'Open debug model.');

  new UpdateNotifier().init().notify();
  if (process.argv.length === 2) {
    return await onboarding();
  }

  require('./clean')(program);
  require('./cli')(program);
  require('./component')(program);
  require('./config')(program);
  require('./edit')(program);
  require('./init')(program);
  require('./set')(program);
  require('./verify')(program);

  await help(program);

  if (includes(COMMAND_LIST, process.argv[2])) {
    core.makeLogFile();
  } else {
    // 自定义指令: s deploy
    await new SpecialCommad(system_command).init();
  }

  const argv = process.argv.filter(o => !includes(['-h', '--help'], o));
  program.parse(argv);

  system_command.exitOverride(async error => {
    if (error.code === 'commander.help') {
      process.exit(program.args.length > 0 ? 1 : 0);
    }
    if (error.code === 'commander.executeSubCommandAsync' || error.code === 'commander.helpDisplayed') {
      process.exit(0);
    }
  });
})().catch(async error => {
  await HandleError(error);
});

process.on('exit', code => {
  logger.debug(`process exitCode: ${code}`);
});
