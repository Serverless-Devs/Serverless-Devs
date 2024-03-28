import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '@/utils';
import logger from '@/logger';
import { get, set, pick } from 'lodash';

const description = `View the components published by the current login to the Serverless Registry account.

Example:
  $ s registry list
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/registry-list')}`;

const wantedInfoKeys = ['type', 'name', 'description', 'category', 'tags'];

function formatResult(result: Array<object>): Array<any> {
  const formattedResult = result.map(result => {
    const tmp = pick(result, wantedInfoKeys);
    set(tmp, 'category', get(tmp, 'category.name'));
    return tmp;
  });

  return formattedResult;
}

export default (program: Command) => {
  program
    .command('list')
    .usage('[options]')
    .description(description)
    .summary(`List the packages you have published`)
    .option('--category <category>', 'category ID')
    .option('--tag <tag>', 'Tag ID')
    .option('--search <search>', 'Search keyword')
    .option('--page <number>', 'Page number', '1')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const registry = new Registry({ logger });
      const result = await registry.list(options);
      const formattedResult = formatResult(result);
      logger.output(formattedResult);
    });
};
