/** @format */

import program from '@serverless-devs/commander';
import { registerCommandChecker, logger } from './utils';
import { join } from 'lodash';
import { emoji, getVersion } from './utils/common';
import UpdateNotifier from './update-notifier';
import onboarding from './onboarding';
import { HandleError } from './error';
import SpecialCommad from './special-commad';
import help from './help';
const pkg = require('../package.json');

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
    .command('set', `${emoji('🔧')} Settings for the tool.`)
    .command('clean', `${emoji('💥')} Clean up the environment.`)
    .command('component', `${emoji('🔌')} Installed component information.`)
    .version(getVersion(), '-v, --version', 'Output the version number.')
    .addHelpCommand(false);

  await help(system_command);

  // 将参数argv存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv.slice(2));
  process.env['temp_params'] = join(process.argv.slice(2), ' ');

  // ignore warning
  (process as any).noDeprecation = true;

  new UpdateNotifier().init().notify();

  await new SpecialCommad(system_command).init();

  system_command.exitOverride(async error => {
    if (error.code === 'commander.help') {
      process.exit(program.args.length > 0 ? 1 : 0);
    }
    if (error.code === 'commander.executeSubCommandAsync' || error.code === 'commander.helpDisplayed') {
      process.exit(0);
    }
  });
  if (process.argv.length > 2) {
    return system_command.parse(process.argv);
  }
  await onboarding();
})().catch(async error => {
  await HandleError(error);
});

process.on('exit', code => {
  logger.log('');
  logger.debug(`process exitCode: ${code}`);
});
