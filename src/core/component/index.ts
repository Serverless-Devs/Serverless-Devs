/** @format */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { getCredential, loadComponent } from '@serverless-devs/core';
import { PackageType } from '../../entiry';
import { DEFAULT_REGIRSTRY } from '../../constants/static-variable';
import { version, Parse } from '../../specification';
import { configSet, logger } from '../../utils';
import { Hook } from './hook';
import yaml from 'js-yaml';

const { getServiceConfigDetail, getServiceInputs, getServiceActions } = version;
const S_COMPONENT_BASE_PATH = path.join(os.homedir(), '.s', 'components');

export interface ComponentConfig {
  Component: string;
  Provider: string;
  Access?: string;
  access?: string;
  Extends: any;
  Properties: { [key: string]: any };
  Params: any;
  ProjectName: string;
}

export interface VersionCheckParams {
  name: string;
  type: PackageType;
  provider: string;
}

export interface GenerateComponentExeParams {
  list: string[];
  parse: Parse;
  parsedObj: any;
  method: string;
  params: string;
}

export async function synchronizeExecuteComponentList(list: any = [], index: any = 0, initData: any = {}) {
  if (index >= 0 && index < list.length) {
    return await list[index]().then(async ({ name, data }: any) => {
      if (name) {
        initData[name] = data;
      }
      return await synchronizeExecuteComponentList(list, index + 1, initData);
    });
  }
  return initData;
}

export function generateSynchronizeComponentExeList(
  { list, parse, parsedObj, method, params }: GenerateComponentExeParams,
  equipment: (parse: Parse, projectName: string, parsedObj: any) => Promise<ComponentConfig>,
): any[] {
  return list.map(projectName => {
    return () => {
      return new Promise(async (resolve, reject) => {
        try {
          parsedObj.Params = params || '';
          logger.info(`Start executing project ${projectName}`);
          const projectConfig = await equipment(parse, projectName, parsedObj);
          if (process.env['serverless_devs_temp_access']) {
            projectConfig.Access = process.env['serverless_devs_temp_access'];
            projectConfig.access = process.env['serverless_devs_temp_access'];
          }
          // console.log(projectConfig);
          const componentExecute = new ComponentExeCute(projectConfig, method, parsedObj.edition);
          const Output = await componentExecute.init();
          if (parsedObj.edition) {
            //  兼容新版规范
            parsedObj.services[projectName].output = Output;
          } else {
            parsedObj[projectName].Output = Output;
          }
          logger.info(`Project ${projectName} successfully to execute \n\t`);
          resolve({ name: projectName, data: Output });
        } catch (e) {
          const tempError = JSON.parse(process.env['s-execute-file'] || '{"Error": []}');
          const tempErrorAttr = {};
          tempErrorAttr[projectName] = e.message.includes('componentInstance[method] is not a function')
            ? `Project ${projectName} does not include [${method}] method`
            : e.message;
          tempError['Error'].push(tempErrorAttr);
          process.env['s-execute-file'] = JSON.stringify(tempError);
          logger.error(`Project ${projectName} failed to execute: 
  📝 Message:  ${tempErrorAttr[projectName]}
  🧭 You can get help for this component by [s ${projectName} -h]`);
          resolve({});
        }
      });
    };
  });
}

export class ComponentExeCute {
  protected credentials: any;

  constructor(
    protected componentConfig: ComponentConfig,
    protected method: string,
    protected version: string = '0.0.1',
  ) {
    if (!fs.existsSync(S_COMPONENT_BASE_PATH)) {
      fs.mkdirSync(S_COMPONENT_BASE_PATH);
    }
  }

  async init() {
    this.credentials = (await this.getCredentials()) || {};
    return await this.startExecute();
  }

  async getCredentials() {
    const { access, autoCredential } = getServiceConfigDetail(this.componentConfig);
    if (autoCredential === false) {
      return null;
    }
    try {
      const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
      const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
      if (accessFileInfo[access]) {
        return await getCredential(access);
      }
    } catch (e) {}
    return {};
  }

  private loadExtends(): Hook | null {
    const hooks = getServiceActions(this.componentConfig, this.version, { method: this.method });
    let hookExecuteInstance = null;
    if (hooks) {
      hookExecuteInstance = new Hook(hooks);
    }
    return hookExecuteInstance;
  }

  async loadPreExtends(extend: Hook | null): Promise<void> {
    if (extend) {
      await extend.executePreHook();
    }
  }

  async loadAfterExtend(extend: Hook | null): Promise<void> {
    if (extend) {
      await extend.executeAfterHook();
    }
  }

  async invokeMethod(componentInstance: any, method: string, data: any) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const result = await componentInstance[method](data);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  }

  async executeCommand(): Promise<any> {
    const inputs = getServiceInputs(this.componentConfig, this.version, {
      method: this.method,
      credentials: this.credentials,
    });
    let { name } = getServiceConfigDetail(this.componentConfig);
    const regirstry = configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
    const componentClass = await loadComponent(name, regirstry);
    const data = await this.invokeMethod(componentClass, this.method, inputs);
    return data;
  }

  async startExecute(): Promise<any> {
    let outData = {};
    const tempParams = process.env.temp_params || '';
    const helpArgs = tempParams.includes('--help') || tempParams.includes('-h');
    const extend = process.env['skip-actions'] === 'true' || helpArgs ? null : await this.loadExtends();
    await this.loadPreExtends(extend);
    outData = await this.executeCommand();
    await this.loadAfterExtend(extend);
    return outData;
  }
}
