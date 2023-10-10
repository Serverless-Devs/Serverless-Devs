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

export default (program: Command) => {
  const command = program.command('update');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇 line31-37
    .summary(`${emoji(chalk.bold('+'))} update`)
    .requiredOption('--name <name>', 'name')
    .option('--description <description>', 'description')
    .addOption(new Option('--type <type>', 'type').choices(['testing', 'staging', 'production']))
    .requiredOption('--region <region>', 'region')
    .option('--role <role>', 'role')
    .option('--overlays <jsonString>', 'The json string of overlays', v => isJson(v, '--overlays'))
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
