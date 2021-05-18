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
import { APPLICATION_TEMPLATE, PROJECT_NAME_INPUT } from './init-config';
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
const { replaceTemplate, getTemplatekey, replaceFun } = common;
const getCredentialAliasList = () => {
  const ACCESS_PATH = getYamlPath(path.join(os.homedir(), '.s'), 'access');
  if (!ACCESS_PATH) {
    return [];
  }

  try {
    const result = yaml.safeLoad(fs.readFileSync(ACCESS_PATH, 'utf8'));
    return Object.keys(result);
  } catch (error) {
    return [];
  }
};

export class InitManager {
  protected promps: any = {};
  constructor() { }

  async initSconfig(appSath) {
    const sPath = getYamlPath(appSath, 's');
    if (sPath) {
      let sContent = fs.readFileSync(sPath, 'utf-8');
      const templateKeys = getTemplatekey(sContent);
      templateKeys.forEach((item) => {
        const { name: keyName, desc } = item;
        const name = _.trim(keyName);
        if (keyName === 'access') {
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
              message: 'create credentia?',
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
      const result = await inquirer.prompt(
        _.concat(_.values(_.omit(this.promps, ['access'])), _.values(_.pick(this.promps, ['access']))),
      );
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
    const { projectName } = await inquirer.prompt(PROJECT_NAME_INPUT);
    const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
    let appPath = await loadApplication({ registry, target: dir, source: name, name: projectName });
    if (appPath) {
      await this.initSconfig(appPath);
      await this.assemblySpecialApp(name, { projectName, appPath }); // Set some app template content
      console.log(projectName)
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
    if (!name) {
      const answers: any = await inquirer.prompt(APPLICATION_TEMPLATE);
      const answerValue = answers['template'];
      await this.executeInit(answerValue, dir);
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      await this.executeInit(name, dir);
    }
  }
}
