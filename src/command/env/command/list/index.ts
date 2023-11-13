import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `List all the environments associated with the project.

    Example:
        $ s env list

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('list');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇
    .summary(`List all the environments associated with the project`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
