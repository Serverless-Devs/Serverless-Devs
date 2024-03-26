import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '@/utils';
import logger from '@/logger';

const description = `Publish Serverless Registry.

Example:
  $ s registry publish
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/registry-publish')}`;

export default (program: Command) => {
  program
    .command('publish')
    .description(description)
    .summary(`Public Serverless Package to Serverless Registry`)
    .usage('[options]')
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      const registry = new Registry({ logger });
      await registry.publish();
    });
};
