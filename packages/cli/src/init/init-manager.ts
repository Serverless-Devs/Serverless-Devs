/** @format */

import path from 'path';
import fs from 'fs-extra';
import {spawn} from 'child_process';
import * as inquirer from 'inquirer';
import yaml from 'js-yaml';
import {loadApplication,  getYamlContent} from '@serverless-devs/core';
import {configSet} from '../utils';
import {DEFAULT_REGIRSTRY} from '../constants/static-variable';
import {APPLICATION_TEMPLATE} from './init-config';
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export class InitManager {
  protected promptList: any[] = [];
  constructor() {}
  private sTemplateWrapper(sObject: any, callback) {
    const that = this;
    const templateRegexp = /^({{).*(}})$/;
    for (let key in sObject) {
      const object = sObject[key];
      if (Object.prototype.toString.call(object) === '[object Object]') {
        that.sTemplateWrapper(object, callback);
      } else if (typeof object === 'string') {
        if (templateRegexp.test(object)) {
          callback(key, sObject);
        }
      }
    }
  }
  async executeInit(name: string, dir?: string, downloadurl?: boolean) {
    const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
    const appSath = await loadApplication(name, registry, dir);
    const sPath = fs.existsSync(path.join(appSath, 's.yml')) ? path.join(appSath, 's.yml'): path.join(appSath, 's.yaml');
    if (sPath) {
      const sContent = await getYamlContent(sPath);
      this.sTemplateWrapper(sContent, key => {
        const [name, desc] = key.split('|');
        this.promptList.push({
          type: 'input',
          message: `please input ${desc || name}:`,
          name,
        });
      });
      const result = await inquirer.prompt(this.promptList);
      this.sTemplateWrapper(sContent, (key, sObject) => {
        const [name] = key.split('|');
        for (let prop in result) {
          if (name === prop && result[prop]) {
            sObject[key] = result[prop];
          }
        }
      });
      fs.writeFileSync(sPath, yaml.dump(sContent));
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
