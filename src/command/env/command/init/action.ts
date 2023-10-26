import { concat, find, map, isEmpty, trim, endsWith, get, pick, lowerCase } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import inquirer, { Answers } from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { ENVIRONMENT_FILE_NAME, ENVIRONMENT_FILE_PATH } from '@serverless-devs/parse-spec';
import * as utils from '@serverless-devs/utils';
import { regions } from './index';
import Credential from '@serverless-devs/credential';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { ENV_COMPONENT_KEY, ENV_COMPONENT_NAME, ENV_KEYS } from '../../constant';
import loadComponent from '@serverless-devs/load-component';

class Action {
  constructor(private options: IOptions = {}) {
    inquirer.registerPrompt('autocomplete', inquirerPrompt);
    logger.debug(`s env init --option: ${JSON.stringify(options)}`);
  }
  async start() {
    await this.doAction();
    logger.write('Environment init successfully');
  }
  private async doAction() {
    const data = await this.getOptions();
    logger.debug(`writeEnvironmentFile data: ${JSON.stringify(data)}`);
    const { template, project, ...rest } = data;
    const newData = pick(rest, ENV_KEYS);
    const componentName = utils.getGlobalConfig(ENV_COMPONENT_KEY, ENV_COMPONENT_NAME);
    const instance = await loadComponent(componentName);
    // TODO:执行组件的什么方法
    const result = await instance.env(newData);
    // 追加内容
    if (fs.existsSync(template)) {
      const { project, environments } = utils.getYamlContent(template);
      fs.writeFileSync(template, yaml.dump({ project, environments: concat(environments, result) }));
      return;
    }
    // 第一次
    fs.ensureFileSync(template);
    fs.writeFileSync(template, yaml.dump({ project, environments: [result] }));
  }
  private getPromptOptions() {
    const credential = new Credential({ logger });
    const access = Object.keys(credential.getAll());
    return [
      {
        type: 'input',
        message: 'template:',
        name: 'template',
        default: ENVIRONMENT_FILE_NAME,
        validate: (input: string) => {
          if (endsWith(input, '.yml') || endsWith(input, '.yaml')) return true;
          return 'Must be a yaml file';
        },
      },
      {
        type: 'input',
        message: 'project:',
        name: 'project',
        when: (answers: Answers) => {
          // 文件不存在，说明第一次初始化
          if (!fs.existsSync(answers.template)) return true;
          return false;
        },
        validate: (input: string) => {
          const val = trim(input);
          if (isEmpty(val)) {
            return 'Cannot be empty';
          }
          if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
            const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
            if (find(defaultEnvContent, o => o.project === val)) return `project [${val}] already exists`;
          }
          return true;
        },
      },
      {
        type: 'input',
        message: 'name:',
        name: 'name',
        validate: (input: string, answers: Answers) => {
          const val = trim(input);
          if (isEmpty(val)) {
            return 'Cannot be empty';
          }
          if (fs.existsSync(answers.template)) {
            const envContent = utils.getYamlContent(answers.template);
            if (find(envContent.environments, o => o.name === val))
              return `name [${val}] already exists, you can specify other value except [${map(envContent.environments, o => o.name).join(', ')}]`;
          }
          return true;
        },
      },
      {
        type: 'input',
        message: 'description (optional):',
        name: 'description',
      },
      {
        type: 'list',
        message: 'type:',
        name: 'type',
        choices: ['testing', 'staging', 'production'],
      },
      {
        type: 'list',
        message: 'region:',
        name: 'region',
        choices: regions,
      },
      {
        type: 'input',
        message: 'role (optional):',
        name: 'role',
      },
      {
        type: 'input',
        message: 'overlays (optional):',
        name: 'overlays',
        validate: (input: string) => {
          if (isEmpty(trim(input))) return true;
          try {
            JSON.parse(input);
            return true;
          } catch (error) {
            return 'Must be a json string';
          }
        },
      },
      {
        type: 'autocomplete',
        message: 'access:',
        name: 'access',
        default: 'default',
        source: async function (_answersSoFar, input) {
          if (input) {
            return access.filter((item: any) => lowerCase(item).includes(lowerCase(input)));
          }
          return access;
        },
      },
    ];
  }
  private async getOptions() {
    // 判断是否需要交互式询问 --name
    if (this.options.name) {
      this.options.template = get(this.options, 'template', path.join(process.cwd(), ENVIRONMENT_FILE_NAME));
      this.options.access = get(this.options, 'access', 'default');
      return this.options;
    }
    const res = await inquirer.prompt(this.getPromptOptions());
    return { ...res, overlays: res.overlays ? JSON.parse(res.overlays) : null };
  }
}

export default Action;
