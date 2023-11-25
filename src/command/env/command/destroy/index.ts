import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

const description = `Destroy an environment.

    Example:
        $ s env destroy --name test-env

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('destroy');
  command
    .usage('[options]')
    .description(description)
    .summary(`Destroy an environment.`)
    .requiredOption('--name <name>', 'Specify the environment name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
