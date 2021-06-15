/** @format */

import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import _ from 'lodash';
import { spawn } from 'child_process';
import * as inquirer from 'inquirer';
import yaml from 'js-yaml';
import { loadApplication, setCredential } from '@serverless-devs/core';
import colors from 'chalk';
import { logger, configSet, getYamlPath, common } from '../utils';
import { DEFAULT_REGIRSTRY } from '../constants/static-variable';
import {
  APPLICATION_TEMPLATE,
  PROJECT_NAME_INPUT,
  ALIBABA_APPLICATION_TEMPLATE,
  TENCENT_APPLICATION_TEMPLATE,
  AWS_APPLICATION_TEMPLATE,
} from './init-config';
import size from 'window-size';
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
const { replaceTemplate, getTemplatekey, replaceFun } = common;
const getCredentialAliasList = () => {
  const ACCESS_PATH = getYamlPath(path.join(os.homedir(), '.s'), 'access');
  if (!ACCESS_PATH) {
    return [];
  }

  try {
    const result = yaml.load(fs.readFileSync(ACCESS_PATH, 'utf8'));
    return Object.keys(result);
  } catch (error) {
    return [];
  }
};

export class InitManager {
  protected promps: any = {};
  constructor() {}

  async initSconfig(appPath) {
    const sPath = getYamlPath(appPath, 's');
    if (sPath) {
      let sContent = fs.readFileSync(sPath, 'utf-8');
      const templateKeys = getTemplatekey(sContent);
      templateKeys.forEach(item => {
        const { name, desc } = item;
        if (name === 'access') {
          const credentialAliasList = getCredentialAliasList();
          if (Array.isArray(credentialAliasList) && credentialAliasList.length > 0) {
            this.promps['access'] = {
              type: 'list',
              name: 'access',
              message: 'please select credential alias',
              choices: credentialAliasList,
            };
          } else {
            this.promps['access'] = {
              type: 'confirm',
              name: 'access',
              message: 'create credential?',
              default: true,
            };
          }
        } else {
          this.promps[name] = {
            type: 'input',
            message: `please input ${desc || name}:`,
            name,
          };
        }
      });

      const { access: prompsAccess, ...prompsRest } = this.promps;
      const prompsOption = _.concat(_.values(prompsRest), prompsAccess);

      const result = await inquirer.prompt(_.filter(prompsOption, item => item));
      if (result.access === true) {
        const credential = await setCredential();
        result.access = credential.Alias;
      } else {
        result.access = typeof result.access === 'string' ? result.access : 'default';
      }
      sContent = replaceFun(sContent, result);
      fs.writeFileSync(sPath, sContent, 'utf-8');
    }
    return sPath;
  }

  async assemblySpecialApp(appName, { projectName, appPath }) {
    if (appName === 'start-component' || appName === 'devsapp/start-component') {
      const packageJsonPath = path.join(appPath, 'package.json');
      const publishYamlPath = path.join(appPath, 'publish.yaml');
      replaceTemplate([packageJsonPath, publishYamlPath], { projectName });
    }
  }
  async executeInit(name: string, dir?: string, downloadurl?: boolean) {
    const projectName = dir || (await inquirer.prompt(PROJECT_NAME_INPUT)).projectName || './';
    const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
    let appPath = await loadApplication({ registry, target: './', source: name, name: projectName });
    if (appPath) {
      await this.initSconfig(appPath);
      await this.assemblySpecialApp(name, { projectName, appPath }); // Set some app template content
      logger.success('\n🏄‍ Thanks for using Serverless-Devs');
      console.log(`👉 You could [cd ${appPath}] and enjoy your serverless journey!`);
      console.log(`🧭 If you need help for this example, you can use [s -h] after you enter folder.`);
      console.log('💞 Document ❤ Star：' + colors.cyan('https://github.com/Serverless-Devs/Serverless-Devs' + '\n'));
    }
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

  async init(name: string, dir?: string) {
    console.log('\n🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome\n');
    if (!name) {
      let tempHeight;
      try {
        tempHeight = size.height - 1;
      } catch (e) {
        tempHeight = 20;
      }
      process.env['serverless_devs_temp_height'] = tempHeight < 15 ? '0' : '1';
      APPLICATION_TEMPLATE[0].pageSize = tempHeight;
      let answers: any = await inquirer.prompt(APPLICATION_TEMPLATE);
      let answerValue = answers['template'];
      if (answerValue === 'alibaba') {
        process.env['serverless_devs_temp_height'] = tempHeight < 34 ? '0' : '1';
        ALIBABA_APPLICATION_TEMPLATE[0].pageSize = tempHeight;
        const answersTemp = await inquirer.prompt(ALIBABA_APPLICATION_TEMPLATE);
        answerValue = answersTemp['template'];
      } else if (answerValue === 'aws') {
        AWS_APPLICATION_TEMPLATE[0].pageSize = tempHeight;
        const answersTemp = await inquirer.prompt(AWS_APPLICATION_TEMPLATE);
        answerValue = answersTemp['template'];
      } else if (answerValue === 'tencent') {
        TENCENT_APPLICATION_TEMPLATE[0].pageSize = tempHeight;
        const answersTemp = await inquirer.prompt(TENCENT_APPLICATION_TEMPLATE);
        answerValue = answersTemp['template'];
      }
      console.log(`\n😋 Create application command: [s init ${answerValue}]\n`);
      await this.executeInit(answerValue, dir);
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      await this.executeInit(name, dir);
    }
  }
}
