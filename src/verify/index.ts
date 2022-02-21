import program from '@serverless-devs/commander';
import core from '../utils/core';
import i18n from '../utils/i18n';
import { emoji } from '../utils/common';

const { colors } = core;

const description = `Application verification.
    
    Example:
        $ s verify

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/verify.md',
)}`;
const command = program
  .name('s verify')
  .usage('[options]')
  .option('-t, --template [templatePath]', 'Specify the template file')
  .helpOption('-h, --help', i18n('display_help_for_command'))
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);

(async () => {
  if (process.argv.length === 2) {
    command.help();
  }
})();
