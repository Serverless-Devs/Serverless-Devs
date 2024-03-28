import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

const description = `Set default env component.

    Example:
        $ s set env --component ServerlessDevsAdmin

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/set')}`;

export default (program: Command) => {
  const command = program.command('env');
  command
    .usage('[options]')
    .description(description)
    .summary(`Set the default env component`)
    .requiredOption('--component <name>', 'Specify the component name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
