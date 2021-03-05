import path from 'path';
import os from 'os';
import fs from 'fs';
import yaml from 'js-yaml';
import { common } from '@serverless-devs-cli/util';
import { ConfigGetError } from '@serverless-devs-cli/error';
import logger from '../utils/logger';
import i18n from '../utils/i18n';
const { printn } = common;

const providerObject: any = {
  alibaba: i18n.__('Alibaba Cloud'),
  baidu: i18n.__('Baidu Cloud'),
  huawei: i18n.__('Huawei Cloud'),
  aws: i18n.__('AWS Cloud'),
  azure: i18n.__('Azure Cloud'),
  google: i18n.__('Google Cloud'),
  tencent: i18n.__('Tencent Cloud'),
};

export class GetManager {
  protected localPath: string = path.join(process.cwd(), 'access.yaml');
  protected globalPath: string = path.join(os.homedir(), '.s', 'access.yaml');
  protected programArgsLength = 0;
  protected resUserInformation: any = {};
  protected providerAlias: string;

  constructor() {
    if (!fs.existsSync(path.join(process.cwd(), 'access.yaml'))) {
      this.localPath = path.join(process.cwd(), 'access.yml');
    }

    if (!fs.existsSync(this.globalPath)) {
      fs.writeFileSync(this.globalPath, '');
    }
  }

  async initAccessData(userInput: any) {
    await this.getManager(userInput, this.localPath);
    await this.getManager(userInput, this.globalPath);
  }

  async getManager(userInput: any, filePath: string) {
    try {
      let userInformation: any;
      try {
        userInformation = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
      } catch (ex) {
        if (filePath === this.globalPath) {
          fs.writeFileSync(this.globalPath, '');
        }
      }
      if (userInformation !== null) {
        if (userInput.Provider) {
          const provider: string = String(userInput.Provider).toLocaleLowerCase();
          const userInformationKey: string[] = Object.keys(userInformation);
          if (userInput.AliasName) {
            const aliasName: string = String(userInput.AliasName);
            this.providerAlias = this.localPath === filePath ? aliasName : `${provider}.${aliasName}`;
            userInformationKey.forEach(item => {
              if (item === this.providerAlias) {
                this.resUserInformation[this.providerAlias] = userInformation[this.providerAlias];
              }
            });
          } else {
            userInformationKey.forEach(item => {
              if (this.localPath === filePath) {
                this.resUserInformation[`project.${item}`] = userInformation[item];
              } else if (item.split('.')[0] === provider) {
                this.resUserInformation[item] = userInformation[item];
              }
            });
          }
        } else if (userInput.List) {
          for (const item in userInformation) {
            if (filePath === this.localPath) {
              this.resUserInformation[`project.${item}`] = userInformation[item];
            } else {
              this.resUserInformation[item] = userInformation[item];
            }
          }
        }
      } else {
        if (this.localPath !== filePath) {
          throw new ConfigGetError('Query failed : User configuration is empty');
        }
      }
    } catch (ex) {
      this.resUserInformation = this.resUserInformation || {};
    }
  }

  //返回单个provider.alias的值
  async getUserSecretID(userInput: any) {
    if (this.resUserInformation !== null) {
      if (userInput.Provider && userInput.AliasName) {
        return this.resUserInformation[userInput.AliasName] || this.resUserInformation[this.providerAlias];
      }
      return this.resUserInformation;
    }
    throw new ConfigGetError(
      'Query failed : Please input right format. You can obtain the key information through: s config get -h',
    );
  }


  outputFormat(resUserInformation: any): void {
    const sortUserKey: string[] = Object.keys(resUserInformation).sort((a: string, b: string) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    });

    const sortUserKeyLength: number = sortUserKey.length;
    for (let i = 0; i < sortUserKeyLength; i++) {
      const provider: string = sortUserKey[i].split('.')[0];
      const aliasName: string = sortUserKey[i].split('.')[1];
      const resObject: any = resUserInformation[sortUserKey[i]];

      if (i === 0 || sortUserKey[i - 1].split('.')[0] != sortUserKey[i].split('.')[0]) {
        if (providerObject[provider]) {
          logger.info(`${providerObject[provider]}(${provider})`);
        } else {
          logger.info(`${provider}`);
        }
      }
      logger.log(` `);
      logger.info(`   AliasName: ${aliasName}`);
      // eslint-disable-next-line guard-for-in
      for (const item in resObject) {
        const valueOfKey = item;
        let valueOfValue = resObject[item];
        const valueOfValueLength: any = valueOfValue.length;
        valueOfValue =
          valueOfValueLength > 6
            ? valueOfValue.slice(0, 3) +
            printn(valueOfValueLength - 6, '*') +
            valueOfValue.slice(valueOfValueLength - 3, valueOfValueLength)
            : valueOfValue;
        logger.info(`   ${valueOfKey}: ${valueOfValue} `);
      }
      logger.info(` `);
    }
  }
  consoleRes() {
    if (Object.keys(this.resUserInformation).length > 0) {
      this.outputFormat(this.resUserInformation);
    } else {
      throw new ConfigGetError(
        'Query failed : The key information is not found. You can obtain the key information through: s config get -l',
      );
    }
  }
}
