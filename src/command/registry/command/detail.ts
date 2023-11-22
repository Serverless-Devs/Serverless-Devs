import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '@/utils';
import logger from '@/logger';

const description = `View application details.

Example:
  $ s registry detail --package-name fc3
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/registry-detail')}`;

export default (program: Command) => {
  program
    .command('detail')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('🌱')} View specific package details`)
    .option('--package-name <name>', 'Serverless Package name')
    .option('--page <number>', 'Page number', '1')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { packageName, page } = option;
      const registry = new Registry({ logger });
      const result = await registry.detail(packageName, page);
      logger.output(result);
    });
};
