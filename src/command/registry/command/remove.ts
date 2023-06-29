import { Command } from 'commander';
import { underline } from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';

const description = `Delete application version.

Example:
  $ s registry delete --name fc@1.0.1 --type Component
   
${emoji('📖')} Document: ${underline('https://serverless.help/s/registry#delete')}`;

export default (program: Command) => {
  program
    .command('delete')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('❌')} Delete specific package`)
    .option('--name <name>', 'Serverless Package name. e.g.: fc@1.0.1')
    .option('--type <type>', 'Serverless Package type. value: Component, Application, Plugin')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { name, type = 'Component' } = option;
      const registry = new Registry({});
      await registry.remove(name, type);
    });
};
