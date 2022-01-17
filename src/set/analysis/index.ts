import program from '@serverless-devs/commander';
import { CommandError } from '../../error';
import logger from '../../utils/logger';
import core from '../../utils/core';
import { emoji } from '../../utils/common';
const { inquirer, colors } = core;
import { setConfig, getConfig } from '../../utils/handler-set-config';

const description = `Set analysis action.

    Example:
        $ s set analysis
        $ s set analysis disable
        
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

program
  .name('s set analysis')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(description)
  .parse(process.argv);

const promptOption = [
  {
    type: 'list',
    name: 'analysis',
    message: 'Choose a action?',
    choices: [
      {
        name: 'enable',
        value: 'enable',
      },
      {
        name: 'disable',
        value: 'disable',
      },
    ],
  },
];
(async () => {
  if (program.args.length === 0) {
    logger.log(`\n${emoji('📝')} Current analysis action: ${getConfig('analysis', 'enable')}\n`);
    const answers = await inquirer.prompt(promptOption);
    setConfig('analysis', answers.analysis);
  }
  if (program.args.length > 0) {
    const val = program.args[0];
    if (val) {
      setConfig('analysis', val);
      logger.log('Setup succeeded', 'green');
    }
  }
})().catch(err => {
  throw new CommandError(err.message);
});
