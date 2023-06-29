import { Command } from 'commander';
import { underline } from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `View application details.

Example:
  $ s registry detail --name fc
   
${emoji('📖')} Document: ${underline('https://serverless.help/s/registry#detail')}`;

export default (program: Command) => {
  program
    .command('detail')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('🌱')} View specific package details`)
    .option('--name <name>', 'Serverless Package name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { name } = option;
      const registry = new Registry({});
      const result = await registry.detail(name);
      logger.output(result);
    });
};
