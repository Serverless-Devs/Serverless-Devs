import { Command, Option } from 'commander';
import chalk from 'chalk';
import { emoji, isJson } from '@/utils';
import Action from './action';

const description = `Update environment properties.

    Example:
        $ s env update --name test --description 'This is a test environment' --type testing --role xxx

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('update');
  command
    .usage('[options]')
    .description(description)
    .summary(`Update environment properties`)
    .requiredOption('--name <name>', 'Specify the environment name')
    .option('--description <description>', 'Specify the description of the environment')
    .addOption(
      new Option('--type <type>', 'Specify the type of the environment, which must be one of testing, staging, and production. The default is testing').choices([
        'testing',
        'staging',
        'production',
      ]),
    )
    .option('--overlays <jsonString>', 'Declare the differentiated configuration used in the environment, which is used to overwrite s.yaml during deployment.', v =>
      isJson(v, '--overlays'),
    )
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
