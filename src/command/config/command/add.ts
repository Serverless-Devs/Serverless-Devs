import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import { handleSecret } from '../utils';
import logger from '@/logger';

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

${emoji('🧭')} How to get the key: ${chalk.underline('https://serverless.help/t/s/provider_config')}`;

export default (program: Command) => {
  const command = program.command('add');

  command
    .usage('[options]')
    .description(description)
    .summary(`Add an account`)
    .option('--AccountID <AccountID>', 'AccountID of key information')
    .option('--AccessKeyID <AccessKeyID>', 'AccessKeyID of key information')
    .option('--AccessKeySecret <AccessKeySecret>', 'AccessKeySecret of key information')
    .option('--SecurityToken <SecurityToken>', 'SecurityToken of key information')
    .option('--SecretAccessKey <SecretAccessKey>', 'SecretAccessKey of key information')
    .option('--AccessKey <AccessKey>', 'AccessKey of key information')
    .option('--SecretKey <SecretKey>', 'SecretKey of key information')
    .option('--SecretID <SecretID>', 'SecretID of key information')
    .option('--PrivateKeyData <PrivateKeyData>', 'PrivateKeyData of key information')
    .option('--kl, --keyList <keyList>', 'Keys of key information, like: --kl key1,key2,key3')
    .option('--il, --infoList <infoList>', 'Values of key information, like: --il info1,info2,info3')
    .option('-f, --force', 'Mandatory overwrite key information')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const credential = new Credential({ logger });
      const result = await credential.set({ ...options, ...program.optsWithGlobals() });
      if (result) {
        logger.output({
          Alias: result.access,
          Credential: handleSecret(result.credential),
        });
      }
    });
};
