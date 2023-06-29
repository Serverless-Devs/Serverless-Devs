import os from 'os';
import path from 'path';
import { Command } from 'commander';
import { getRootHome, setGlobalConfig } from '@serverless-devs/utils';
import inquirer from 'inquirer';
import { underline } from 'chalk';
import { emoji } from '../../../utils';
import { HumanError } from '../../../error';
import logger from '../../../logger';

const description = `Set workspace path. Switching workspaces may make previously cached components and configured key information unavailable.

  Example:
    $ s set workspace
    $ s set workspace ~/.s

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

const promptOption = [
  {
    type: 'input',
    name: 'value',
    message: 'Please input an absolute path:',
    validate(input) {
      const fPath = input.trim().replace(/~/, os.homedir());
      return path.isAbsolute(fPath) ? true : 'You must provide an absolute path.';
    },
  },
];

export = (program: Command) => {
  program
    .command('workspace', { hidden: true })
    .usage('[options]')
    .description(description)
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      let uri: string = process.argv[4];

      if (!uri) {
        const msg = `\n${emoji('📝')} Current workspace path: ${getRootHome()}\n\n${emoji(
          '🙊',
        )} Switching workspaces may make previously cached components and configured key information unavailable.\n`;
        logger.write(msg);

        const answers = await inquirer.prompt(promptOption);
        uri = answers.value;
      } else if (!path.isAbsolute(uri)) {
        throw new HumanError({
          errorMessage: 'You must provide an absolute path.',
          tips: `Please check if the path is absolute, documents: ${underline(
            'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/set.md',
          )}`,
        });
      }

      setGlobalConfig('workspace', uri);
    });
};
