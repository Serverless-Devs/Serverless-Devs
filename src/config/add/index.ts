import program from '@serverless-devs/commander';
import { CommandError } from '../../error';
import { emoji } from '../../utils/common';
import core from '../../utils/core';
const { setCredential, setKnownCredential, colors, getAccountId, getCommand, chalk } = core;
import { HumanError, HumanWarning } from '../../error';

const description = `You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --valueList value1,value2,value3

    Configuration parameters template for vendors:
        alibaba: AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

${emoji('🧭')} How to get the key: ${colors.underline(
  'https://github.com/Serverless-Devs/docs/tree/master/zh/others/provider-config',
)}`;

program
  .name('s config add')
  .usage('[commands] [name]')
  .option('--AccountID <AccountID>', 'AccountID of key information')
  .option('--AccessKeyID <AccessKeyID>', 'AccessKeyID of key information')
  .option('--AccessKeySecret <AccessKeySecret>', 'AccessKeySecret of key information')
  .option('--SecurityToken <SecurityToken>', 'SecurityToken of key information')
  .option('--SecretAccessKey <SecretAccessKey>', 'SecretAccessKey of key information')
  .option('--AccessKey <AccessKey>', 'AccessKey of key information')
  .option('--SecretKey <SecretKey>', 'SecretKey of key information')
  .option('--SecretID <SecretID>', 'SecretID of key information')
  .option('--PrivateKeyData <PrivateKeyData>', 'PrivateKeyData of key information')
  .option('-kl , --keyList <keyList>', 'Keys of key information, like: -kl key1,key2,key3')
  .option('-il , --infoList <infoList>', 'Values of key information, like: -il info1,info2,info3')
  .option('-a , --aliasName [name]', 'Key pair alias, if the alias is not set, use default instead')
  .option('-f', 'Mandatory overwrite key information')

  .helpOption('-h, --help', 'Display help for command')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  const serverless_devs_temp_argv = JSON.parse(process.env['serverless_devs_temp_argv']);
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
    aliasName = process.env['serverless_devs_temp_access'],
    SecurityToken,
    f,
  } = program;

  if (serverless_devs_temp_argv.length === 4) {
    return await setCredential();
  }

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
  const akRegx = /^[A-Za-z0-9-]+$/;

  if (AccessKeyID) {
    if (akRegx.test(AccessKeyID)) {
      keyInformation['AccessKeyID'] = AccessKeyID;
    } else {
      new HumanError({
        errorMessage: 'Your AccessKeyID id is not correct.',
        tips: `Please check if your AccessKeyID is correct. documents: ${colors.underline(
          'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/default_provider_config/alibabacloud.md',
        )}`,
      });
      process.exit(1);
    }
  }
  if (AccessKeySecret) {
    if (akRegx.test(AccessKeySecret)) {
      keyInformation['AccessKeySecret'] = AccessKeySecret;
    } else {
      new HumanError({
        errorMessage: 'Your AccessKeySecret id is not correct.',
        tips: `Please check if your AccessKeySecret is correct. documents: ${colors.underline(
          'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/default_provider_config/alibabacloud.md',
        )}`,
      });
      process.exit(1);
    }
  }

  // 同时存在ak/sk 认为是阿里云密钥
  if (AccessKeyID && AccessKeySecret && !f) {
    try {
      const data = await getAccountId({ AccessKeyID, AccessKeySecret });
      keyInformation['AccountID'] = data.AccountId;
    } catch (error) {
      new HumanWarning({
        warningMessage: 'You may be configuring an incorrect Alibaba Cloud SecretKey.',
        tips: `Please check the accuracy of Alibaba Cloud SecretKey. If your configuration is not an Alibaba Cloud SecretKey, you can force writing by adding the -f parameter. Or execute ${chalk.yellow(
          `${getCommand()} -f`,
        )}`,
      });
      process.exit(1);
    }
  }
  if (SecurityToken) {
    keyInformation['SecurityToken'] = SecurityToken;
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
  }
})().catch(err => {
  if (err.message === 'alibaba') {
    new HumanError({
      errorMessage: 'You are configuring an incorrect Alibaba Cloud SecretKey.',
      tips: `Please check the accuracy of Alibaba Cloud SecretKey. documents: ${colors.underline(
        'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/default_provider_config/alibabacloud.md',
      )}`,
    });
    process.exit(1);
  } else {
    throw new CommandError(err.message);
  }
});
