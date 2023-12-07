import { concat, find, map, isEmpty, trim, endsWith, get, pick, lowerCase } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import inquirer, { Answers } from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { ENVIRONMENT_FILE_NAME, ENVIRONMENT_FILE_PATH } from '@serverless-devs/parse-spec';
import * as utils from '@serverless-devs/utils';
import Credential from '@serverless-devs/credential';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { ENV_KEYS } from '@/command/env/constant';
import { runEnvComponent } from '@/utils';
import chalk from 'chalk';

class Action {
  constructor(private options: IOptions = {}) {
    inquirer.registerPrompt('autocomplete', inquirerPrompt);
    logger.debug(`s env init --option: ${JSON.stringify(options)}`);
  }
  async start() {
    await this.doAction();
    logger.write(chalk.green('Environment init successfully'));
  }
  private async doAction() {
    // initialize the basic information of the environment
    const { deployInfraStack, ...basicInfo } = await this.getBasicInfo();
    const { access, template } = basicInfo;
    if (!basicInfo.project) {
      const { project } = utils.getYamlContent(template);
      basicInfo.project = project;
    }
    const envInfo = { ...basicInfo };
    // initialize the infra stack information of the environment component
    if (deployInfraStack) {
      const infraStackInfo = await runEnvComponent(
        {
          props: {
            ...basicInfo,
          },
          command: 'env',
          args: ['init', '--prompt-infra-stack'],
        },
        access,
      );
      envInfo.infraStack = { ...infraStackInfo };
    }

    logger.debug(`writeEnvironmentFile data: ${JSON.stringify(envInfo)}`);
    const newData = pick(envInfo, ENV_KEYS);
    const { project } = newData;
    const inputs = {
      props: {
        ...newData,
      },
      command: 'env',
      args: ['init'],
    };

    const { project: p, ...rest } = await runEnvComponent(inputs, access);
    const result = {
      access,
      ...rest,
    };
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
        message: 'Please specify the manifest file of the environment:',
        name: 'template',
        default: ENVIRONMENT_FILE_NAME,
        validate: (input: string) => {
          if (endsWith(input, '.yml') || endsWith(input, '.yaml')) return true;
          return 'Must be a yaml file';
        },
      },
      {
        type: 'input',
        message: 'Please specify the project to which the environment belongs:',
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
        message: 'Please input your environment name:',
        name: 'name',
        validate: (input: string, answers: Answers) => {
          const val = trim(input);
          if (isEmpty(val)) {
            return 'Cannot be empty';
          }
          if (fs.existsSync(answers.template)) {
            const envContent = utils.getYamlContent(answers.template);
            if (find(envContent.environments, o => o.name === val))
              return `Env [${val}] already exists, you can specify other value except [${map(envContent.environments, o => o.name).join(', ')}]`;
          }
          return true;
        },
      },
      {
        type: 'input',
        message: 'Please input a description of the environment:',
        name: 'description',
      },
      {
        type: 'list',
        message: 'Please specify the type of environment:',
        name: 'type',
        choices: ['testing', 'staging', 'production'],
      },
      {
        type: 'input',
        message: 'Please input the configuration of the service to be overridden by the environment(must be json string):',
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
        message: 'Please select an access:',
        name: 'access',
        default: 'default',
        source: async function (_answersSoFar, input) {
          if (input) {
            return access.filter((item: any) => lowerCase(item).includes(lowerCase(input)));
          }
          return access;
        },
      },
      {
        type: 'confirm',
        name: 'deployInfraStack',
        message: 'Do you want to apply InfraStack now?',
        default: false,
      },
    ];
  }
  private async getBasicInfo() {
    if (this.options.name) {
      this.options.template = get(this.options, 'template', path.join(process.cwd(), ENVIRONMENT_FILE_NAME));
      if (fs.existsSync(this.options.template)) {
        const envContent = utils.getYamlContent(this.options.template);
        if (find(envContent.environments, o => o.name === this.options.name))
          throw new Error(`Env [${this.options.name}] already exists, you can specify other value except [${map(envContent.environments, o => o.name).join(', ')}]`);
      }
      this.options.access = get(this.options, 'access', 'default');
      return this.options;
    }
    const res = await inquirer.prompt(this.getPromptOptions());
    return { ...res, overlays: res.overlays ? JSON.parse(res.overlays) : null };
  }
}

export default Action;
