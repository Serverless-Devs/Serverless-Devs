// import 'v8-compile-cache';
import program from 'commander';
import { execSync } from 'child_process';
import {
  common,
  i18n,
  logger,
  registerAction,
  configSet
} from './utils';

import { PROCESS_ENV_TEMPLATE_NAME, DEFAULT_REGIRSTRY } from './constants/static-variable';
const { checkAndReturnTemplateFile } = common;
const {
  registerCommandChecker,
  recordCommandHistory,
  registerExecCommand,
  registerCustomerCommand,
  registerUniversalCommand } = registerAction;
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
  const tempGlobal = ['skip-extends', 'verbose'];
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

${i18n.__('Welcome to the Serverless Devs.')}
${i18n.__('You can use the corresponding function through the following instructions.')}

${i18n.__('More: ')}
📘 ${i18n.__('Documents: https://www.github.com/serverless-devs/docs')}
🙌 ${i18n.__('Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions')}
⁉️  ${i18n.__('Issues: https://github.com/Serverless-Devs/Serverless-Devs/issues')}
👀 ${i18n.__(`Current Registry: ${getRegistry()}`)}

${i18n.__('Quick start: ')}
🍻 ${i18n.__(`Can perform [s init] fast experience`)}`;

(async () => {
  registerCommandChecker(program);
  const system_command = program
    .version('', '-v, --version', i18n.__('Output the version number'))
    .description(description)
    .helpOption('-h, --help', i18n.__('Display help for command'))
    .command('config', '👤 ' + i18n.__('Configure cloud service account.'))
    .command('init', '💞 ' + i18n.__('Initializing a project.'))
    .command('cli', '🐚 ' + i18n.__('Command line operation through yaml free mode.'))
    .command('set', '🔧 ' + i18n.__('Settings for the tool.'))
    .option('--skip-actions', i18n.__('Skip the extends section'))
    .option('--debug', i18n.__('Debug model'))
    .addHelpCommand(false);

  await globalParameterProcessing(); // global parameter processing

  await setExecCommand(); // regist exec command

  await setSpecialCommand(); // universal instruction processing

  recordCommandHistory(process.argv); // add history record


  system_command.exitOverride(async (error) => {
    if (error.code === 'commander.help') {
      process.exit(program.args.length > 0 ? 1 : 0)
    }
    if (error.code === 'commander.executeSubCommandAsync' || error.code === 'commander.helpDisplayed') {
      process.exit(0)
    }

    versionCheck();
  })

  system_command.parse(process.argv);
})();
