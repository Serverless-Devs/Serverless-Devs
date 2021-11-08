/** @format */

// import 'v8-compile-cache';
import program from 'commander';
import {
  registerCommandChecker,
  recordCommandHistory,
  registerCustomerCommand,
  registerUniversalCommand,
} from './utils/command-util';
import { PROCESS_ENV_TEMPLATE_NAME } from './constants/static-variable';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { emoji, checkAndReturnTemplateFile, getVersion } from './utils/common';
import UpdateNotifier from './update-notifier';
import onboarding from './onboarding';
import core from './utils/core';
import { HandleError, HumanError } from './error';
import { updateTemplate } from './init/update-template';
const { colors, jsyaml: yaml } = core;
const pkg = require('../package.json');
require('dotenv').config();

async function setSpecialCommand() {
  const templateFile = checkAndReturnTemplateFile();
  if (templateFile) {
    process.env[PROCESS_ENV_TEMPLATE_NAME] = templateFile;
    // Determine whether basic instructions are used, if not useful, add general instructions, etc.
    if (!['init', 'config', 'set', 'cli', 'clean', 'component'].includes(process.argv[2])) {
      await registerCustomerCommand(program, templateFile); // Add user-defined commands
      await registerUniversalCommand(program, templateFile); // Register pan instruction
    }
  } else {
    if (!['init', 'config', 'set', 'cli', 'clean', 'component'].includes(process.argv[2])) {
      const errorMessage = '当前项目没有s.yaml/s.yml, 请通过 -t 指定';
      await new HumanError({ errorMessage }).report({ error: new Error(errorMessage) });
      process.exit(1);
    }
  }
}

async function globalParameterProcessing() {
  // const tempGlobal = ['skip-action', 'debug'];
  const tempGlobal = ['skip-actions'];
  for (let i = 0; i < tempGlobal.length; i++) {
    process.env[tempGlobal[i]] = 'false';
    if (process.argv.includes('--' + tempGlobal[i])) {
      process.env[tempGlobal[i]] = 'true';
      process.argv.splice(process.argv.indexOf('--' + tempGlobal[i]), 1);
    }
  }
}

const description = `  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \\_____  \\_/ __ \\_  __ \\  \\/ // __ \\_  __ \\  | _/ __ \\ /  ___//  ___/
 /        \\  ___/|  | \\/\\   /\\  ___/|  | \\/  |_\\  ___/ \\___ \\ \\___ \\
/_________/\\_____>__|    \\_/  \\_____>__|  |____/\\_____>______>______>

Welcome to the Serverless Devs.

More: 
${emoji('📘')} Documents: ${colors.underline('https://www.serverless-devs.com')}
${emoji('🙌')} Discussions: ${colors.underline('https://github.com/Serverless-Devs/Serverless-Devs/discussions')}

Quick start:
${emoji('🍻')} Can perform [s init] fast experience`;

(async () => {
  registerCommandChecker(program);
  const system_command = program
    .description(description)
    .helpOption('-h, --help', `Display help for command.`)
    .command('config', `${emoji('👤')} Configure venders account.`)
    .command('init', `${emoji('💞')} Initializing a serverless project.`)
    .command('cli', `${emoji('🐚')} Command line operation without yaml mode.`)
    .command('set', `${emoji('🔧')} Settings for the tool.`)
    .command('clean', `${emoji('💥')} Clean up the environment.`)
    .command('component', `${emoji('🔌')} Installed component information.`)
    .option('-t, --template [templatePath]', 'Specify the template file.')
    .option('-a, --access [aliasName]', 'Specify the access alias name.')
    .option('--skip-actions', 'Skip the extends section.')
    .option('--debug', 'Open debug model.')
    .version(getVersion(), '-v, --version', 'Output the version number.')
    .addHelpCommand(false);

  process.env['CLI_VERSION'] = pkg.version;

  // 将参数存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv);

  // ignore warning
  (process as any).noDeprecation = true;

  new UpdateNotifier().init().notify();

  // update alibaba template
  updateTemplate();

  // 对帮助信息进行处理
  if (process.argv.length === 2 || (process.argv.length === 3 && ['-h', '--help'].includes(process.argv[2]))) {
    process.env['serverless_devs_out_put_help'] = 'true';
  }

  // 处理额外的密钥信息
  let templateTag = process.argv.includes('-a') ? '-a' : process.argv.includes('--access') ? '--access' : null;
  const index = templateTag ? process.argv.indexOf(templateTag) : -1;
  let accessFileInfo = {};
  try {
    const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
    accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  } catch (e) {
    accessFileInfo = {};
  }
  if (index !== -1 && process.argv[index + 1]) {
    if (process.argv[2] == 'config') {
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
