import inquirer from 'inquirer';
import { spawn, spawnSync } from 'child_process';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import loadApplication from '@serverless-devs/load-application';
import chalk from 'chalk';
import { last, split, trim, find, includes, endsWith } from 'lodash';
import { emoji } from '../../utils';
import { ALL_TEMPLATE, APPLICATION_TEMPLATE } from './constant';
import logger from '../../logger';
import execDaemon from '../../exec-daemon';
import { EReportType } from '../../type';

interface IOptions {
  dir?: string;
  access?: string;
  parameters?: Record<string, any>;
  appName?: string;
  project?: string;
  uri?: string;
  reserveComments?: boolean;
}

export default class Manager {
  private template: string;
  constructor(private options: IOptions = {}) {
    // 添加交互插件
    inquirer.registerPrompt('autocomplete', inquirerPrompt);
  }

  async init() {
    logger.write(`\n${emoji('🚀')} More applications: ${chalk.underline('https://registry.serverless-devs.com')}\n`);

    if (endsWith(this.options.project, '.git')) {
      return await this.gitCloneProject();
    }
    this.template = this.options.project;
    if (!this.options.project && !this.options.uri) {
      const answers: any = await inquirer.prompt(APPLICATION_TEMPLATE);
      this.template = answers.template || answers.firstLevel;
      logger.write(`\n${emoji('😋')} Create application command: [s init --project ${this.template}]\n`);
    }
    const { appPath } = await this.executeInit();
    const findObj: any = find(ALL_TEMPLATE, item => includes(item.value, this.template));
    appPath && execDaemon('report.js', { type: EReportType.init, template: this.template });
    if (includes(process.argv, '--parameters')) return;
    if (findObj && findObj.isDeploy) {
      await this.deploy(appPath);
    }
  }

  private async executeInit() {
    let projectName = this.options.dir;
    if (!projectName) {
      const defaultValue = last(split(this.template, '/'));
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Please input your project name (init dir)',
          default: defaultValue,
          validate: (input: string) => {
            if (!input) {
              return 'Project name is required';
            }
            return true;
          },
        },
      ]);

      projectName = trim(answers.projectName);
    }

    const appPath = await loadApplication(this.template, {
      logger,
      projectName,
      parameters: this.options.parameters,
      appName: this.options.appName,
      access: this.options.access,
      uri: this.options.uri,
      reserveComments: this.options.reserveComments,
    });

    if (appPath) {
      logger.write(`\n${emoji('🏄‍')} Thanks for using Serverless-Devs`);
      logger.write(`${emoji('👉')} You could [cd ${appPath}] and enjoy your serverless journey!`);
      logger.write(`${emoji('🧭️')} If you need help for this example, you can use [s -h] after you enter folder.`);
      logger.write(`${emoji('💞')} Document ❤ Star: ` + chalk.cyan.underline('https://github.com/Serverless-Devs/Serverless-Devs'));
      logger.write(`${emoji('🚀')} More applications: ` + chalk.cyan.underline('https://registry.serverless-devs.com\n'));
    }

    return { appPath };
  }

  private async deploy(appPath: string) {
    const answers: any = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'name',
        default: 'Y',
        message: chalk.yellow('Do you want to deploy the project immediately?'),
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
        cwd: this.options.dir ? this.options.dir : './',
        stdio: ['ignore', 'inherit', 'inherit'],
      }).on('close', code => resolve({ code }));
    });
  }
}
