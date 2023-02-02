import { Command } from '@serverless-devs/commander';
import { CommandError } from '../../error';
import { emoji, getParams } from '../../utils';
import core from '../../utils/core';
const { setCredential, setKnownCredential, colors, getAccountId, getCommand, chalk } = core;
import { HandleError, HumanWarning } from '../../error';

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

function run(program: Command) {
  const command = program
    .command('add')
    .usage('[options]')
    .option('--AccountID <AccountID>', 'AccountID of key information')
    .option('--AccessKeyID <AccessKeyID>', 'AccessKeyID of key information')
    .option('--AccessKeySecret <AccessKeySecret>', 'AccessKeySecret of key information')
    .option('--SecurityToken <SecurityToken>', 'SecurityToken of key information')
    .option('--SecretAccessKey <SecretAccessKey>', 'SecretAccessKey of key information')
    .option('--AccessKey <AccessKey>', 'AccessKey of key information')
    .option('--SecretKey <SecretKey>', 'SecretKey of key information')
    .option('--SecretID <SecretID>', 'SecretID of key information')
    .option('--PrivateKeyData <PrivateKeyData>', 'PrivateKeyData of key information')
    .option('-kl, --keyList <keyList>', 'Keys of key information, like: -kl key1,key2,key3')
    .option('-il, --infoList <infoList>', 'Values of key information, like: -il info1,info2,info3')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .option('-f', 'Mandatory overwrite key information')
    .helpOption('-h, --help', 'Display help for command')
    .allowUnknownOption()
    .description(description)
    .addHelpCommand(false)
    .action(async options => {
      try {
        await doAction(options);
      } catch (error) {
        await HandleError(error);
      }
    });

  const doAction = async options => {
    const argvData = core.getGlobalArgs(process.argv.slice(2));
    const {
      AccountID,
      AccessKeyID,
      AccessKeySecret,
      SecretAccessKey,
      AccessKey,
      SecretKey,
      PrivateKeyData,
      SecretID,
      keyList = getParams('-kl'),
      infoList = getParams('-il'),
      SecurityToken,
      f,
      access,
      aliasName,
      help,
    } = argvData;
    help && command.help();

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

    if (AccessKeyID) {
      keyInformation['AccessKeyID'] = AccessKeyID;
    }
    if (AccessKeySecret) {
      keyInformation['AccessKeySecret'] = AccessKeySecret;
    }
    if (SecurityToken) {
      keyInformation['SecurityToken'] = SecurityToken;
    }
    // 同时存在ak/sk 认为是阿里云密钥
    if (AccessKeyID && AccessKeySecret && !AccountID) {
      try {
        const data = await getAccountId({ AccessKeyID, AccessKeySecret, SecurityToken });
        keyInformation['AccountID'] = data.AccountId;
      } catch (error) {
        if (!f) {
          new HumanWarning({
            warningMessage: 'You may be configuring an incorrect Alibaba Cloud SecretKey.',
            tips: `Please check the accuracy of Alibaba Cloud SecretKey. If your configuration is not an Alibaba Cloud SecretKey, you can force writing by adding the -f parameter. Or execute ${chalk.yellow(
              `${getCommand()} -f`,
            )}`,
          });
          process.exit(1);
        }
      }
    }
    if (AccountID) {
      keyInformation['AccountID'] = String(AccountID);
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
      return await setKnownCredential(keyInformation, access || aliasName);
    }
    await setCredential();
  };
}

export = run;
