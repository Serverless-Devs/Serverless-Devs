import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `Remove an environment.

    Example:
        $ s env remove --name test-env

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('remove');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇 line31-32
    .summary(`Remove an environment.`)
    .requiredOption('--name <name>', 'Specify the environment name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
