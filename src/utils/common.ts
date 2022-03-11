/** @format */

import path from 'path';
import fs from 'fs';
import os from 'os';
import core, { getCoreVersion } from './core';
import { getConfig } from './handler-set-config';

const pkg = require('../../package.json');
const { colors, got, getMAC, isDocker, isCiCdEnv, getGlobalArgs, getCredential, getCredentialAliasList, lodash } = core;
const { get, trim, assign, filter, includes, omit } = lodash;

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

export const aiRequest = async (message, category: string = 'unknow') => {
  try {
    const analysis = getConfig('analysis');
    if (analysis !== 'enable') return;
    // 在CICD环境中不处理
    if (isDocker() || isCiCdEnv()) return;
    const list = await got(`http://qaapis.devsapp.cn/apis/v1/search?category=${category}&code=TypeError&s=${message}`, {
      timeout: 2000,
      json: true,
    });
    const shorturl = get(list.body, 'shorturl');
    if (shorturl) {
      console.log(`AI Tips:\nYou can try to solve the problem through: ${colors.underline(shorturl)}\n`);
    }
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
  const data = [
    `${pkg.name}: ${pkg.version}`,
    coreVersion ? `core: ${coreVersion}` : undefined,
    `s-home: ${core.getRootHome()}`,
    `${process.platform}-${process.arch}`,
    `node-${process.version}`,
  ];
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
