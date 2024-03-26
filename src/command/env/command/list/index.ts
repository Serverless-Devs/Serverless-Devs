import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

const description = `Get env list.

Supported vendors: Alibaba Cloud

    Example:
        $ s env list

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/env')}`;

export default (program: Command) => {
  const command = program.command('list');
  command
    .usage('[options]')
    .description(description)
    .summary(`View the list of existing environments`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
