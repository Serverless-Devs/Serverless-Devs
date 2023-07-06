import { Command } from 'commander';
import { underline } from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';

const description = `Publish Serverless Registry.

Example:
  $ s registry publish
   
${emoji('📖')} Document: ${underline('https://serverless.help/s/registry#publish')}`;

export default (program: Command) => {
  program
    .command('publish')
    .description(description)
    .summary(`${emoji('✅')} Public Serverless Package to Serverless Regsitry`)
    .usage('[options]')
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      const registry = new Registry({});
      await registry.publish();
    });
};
