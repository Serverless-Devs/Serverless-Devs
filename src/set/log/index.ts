import { Command } from '@serverless-devs/commander';
import { CommandError } from '../../error';
import logger from '../../utils/logger';
import core from '../../utils/core';
import { emoji } from '../../utils/common';
const { inquirer, colors } = core;
import { setConfig, getConfig } from '../../utils/handler-set-config';

const description = `Set log action.

    Example:
        $ s set log
        $ s set log disable
        
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

const promptOption = [
  {
    type: 'list',
    name: 'log',
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

function run(program: Command) {
  const command = program
    .command('log')
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .description(description)
    .action(async () => {
      try {
        await doAction();
      } catch (error) {
        throw new CommandError(error.message);
      }
    });

  const doAction = async () => {
    const argv = process.argv.splice(2);
    const { help } = core.minimist(argv, { alias: { help: 'h' } });
    help && command.help();
    if (argv.length === 2) {
      logger.log(`\n${emoji('📝')} Current log action: ${getConfig('log', 'enable')}\n`);
      const answers = await inquirer.prompt(promptOption);
      setConfig('log', answers.log);
    }
    if (argv.length > 2) {
      const val = argv[2];
      if (val) {
        setConfig('log', val);
        logger.log('Setup succeeded', 'green');
      }
    }
  };
}

export = run;
