import path from 'path';
import os from 'os';
import fs from 'fs';
import yaml from 'js-yaml';
import { ConfigDeleteError } from '@serverless-devs-cli/error';
import logger from '../../utils/logger';

export class DeleteManager {
  protected findProviderAliasFlag = true;
  protected globalPath: string;
  protected provider: string;
  protected aliasName: string;
  protected inputProviderAlias: string;

  constructor() {
    this.globalPath = path.join(os.homedir(), '.s/access.yaml');
  }
  async init(providerAlias: any) {
    const userInformation: any = yaml.safeLoad(fs.readFileSync(this.globalPath, 'utf8'));

    if (providerAlias.Provider && providerAlias.AliasName) {
      this.provider = String(providerAlias.Provider).toLocaleLowerCase();
      this.aliasName = String(providerAlias.AliasName).toLocaleLowerCase();
      this.inputProviderAlias = `${this.provider}.${this.aliasName || 'default'}`;

      try {
        const userInformationKey: string[] = Object.keys(userInformation);
        for (const item of userInformationKey) {
          if (item === this.inputProviderAlias) {
            delete userInformation[item];
            this.findProviderAliasFlag = !this.findProviderAliasFlag;
          }
        }
        await this.isSuccessDle(userInformation);
      } catch (err) {
        throw new ConfigDeleteError('The configuration list is empty. You can add configuration through: s config add');
      }
    } else if (!providerAlias.Provider || !providerAlias.AliasName) {
      //没有一起输入provider 和alias
      throw new ConfigDeleteError(
        'Need to enter provider and aliasName at the same time. You can obtain the key information through: s config delete -h.',
      );
    }
  }
  async isSuccessDle(userInformation: any) {
    if (!this.findProviderAliasFlag) {
      await fs.writeFileSync(this.globalPath, yaml.dump(userInformation));
      logger.success('Deletion succeeded');
    } else {
      throw new ConfigDeleteError(
        'The key information is not found. You can obtain the key information through: s config get -l.',
      );
    }
  }
}
