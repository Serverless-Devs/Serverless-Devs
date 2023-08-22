import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `View the components published by the current login to the Serverless Registry account.

Example:
  $ s registry list
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/s/registry#list')}`;

export default (program: Command) => {
  program
    .command('list')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('🐵')} List the packages you have published`)
    .option('--category <category>', 'category ID')
    .option('--tag <tag>', 'Tag ID')
    .option('--search <search>', 'Search keyword')
    .option('--page <number>', 'Page number', '1')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const registry = new Registry({ logger });
      const result = await registry.list(options);
      logger.output(result);
    });
};
