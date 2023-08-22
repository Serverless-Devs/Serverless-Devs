import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `Delete application version.

Example:
  $ s registry delete --name fc@1.0.1 --type Component
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/s/registry#delete')}`;

export default (program: Command) => {
  program
    .command('delete')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('❌')} Delete specific package`)
    .option('--name <name>', 'Serverless Package name')
    .option('--version <version>', 'Serverless Package version')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { name, version } = option;
      const registry = new Registry({ logger });
      await registry.remove(name, version);
    });
};
