/** @format */

import program from '@serverless-devs/commander';
import {
  registerCommandChecker,
  recordCommandHistory,
  registerCustomerCommand,
  registerUniversalCommand,
  setEnvbyDotenv,
} from './utils/command-util';
import { PROCESS_ENV_TEMPLATE_NAME } from './constants/static-variable';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { emoji, checkAndReturnTemplateFile, getVersion } from './utils/common';
import UpdateNotifier from './update-notifier';
import onboarding from './onboarding';
import core from './utils/core';
import { HandleError, HumanError } from './error';
const { jsyaml: yaml, makeUnderLine, getRootHome, publishHelp } = core;
const pkg = require('../package.json');

let customerCommandDescription = [];

async function setSpecialCommand() {
  if (process.argv.length === 2) return;
  if (['-v', '--version'].includes(process.argv[2])) return;
  if (['init', 'config', 'set', 'cli', 'clean', 'component'].includes(process.argv[2])) return;
  const templateFile = checkAndReturnTemplateFile();
  if (templateFile) {
    await setEnvbyDotenv(templateFile);
    process.env[PROCESS_ENV_TEMPLATE_NAME] = templateFile;
    // Determine whether basic instructions are used, if not useful, add general instructions, etc.
    customerCommandDescription = await registerCustomerCommand(program, templateFile); // Add user-defined commands
    await registerUniversalCommand(program, templateFile); // Register pan instruction
  } else {
    if (['-h', '--help'].includes(process.argv[2])) return;
    new HumanError({
      errorMessage: 'the s.yaml/s.yml file was not found.',
      tips: 'Please check if the s.yaml/s.yml file exists, you can also specify it with -t.',
    });
    process.exit(1);
  }
}

async function globalParameterProcessing() {
  const tempGlobal = ['skip-actions'];
  for (let i = 0; i < tempGlobal.length; i++) {
    process.env[tempGlobal[i]] = 'false';
    if (process.argv.includes('--' + tempGlobal[i])) {
      process.env[tempGlobal[i]] = 'true';
      process.argv.splice(process.argv.indexOf('--' + tempGlobal[i]), 1);
    }
  }
}

const descption = {
  Options: [
    {'--debug': 'Open debug model.'},
    {'--skip-actions': 'Skip the extends section.'},
    {'-t, --template <path>': 'Specify the template file.'},
    {'-a, --access <aliasName>': 'Specify the access alias name.'},
    {'-v, --version': 'Output the version number.'},
    {'-h, --help': 'Display help for command.'},
  ],
  Commands: [
    {'config': '👤  Configure venders account.'},
    {'init': '💞  Initializing a serverless project.'},
    {'cli': '🐚  Command line operation without yaml mode.'},
    {'set': '🔧  Settings for the tool.'},
    {'clean': '💥  Clean up the environment.'},
    {'component': '🔌  Installed component information.'},
  ]
};

const helperLength = publishHelp.maxLen(descption.Options);

(async () => {
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
    .on('--help', function() {
      console.log(
        [`${emoji('🚀')} Welcome to the Serverless Devs.\n`,
          publishHelp.helpInfo(descption.Options, 'Options', helperLength),
          publishHelp.helpInfo(descption.Commands, 'Commands', helperLength),
          publishHelp.helpInfo(customerCommandDescription, 'Custom Commands', helperLength),
          `${emoji('🧭')} ${makeUnderLine('More information: https://github.com/Serverless-Devs/Serverless-Devs')} `  + '\n'
        ].join('\n')
      );
    });

  process.env['CLI_VERSION'] = pkg.version;

  // 将参数存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv);

  // ignore warning
  (process as any).noDeprecation = true;

  new UpdateNotifier().init().notify();

  // 对帮助信息进行处理
  if (process.argv.length === 2 || (process.argv.length === 3 && ['-h', '--help'].includes(process.argv[2]))) {
    process.env['serverless_devs_out_put_help'] = 'true';
  }

  // 处理额外的密钥信息
  let templateTag = process.argv.includes('-a') ? '-a' : process.argv.includes('--access') ? '--access' : null;
  const index = templateTag ? process.argv.indexOf(templateTag) : -1;
  let accessFileInfo = {};
  try {
    const accessFile = path.join(getRootHome(), 'access.yaml');
    accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  } catch (e) {
    accessFileInfo = {};
  }
  if (index !== -1 && process.argv[index + 1]) {
    if (process.argv[2] === 'config') {
      process.env['serverless_devs_temp_access'] = process.argv[index + 1];
    } else if (Object.keys(accessFileInfo).includes(process.argv[index + 1])) {
      process.env['serverless_devs_temp_access'] = process.argv[index + 1];
      process.argv.splice(index, 2);
      // 对临时参数进行存储
      const tempArgv = JSON.parse(process.env['serverless_devs_temp_argv']);
      tempArgv.splice(tempArgv.indexOf(templateTag), 2);
      process.env['serverless_devs_temp_argv'] = JSON.stringify(tempArgv);
    }
  }

  await globalParameterProcessing(); // global parameter processing
  await setSpecialCommand(); // universal instruction processing
  recordCommandHistory(process.argv); // add history record
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
  await new HandleError({
    error,
  }).report(error);
  process.exit(1);
});


process.on('unhandledRejection', async (error : Error) => {
  await new HandleError({ error }).report(error);
  process.exit(1);
});
