/** @format */

import i18n from './utils/i18n';
import * as program from 'commander';
import {handlerProfileFile} from './utils/handler-set-config';
import logger from './utils/logger';
import {
  registerCommandChecker,
  registerExitOverride,
  recordCommandHistory,
  registerCustomerCommand,
  regiserUniversalCommand,
} from './utils/command';
import {checkAndReturnTemplateFile} from './utils/common';
import {PROCESS_ENV_TEMPLATE_NAME} from './constants/static-variable';

const description = `  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \\_____  \\_/ __ \\_  __ \\  \\/ // __ \\_  __ \\  | _/ __ \\ /  ___//  ___/
 /        \\  ___/|  | \\/\\   /\\  ___/|  | \\/  |_\\  ___/ \\___ \\ \\___ \\
/_______  /\\___  >__|    \\_/  \\___  >__|  |____/\\___  >____  >____  >
        \\/     \\/                 \\/                \\/     \\/     \\/

${i18n.__('Welcome to the Serverless Devs Tool.')}
${i18n.__('You can use the corresponding function through the following instructions.')}
`;

async function setSpecialCommand() {
  const templateFile = checkAndReturnTemplateFile();
  if (templateFile) {
    process.env[PROCESS_ENV_TEMPLATE_NAME] = templateFile;
    // Determine whether basic instructions are used, if not useful, add general instructions, etc.
    if (!['init', 'config', 'platform', 'search', 'set', 'gui'].includes(process.argv[2])) {
      await registerCustomerCommand(program, templateFile); // Add user-defined commands
      await regiserUniversalCommand(program, templateFile); // Register pan instruction
    }
  }
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

(async () => {
  // Initialize the print configuration, open by default
  const setConfigObject = await handlerProfileFile({read: true});
  const outputColorFlag = setConfigObject['output-color'] === false ? false : true;

  // Set output color
  logger.colorSwitch(outputColorFlag);

  // Wrong instruction
  registerCommandChecker(program);

  const system_command = program
    .version('', '-v, --version', i18n.__('Output the version number'))
    .description(description)
    .helpOption('-h, --help', i18n.__('Display help for command'))
    .command('config', i18n.__('Configure cloud service account.'))
    .command('gui', i18n.__('Start GUI service.'))
    .command('init', i18n.__('Initializing a project.'))
    .command('search', i18n.__('Search the package.'))
    .command('platform', i18n.__('Publish a(an) Component/Plugin/Application.'))
    .command('set', i18n.__('Settings for the tool.'))
    .option('--skip-extends', i18n.__('Skip the extends section'))
    .addHelpCommand(false);

  // Global parameter processing
  await globalParameterProcessing();

  // Universal instruction processing
  await setSpecialCommand();

  // Verification version
  await registerExitOverride(program);

  try {
    // Record command
    recordCommandHistory(process.argv);
  } catch (ex) {}

  system_command.parse(process.argv);
})();
