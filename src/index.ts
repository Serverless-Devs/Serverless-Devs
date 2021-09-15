/** @format */

// import 'v8-compile-cache';
import program from 'commander';
import { common, logger, registerAction, configSet } from './utils';
import { PROCESS_ENV_TEMPLATE_NAME, DEFAULT_REGIRSTRY, UPDATE_CHECK_INTERVAL } from './constants/static-variable';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml';
import fs from 'fs';
import { emoji } from './utils/common';
import { get } from 'lodash';
import updateNotifier from 'update-notifier';
import { execDaemon } from './execDaemon';
import onboarding from './onboarding';
import getCore from './utils/s-core';
const { report } = getCore();
const pkg = require('../package.json');

const { checkAndReturnTemplateFile } = common;
const {
  registerCommandChecker,
  recordCommandHistory,
  registerExecCommand,
  registerCustomerCommand,
  registerUniversalCommand,
} = registerAction;
const { getConfig, setConfig } = configSet;

function getRegistry() {
  let registry = getConfig('registry');
  if (!registry || registry.indexOf('serverlessfans.cn') !== -1) {
    registry = DEFAULT_REGIRSTRY;
    setConfig('registry', registry);
  }
  return registry;
}

async function setSpecialCommand() {
  const templateFile = checkAndReturnTemplateFile();
  if (templateFile) {
    process.env[PROCESS_ENV_TEMPLATE_NAME] = templateFile;
    // Determine whether basic instructions are used, if not useful, add general instructions, etc.
    if (!['init', 'config', 'set', 'exec', 'cli'].includes(process.argv[2])) {
      await registerCustomerCommand(program, templateFile); // Add user-defined commands
      await registerUniversalCommand(program, templateFile); // Register pan instruction
    }
  }
}

async function setExecCommand() {
  const templateFile = checkAndReturnTemplateFile();
  process.env[PROCESS_ENV_TEMPLATE_NAME] = templateFile;
  await registerExecCommand(program, templateFile);
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
${emoji('📘')} Documents: https://www.github.com/serverless-devs/docs
${emoji('🙌')} Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions
${emoji('⁉️')}  Issues: https://github.com/Serverless-Devs/Serverless-Devs/issues
${emoji('👀')} Current Registry: ${getRegistry()}

Quick start:
${emoji('🍻')} Can perform [s init] fast experience`;

(async () => {
  report({ type: 'pv' });
  registerCommandChecker(program);
  const system_command = program
    .description(description)
    .helpOption('-h, --help', `Display help for command`)
    .command('config', `${emoji('👤')} Configure cloud service account.`)
    .command('init', `${emoji('💞')} Initializing a project.`)
    .command('cli', `${emoji('🐚')} Command line operation through yaml free mode.`)
    .command('set', `${emoji('🔧')} Settings for the tool.`)
    .option('-t, --template [templatePath]', 'Specify the template file')
    .option('-a, --access [aliasName]', 'Specify the access alias name')
    .option('--skip-actions', 'Skip the extends section')
    .option('--debug', 'Debug model')
    .version(
      `${pkg.name}: ${pkg.version}, ${process.platform}-${process.arch}, node-${process.version}`,
      '-v, --version',
      'Output the version number',
    )
    .addHelpCommand(false);

  // 将参数存储到env
  process.env['serverless_devs_temp_argv'] = JSON.stringify(process.argv);

  // ignore warning
  (process as any).noDeprecation = true;

  // updateNotifier
  const updateInfo = updateNotifier({ pkg, updateCheckInterval: UPDATE_CHECK_INTERVAL }).notify({ isGlobal: true });
  if (['major', 'minor'].includes(get(updateInfo, 'update.type'))) {
    execDaemon('update.js');
  }
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
  await setExecCommand(); // register exec command
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
})().catch(err => {
  logger.error(`\n\n  ${emoji('❌')} Message: ${err.message}.
  ${emoji('😈')} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
  process.exit(-1);
});
