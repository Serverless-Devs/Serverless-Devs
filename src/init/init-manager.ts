/** @format */

import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import _ from 'lodash';
import { spawn } from 'child_process';
import * as inquirer from 'inquirer';
import yaml from 'js-yaml';
import { loadApplication, getYamlContent, setCredential } from '@serverless-devs/core';
import { configSet, getYamlPath } from '../utils';
import { DEFAULT_REGIRSTRY } from '../constants/static-variable';
import { APPLICATION_TEMPLATE } from './init-config';
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

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
          callback(object.replace(/^{{\s/,'').replace(/\s}}$/,''), sObject);
        }
      }
    }
  }
  async executeInit(name: string, dir?: string, downloadurl?: boolean) {
    const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
    const appSath = await loadApplication(name, registry, dir);
    const sPath = fs.existsSync(path.join(appSath, 's.yml'))
      ? path.join(appSath, 's.yml')
      : path.join(appSath, 's.yaml');
    if (sPath) {
      const sContent = await getYamlContent(sPath);
      this.sTemplateWrapper(sContent, key => {
        const [keyName, desc] = key.split('|');
        const name = _.trim(keyName);
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

      this.sTemplateWrapper(sContent, (key, sObject) => {
        const [name] = key.split('|');
        for (let prop in result) {
          if (name === prop && result[prop]) {
            sObject[key] = result[prop];
          }
        }
      });

      fs.writeFileSync(sPath, yaml.dump(sContent));
      console.log("Enjoy you serverless journey!")
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
      inquirer.prompt(APPLICATION_TEMPLATE).then(async answers => {
        const appKey = Object.keys(answers)[0];
        const appValue = answers[appKey];
        const formatName = appValue.substr(appValue.lastIndexOf('/') + 1);
        await this.executeInit(formatName, dir, appValue.indexOf('http') !== -1 ? appValue : '');
      });
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      await this.executeInit(name, dir);
    }
  }
}
