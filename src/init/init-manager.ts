/** @format */

import path from 'path';
import { spawn, spawnSync } from 'child_process';
import { logger, getConfig, replaceTemplate, i18n } from '../utils';
import { DEFAULT_REGIRSTRY } from '../constant';
import { PROJECT_NAME_INPUT, APPLICATION_TEMPLATE, ALL_TEMPLATE } from './init-config';
import { emoji } from '../utils/common';
import core from '../utils/core';
const { loadApplication, colors, report, inquirer, lodash } = core;
const { last, split, find, includes } = lodash;

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
export class InitManager {
  protected promps: any = {};
  constructor() {}
  async assemblySpecialApp(appName, { projectName, appPath }) {
    if (appName === 'start-component' || appName === 'devsapp/start-component') {
      const packageJsonPath = path.join(appPath, 'package.json');
      const publishYamlPath = path.join(appPath, 'publish.yaml');
      replaceTemplate([packageJsonPath, publishYamlPath], { projectName });
    }
  }
  async executeInit(name: string, dir?: string, downloadurl?: boolean) {
    let projectName = dir;
    if (!projectName) {
      const answers = await inquirer.prompt([{ ...PROJECT_NAME_INPUT, default: last(split(name, '/')) }]);
      projectName = answers.projectName;
    }
    const registry = downloadurl ? downloadurl : getConfig('registry') || DEFAULT_REGIRSTRY;
    const argvData = core.minimist(process.argv.slice(2));
    let parameters;
    if (argvData.parameters) {
      try {
        parameters = JSON.parse(argvData.parameters);
      } catch (error) {
        throw new Error('--parameters format error');
      }
    }
    const appPath = await loadApplication({
      registry,
      target: './',
      source: name,
      name: projectName,
      parameters,
      appName: argvData.appName,
      access: argvData.access,
    });
    if (appPath) {
      await this.assemblySpecialApp(name, { projectName, appPath }); // Set some app template content
      logger.success(`\n${emoji('🏄‍')} Thanks for using Serverless-Devs`);
      logger.log(`${emoji('👉')} You could [cd ${appPath}] and enjoy your serverless journey!`);
      logger.log(`${emoji('🧭️')} If you need help for this example, you can use [s -h] after you enter folder.`);
      logger.log(
        `${emoji('💞')} Document ❤ Star: ` +
          colors.cyan.underline('https://github.com/Serverless-Devs/Serverless-Devs'),
      );
      logger.log(
        `${emoji('🚀')} More applications: ` + colors.cyan.underline('https://registry.serverless-devs.com\n'),
      );
    }

    return { appPath };
  }
  async gitCloneProject(name: string, dir?: string) {
    return new Promise(resolve => {
      const gitCmd = spawn('git', ['clone', name], {
        shell: true,
        cwd: dir ? dir : './',
        stdio: ['ignore', 'inherit', 'inherit'],
      });
      gitCmd.on('close', code => {
        resolve({ code });
      });
    });
  }

  async deploy(appPath: string) {
    const answers: any = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'name',
        default: 'Y',
        message: colors.yellow(i18n('init_pproject_deploy_tip')),
      },
    ]);

    if (answers.name) {
      spawnSync('s deploy', { cwd: appPath, shell: true, stdio: 'inherit' });
    }
  }

  async init(name?: string, dir?: string) {
    logger.log(`\n${emoji('🚀')} More applications: ${colors.underline('https://registry.serverless-devs.com')}\n`);
    if (!name) {
      const answers: any = await inquirer.prompt(APPLICATION_TEMPLATE);
      const answerValue = answers.template || answers.firstLevel;
      logger.log(`\n${emoji('😋')} Create application command: [s init ${answerValue}]\n`);
      const { appPath } = await this.executeInit(answerValue, dir);
      report({ type: 'initTemplate', content: answerValue });
      const findObj: any = find(ALL_TEMPLATE, item => item.value === answerValue);
      if (findObj && findObj.isDeploy) {
        await this.deploy(appPath);
      }
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      const { appPath } = await this.executeInit(name, dir);
      const findObj: any = find(ALL_TEMPLATE, item => includes(item.value, name));
      if (includes(process.argv, '--parameters')) return;
      if (findObj && findObj.isDeploy) {
        await this.deploy(appPath);
      }
    }
  }
}
