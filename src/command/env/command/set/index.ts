import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

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

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('set');
  command
    .usage('[options]')
    .description(description)
    .summary(`${emoji(chalk.bold('+'))} set`)
    .requiredOption('--component <name>', 'Specify the component name')
    .helpOption('-h, --help', 'Displsay help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
