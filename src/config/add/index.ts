import * as program from 'commander';
import { AddManager } from './add-manager';
import i18n from '../../utils/i18n';
import { getInputData } from '../common/common';
import {CommandError} from '../../error/command-error';

const description = i18n.__('s config add help');

program
  .name('s config add')
  .usage('[options] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .option(
    '-p, --provider [name]',
    i18n.__(
      'The cloud service provider. [alibaba/aws/azure/baidu/google/huawei/tencent]'
    )
  )
  .option(
    '-a, --alias-name [name]',
    i18n.__('Key pair alias, if the alias is not set, use default instead')
  )
  .option('--AccountID [name]', i18n.__('Configure the AccountID'))
  .option('--AccessKeyID [name]', i18n.__('Configure the AccessKeyID'))
  .option('--AccessKeySecret [name]', i18n.__('Configure the AccessKeySecret'))
  .option('--SecretID [name]', i18n.__('Configure the SecretID'))
  .option('--SecretKey [name]', i18n.__('Configure the SecretKey'))
  .option('--SecretAccessKey [name]', i18n.__('Configure the SecretAccessKey'))
  .option('--KeyVaultName [name]', i18n.__('Configure the KeyVaultName'))
  .option('--TENANT_ID [name]', i18n.__('Configure the TENANT_ID'))
  .option('--CLIENT_ID [name]', i18n.__('Configure the CLIENT_ID'))
  .option('--CLIENT_SECRET [name]', i18n.__('Configure the CLIENT_SECRET'))
  .option('--PrivateKeyData [name]', i18n.__('Configure the PrivateKeyData'))
  .description(description)
  .parse(process.argv);

(async () => {
  await new AddManager().init(
    {
      Provider: program.provider,
      AliasName: program.aliasName
    },
    getInputData(program)
  );
})().catch((err) => {
  throw new CommandError(err.message);
});
