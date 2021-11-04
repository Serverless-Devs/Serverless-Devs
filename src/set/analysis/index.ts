import program from 'commander';
import { CommandError } from '../../error';
import logger from '../../utils/logger';
import core from '../../utils/core';
const { inquirer } = core;
import { setConfig, getConfig } from '../../utils/handler-set-config';

const description = `Set analysis action.

    Example:
        $ s set analysis
        $ s set analysis disable`;

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
    logger.log(`\n📝 Current analysis action: ${getConfig('analysis')}\n`);
    const answers = await inquirer.prompt(promptOption);
    setConfig('analysis', answers.analysis);
  }
  if (program.args.length > 0) {
    const val = program.args[0];
    if (val) {
      setConfig('analysis', val);
      logger.success('Setup succeeded');
    }
  }
})().catch(err => {
  throw new CommandError(err.message);
});
