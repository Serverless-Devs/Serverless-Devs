import { Command, Option } from 'commander';
import chalk from 'chalk';
import { emoji, isJson } from '@/utils';
import Action from './action';

const description = `Initialize env.

    Example:
        $ s env init --name test --project demo --description 'This is a test environment' --type testing

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/env')}`;

export default (program: Command) => {
  const command = program.command('init');
  command
    .usage('[options]')
    .description(description)
    .summary(`Initialize a new environment`)
    .option('--project <project>', 'Specify the project of the environment')
    .option('-n, --name <name>', 'Env name')
    .option('--description <description>', 'Specify the description of the environment')
    .addOption(
      new Option('--type <type>', 'Specify the type of the environment, which must be one of testing, staging, and production. The default is testing').choices([
        'testing',
        'staging',
        'production',
      ]),
    )
    .option('--overlays <jsonString>', 'Declare the differentiated configuration used in the environment, which is used to overwrite s.yaml during deployment', v =>
      isJson(v, '--overlays'),
    )
    .option('--infra-stack-name <infraStackName>', 'Specify the infra stack name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
