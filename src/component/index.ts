/** @format */

const fs = require('fs');
const path = require('path');
const os = require('os');
const util = require('util');

import axios from 'axios';
import i18n from '../utils/i18n';
import {DownloadManager} from '../utils/download-manager';
import {GetManager} from '../config/get/get-manager';
import * as logger from '../utils/logger';
import {PackageType} from '../utils/package-type';
import {Hook} from './hook';
import {Parse} from '../utils/parse';
import {SERVERLESS_CHECK_COMPONENT_VERSION} from '../constants/static-variable';

const S_COMPONENT_BASE_PATH = path.join(os.homedir(), `.s/components`);
const spawnSync = require('child_process').spawnSync;
// const exec = util.promisify(require('child_process').exec);
const TYPE_MAP = {
  [PackageType.component]: 'Component',
  [PackageType.plugin]: 'Plugin',
  [PackageType.application]: 'Application',
};
export interface ComponentConfig {
  Component: string;
  Provider: string;
  Access?: string;
  Extends: any;
  Properties: {[key: string]: any};
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
    return await list[index]().then(async ({name, data}: any) => {
      initData[name] = data;
      return await synchronizeExecuteComponentList(list, index + 1, initData);
    });
  }
  return initData;
}

export function generateSynchronizeComponentExeList(
  {list, parse, parsedObj, method, params}: GenerateComponentExeParams,
  equipment: (parse: Parse, projectName: string, parsedObj: any) => Promise<ComponentConfig>,
): any[] {
  return list.map(projectName => {
    return () => {
      return new Promise(async (resolve, reject) => {
        try {
          parsedObj.Params = params || '';
          logger.info(i18n.__(`Start executing project {{projectName}}`, {projectName}));
          const projectConfig = await equipment(parse, projectName, parsedObj);
          const componentExecute = new ComponentExeCute(projectConfig, method);
          const Output = await componentExecute.init();
          parsedObj[projectName].Output = Output;
          logger.info(i18n.__(`Project {{projectName}} successfully to execute \n\t`, {projectName}));
          resolve({name: projectName, data: Output});
        } catch (e) {
          if (String(e).indexOf('method does not exist') !== -1) {
            process.env['project_error'] = String(true)
            const thisMessage = `> Project Method Error: ${projectName}\n${e}`
            const tempMessage = process.env['project_error_message'] ? process.env['project_error_message'] + "\n" : ""
            process.env['project_error_message'] = tempMessage + thisMessage
            logger.error(i18n.__(`Project {{projectName}} doesn't have the method: {{method}}`, {projectName, method}));
            resolve({});
          } else {
            process.env['project_error'] = String(true)
            const thisMessage = `> Project Run Error: ${projectName}\n${e}`
            const tempMessage = process.env['project_error_message'] ? process.env['project_error_message'] + "\n" : ""
            process.env['project_error_message'] = tempMessage + thisMessage
            logger.error(e);
            logger.error(i18n.__(`Project {{projectName}} failed to execute`, {projectName}));
            resolve({name: projectName, data: ''});
          }
        }
      });
    };
  });
}
export class ComponentExeCute {
  protected componentPath: string;
  protected credentials: any;
  protected isPackageProject = false;
  constructor(protected componentConfig: ComponentConfig, protected method: string) {
    if (!fs.existsSync(S_COMPONENT_BASE_PATH)) {
      fs.mkdirSync(S_COMPONENT_BASE_PATH);
    }
    const {Component: name} = this.componentConfig;
    this.componentPath = path.join(S_COMPONENT_BASE_PATH, `/${name}`);
    this.isPackageProject = fs.existsSync(path.join(this.componentPath, '/package.json'));
  }

  async init() {
    let {Component: name, Provider} = this.componentConfig;
    const providerOnlyPrefix = Provider.split('.')[0];
    this.credentials = (await this.getCredentials()) || {};

    // 将密钥缓存到临时环境变量中
    try {
      process.env.temp_credentials = JSON.stringify(this.credentials);
    } catch (e) {}

    let version;
    if (await fs.existsSync(name)) {
      this.componentPath = name;
    } else {
      if (name.indexOf('@') !== -1) {
        const temp = name.split('@');
        name = temp[0];
        version = temp[1];
        if (!(name && version)) {
          throw new Error('Could not get component name and version, please check you component content.');
        }
      } else {
        version = await this.getRemoteComponentVersion({
          name,
          provider: providerOnlyPrefix,
          type: PackageType.component,
        });
      }
      // 判断组件是否已存在
      const tempPath = path.join(S_COMPONENT_BASE_PATH, `/${name}-${providerOnlyPrefix}@${version}`);
      const tempPathFile = path.join(tempPath, '.s.lock')
      if (!(await fs.existsSync(tempPathFile))) {
        logger.info(
          i18n.__(
            `No component {{name}}-{{provider}}@{{version}} is found, it will be downloaded soon, this may take a few minutes......`,
            {name, version, provider: providerOnlyPrefix},
          ),
        );
        await this.downLoadAndUnCompressComponentV2(PackageType.component, name, providerOnlyPrefix, version);
        await fs.writeFileSync(tempPathFile, `${name}-${version}`)
      }
      this.componentPath = tempPath;
    }
    return await this.startExecute();
  }

