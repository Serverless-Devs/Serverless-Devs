import { Command } from '@serverless-devs/commander';
import { CommandError, HumanError } from '../../error';
import logger from '../../utils/logger';
import core from '../../utils/core';
import { emoji } from '../../utils/common';
const { inquirer, getRootHome, colors, setConfig, formatWorkspacePath } = core;
import path from 'path';

const description = `Set workspace path. Switching workspaces may make previously cached components and configured key information unavailable.

    Example:
        $ s set workspace
        $ s set workspace ~/.s`;

const promptOption = [
  {
    type: 'input',
    name: 'value',
    message: 'Please input an absolute path:',
    validate(input) {
      const fpath = formatWorkspacePath(input);
      return path.isAbsolute(fpath) ? true : 'You must provide an absolute path.';
    },
  },
];

function run(program: Command) {
  const command = program
    .command('workspace')
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
    const { _: rawData, help } = core.getGlobalArgs(process.argv.slice(2));
    console.log(rawData);

    help && command.help();
    if (rawData.length === 2) {
      const msg = `\n${emoji('📝')} Current workspace path: ${getRootHome()}\n\n${emoji(
        '🙊',
      )} Switching workspaces may make previously cached components and configured key information unavailable.\n`;
      logger.log(msg);
      const answers = await inquirer.prompt(promptOption);
      setConfig('workspace', answers.value);
    }
    if (rawData.length > 2) {
      const val = rawData[2];
      if (path.isAbsolute(val)) {
        setConfig('workspace', val);
        logger.log('Setup succeeded', 'green');
      } else {
        new HumanError({
          errorMessage: 'You must provide an absolute path.',
          tips: `Please check if the path is absolute, documents: ${colors.underline(
            'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/set.md',
          )}`,
        });
      }
    }
  };
}

export = run;
