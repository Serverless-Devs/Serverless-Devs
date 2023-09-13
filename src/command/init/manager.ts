import inquirer from 'inquirer';
import { spawn } from 'child_process';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import loadApplication from '@serverless-devs/load-application';
import chalk from 'chalk';
import { last, split, trim, endsWith } from 'lodash';
import { emoji } from '../../utils';
import { APPLICATION_TEMPLATE } from './constant';
import logger from '../../logger';
import execDaemon from '../../exec-daemon';
import { EReportType } from '../../type';
import path from 'path';

interface IOptions {
  dir?: string;
  access?: string;
  parameters?: Record<string, any>;
  appName?: string;
  project?: string;
  uri?: string;
  reserveComments?: boolean;
  y?: boolean;
}

export default class Manager {
  private template: string;
  constructor(private options: IOptions = {}) {
    // 添加交互插件
    inquirer.registerPrompt('autocomplete', inquirerPrompt);
  }

  async init() {
    logger.write(`\n${emoji('🚀')} More applications: ${chalk.underline('https://registry.serverless-devs.com')}`);

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
    appPath && execDaemon('report.js', { type: EReportType.init, template: this.template });
  }

  private async getProjectName() {
    if (this.options.dir) return path.basename(this.options.dir);
    const defaultValue = last(split(this.template, '/'));
    if (this.options.y) return defaultValue;
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
    return trim(answers.projectName);
  }

  private async executeInit() {
    const appPath = await loadApplication(this.template, {
      dest: this.options.dir && path.isAbsolute(this.options.dir) ? path.dirname(this.options.dir) : process.cwd(),
      logger,
      projectName: await this.getProjectName(),
      parameters: this.options.parameters,
      appName: this.options.appName,
      access: this.options.access,
      uri: this.options.uri,
      reserveComments: this.options.reserveComments,
      y: this.options.y,
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
