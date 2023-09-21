import { concat, filter, find, map, isEmpty, trim, includes, values } from 'lodash';
import logger from '../../../../logger';
import { IOptions } from './type';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { ENVIRONMENT_FILE_NAME, ENVIRONMENT_FILE_PATH } from '@serverless-devs/parse-spec';
import * as utils from '@serverless-devs/utils';

class Action {
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
  private getPromptOptions() {
    const validateInput = (input: string) => (isEmpty(trim(input)) ? 'Cannot be empty' : true);
    return [
      {
        type: 'input',
        message: 'name:',
        name: 'name',
        validate: validateInput,
      },
      {
        type: 'input',
        message: 'project:',
        name: 'project',
        validate: (input: string) => {
          const val = trim(input);
          if (isEmpty(val)) {
            return 'Cannot be empty';
          }
          if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
            const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
            if (includes(values(defaultEnvContent), val)) return `project [${val}] already exists`;
          }
          return true;
        },
      },
      {
        type: 'input',
        message: 'description:',
        name: 'description',
      },
      {
        type: 'input',
        message: 'type:',
        name: 'type',
        validate: validateInput,
      },
      {
        type: 'input',
        message: 'region:',
        name: 'region',
        validate: validateInput,
      },
      {
        type: 'input',
        message: 'role:',
        name: 'role',
        validate: validateInput,
      },
      {
        type: 'input',
        message: 'access:',
        name: 'access',
        default: 'default',
        validate: validateInput,
      },
      {
        type: 'input',
        message: 'template:',
        name: 'template',
        default: ENVIRONMENT_FILE_NAME,
      },
    ];
  }
  private async getOptions() {
    const argv = filter(process.argv, item => item !== '--debug');
    if (argv.length === 4) {
      return await inquirer.prompt(this.getPromptOptions());
    }
    return this.options;
  }
}

export default Action;
