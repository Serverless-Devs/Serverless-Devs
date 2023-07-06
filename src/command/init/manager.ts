import inquirer from 'inquirer';
import { spawn, spawnSync } from 'child_process';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import loadApplication from '@serverless-devs/load-application';
import { cyan, underline, yellow } from 'chalk';
import { last, split, trim, find, includes } from 'lodash';
import { emoji } from '../../utils';
import { ALL_TEMPLATE, APPLICATION_TEMPLATE } from './constant';
import { DEFAULT_REGISTRY } from '../../constant';
import logger from '../../logger';

interface IOptions {
  dir?: string;
  access?: string;
  registry?: string;
  parameters?: Record<string, any>;
  appName?: string;
  project?: string;
}

export default class Manager {
  template?: string;
  dir?: string;
  appName?: string;
  access?: string;
  parameters?: Record<string, any>;
  registry: string;

  constructor(options: IOptions) {
    this.template = options?.project;
    this.dir = options?.dir;
    this.registry = options?.registry || DEFAULT_REGISTRY;
    this.parameters = options?.parameters;
    this.access = options?.access;
    this.appName = options?.appName;

    // 添加交互插件
    inquirer.registerPrompt('autocomplete', inquirerPrompt);
  }

  async init() {
    logger.info(`\n${emoji('🚀')} More applications: ${underline('https://registry.serverless-devs.com')}\n`);

    if (this.template?.endsWith('.get')) {
      return await this.gitCloneProject();
    }

    if (!this.template) {
      const answers: any = await inquirer.prompt(APPLICATION_TEMPLATE);
      this.template = answers.template || answers.firstLevel;
      logger.info(`\n${emoji('😋')} Create application command: [s init --project ${this.template}]\n`);
    }

    const { appPath } = await this.executeInit();

    const findObj: any = find(ALL_TEMPLATE, item => includes(item.value, this.template));
    if (includes(process.argv, '--parameters')) return;
    if (findObj && findObj.isDeploy) {
      await this.deploy(appPath);
    }
  }

  private async executeInit() {
    let projectName = this.dir;
    if (!projectName) {
      const defaultValue = last(split(this.template, '/'));
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Please input your project name (init dir)',
          default: defaultValue,
        },
      ]);

      projectName = trim(answers.projectName);
    }

    const appPath = await loadApplication(this.template, {
      logger,
      projectName,
      parameters: this.parameters,
      appName: this.appName,
      access: this.access,
    });

    if (appPath) {
      logger.info(`\n${emoji('🏄‍')} Thanks for using Serverless-Devs`);
      logger.info(`${emoji('👉')} You could [cd ${appPath}] and enjoy your serverless journey!`);
      logger.info(`${emoji('🧭️')} If you need help for this example, you can use [s -h] after you enter folder.`);
      logger.info(
        `${emoji('💞')} Document ❤ Star: ` + cyan.underline('https://github.com/Serverless-Devs/Serverless-Devs'),
      );
      logger.info(`${emoji('🚀')} More applications: ` + cyan.underline('https://registry.serverless-devs.com\n'));
    }

    return { appPath };
  }

  private async deploy(appPath: string) {
    const answers: any = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'name',
        default: 'Y',
        message: yellow('Do you want to deploy the project immediately?'),
      },
    ]);

    if (answers.name) {
      spawnSync('s deploy', { cwd: appPath, shell: true, stdio: 'inherit' });
    }
  }

  private async gitCloneProject() {
    return new Promise(resolve => {
      spawn('git', ['clone', this.template], {
        shell: true,
        cwd: this.dir ? this.dir : './',
        stdio: ['ignore', 'inherit', 'inherit'],
      }).on('close', code => resolve({ code }));
    });
  }
}
