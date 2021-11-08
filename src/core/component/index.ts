/** @format */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { PackageType } from '../../entiry';
import { DEFAULT_REGIRSTRY } from '../../constants/static-variable';
import { version, Parse } from '../../specification';
import { configSet, logger } from '../../utils';
import { Hook } from './hook';
import { HandleError, HumanError, HumanWarning } from '../../error';
import core from '../../utils/core';
const { getCredential, loadComponent, jsyaml: yaml, colors } = core;

const { getServiceConfigDetail, getServiceInputs, getServiceActions } = version;
const S_COMPONENT_BASE_PATH = path.join(os.homedir(), '.s', 'components');

export interface ComponentConfig {
  component: string;
  provider: string;
  Access?: string;
  access?: string;
  Extends: any;
  props: { [key: string]: any };
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
        parsedObj.Params = params || '';
        logger.info(`Start executing project ${projectName}`);
        const projectConfig = await equipment(parse, projectName, parsedObj);
        if (process.env['serverless_devs_temp_access']) {
          projectConfig.Access = process.env['serverless_devs_temp_access'];
          projectConfig.access = process.env['serverless_devs_temp_access'];
        }
        const componentExecute = new ComponentExeCute({
          componentConfig: projectConfig,
          method,
          version: parsedObj.edition,
        });
        const Output = await componentExecute.init();
        if (parsedObj.edition) {
          //  兼容新版规范
          parsedObj.services[projectName].output = Output;
        } else {
          parsedObj[projectName].Output = Output;
        }
        logger.info(`Project ${projectName} successfully to execute \n\t`);
        resolve({ name: projectName, data: Output });
      });
    };
  });
}

interface IComponentExeCute {
  componentConfig: ComponentConfig;
  method: string;
  version: string;
  customerCommandName?: string; // 存在说明是 服务级操作
}

export class ComponentExeCute {
  private credentials: any;
  private componentConfig: ComponentConfig;
  private method: string;
  private version: string = '0.0.1';
  private customerCommandName: string;

  constructor(config: IComponentExeCute) {
    this.componentConfig = config.componentConfig;
    this.method = config.method;
    this.version = config.version;
    this.customerCommandName = config.customerCommandName;
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
      const accessInfo = accessFileInfo[access] ? await getCredential(access) : {};
      this.componentConfig.access = access;
      return accessInfo;
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
    // 服务级操作
    if (this.customerCommandName) {
      if (componentInstance[method]) {
        // 方法存在，执行报错，退出码101
        try {
          const result = await componentInstance[method](data);
          return result;
        } catch (error) {
          await new HandleError({
            error,
            prefix: `Project ${this.componentConfig.ProjectName} failed to execute:`,
          }).report(error);
          process.exit(101);
        }
      }
      // 方法不存在，此时系统将会认为是未找到组件方法，系统的exit code为100；
      new HumanError({
        errorMessage: `The [${this.method}] command was not found.`,
        tips: `Please check the component ${this.componentConfig.component} has the ${
          this.method
        } method. Serverless Devs documents：${colors.underline(
          'https://github.com/Serverless-Devs/Serverless-Devs/tree/docs/docs/zh/command',
        )}`,
      });
      process.exit(100);
    }
    // 应用级操作
    if (componentInstance[method]) {
      // 方法存在，执行报错，退出码101
      try {
        const result = await componentInstance[method](data);
        return result;
      } catch (error) {
        await new HandleError({
          error,
          prefix: `Project ${this.componentConfig.ProjectName} failed to execute:`,
        }).report(error);
        process.exit(101);
      }
    } else {
      // 方法不存在，进行警告，但是并不会报错，最终的exit code为0；
      new HumanWarning({
        warningMessage: `The [${this.method}] command was not found.`,
        tips: `Please check the component ${this.componentConfig.component} has the ${
          this.method
        } method, Serverless Devs documents：${colors.underline(
          'https://github.com/Serverless-Devs/Serverless-Devs/tree/docs/docs/zh/command',
        )}`,
      });
    }
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