  async getCredentials() {
    const {Provider, Access} = this.componentConfig;
    const configUserInput = {Provider, AliasName: Access};

    const getManager = new GetManager();
    await getManager.initAccessData(configUserInput);
    const providerMap: {
      [key: string]: any;
    } = await getManager.getUserSecretID(configUserInput);
    // console.log(providerMap)
    const accessData = Provider && Access ? providerMap : providerMap[`project.${Access || 'default'}`] || providerMap[`${Provider}.${Access || 'default'}`];

    return accessData || {}
  }

  componentExist(): boolean {
    return fs.existsSync(this.componentPath);
  }

  async getRemoteComponentVersion({name, provider, type}: VersionCheckParams) {
    const url = SERVERLESS_CHECK_COMPONENT_VERSION;
    let version = null;
    try {
      const result: any = await axios.get(url, {
        params: {
          name,
          provider,
          type: TYPE_MAP[type],
        },
      });
      if (result.data && result.data.Response && result.data.Response.Version) {
        version = result.data.Response.Version;
      } else {
        throw new Error('Please Check the provider and component');
      }
    } catch (e) {
      logger.error(e.message);
    }
    return version;
  }

  getLocalComponentVersion(): string | null {
    const {Component: name} = this.componentConfig;
    const pkgFile = path.join(S_COMPONENT_BASE_PATH, `/${name}/package.json`);
    if (!fs.existsSync(pkgFile)) {
      return null;
    }
    const componentPackageJsonObj = require(pkgFile);
    return componentPackageJsonObj.version;
  }

  private async preLoadNodeModules() {
    const havePackageJson = fs.existsSync(path.join(this.componentPath, '/package.json'))
    const haveNodeModules = fs.existsSync(path.join(this.componentPath, 'node_modules'))
    // console.log(havePackageJson,haveNodeModules )
    if (havePackageJson && !haveNodeModules) {
      logger.info('Installing dependencies ...');
      const result = spawnSync('npm install --registry=https://registry.npm.taobao.org', [], {cwd: this.componentPath, stdio:'inherit', shell: true});
      if(result && result.status !== 0){
        throw Error("> Execute Error")
      }
    }
  }

  async downLoadAndUnCompressComponent(type: PackageType, name: string, provider: string) {
    const downloadManager = new DownloadManager();
    const componentPath = path.join(S_COMPONENT_BASE_PATH, `/${name}`);
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath);
    }
    await downloadManager.downloadTemplateFromAppCenter(type, name, componentPath, provider);
  }

  async downLoadAndUnCompressComponentV2(
    type: PackageType,
    name: string,
    provider: string,
    version: string,
  ): Promise<void> {
    const downloadManager = new DownloadManager();
    const componentPath = path.join(S_COMPONENT_BASE_PATH, `/${name}-${provider}@${version}`);
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath);
    }
    await downloadManager.downloadTemplateFromAppCenter(type, name, componentPath, provider);
  }

  private loadExtends(): Hook | null {
    const {Extends = {}} = this.componentConfig;
    const method = this.method;
    let hookExecuteInstance = null;
    const hooks = Extends[method];
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

  async loadComponent() {
    await this.preLoadNodeModules(); // check and install node_module
    const componentModule = require(this.componentPath);
    return componentModule;
  }

  async invokeMethod(ComponentClass: any, method: string, data: any) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const componentInstance = new ComponentClass();
        const result = await componentInstance[method](data);
        resolve(result);
      } catch (e) {
        reject(new Error(e.message));
      }
    });
    return promise;
  }

  async executeCommand(): Promise<any> {
    const {Properties, Params, Provider, Access, Component, ProjectName} = this.componentConfig;

    const inputs = {
      Properties,
      Credentials: this.credentials,
      Project: {
        ProjectName,
        Component,
        Provider,
        AccessAlias: Access || '',
      },
      Command: this.method,
      Args: Params || '',
      Path: {
        ConfigPath: process.env.templateFile || '',
      },
    };
    const ComponentClass = await this.loadComponent();
    let data
    try{
      data = await this.invokeMethod(ComponentClass, this.method, inputs);
    }catch (ex){
      if(String(ex).includes("componentInstance[method] is not a function")){
        try{
          data = await this.invokeMethod(ComponentClass, "default", inputs);
        }catch (ex){
          logger.error("The specified method and default method were not found in the component")
        }
      }else{
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
