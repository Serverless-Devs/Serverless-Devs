import { Command } from 'commander';
import { underline } from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `View the components published by the current login to the Serverless Registry account.

Example:
  $ s registry list
   
${emoji('📖')} Document: ${underline('https://serverless.help/s/registry#list')}`;

export = (program: Command) => {
  program
    .command('list', { hidden: true })
    .usage('[options]')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async () => {
      const registry = new Registry({});
      const result = await registry.list();
      logger.output(result);
    });
};
