import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

const description = `Show the information of a environment.

    Example:
        $ s env describe --name test-env

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('describe');
  command
    .usage('[options]')
    .description(description)
    .summary(`Show the information of a environment`)
    .requiredOption('--name <name>', 'Specify the environment name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
