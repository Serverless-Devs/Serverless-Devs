/** @format */

const path = require('path');
const os = require('os');
const inquirer = require('inquirer');
const fs = require('fs');
const yaml = require('js-yaml');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as program from 'commander';
import i18n from '../../utils/i18n';
import logger from '../../utils/logger';
import {ConfigError} from '../../error/config-error';
import {
  providerArray,
  providerObject,
  providerCollection,
  providerAccessFormat,
  checkProviderList,
} from '../common/common';

function isEqualArray(rightFormat: string[], inputFormat: string[]): boolean {
  if (!(rightFormat || inputFormat)) {
    return false;
  }
  if (rightFormat.length !== inputFormat.length) {
    return false;
  }
  rightFormat.forEach(item => {
    if (!inputFormat.includes(item)) {
      return false;
    }
  });
  return true;
}

interface ConfigMap {
  [key: string]: any;
}

export class AddManager {
  globalFilePath: string;
  inputFullData: ConfigMap; // 用户输入的inputProviderAlias为键 与 inputSecretID 为值 组成的对象
  protected inputProviderAlias = '';
  protected inputSecretID: any;
  protected provider: string;
  aliasName: string;
  protected promptList: any[];
  protected isRightFormat = true;
  protected context: string[];
  constructor() {
    this.globalFilePath = path.join(os.homedir(), '.s/access.yaml');
    this.inputFullData = {};
    this.context = program.args;
  }

  async init(inputProviderAndAlisName: any, inputSecretCheck: any) {
    if (program.args.length > 0) {
      throw new ConfigError('Configuration failed');
    } else {
      if (inputProviderAndAlisName.Provider) {
        this.provider = String(inputProviderAndAlisName.Provider).toLocaleLowerCase();
        this.aliasName = String(inputProviderAndAlisName.AliasName || 'default').toLocaleLowerCase();
        if (providerArray.indexOf(this.provider) === -1) {
          throw new ConfigError(
            'The cloud vendor[{{provider}}] was not found. [alibaba/aws/azure/baidu/google/huawei/tencent]',
            {provider: this.provider},
          );
        }

        this.inputSecretID = {};
        const inputSecretCheckKeys: string[] = Object.keys(inputSecretCheck); // 用户输入的秘钥对象的key

        //正确秘钥形式
        const providerAccessFormatSecret: string[] = providerAccessFormat[this.provider];
        //检查用户输入的秘钥的格式与对应云厂商的格式是否相同
        if (isEqualArray(providerAccessFormatSecret, inputSecretCheckKeys)) {
          for (const item of inputSecretCheckKeys) {
            this.inputSecretID[item] = inputSecretCheck[item];
          }
        } else {
          throw new ConfigError('Please Input Right Secret Format: [{{providerAccessFormatSecret}}]', {
            providerAccessFormatSecret,
          });
        }
      } else {
        await this.inputLengthZero();
      }
    }

    await this.checkInputSecretID();
    this.inputProviderAlias = `${this.provider}.${this.aliasName || 'default'}`;
    this.inputFullData[this.inputProviderAlias] = this.inputSecretID;
    this.writeData(this.globalFilePath, this.inputFullData);
  }

  output() {
    logger.log('');
    logger.info(i18n.__('  Provider: {{provider}}', {provider: `${providerObject[this.provider]} (${this.provider})`}));
    if (this.aliasName) {
      logger.info(i18n.__('    Alias: {{alias}}', {alias: this.aliasName}));
    }
    // eslint-disable-next-line guard-for-in
    for (const item in this.inputSecretID) {
      logger.info(`    ${item}: ${this.inputSecretID[item]}`);
    }
    logger.log('');
  }

  // 用户输入参数为0的时候
  async inputLengthZero(provider: any = undefined) {
    if (!provider) {
      {
        await inquirer.prompt(checkProviderList).then((answers: any) => {
          this.provider = answers.provider;
        });
      }
    } else {
      this.provider = provider.toLocaleLowerCase();
    }

    if (!providerArray.includes(this.provider)) {
      throw new ConfigError(
        'The cloud vendor[{{provider}}] was not found. [alibaba/aws/azure/baidu/google/huawei/tencent]',
        {provider: this.provider},
      );
    }

    try {
      Object.keys(providerCollection).forEach(item => {
        if (item === this.provider) {
          this.promptList = providerCollection[item];
        }
      });
      this.promptList.push({
        type: 'input',
        message: i18n.__('Please create alias for key pair. If not, please enter to skip'),
        name: 'aliasName',
        default: 'default', // 默认值
      });
    } catch (err) {
      throw new ConfigError(err.message);
    }
    await inquirer.prompt(this.promptList).then((answers: any) => {
      this.inputSecretID = answers;
    });

    Object.keys(this.inputSecretID).forEach(item => {
      if (item === 'aliasName') {
        this.aliasName = this.inputSecretID[item];
        delete this.inputSecretID[item];
      }
    });
    this.inputProviderAlias = this.provider + '.' + this.aliasName || 'default';
    return this.inputSecretID;
  }

  // 检查用户输入的输入的inputSecretID是否为空值
  async checkInputSecretID() {
    // eslint-disable-next-line guard-for-in
    for (const item in this.inputSecretID) {
      const isTrue: boolean = String(typeof this.inputSecretID[item]) === 'string';
      {
        if (!this.inputSecretID[item] || !isTrue) {
          throw new ConfigError('The Provider[{{provider}}]: key[{{key}}] is required.', {
            provider: providerObject[this.provider],
            key: item,
          });
        }
      }
    }
  }

  async writeFileWay(filePath: string, text: ConfigMap) {
    this.output();
    try {
      await fs.writeFileSync(filePath, yaml.dump(text));
    } catch (err) {
      throw new ConfigError('Configuration failed');
    }
  }

  writeData(filePath: string, text: ConfigMap) {
    const isExists: boolean = fs.existsSync(filePath);
    // 当前文件不存在
    if (!isExists) {
      this.writeFileWay(filePath, text);
    } else {
      const userInformation: any = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
      // 文件存在，且不为空；
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (userInformation != null) {
        const userProviderAlias: string[] = Object.keys(userInformation);
        const isExistProviderAlias: boolean = userProviderAlias.includes(this.inputProviderAlias);
        //全局配置是否含有用户输入的provider.alias
        if (isExistProviderAlias) {
          throw new ConfigError(
            'Provider + Alias already exists. You can set a different alias or modify it through: {{input}}',
            {input: `s config update -p ${this.provider} -a ${this.aliasName || 'default'}`},
          );
        } else {
          try {
            fs.appendFileSync(filePath, yaml.dump(text));
            this.output();
            logger.success('Configuration successful');
          } catch (err) {
            throw new ConfigError('Configuration failed');
          }
        }
      } else {
        this.writeFileWay(filePath, text);
      }
    }
  }
}
