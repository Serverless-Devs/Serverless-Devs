import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '../../../../utils';
import Init from './init';

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
  const command = program.command('init');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇 line31-37
    .summary(`${emoji(chalk.bold('+'))} init`)
    .option('--name <name>', 'name')
    .option('--project <project>', 'project')
    .option('--description <description>', 'description')
    .option('--type <type>', 'type')
    .option('--region <region>', 'region')
    .option('--role <role>', 'role')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Init({ ...options, ...program.optsWithGlobals() }).start();
    });
};
