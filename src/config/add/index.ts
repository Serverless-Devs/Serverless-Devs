import program from 'commander';
import { setCredential } from '@serverless-devs/core';

import { CommandError } from '../../error';
import { i18n } from '../../utils';

const intro = i18n.__('You can add an account');
const example = [i18n.__('Example:'),
  '\t$ s config add',
  '\t$ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ******',
  '\t$ s config add --AccessKey ****** --SecretKey ******',
  `    ${i18n.__('Configuration parameters for cloud vendors:')}`,
  `\t${i18n.__('alibaba: AccountID, AccessKeyID, AccessKeySecret')}`,
  `\t${i18n.__('aws: AccessKeyID, SecretAccessKey')}`,
  `\t${i18n.__('baidu: AccessKeyID, SecretAccessKey')}`,
  `\t${i18n.__('huawei: AccessKey, SecretKey')}`,
  `\t${i18n.__('google: PrivateKeyData')}`,
  `\t${i18n.__('tencent: AccountID, SecretID, SecretKey')}`
].join('\n');
const description = `${intro}\n\n    ${example}\n`    // i18n.__('You can add an account');

program
  .name('s config add')
  .usage('[commands] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  setCredential();
})().catch(err => {
  throw new CommandError(err.message);
});
