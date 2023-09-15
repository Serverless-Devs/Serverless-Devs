import { concat, filter, find, map } from 'lodash';
import logger from '../../../../logger';
import { IOptions } from './type';
import inquirer from 'inquirer';
import { ENVIRONMENT_FILE_NAME, INQUIRE_OPTIONS } from './constant';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import * as utils from '@serverless-devs/utils';

class Init {
  constructor(private options: IOptions = {}) {
    logger.debug(`s env init --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const envPath = this.getEnvPath();
    logger.debug(`envPath: ${envPath}`);
    await this.writeEnvironmentFile(envPath);
  }
  private getEnvPath() {
    if (this.options.template) return this.options.template;
    return path.join(process.cwd(), ENVIRONMENT_FILE_NAME);
  }
  private async writeEnvironmentFile(environmentFilePath: string) {
    const data = await this.getOptions();
    logger.debug(`writeEnvironmentFile data: ${JSON.stringify(data)}`);
    fs.ensureFileSync(environmentFilePath);
    const { project = data.project, environments = [] } = utils.getYamlContent(environmentFilePath) || {};
    const exist = find(environments, { name: data.name });
    const temp = exist
      ? map(environments, item => {
          if (item.name === data.name) {
            return { ...item, ...data };
          }
          return item;
        })
      : concat(environments, data);
    fs.writeFileSync(environmentFilePath, yaml.dump({ project, environments: temp }));
  }
  private async getOptions() {
    const argv = filter(process.argv, item => item !== '--debug');
    if (argv.length === 4) {
      return await inquirer.prompt(INQUIRE_OPTIONS);
    }
    return this.options;
  }
}

export default Init;
