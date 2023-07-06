import { Command } from 'commander';
import { underline } from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `View the components published by the current login to the Serverless Registry account.

Example:
  $ s registry list
   
${emoji('📖')} Document: ${underline('https://serverless.help/s/registry#list')}`;

export default (program: Command) => {
  program
    .command('list')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('🐵')} List the packages you have published`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      const registry = new Registry({});
      const result = await registry.list();
      logger.output(result);
    });
};
