const fs = require('fs');
const path = require('path');
const os = require('os');
const util = require('util');
const inquirer = require('inquirer');
const exec = util.promisify(require('child_process').exec);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from 'axios';
import i18n from '../utils/i18n';
import { DownloadManager } from '../utils/download-manager';
import { GetManager } from '../config/get/get-manager';
import { AddManager } from '../config/add/add-manager';
import * as logger from '../utils/logger';
import { PackageType } from '../utils/package-type';
import { Hook } from './hook';
// eslint-disable-next-line no-unused-vars
import { Parse } from '../utils/parse';
import { ConfigError } from '../error/config-error';
import { SERVERLESS_CHECK_COMPONENT_VERSION } from '../constants/static-variable';
const S_COMPONENT_BASE_PATH = path.join(os.homedir(), `.s/components`);

const TYPE_MAP = {
  [PackageType.component]: 'Component',
  [PackageType.plugin]: 'Plugin',
  [PackageType.application]: 'Application'
};
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
  list: Array<string>;
  parse: Parse;
  parsedObj: any;
  method: string;
  params: string;
}

export async function synchronizeExecuteComponentList(
  list: any = [],
  index: any = 0,
  initData: any = {}
) {
  if (index >= 0 && index < list.length) {
    return await list[index]().then(async ({ name, data }: any) => {
      initData[name] = data;
      return await synchronizeExecuteComponentList(
        list,
        index + 1,
        initData
      );
    });
  }
  return initData;
}

