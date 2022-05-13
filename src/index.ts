import program from '@serverless-devs/commander';
import { registerCommandChecker, logger } from './utils';
import { emoji, getVersion } from './utils/common';
import UpdateNotifier from './update-notifier';
import onboarding from './onboarding';
import { HandleError } from './error';
import SpecialCommad from './special-commad';
import help from './help';
import { COMMAND_LIST } from './constant';
import core from './utils/core';
const pkg = require('../package.json');
const { lodash } = core;
const { join, includes } = lodash;

(async () => {
  process.env['CLI_VERSION'] = pkg.version;
  registerCommandChecker(program);
  const system_command = program
    .helpOption('-h, --help', `Display help for command.`)
    .option('--debug', 'Open debug model.')
    .option('--skip-actions', 'Skip the extends section.')
    .option('-t, --template <templatePath>', 'Specify the template file.')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .command('config', `${emoji('👤')} Configure venders account.`)
    .command('init', `${emoji('💞')} Initializing a serverless project.`)
    .command('cli', `${emoji('🐚')} Command line operation without yaml mode.`)
    .command('verify', `${emoji('🔎')} Verify the application.`)
    .command('set', `${emoji('🔧')} Settings for the tool.`)
    .command('clean', `${emoji('💥')} Clean up the environment.`)
    .command('component', `${emoji('🔌')} Installed component information.`)
    .command('edit', `${emoji('🙌')} Application editing.`)
    .version(getVersion(), '-v, --version', 'Output the version number.')
    .addHelpCommand(false);
  // 将参数argv存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv.slice(2));
  // TODO: 目前core和s并不依赖temp_params环境变量，只是提供给组件用，后续组件移除temp_params后，此行代码可以删掉
  process.env['temp_params'] = join(process.argv.slice(2), ' ');

  // ignore warning
  (process as any).noDeprecation = true;

  new UpdateNotifier().init().notify();

  if (process.argv.length === 2) {
    return await onboarding();
  }
  await help(system_command);

  if (includes(COMMAND_LIST, process.argv[2])) {
    core.makeLogFile();
    system_command.parse(process.argv);
  } else {
    // 自定义指令: s deploy
    await new SpecialCommad(system_command).init();
    system_command.parse(process.argv.filter(o => o !== '-h'));
  }

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
  logger.log('');
  logger.debug(`process exitCode: ${code}`);
});
