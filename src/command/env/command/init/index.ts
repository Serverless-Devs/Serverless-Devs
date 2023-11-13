import { Command, Option } from 'commander';
import chalk from 'chalk';
import { emoji, isJson } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `Initialize new environment.

    Example:
        $ s env init --name test --project demo --description 'This is a test environment' --type testing --region cn-hangzhou --role xxx

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export const regions = [
  'cn-beijing',
  'cn-hangzhou',
  'cn-shanghai',
  'cn-qingdao',
  'cn-zhangjiakou',
  'cn-huhehaote',
  'cn-shenzhen',
  'cn-chengdu',
  'cn-hongkong',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-southeast-3',
  'ap-southeast-5',
  'ap-northeast-1',
  'eu-central-1',
  'eu-west-1',
  'us-west-1',
  'us-east-1',
  'ap-south-1',
];

export default (program: Command) => {
  const command = program.command('init');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇 line31-37
    .summary(`Initialize new environment`)
    .option('--project <project>', 'Specify the project of the environment')
    .option('--name <name>', 'Specify the environment name')
    .option('--description <description>', 'Specify the description of the environment')
    .addOption(new Option('--type <type>', 'Specify the type of the environment, which must be one of testing, staging, and production. The default is testing').choices(['testing', 'staging', 'production']))
    .addOption(new Option('--region <region>', 'Specify the region of the environment').choices(regions))
    .option('--role <role>', 'Specify the role that the environment uses when accessing the user\'s cloud service')
    .option('--overlays <jsonString>', 'Declare the differentiated configuration used in the environment, which is used to overwrite s.yaml during deployment', v => isJson(v, '--overlays'))
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
