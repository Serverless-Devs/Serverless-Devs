/** @format */

// import 'v8-compile-cache';
import program from 'commander';
import { execSync } from 'child_process';
import { common, logger, registerAction, configSet } from './utils';

import { PROCESS_ENV_TEMPLATE_NAME, DEFAULT_REGIRSTRY } from './constants/static-variable';

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
  const tempGlobal = ['skip-action', 'debug'];
  for (let i = 0; i < tempGlobal.length; i++) {
    process.env[tempGlobal[i]] = 'false';
    if (process.argv.includes('--' + tempGlobal[i])) {
      process.env[tempGlobal[i]] = 'true';
      process.argv.splice(process.argv.indexOf('--' + tempGlobal[i]), 1);
    }
  }
}

function versionCheck() {
  const pkg = require('../package.json');
  const result = execSync('npm view @serverless-devs/s versions');
  const versions = result.toString().replace(/\'/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',');
  const lastVersion = versions[versions.length - 1].replace(/\n/g, '').replace(/\s/g, '');
  logger.log(`💻 local  version : ${pkg.version}`);
  logger.log(`☁️  remote version : ${lastVersion}\n`);
}

const description = `  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \\_____  \\_/ __ \\_  __ \\  \\/ // __ \\_  __ \\  | _/ __ \\ /  ___//  ___/
 /        \\  ___/|  | \\/\\   /\\  ___/|  | \\/  |_\\  ___/ \\___ \\ \\___ \\
/_________/\\_____>__|    \\_/  \\_____>__|  |____/\\_____>______>______>

Welcome to the Serverless Devs.

More: 
📘 Documents: https://www.github.com/serverless-devs/docs
🙌 Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions
⁉️ Issues: https://github.com/Serverless-Devs/Serverless-Devs/issues
👀 Current Registry: ${getRegistry()}

Quick start:
🍻 Can perform [s init] fast experience`;

(async () => {
  registerCommandChecker(program);
  const system_command = program
    .description(description)
    .helpOption('-h, --help', 'Display help for command')
    .command('config', '👤 ' + 'Configure cloud service account.')
    .command('init', '💞 ' + 'Initializing a project.')
    .command('cli', '🐚 Command line operation through yaml free mode.')
    .command('set', '🔧 Settings for the tool.')
    .option('-t, --template [templatePath]', 'Specify the template file')
    .option('-a, --access [aliasName]', 'Specify the access alias name')
    .option('--skip-actions', 'Skip the extends section')
    .option('--debug', 'Debug model')
    .version('', '-v, --version', 'Output the version number')
    .addHelpCommand(false);

  if (process.argv.length === 2 || (process.argv.length === 3 && ['-h', '--help'].includes(process.argv[2]))) {
    process.env['serverless_devs_out_put_help'] = 'true';
  }
  // 处理额外的密钥信息
  let templateTag = process.argv.includes('-a') ? '-a' : process.argv.includes('--access') ? '--access' : null;
  const index = templateTag ? process.argv.indexOf(templateTag) : -1;
  if (index !== -1 && process.argv[index + 1]) {
    process.env['serverless_devs_temp_access'] = process.argv[index + 1];
    process.argv.splice(index, 2);
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
    versionCheck();
  });
  system_command.parse(process.argv);
})().catch(err => {
  logger.error(`\n\n  ❌ Message: ${err.message}.
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
  process.exit(-1);
});
