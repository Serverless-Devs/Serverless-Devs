import inquirer from 'inquirer';
import { spawn } from 'child_process';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import loadApplication from '@serverless-devs/load-application';
import chalk from 'chalk';
import { last, split, trim, endsWith, concat, first, lowerCase } from 'lodash';
import { emoji } from '@/utils';
import { APPLICATION_TEMPLATE, ALL_TEMPLATE, first_level_template, ali_default } from './constant';
import logger from '@/logger';
import execDaemon from '@/exec-daemon';
import { EReportType } from '@/type';
import path from 'path';
import axios from 'axios';
import { getRootHome } from '@serverless-devs/utils';
import fs from 'fs-extra';

interface IOptions {
  dir?: string;
  access?: string;
  parameters?: Record<string, any>;
  appName?: string;
  project?: string;
  uri?: string;
  y?: boolean;
  overwrite?: boolean;
}

export default class Manager {
  private template: string;
  constructor(private options: IOptions = {}) {
    // 添加交互插件
    inquirer.registerPrompt('autocomplete', inquirerPrompt);
  }

  async init() {
    logger.write(`\n${emoji('🚀')} More applications: ${chalk.underline('https://registry.serverless-devs.com')}`);
    this.template = this.options.project;
    if (endsWith(this.options.project, '.git')) {
      return await this.gitCloneProject();
    }

    if (!this.options.project && !this.options.uri) {
      const applicationsTemplates = await this.getApplicationTemplates();
      const answers: any = await inquirer.prompt(applicationsTemplates);
      this.template = answers.template || answers.firstLevel;
      logger.write(`\n${emoji('😋')} Create application command: [s init ${this.template}]\n`);
    }
    const { appPath } = await this.executeInit();
    appPath && execDaemon('report.js', { type: EReportType.init, template: this.template });
  }

  private async getProjectName() {
    if (this.options.dir) {
      return path.basename(this.options.dir);
    }
    const defaultValue = last(split(this.template, '/'));
    if (this.options.y) {
      return defaultValue;
    }
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

  private async getInitAliMenu() {
    const aliMenu = axios.get('https://images.devsapp.cn/bin/s/ali-template.json');
    return aliMenu
      .then(res => {
        const { data } = res;

        return { ali_template: data.ali_template, contents: data.contents, version: data.version };
      })
      .catch(err => {
        return { ali_template: ali_default.ali_template, contents: ali_default.contents, version: ali_default.version };
      });
  }

  private async getAliMenu(path: string) {
    let aliMenu;
    if (fs.existsSync(path)) {
      // 已存在配置文件，调daemon检查更新
      aliMenu = fs.readJSONSync(path);
      execDaemon('update-templates.js');
    } else {
      // 不存在配置文件，获取远端模版菜单
      const remoteMenu = await this.getInitAliMenu();
      if (remoteMenu) {
        fs.writeJSONSync(path, remoteMenu, { spaces: 2 });
        aliMenu = remoteMenu;
      }
    }
    return aliMenu;
  }

  private async getApplicationTemplates() {
    const aliMenuPath = path.join(getRootHome(), 'config', 'ali-template.json');
    const aliMenu = await this.getAliMenu(aliMenuPath);

    // 加入阿里云模版类别菜单
    let all_ali_template = [...aliMenu.ali_template];
    for (const i of Object.keys(aliMenu.contents)) {
      all_ali_template = concat(all_ali_template, aliMenu.contents[i]);
    }
    const all_template = ALL_TEMPLATE.concat(all_ali_template);
    const ali_obj = {
      type: 'autocomplete',
      name: 'ali_template',
      when(answers) {
        return answers.firstLevel === 'Alibaba_Cloud_Serverless';
      },
      default: first(aliMenu.ali_template)['value'],
      message: 'Hello, serverlesser. Which template do you like?',
      source: async function (_answersSoFar, input) {
        if (input) {
          return all_ali_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
        }
        return aliMenu.ali_template;
      },
    };
    APPLICATION_TEMPLATE.push(ali_obj);

    // 加入最上层类别
    const top_obj = {
      type: 'autocomplete',
      name: 'firstLevel',
      loop: true,
      message: 'Hello Serverless for Cloud Vendors',
      default: first(first_level_template).value,
      when(answers) {
        return true;
      },
      source: async function (_answersSoFar, input) {
        if (input) {
          return all_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
        }
        return first_level_template;
      },
    };
    APPLICATION_TEMPLATE.unshift(top_obj);

    // 加入阿里云模版
    for (const i of Object.keys(aliMenu.contents)) {
      const templateObj = {
        type: 'autocomplete',
        name: 'template',
        loop: true,
        when(answers) {
          return answers.ali_template === i;
        },
        message: 'Which template do you like?',
        default: first(aliMenu.contents[i])['value'],
        source: async function (_answersSoFar, input) {
          if (input) {
            return aliMenu.contents[i].filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
          }
          return aliMenu.contents[i];
        },
      };
      APPLICATION_TEMPLATE.push(templateObj);
    }
    return APPLICATION_TEMPLATE;
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
      y: this.options.y,
      overwrite: this.options.overwrite,
    });

    if (appPath) {
      logger.write(chalk.gray(`\nThanks for using Serverless-Devs`));
      logger.write(chalk.gray(`You could [cd ${appPath}] and enjoy your serverless journey!`));
      logger.write(chalk.gray(`If you need help for this example, you can use [s -h] after you enter folder.\n`));
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
