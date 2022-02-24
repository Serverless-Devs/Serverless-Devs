/** @format */

import path from 'path';
import { last, split, find, includes } from 'lodash';
import { spawn, spawnSync } from 'child_process';
import { logger, getConfig, replaceTemplate, i18n } from '../utils';
import { DEFAULT_REGIRSTRY } from '../constant';
import { PROJECT_NAME_INPUT, APPLICATION_TEMPLATE, ALL_TEMPLATE } from './init-config';
import { emoji } from '../utils/common';
import core from '../utils/core';
const { loadApplication, colors, report, inquirer } = core;

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

    const appPath = await loadApplication({ registry, target: './', source: name, name: projectName });
    if (appPath) {
      await this.assemblySpecialApp(name, { projectName, appPath }); // Set some app template content
      logger.success(`\n${emoji('🏄‍')} Thanks for using Serverless-Devs`);
      console.log(`${emoji('👉')} You could [cd ${appPath}] and enjoy your serverless journey!`);
      console.log(`${emoji('🧭️')} If you need help for this example, you can use [s -h] after you enter folder.`);
      console.log(
        `${emoji('💞')} Document ❤ Star:` +
          colors.cyan.underline('https://github.com/Serverless-Devs/Serverless-Devs' + '\n'),
      );
    }

    return { appPath };
  }
  async executeInitWithForceCreation(name: string, dir?: string) {
    let projectName = dir;
    if (!projectName) {
      projectName = last(split(name, '/'));
    }
    const registry = getConfig('registry') || DEFAULT_REGIRSTRY;

    const appPath = await loadApplication({ registry, target: './', source: name, name: projectName });
    if (appPath) {
      // postInit
      try {
        if (process.env[`${appPath}-post-init`]) {
          const tempObj = JSON.parse(process.env[`${appPath}-post-init`]);
          const baseChildComponent = await require(path.join(tempObj['tempPath'], 'hook'));
          await baseChildComponent.postInit(tempObj);
        }
      } catch (e) {}
      logger.success(`\n${emoji('🏄‍')} Thanks for using Serverless-Devs`);
      console.log(`${emoji('👉')} You could [cd ${appPath}] and enjoy your serverless journey!`);
      console.log(`${emoji('🧭️')} If you need help for this example, you can use [s -h] after you enter folder.`);
      console.log(
        `${emoji('💞')} Document ❤ Star:` +
          colors.cyan.underline('https://github.com/Serverless-Devs/Serverless-Devs' + '\n'),
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
    console.log(
      `\n${emoji('🚀')} Serverless Awesome: ${colors.underline(
        'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/awesome.md',
      )}\n`,
    );
    if (!name) {
      const answers: any = await inquirer.prompt(APPLICATION_TEMPLATE);
      const answerValue = answers.template || answers.firstLevel;
      console.log(`\n${emoji('😋')} Create application command: [s init ${answerValue}]\n`);
      const { appPath } = await this.executeInit(answerValue, dir);
      report({ type: 'initTemplate', content: answerValue });
      const findObj: any = find(ALL_TEMPLATE, item => item.value === answerValue);
      if (findObj && findObj.isDeploy) {
        await this.deploy(appPath);
      }
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      if (find(process.argv, v => v === '--force-creation')) {
        return await this.executeInitWithForceCreation(name, dir);
      }
      const { appPath } = await this.executeInit(name, dir);
      const findObj: any = find(ALL_TEMPLATE, item => includes(item.value, name));
      if (findObj && findObj.isDeploy) {
        await this.deploy(appPath);
      }
    }
  }
}
