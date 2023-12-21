import { maxBy, repeat, filter, get, each, isEmpty, find } from 'lodash';
import TableLayout from 'table-layout';
import { getRootHome, parseArgv } from '@serverless-devs/utils';
import fs from 'fs-extra';
import path from 'path';
import { IOutput, ENVIRONMENT_FILE_PATH, ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import logger from '@/logger';
import yaml from 'js-yaml';
const pkg = require('../../package.json');
import * as utils from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { ENV_COMPONENT_KEY, ENV_COMPONENT_NAME } from '@/command/env/constant';
import Credential from '@serverless-devs/credential';
import { IEnvArgs } from '@/type';
import assert from 'assert';
import stripAnsi from 'strip-ansi';

export { default as checkNodeVersion } from './check-node-version';
export { default as setProxy } from './set-proxy';
export { default as suggestCommand } from './suggest-command';
export { default as writeOutput } from './write-out-put';
export { emoji } from '@serverless-devs/utils';

export const formatHelp = (data: { command: string; description: string }[], indent = 0) => {
  const newData = filter(data, item => item.command !== 'help');
  const commandMaxLen = maxBy(newData, item => get(item, 'command.length')).command.length;
  const descMaxLen = maxBy(newData, item => get(item, 'description.length')).description.length;
  return new TableLayout(newData, {
    padding: { left: repeat(' ', indent + 2) },
    columns: [
      {
        name: 'command',
        width: commandMaxLen + 2 > 29 ? commandMaxLen + 2 : 29,
      },
      {
        name: 'description',
        width: descMaxLen + 10,
      },
    ],
  }).toString();
};

export const formatError = (data: { key: string; value: string }[]) => {
  const keyMaxLen = maxBy(data, item => get(item, 'key.length')).key.length;
  const valueMaxLen = maxBy(data, item => get(item, 'value.length')).value.length;
  return new TableLayout(data, {
    padding: { left: '' },
    columns: [
      {
        name: 'key',
        width: keyMaxLen + 2,
      },
      {
        name: 'value',
        width: valueMaxLen + 10,
      },
    ],
  }).toString();
};

export const getPkgInfo = (key: string) => pkg[key];

export function getVersion() {
  const data = [`${pkg.name}: ${pkg.version}`, `s-home: ${getRootHome()}`, `${process.platform}-${process.arch}`, `node-${process.version}`];
  return data.filter(o => o).join(', ');
}

export async function getFolderSize(rootItemPath: string) {
  const fileSizes = new Map();
  await processItem(rootItemPath);
  async function processItem(itemPath: string) {
    const stats = fs.lstatSync(itemPath);
    if (typeof stats !== 'object') return;
    fileSizes.set(stats.ino, stats.size);
    if (stats.isDirectory()) {
      const directoryItems = fs.readdirSync(itemPath);
      if (typeof directoryItems !== 'object') return;
      await Promise.all(directoryItems.map(directoryItem => processItem(path.join(itemPath, directoryItem))));
    }
  }
  const folderSize = Array.from(fileSizes.values()).reduce((total, fileSize) => total + fileSize, 0);
  return folderSize;
}

export const isJson = (value: string, key: string = '-p/--props') => {
  try {
    return JSON.parse(value);
  } catch (e) {
    throw new Error(`${key} parameter format error`);
  }
};

export const showOutput = (data: any) => {
  logger.unsilent();
  const { output = IOutput.DEFAULT, silent } = parseArgv(process.argv.slice(2));
  if (output === IOutput.JSON) {
    data = stripAnsi(data);
    return logger.write(JSON.stringify(data, null, 2));
  }
  if (output === IOutput.RAW) {
    data = stripAnsi(data);
    return logger.write(JSON.stringify(data));
  }
  if (output === IOutput.YAML) {
    data = stripAnsi(data);
    return logger.write(yaml.dump(data));
  }
  logger.output(data);
  if (silent) logger.silent();
  return;
};

// 运行环境组件
export const runEnvComponent = async (args: IEnvArgs, access: any) => {
  const componentName = utils.getGlobalConfig(ENV_COMPONENT_KEY, ENV_COMPONENT_NAME);
  const componentLogger = logger.loggerInstance.__generate(componentName);
  const instance = await loadComponent(componentName, { logger: componentLogger });

  try {
    const infraStackInfo = await instance.env({
      cwd: process.cwd(),
      userAgent: utils.getUserAgent({ component: instance.__info }),
      getCredential: async () => {
        const res = await new Credential({ logger: componentLogger }).get(access);
        const credential = get(res, 'credential', {});
        each(credential, v => {
          logger.loggerInstance.__setSecret([v]);
        });
        return credential;
      },
      ...args,
    });
    return infraStackInfo;
  } catch (error) {
    throw new utils.DevsError(error.message, {
      stack: error.stack,
      exitCode: 101,
    });
  }
};

// 尝试获取uid
export const getUid = async (access: string) => {
  try {
    const res = await new Credential({ logger }).get(access);
    return get(res, 'credential.AccountID');
  } catch (error) {}
};

// 获取默认环境
export const getDefaultEnv = () => {
  const envFile = utils.getAbsolutePath(ENVIRONMENT_FILE_NAME);
  if (!fs.existsSync(envFile)) return null;
  const envYamlContent = utils.getYamlContent(envFile);
  const project = get(envYamlContent, 'project');
  if (!project) return null;
  if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
    const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
    const currentDefaultEnv = defaultEnvContent?.find(i => i.project === project && i.path === envFile);
    if (!isEmpty(currentDefaultEnv) && fs.existsSync(currentDefaultEnv.path)) {
      return currentDefaultEnv.default;
    }
    return null;
  } else {
    return null;
  }
};

// 若有env参数或者默认env，运行组件
export const runEnv = async (env: string | boolean) => {
  if (typeof env === 'boolean') return;
  if (isEmpty(env)) {
    env = getDefaultEnv();
    if (isEmpty(env)) return;
  }
  const template = path.join(process.cwd(), ENVIRONMENT_FILE_NAME);
  const { environments } = utils.getYamlContent(template);
  const data = find(environments, item => item.name === env);
  assert(data, `The environment ${env} was not found`);
  const { access, ...rest } = data;

  const inputs = {
    props: {
      ...rest,
    },
    command: 'env',
    args: ['deploy'],
  };

  await runEnvComponent(inputs, access);
};

export const getSchema = async (componentName: string) => {
  const componentLogger = logger.loggerInstance.__generate(componentName);
  const instance = await loadComponent(componentName, { logger: componentLogger });
  if (!instance || !instance.getSchema) return null;
  return instance.getSchema();
};
