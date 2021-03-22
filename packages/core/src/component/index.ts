
import fs from 'fs';
import path from 'path';
import os from 'os';

import { PackageType } from '@serverless-devs/entity';
import { loadComponent } from '@serverless-devs/core';
import { configSet } from '@serverless-devs-cli/util';
import { version, Parse } from '@serverless-devs-cli/specification';
import i18n from '../utils/i18n';
import logger from '../utils/logger';
import { GetManager } from './get-manager';
import { Hook } from './hook';
const { getServiceConfigDetail, getServiceInputs, getServiceActions } = version;
const S_COMPONENT_BASE_PATH = path.join(os.homedir(), '.s', 'components');
const DEFAULT_REPO = 'Serverless-Devs-Awesome';
const DEFAULT_REGIRSTRY = 'https://api.github.com/repos';
export interface ComponentConfig {
  Component: string;
  Provider: string;
  Access?: string;
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
  equipment: (parse: Parse, projectName: string, parsedObj: any) => Promise<ComponentConfig>
): any[] {
  return list.map(projectName => {
    return () => {
      return new Promise(async (resolve, reject) => {
        try {
          parsedObj.Params = params || '';
          logger.info(i18n.__(`Start executing project {{projectName}}`, { projectName }));
          const projectConfig = await equipment(parse, projectName, parsedObj);
          const componentExecute = new ComponentExeCute(projectConfig, method, parsedObj.edition);
          const Output = await componentExecute.init();
          if (parsedObj.edition) { //  兼容新版规范
            parsedObj.services[projectName].outPut = Output;
          } else {
            parsedObj[projectName].Output = Output;
          }

          logger.info(i18n.__(`Project {{projectName}} successfully to execute \n\t`, { projectName }));
          resolve({ name: projectName, data: Output });
        } catch (e) {
          logger.error(e);
          logger.error(i18n.__(`Project {{projectName}} failed to execute`, { projectName }));
          resolve({});
        }
      });
    };
  });
}
export class ComponentExeCute {
  protected credentials: any;
  constructor(protected componentConfig: ComponentConfig, protected method: string, protected version: string = '0.0.1') {
    if (!fs.existsSync(S_COMPONENT_BASE_PATH)) {
      fs.mkdirSync(S_COMPONENT_BASE_PATH);
    }
  }

  async init() {

    this.credentials = (await this.getCredentials()) || {};
    // 将密钥缓存到临时环境变量中
    try {
      process.env.temp_credentials = JSON.stringify(this.credentials);
    } catch (e) { }
    return await this.startExecute();
  }

  async getCredentials() {
    const { access, provider } = getServiceConfigDetail(this.componentConfig);
    const configUserInput = { Provider: provider, AliasName: access };
    const getManager = new GetManager();
    await getManager.initAccessData(configUserInput);
    const providerMap: {
      [key: string]: any;
    } = await getManager.getUserSecretID(configUserInput);
    const accessData = provider && access ? providerMap : providerMap[`project.${access || 'default'}`] || providerMap[`${provider}.${access || 'default'}`];
    return accessData || {}
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
        reject(new Error(e.message));
      }
    });
    return promise;
  }

  async executeCommand(): Promise<any> {
    const inputs = getServiceInputs(this.componentConfig, this.version, { method: this.method, credentials: this.credentials })
    let { name } = getServiceConfigDetail(this.componentConfig);
    if (name.split('/').length === 1) {
      const provider = configSet.getConfig('repo') || DEFAULT_REPO;
      name = `${provider}/${name}`;
    }
    const regirstry = configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
    const componentClass = await loadComponent(name, regirstry);
    let data
    try {
      data = await this.invokeMethod(componentClass, this.method, inputs);
    } catch (ex) {
      if (String(ex).includes("componentInstance[method] is not a function")) {
        try {
          data = await this.invokeMethod(componentClass, "default", inputs);
        } catch (ex) {
          logger.error("The specified method and default method were not found in the component")
        }
      } else {
        throw Error(ex)
      }
    }

    return data;
  }

  async startExecute(): Promise<any> {
    let outData = {};
    const tempParams = process.env.temp_params || ""
    const helpArgs = tempParams.includes("--help") || tempParams.includes("-h")
    const extend = process.env['skip-extends'] === 'true' || helpArgs ? null : await this.loadExtends();
    await this.loadPreExtends(extend);
    outData = await this.executeCommand();
    await this.loadAfterExtend(extend);
    return outData;
  }
}
