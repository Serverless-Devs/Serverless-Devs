/** @format */

import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import {spawn} from 'child_process';
import * as inquirer from 'inquirer';
import yaml from 'js-yaml';
import {loadApplication, spinner, getYamlContent, modifyProps} from '@serverless-devs/core';
import {configSet, logger, i18n} from '../utils';
import {DEFAULT_REGIRSTRY} from '../constants/static-variable';
import {APPLICATION_TEMPLATE} from './init-config';
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export class InitManager {
  protected promptList: any[] = [];
  constructor() {}
  private generateTemplate(sObject: any) {
    const that = this;
    const templateRegexp = /^({{).*(}})$/;
    for (let key in sObject) {
      const object = sObject[key];
      if (Object.prototype.toString.call(object) === '[object Object]') {
        that.generateTemplate(object);
      } else if (typeof object === 'string') {
        if (templateRegexp.test(object)) {
          const [name, desc] = key.split('|');
          that.promptList.push({
            type: 'input',
            message: `please input ${desc || name}:`,
            name,
          });
        }
      }
    }
  }

  private writeTemplate(sObject: any, result: any) {
    const that = this;
    const templateRegexp = /^({{).*(}})$/;
    for (let key in sObject) {
      const object = sObject[key];
      if (Object.prototype.toString.call(object) === '[object Object]') {
        that.writeTemplate(object, result);
      } else if (typeof object === 'string') {
        if (templateRegexp.test(object)) {
          const [name] = key.split('|');
          for (let prop in result) {
            if (name === prop) {
              sObject[key] = result[prop];
            }
          }
        }
      }
    }
  }

  async executeInit(name: string, dir?: string, downloadurl?: boolean) {
    try {
      const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
      const appSath = await loadApplication(name, registry, dir);
      const sPath = path.join(appSath, 's.yml') || path.join(appSath, 's.yaml');
      if (sPath) {
        const sContent = await getYamlContent(sPath);
        this.generateTemplate(sContent);
        const result = await inquirer.prompt(this.promptList);
        this.writeTemplate(sContent, result);
        fs.writeFileSync(sPath, yaml.dump(sContent));
      }
    } catch (e) {
      logger.error(e.message);
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
        resolve({code});
      });
    });
  }

  async init(name: string, dir?: string) {
    if (!name) {
      inquirer.prompt(APPLICATION_TEMPLATE).then(async answers => {
        const appKey = Object.keys(answers)[0];
        const appName = answers[appKey];
        const formatName = appName.substr(appName.lastIndexOf('/') + 1);
        await this.executeInit(formatName, dir, appName);
      });
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      await this.executeInit(name, dir);
    }
  }
}
