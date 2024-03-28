import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

const description = `Describe specified env.

Supported vendors: Alibaba Cloud

    Example:
        $ s env describe --name test-env

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/env')}`;

export default (program: Command) => {
  const command = program.command('describe');
  command
    .usage('[options]')
    .description(description)
    .summary(`Describe environmental information`)
    .requiredOption('-n, --name <name>', 'Env name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
