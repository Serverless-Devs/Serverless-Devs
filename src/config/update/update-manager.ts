import {printn} from '../../utils/common';

const path = require('path');
const os = require('os');
const inquirer = require('inquirer');
const fs = require('fs');
const yaml = require('js-yaml');
import logger from '../../utils/logger';
import { ConfigUpdateError } from '../../error/config-update-error';
import { providerCollection, providerAccessFormat, providerObject } from '../common/common';
import i18n from '../../utils/i18n';

interface ConfigMap {[key: string]: any;}

export class UpdateManager {
  protected filePath: string;
  protected promptList: Array<any> = [];
  protected inputProviderAlias: string;
  protected oldSecretID: ConfigMap = {};
  protected inputSecretData: ConfigMap = {};
  protected userInformation: ConfigMap = {};
  protected context: Array<string>;
  protected provider: string;
  protected aliasName: string;
  constructor() {
    // 获得当前用户目录
    this.filePath = path.join(os.homedir(), '.s/access.yaml');
  }

  async updateManager(providerAlias: any, inputSecret: any) {
    this.userInformation = yaml.safeLoad( fs.readFileSync(this.filePath, 'utf8'));
    if (this.userInformation) {
      if (providerAlias['Provider'] && providerAlias['AliasName']) {
        this.provider = String(providerAlias['Provider']).toLocaleLowerCase();
        this.aliasName = String(providerAlias['AliasName']).toLocaleLowerCase();
        this.inputProviderAlias = `${this.provider}.${this.aliasName || 'default'}`;

        // 检查系统配置是否含有inputProviderAlias
        const hasProviderAlia: boolean = Object.keys(this.userInformation).includes(this.inputProviderAlias);
        if (hasProviderAlia) {
          if (Object.keys(inputSecret).length === 0) {
            await this.inputSecretZero(providerAlias);
          } else {
            await this.inputSecretNotZero(inputSecret);
          }
        } else {
          throw new ConfigUpdateError('The provider or alias information is not found. You can obtain the key information through: s config get -l');
        }
      }
    } else {
      throw new ConfigUpdateError('The configuration list is empty. You can add configuration through: s config add');
    }
  }
  async inputSecretZero(providerAlias: any) {
    try {
      Object.keys(providerCollection).forEach((item) => {
        if (item === this.provider) {
          this.promptList = providerCollection[item];
        }
      });
    } catch (err) {
      throw new ConfigUpdateError(err.message);
    }
    const tempAccess = Object.assign({}, this.userInformation[`${providerAlias['Provider']}.${providerAlias['AliasName'] || 'default'}`]);
    const hiddenMapping: ConfigMap = {};
    for (let i = 0;i < this.promptList.length;i++) {
      const tempName = this.promptList[i]['name'];
      const valueOfValueLength = tempAccess[tempName].length;
      const oldValue = tempAccess[tempName];
      tempAccess[tempName] = valueOfValueLength > 6 ? tempAccess[tempName].slice(0, 3) + printn(valueOfValueLength - 6, '*') + tempAccess[tempName].slice(valueOfValueLength - 3, valueOfValueLength) : tempAccess[tempName];
      hiddenMapping[tempAccess[tempName]] = oldValue;
      this.promptList[i]['default'] = tempAccess[tempName];
    }
    await inquirer.prompt(this.promptList).then((answers: any) => {
      this.inputSecretData = answers;
    });
    await this.userInputCheck(this.inputSecretData, hiddenMapping);
  }

  async inputSecretNotZero(inputSecret: any) {
    const hasProviderAlia: boolean = Object.keys(this.userInformation).includes(this.inputProviderAlias);
    if (hasProviderAlia) {
      await this.userInputCheck(inputSecret);
    }
  }

  // 校验用户输入的信息, 并更新用户信息
  async userInputCheck(inputSecret: any, hiddenMapping ?: any) {
    let providerAccessFormatSecret: Array<string> = providerAccessFormat[this.provider];
    this.oldSecretID = this.userInformation[this.inputProviderAlias];
    Object.keys(inputSecret).forEach((item) => {
      if (!providerAccessFormatSecret.includes(item)) {
        throw new ConfigUpdateError('Please Input Right Secret Format: [{{providerAccessFormatSecret}}]', {providerAccessFormatSecret: providerAccessFormatSecret});
      } else if (providerAccessFormatSecret.includes(item) && inputSecret[item]) {
        let value = inputSecret[item];
        if (hiddenMapping && hiddenMapping[value]) {
          value = hiddenMapping[value];
        }
        this.oldSecretID[item] = value;
      }
    });

    this.userInformation[this.inputProviderAlias] = this.oldSecretID;
    await this.writeFileWay(this.filePath, this.userInformation);
    // this.output();
  }

  async writeFileWay(filePath: string, text: ConfigMap) {
    try {
      await fs.writeFileSync(filePath, yaml.dump(text));
    } catch (err) {
      throw new ConfigUpdateError(err.message);
    }
    logger.success('Update succeeded.');
  }
  output() {
    logger.log('');
    logger.info(i18n.__('  Provider: {{provider}}', { provider: `${providerObject[this.provider]}(${this.provider})`}));
    if (this.aliasName) {
      logger.info(i18n.__('    Alias: {{alias}}', { alias: this.aliasName }));
    }
    for (const item in this.oldSecretID) {
      logger.info(`    ${item}: ${this.oldSecretID[item]}`);
    }
    logger.log('');
  }
}
