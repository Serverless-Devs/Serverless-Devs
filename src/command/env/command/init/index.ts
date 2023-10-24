import { Command, Option } from 'commander';
import chalk from 'chalk';
import { emoji, isJson } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --infoList value1,value2,value3

    Configuration parameters template for vendors:
        alibaba: AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

${emoji('🧭')} How to get the key: ${chalk.underline('https://github.com/Serverless-Devs/docs/tree/master/zh/others/provider-config')}`;

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
  'ap-south-1'
];

export default (program: Command) => {
  const command = program.command('init');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇 line31-37
    .summary(`${emoji(chalk.bold('+'))} init`)
    .option('--project <project>', 'project')
    .option('--name <name>', 'name')
    .option('--description <description>', 'description')
    .addOption(new Option('--type <type>', 'type').choices(['testing', 'staging', 'production']))
    .addOption(new Option('--region <region>', 'region').choices(regions))
    .option('--role <role>', 'role')
    .option('--overlays <jsonString>', 'The json string of overlays', v => isJson(v, '--overlays'))
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
