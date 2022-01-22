/** @format */

import program from '@serverless-devs/commander';
import { registerCommandChecker } from './utils';
import _ from 'lodash';
import { emoji, getVersion } from './utils/common';
import UpdateNotifier from './update-notifier';
import onboarding from './onboarding';
import core from './utils/core';
import { HandleError } from './error';
import SpecialCommad from './special-commad';
const { makeUnderLine, publishHelp } = core;
const pkg = require('../package.json');

let customerCommandDescription = [];

const descption = {
  Options: [
    { '--debug': 'Open debug model.' },
    { '--skip-actions': 'Skip the extends section.' },
    { '-t, --template <path>': 'Specify the template file.' },
    { '-a, --access <aliasName>': 'Specify the access alias name.' },
    { '-v, --version': 'Output the version number.' },
    { '-h, --help': 'Display help for command.' },
  ],
  Commands: [
    { config: '👤  Configure venders account.' },
    { init: '💞  Initializing a serverless project.' },
    { cli: '🐚  Command line operation without yaml mode.' },
    { set: '🔧  Settings for the tool.' },
    { clean: '💥  Clean up the environment.' },
    { component: '🔌  Installed component information.' },
  ],
  Examples: [{ init: 'Perform [s init] fast experience Serverless Devs' }],
};

const helperLength = publishHelp.maxLen(descption.Options);

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
    .addHelpCommand(false)
    .on('--help', function () {
      console.log(
        [
          `${emoji('🚀')} Welcome to the Serverless Devs.\n`,
          publishHelp.helpInfo(descption.Options, 'Options', helperLength),
          publishHelp.helpInfo(descption.Commands, 'Commands', helperLength),
          publishHelp.helpInfo(customerCommandDescription, 'Custom Commands', helperLength),
          publishHelp.helpInfo(descption.Examples, 'Examples', helperLength),
          `${emoji('🧭')} ${makeUnderLine('More information: https://github.com/Serverless-Devs/Serverless-Devs')} ` +
            '\n',
        ].join('\n'),
      );
    });

  // 将参数argv存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv.slice(2));

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
  await HandleError({ error });
  process.exit(1);
});

process.on('unhandledRejection', async (error: Error) => {
  try {
    await HandleError({ error });
  } catch (error) {
    console.log('Internal exception occurred!!!', error);
  }
  process.exit(1);
});