export function generateSynchronizeComponentExeList(
  { list, parse, parsedObj, method, params }: GenerateComponentExeParams,
  equipment: (
    parse: Parse,
    projectName: string,
    parsedObj: any
  ) => Promise<ComponentConfig>
): Array<any> {
  return list.map((projectName) => {
    return () => {
      return new Promise(async (resolve, reject) => {
        try {
          parsedObj.Params = params || '';
          logger.info(i18n.__(`Start executing project {{projectName}}`, { projectName: projectName }));
          const projectConfig = await equipment(parse, projectName, parsedObj);
          const componentExecute = new ComponentExeCute(projectConfig, method);
          const Output = await componentExecute.init();
          parsedObj[projectName].Output = Output;
          logger.info(i18n.__(`Project {{projectName}} successfully to execute \n\t`, { projectName: projectName }));
          resolve({ name: projectName, data: Output });
        } catch (e) {
          if (String(e).indexOf('method does not exist') !== -1) {
            logger.error(i18n.__(`Project {{projectName}} doesn't have the method: {{method}}`, { projectName: projectName, method: method }));
            resolve({});
          } else {
            logger.error(e);
            logger.error(i18n.__(`Project {{projectName}} failed to execute`, { projectName: projectName }));
            resolve({ name: projectName, data: '' });
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
  constructor(
    protected componentConfig: ComponentConfig,
    protected method: string
  ) {
    if (!fs.existsSync(S_COMPONENT_BASE_PATH)) {
      fs.mkdirSync(S_COMPONENT_BASE_PATH);
    }
    let { Component: name } = this.componentConfig;
    this.componentPath = path.join(S_COMPONENT_BASE_PATH, `/${name}`);
    this.isPackageProject = fs.existsSync(
      path.join(this.componentPath, '/package.json')
    );
  }

  async init() {
    let { Component: name, Provider } = this.componentConfig;

    const providerOnlyPrefix = Provider.split('.')[0];
    let credentials = await this.getCredentials();

    if (!credentials) {
      credentials = await this.setCredentials(providerOnlyPrefix);
    }
    this.credentials = credentials;

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
          type: PackageType.component
        });
      }
      // 判断组件是否已存在
      const tempPath = path.join(S_COMPONENT_BASE_PATH, `/${name}-${providerOnlyPrefix}@${version}`);
      if (!(await fs.existsSync(tempPath))) {
        logger.info(i18n.__(`No component {{name}}-{{provider}}@{{version}} is found, it will be downloaded soon, this may take a few minutes......`, { name: name, version: version, provider: providerOnlyPrefix }));
        await this.downLoadAndUnCompressComponentV2(PackageType.component, name, providerOnlyPrefix, version);
      }
      this.componentPath = tempPath;
    }
    return await this.startExecute();
  }

  async getCredentials() {
    const { Provider, Access } = this.componentConfig;
    const configUserInput = { 'Provider': Provider, 'AliasName': Access };
    const getManager = new GetManager();
    await getManager.initAccessData(configUserInput);
    const providerMap: {
      [key: string]: any;
    } = await getManager.getUserSecretID(configUserInput);
    const accessData = Provider && Access ? providerMap : providerMap[`${Provider}.${Access || 'default'}`];
    if (accessData) {
      return accessData;
    }
    if (!Access) {

      // 2020-9-24 循环调用可能出现循环卡死
      if (process.env['next-command-execute-flag'] === 'true') {
        try {
          // 使用现有的缓存密钥
          return JSON.parse(process.env.temp_credentials || 'error');
        } catch (e) {
          // 抛出错误
          throw new ConfigError('Calling @serverless-devs/s tools in Extends requires configuring Access in Yaml.');
        }
      }

      logger.warning('\n');
      logger.warning('  You can configure the specified key in yaml. For example:');
      logger.warning(`\n  ${this.componentConfig.ProjectName}`);
      logger.warning(`    Component: ${this.componentConfig.Component}`);
      logger.warning(`    Provider: ${Provider}`);
      logger.warning('    Access: Fill in the specified key here');
      logger.warning('\n');
      let result = '';
      const selectObject = [];
      Object.keys(providerMap).forEach(item => {
        const temp = {
          name: item.startsWith('project') ? `${item.replace('project.', 'project: ')}` : `${item.replace(Provider + '.', Provider + ': ')}`,
          value: item
        };
        if (Provider) {
          if (item.startsWith(Provider) || item.startsWith('project')) {
            selectObject.push(temp);
          }
        } else {
          selectObject.push(temp);
        }
      });

      selectObject.push({ name: 'Create a new account', value: 'create' });
      await inquirer
        .prompt([
          {
            type: 'list',
            name: 'access',
            message: i18n.__('Please select an access:'),
            choices: selectObject
          }
        ])
        .then((answers: any) => {
          result = answers.access;
        });
      if (result === 'create') {
        return undefined;
      }
      return providerMap[result];

    }
    // 没找到密钥信息
    throw new ConfigError('Failed to get the specified key: {{access}}', {
      access: Access
    });

  }

  async setCredentials(provider: any) {
    const addManager = new AddManager();
    const result = await addManager.inputLengthZero(provider);

    // 2020-9-23 修复部署过程中增加密钥信息，无法存储到系统的bug
    const inputProviderAlias = `${provider}.${addManager.aliasName || 'default'}`;
    addManager.inputFullData[inputProviderAlias] = result;
    addManager.writeData(addManager.globalFilePath, addManager.inputFullData);

    return result;
  }

  componentExist(): boolean {
    return fs.existsSync(this.componentPath);
  }

  async getRemoteComponentVersion({
    name,
    provider,
    type
  }: VersionCheckParams) {
    const url = SERVERLESS_CHECK_COMPONENT_VERSION;
    let version = null;
    try {
      const result: any = await axios.get(url, {
        params: {
          name,
          provider,
          type: TYPE_MAP[type]
        }
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
    const { Component: name } = this.componentConfig;
    const pkgFile = path.join(S_COMPONENT_BASE_PATH, `/${name}/package.json`);
    if (!fs.existsSync(pkgFile)) {
      return null;
    }
    const componentPackageJsonObj = require(pkgFile);
    return componentPackageJsonObj.version;
  }

  private async preLoadNodeModules() {
    if (
      this.isPackageProject &&
      !fs.existsSync(path.join(this.componentPath, 'node_modules'))
    ) {
      logger.info('npm install');
      const { stdout, stderr } = await exec('npm install', {
        cwd: this.componentPath
      });
      if (stderr) {
        logger.error(stderr);
      } else {
        logger.info(stdout);
      }
    }
  }

  async downLoadAndUnCompressComponent(
    type: PackageType,
    name: string,
    provider: string
  ) {
    const downloadManager = new DownloadManager();
    const componentPath = path.join(S_COMPONENT_BASE_PATH, `/${name}`);
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath);
    }
    await downloadManager.downloadTemplateFromAppCenter(
      type,
      name,
      componentPath,
      provider
    );
  }

  async downLoadAndUnCompressComponentV2(
    type: PackageType,
    name: string,
    provider: string,
    version: string
  ): Promise<void> {
    const downloadManager = new DownloadManager();
    const componentPath = path.join(S_COMPONENT_BASE_PATH, `/${name}-${provider}@${version}`);
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath);
    }
    await downloadManager.downloadTemplateFromAppCenter(
      type,
      name,
      componentPath,
      provider
    );
  }

  private loadExtends(): Hook | null {
    const { Extends = {} } = this.componentConfig;
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
    const {
      Properties,
      Params,
      Provider,
      Access,
      Component,
      ProjectName
    } = this.componentConfig;

    const inputs = {
      Properties,
      Credentials: this.credentials,
      Project: {
        ProjectName,
        Component,
        Provider: Provider,
        AccessAlias: Access || ''
      },
      Command: this.method,
      Args: Params || ''
    };
    const ComponentClass = await this.loadComponent();

    const data = await this.invokeMethod(
      ComponentClass,
      this.method,
      inputs
    );
    return data;
  }

  async startExecute(): Promise<any> {
    let outData = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const extend = process.env['skip-extends'] === 'true' ? null : await this.loadExtends();
    await this.loadPreExtends(extend);
    outData = await this.executeCommand();
    await this.loadAfterExtend(extend);
    return outData;
  }
}
