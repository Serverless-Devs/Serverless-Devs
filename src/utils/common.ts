/** @format */

import path from 'path';
import fs from 'fs';
import { get, trim, assign, filter, includes, keys, omit } from 'lodash';
import os from 'os';
import core, { getCoreVersion } from './core';
import { getConfig } from './handler-set-config';

const pkg = require('../../package.json');
const {
  colors,
  makeUnderLine,
  got,
  Logger,
  isDebugMode,
  getMAC,
  isDocker,
  isCiCdEnv,
  getGlobalArgs,
  getYamlContent,
  getRootHome,
  getCredential,
  getCredentialFromEnv,
} = core;

export const red = colors.hex('#fd5750');
export const yellow = colors.hex('#F3F99D');
export const bgRed = colors.hex('#000').bgHex('#fd5750');

export const getProcessArgv = () => {
  const { serverless_devs_temp_argv } = process.env;
  try {
    const tempArgv = JSON.parse(serverless_devs_temp_argv);
    const data = getGlobalArgs(tempArgv);
    // 修复 argv 参数
    process.argv = process.argv.slice(0, 2).concat(data._argsObj);
    return assign({}, data, {
      noHelpArgv: process.argv.slice(0, 2).concat(filter(data._argsObj, o => !includes(['-h', '--help'], o))),
    });
  } catch (error) {
    return {};
  }
};

export const getCredentialAliasList = async () => {
  let accessList = [];
  const accessInfo = await getYamlContent(path.join(getRootHome(), 'access.yaml'));
  if (accessInfo) {
    accessList = keys(accessInfo);
  }
  const data = await getCredentialFromEnv();
  if (data) {
    accessList = filter(accessList, o => o !== data.Alias);
    accessList.push(data.Alias);
  }
  return accessList;
};

export const getCredentialWithExisted = async (access: string) => {
  const data = await getCredentialAliasList();
  if (includes(data, access)) {
    const info = await getCredential(access);
    return omit(info, 'Alias');
  }
};

export const getCredentialWithAll = async () => {
  const data = await getCredentialAliasList();
  if (data.length > 0) {
    const res = {};
    for (const access of data) {
      const info = await getCredential(access);
      res[info.Alias] = omit(info, 'Alias');
    }
    return res;
  }
};

export const aiRequest = (message, category: string = 'unknow') => {
  try {
    const analysis = getConfig('analysis');
    if (analysis !== 'enable') return;
    // 在CICD环境中不处理
    if (isDocker() || isCiCdEnv()) return;
    return got(`http://qaapis.devsapp.cn/apis/v1/search?category=${category}&code=TypeError&s=${message}`, {
      timeout: 2000,
      json: true,
    }).then(list => {
      const shorturl = get(list.body, 'shorturl');
      if (shorturl) {
        console.log(`AI Tips:\nYou can try to solve the problem through: ${colors.underline(shorturl)}\n`);
      }
    });
  } catch (error) {
    // exception
  }
};
export const getPid = () => {
  try {
    return getMAC().replace(/:/g, '');
  } catch (error) {
    return 'unknown';
  }
};

export function getVersion() {
  const coreVersion = getCoreVersion();
  const platform = `${process.platform}-${process.arch}`;
  const nodeVersion = `node-${process.version}`;
  const coreVersionStr = `core: ${coreVersion}`;
  const homeWork = `s-home: ${core.getRootHome()}`;
  const pkgVersion = `${pkg.name}: ${pkg.version}`;

  return coreVersion
    ? `${pkgVersion}, ${coreVersionStr}, ${homeWork}, ${platform}, ${nodeVersion}`
    : `${pkgVersion}, ${homeWork}, ${platform}, ${nodeVersion}`;
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

export function printn(n: number, str = ' ') {
  let temp_str = '';
  for (let i = 0; i < n; i++) {
    temp_str = temp_str + str;
  }
  return temp_str;
}

export function getLang() {
  return 'en';
  // try {
  //   let lang: string = getConfig('locale');
  //   if (_.isEmpty(lang)) {
  //     const langKey = osLocale.sync();
  //     const obj = {
  //       'en-US': 'en',
  //       'zh-CN': 'zh',
  //     };
  //     lang = _.get(obj, langKey, 'zh');
  //   }
  //   return lang;
  // } catch (e) {
  //   return 'zh';
  // }
}
export function replaceFun(str, obj) {
  const reg = /\{\{(.*?)\}\}/g;
  let arr = str.match(reg);
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      let keyContent = arr[i].replace(/{{|}}/g, '');
      let realKey = trim(keyContent.split('|')[0]);
      if (obj[realKey]) {
        str = str.replace(arr[i], obj[realKey]);
      }
    }
  }

  return str;
}

export function getTemplatekey(str) {
  const reg = /\{\{(.*?)\}\}/g;
  const arr = str.match(reg);
  if (!arr) {
    return [];
  }
  return arr
    .filter(result => result)
    .map(matchValue => {
      let keyContent = matchValue.replace(/{{|}}/g, '');
      let realKey = keyContent.split('|');
      return {
        name: trim(realKey[0]),
        desc: trim(realKey[1]),
      };
    });
}

export function replaceTemplate(files: Array<string>, content: { [key: string]: string }) {
  files.forEach((path: string) => {
    if (fs.existsSync(path)) {
      const oldFileContent = fs.readFileSync(path, 'utf-8');
      const newFileContent = replaceFun(oldFileContent, content);
      fs.writeFileSync(path, newFileContent, 'utf-8');
    }
  });
}

export function mark(source: string): string {
  if (!source) {
    return source;
  }
  const subStr = source.slice(-4);
  return `***********${subStr}`;
}

export function emoji(text: string, fallback?: string) {
  if (os.platform() === 'win32') {
    return fallback || '◆';
  }
  return `${text} `;
}
