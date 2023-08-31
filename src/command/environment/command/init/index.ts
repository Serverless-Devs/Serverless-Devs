import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '../../../../utils';
import Init from './init';

// TODO: text
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
    .summary(`${emoji(chalk.bold('+'))} Add an account`)
    .option('--name <name>', 'AccountID of key information')
    .option('--describation <describation>', 'AccessKeyID of key information')
    .option('--type <type>', 'AccessKeySecret of key information')
    .option('--region <region>', 'SecurityToken of key information')
    .option('--role <role>', 'SecretAccessKey of key information')
    .option('--props <props>', 'AccessKey of key information')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await new Init({ ...options, ...program.optsWithGlobals() }).start();
    });
};
