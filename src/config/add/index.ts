/** @format */

import program from 'commander';
import { setCredential, setKnownCredential } from '@serverless-devs/core';
// import { setCredential, setKnownCredential } from '/Users/jiangyu/Desktop/core-master/packages/core/lib';
import { CommandError } from '../../error';
import { i18n } from '../../utils';

const intro = i18n.__('You can add an account');
const example = [
  i18n.__('Example:'),
  '\t$ s config add',
  '\t$ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ******',
  '\t$ s config add --AccessKey ****** --SecretKey ******',
  `    ${i18n.__('Configuration parameters for cloud vendors:')}`,
  `\t${i18n.__('alibaba: AccountID, AccessKeyID, AccessKeySecret')}`,
  `\t${i18n.__('aws: AccessKeyID, SecretAccessKey')}`,
  `\t${i18n.__('baidu: AccessKeyID, SecretAccessKey')}`,
  `\t${i18n.__('huawei: AccessKey, SecretKey')}`,
  `\t${i18n.__('google: PrivateKeyData')}`,
  `\t${i18n.__('tencent: AccountID, SecretID, SecretKey')}`,
].join('\n');
const description = `${intro}\n\n    ${example}\n`; // i18n.__('You can add an account');

program
  .name('s config add')
  .usage('[commands] [name]')
  .option('--AccountID [AccountID]', i18n.__('AccountID of key information'))
  .option('--AccessKeyID [AccessKeyID]', i18n.__('AccessKeyID of key information'))
  .option('--AccessKeySecret [AccessKeySecret]', i18n.__('AccessKeySecret of key information'))
  .option('--SecretAccessKey [SecretAccessKey]', i18n.__('SecretAccessKey of key information'))
  .option('--AccessKey [AccessKey]', i18n.__('AccessKey of key information'))
  .option('--SecretKey [SecretKey]', i18n.__('SecretKey of key information'))
  .option('--SecretID [SecretID]', i18n.__('SecretID of key information'))
  .option('--PrivateKeyData [PrivateKeyData]', i18n.__('PrivateKeyData of key information'))
  .option('-kl , --keyList [keyList]', i18n.__('Keys of key information, like: -kl key1,key2,key3'))
  .option('-il , --infoList [infoList]', i18n.__('Values of key information, like: -kl info1,info2,info3'))
  .option('-a , --aliasName [name]', i18n.__('Key pair alias, if the alias is not set, use default instead'))

  .helpOption('-h, --help', i18n.__('Display help for command'))
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  const {
    AccountID,
    AccessKeyID,
    AccessKeySecret,
    SecretAccessKey,
    AccessKey,
    SecretKey,
    PrivateKeyData,
    SecretID,
    keyList,
    infoList,
    aliasName,
  } = program;
  const keyInformation = {};
  if (keyList && infoList) {
    const infoKeyList = keyList.split(',');
    const infoValueList = infoList.split(',');
    if (infoKeyList.length === infoValueList.length) {
      for (let i = 0; i < infoKeyList.length; i++) {
        keyInformation[infoKeyList[i]] = infoValueList[i];
      }
    } else {
      throw new CommandError(i18n.__('Please make sure -kl/--keyList is as long as -il/--infoList'));
    }
  }
  if (AccountID) {
    keyInformation['AccountID'] = AccountID;
  }
  if (AccessKeyID) {
    keyInformation['AccessKeyID'] = AccessKeyID;
  }
  if (AccessKeySecret) {
    keyInformation['AccessKeySecret'] = AccessKeySecret;
  }
  if (SecretAccessKey) {
    keyInformation['SecretAccessKey'] = SecretAccessKey;
  }
  if (AccessKey) {
    keyInformation['AccessKey'] = AccessKey;
  }
  if (SecretKey) {
    keyInformation['SecretKey'] = SecretKey;
  }
  if (SecretKey) {
    keyInformation['SecretKey'] = SecretKey;
  }
  if (SecretID) {
    keyInformation['SecretID'] = SecretID;
  }
  if (PrivateKeyData) {
    keyInformation['PrivateKeyData'] = PrivateKeyData;
  }
  if (Object.keys(keyInformation).length > 0) {
    setKnownCredential(keyInformation, aliasName);
  } else {
    setCredential();
  }
})().catch(err => {
  throw new CommandError(err.message);
});
