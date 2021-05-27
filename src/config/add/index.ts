/** @format */

import program from 'commander';
import { setCredential, setKnownCredential } from '@serverless-devs/core';
import { CommandError } from '../../error';

const description = `You can add an account

    Example:
        $ s config add
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ******
        $ s config add --AccessKey ****** --SecretKey ******
  
    Configuration parameters for cloud vendors:
        alibaba: AccountID, AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

🧭 How to get the key: https://github.com/Serverless-Devs/docs/tree/master/zh/others/provider-config`;

program
  .name('s config add')
  .usage('[commands] [name]')
  .option('--AccountID [AccountID]', 'AccountID of key information')
  .option('--AccessKeyID [AccessKeyID]', 'AccessKeyID of key information')
  .option('--AccessKeySecret [AccessKeySecret]', 'AccessKeySecret of key information')
  .option('--SecretAccessKey [SecretAccessKey]', 'SecretAccessKey of key information')
  .option('--AccessKey [AccessKey]', 'AccessKey of key information')
  .option('--SecretKey [SecretKey]', 'SecretKey of key information')
  .option('--SecretID [SecretID]', 'SecretID of key information')
  .option('--PrivateKeyData [PrivateKeyData]', 'PrivateKeyData of key information')
  .option('-kl , --keyList [keyList]', 'Keys of key information, like: -kl key1,key2,key3')
  .option('-il , --infoList [infoList]', 'Values of key information, like: -kl info1,info2,info3')
  .option('-a , --aliasName [name]', 'Key pair alias, if the alias is not set, use default instead')

  .helpOption('-h, --help', 'Display help for command')
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
      throw new CommandError('Please make sure -kl/--keyList is as long as -il/--infoList');
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
