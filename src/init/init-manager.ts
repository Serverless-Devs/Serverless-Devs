/** @format */

import path from 'path';
import _ from 'lodash';
import { spawn, spawnSync } from 'child_process';
import { logger, configSet, getYamlPath, common, i18n } from '../utils';
import { DEFAULT_REGIRSTRY } from '../constants/static-variable';
import { PROJECT_NAME_INPUT, GET_APPLICATION_TEMPLATE } from './init-config';
import { emoji } from '../utils/common';
import core from '../utils/core';
const { loadApplication, setCredential, colors, report, fse: fs, jsyaml: yaml, inquirer, getRootHome } = core;

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
const { replaceTemplate, getTemplatekey, replaceFun } = common;
const getCredentialAliasList = () => {
  const ACCESS_PATH = getYamlPath(getRootHome(), 'access');
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

  async initSconfig(appPath: string) {
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

  async initEnvConfig(appPath: string) {
    const envExampleFilePath = path.resolve(appPath, '.env.example');
    if (!fs.existsSync(envExampleFilePath)) return;
    const envConfig = fs.readFileSync(envExampleFilePath, 'utf-8');
    const templateKeys = getTemplatekey(envConfig);
    if (templateKeys.length === 0) return;
    const promptOption = templateKeys.map(item => {
      const { name, desc } = item;
      return {
        type: 'input',
        message: `please input ${desc || name}:`,
        name,
      };
    });
    const result = await inquirer.prompt(promptOption);
    const newEnvConfig = replaceFun(envConfig, result);
    fs.unlink(envExampleFilePath);
    fs.writeFileSync(path.resolve(appPath, '.env'), newEnvConfig, 'utf-8');
  }

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
      const answers = await inquirer.prompt([{ ...PROJECT_NAME_INPUT, default: _.last(_.split(name, '/')) }]);
      projectName = answers.projectName;
    }
    const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;

    const appPath = await loadApplication({ registry, target: './', source: name, name: projectName });
    if (appPath) {
      await this.initSconfig(appPath);
      await this.initEnvConfig(appPath);
      await this.assemblySpecialApp(name, { projectName, appPath }); // Set some app template content
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
        `${emoji('💞')} Document ❤ Star：` +
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
        'https://github.com/Serverless-Devs/package-awesome',
      )}\n`,
    );
    const { promptData, allAliList } = GET_APPLICATION_TEMPLATE();
    if (!name) {
      const answers: any = await inquirer.prompt(promptData);
      const answerValue = answers.template || answers.firstLevel;
      console.log(`\n${emoji('😋')} Create application command: [s init ${answerValue}]\n`);
      const { appPath } = await this.executeInit(answerValue, dir);
      report({ type: 'initTemplate', content: answerValue });
      const findObj: any = _.find(allAliList, item => item.value === answerValue);
      if (findObj && findObj.isDeploy) {
        await this.deploy(appPath);
      }
    } else if (name.lastIndexOf('.git') !== -1) {
      await this.gitCloneProject(name, dir);
    } else {
      const { appPath } = await this.executeInit(name, dir);
      const findObj: any = _.find(allAliList, item => _.includes(item.value, name));
      if (findObj && findObj.isDeploy) {
        await this.deploy(appPath);
      }
    }
  }
}
