import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '@/utils';
import logger from '@/logger';

const description = `Delete application version.

Example:
  $ s registry delete --name fc --version-id 1.0.1
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/registry-delete')}`;

export default (program: Command) => {
  program
    .command('delete')
    .usage('[options]')
    .description(description)
    .summary(`Delete specific package`)
    .option('--name <name>', 'Serverless Package name')
    .option('--version-id <version-id>', 'Serverless Package version')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { name, versionId } = option;
      const registry = new Registry({ logger });
      await registry.remove(name, versionId);
    });
};
