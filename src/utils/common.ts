/** @format */

import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import os from 'os';
import { HumanError } from '../error';
import core, { getCoreVersion } from './core';
const { colors, jsyaml: yaml, makeUnderLine, got, Logger, isDebugMode, getMAC, getYamlContent, isDocker, isCiCdEnv } = core;
const pkg = require('../../package.json');
import { getConfig } from './handler-set-config';

export const red = colors.hex('#fd5750');
export const yellow = colors.hex('#F3F99D');
export const bgRed = colors.hex('#000').bgHex('#fd5750');


const _AiRequest = (category, message) => {
  if(isDocker() || isCiCdEnv()) {
    // 在CICD环境中不处理
    return;
  }
  return got(`http://qaapis.devsapp.cn/apis/v1/search?category=${category}&code=TypeError&s=${message}`, {
    timeout: 2000,
    json: true,
  }).then((list) => {
    const shorturl = _.get(list.body, 'shorturl');
    if(shorturl) {
      console.log(`AI Tips:\nYou can try to solve the problem through: ${colors.underline(shorturl)}\n`);
    }
  }).catch(() => {
    // exception
  })
}

export const getErrorMessage = async (error: Error, prefix) => {
  const configOption = { traceId: '', catchableError: false };
  const getPid = () => {
    try {
      return getMAC().replace(/:/g, '');
    } catch (error) {
      return 'unknown';
    }
  }

  const analysis = getConfig('analysis');
  if (analysis !== 'disable') {
    configOption.traceId = `${getPid()}${Date.now()}`;
  }
  
  const isDebug = isDebugMode ? isDebugMode() : undefined;
  if(isDebug) {
    console.log(error);
    return configOption;
  }

  const message = error.message ? error.message : '';
  let jsonMsg;
  try {
    jsonMsg = JSON.parse(message);
  } catch (error) {}

  if(jsonMsg && jsonMsg.tips) {
    const messageStr = `Message: ${jsonMsg.message}\n` || '';
    const tipsStr = jsonMsg.tips ? `* ${makeUnderLine(jsonMsg.tips.replace(/\n/, "\n* "))}` : '';
    Logger.log(`\n${colors.hex('#000').bgYellow('WARNING:')}\n======================\n${tipsStr}\n`, 'yellow');
    console.log(colors.grey(messageStr));
    configOption.catchableError = true;
  } else {
    console.log(red(`✖ ${prefix}\n`));
    console.log(`${bgRed('ERROR:')}\n${message}\n`);
    if (analysis !== 'disable') {
      try {
        const templateFile = checkAndReturnTemplateFile();
        const content = await getYamlContent(templateFile);
        const category = _.get(_.first(_.values(_.get(content, 'services'))), 'component') || 'serverless-devs';
        await _AiRequest(category, message);
      } catch (error) {
        // throw error
      }
    }
  }

  return configOption;
}


export function getVersion() {
  const coreVersion = getCoreVersion();
  const platform = `${process.platform}-${process.arch}`;
  const nodeVersion = `node-${process.version}`;
  const coreVersionStr = `core: ${coreVersion}`;
  const homeWork = `s-home: ${core.getRootHome()}`;
  const pkgVersion  = `${pkg.name}: ${pkg.version}`;

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

export function yamlLoad(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    return yaml.load(content);
  } catch (error) {
    if (['-h', '--help'].includes(process.argv[2])) return;
    const filename = path.basename(filePath);
    new HumanError({
      errorMessage: `${filename} format is incorrect`,
      tips: `Please check the configuration of ${filename}, Serverless Devs' Yaml specification document can refer to：${colors.underline(
        'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/yaml.md',
      )}`,
    });
    process.exit(1);
  }
}

function checkTemplateFormat(filePath: string, json = false) {
  const content = fs.readFileSync(filePath, 'utf8');
  let fileObj = json ? JSON.parse(content) : yamlLoad(filePath);
  if (!fileObj) return false;
  for (const eveKey in fileObj) {
    if (fileObj[eveKey].Component && fileObj[eveKey].Provider && fileObj[eveKey].Properties) {
      return true;
    }
  }
  // 新版本规范
  return fileObj.hasOwnProperty('edition');
}

export function checkAndReturnTemplateFile() {
  if (process.env['serverless_devs_temp_template']) {
    return process.env['serverless_devs_temp_template'];
  }
  const currentDir = process.cwd();
  let templateTag = process.argv.includes('-t') ? '-t' : process.argv.includes('--template') ? '--template' : null;
  const index = templateTag ? process.argv.indexOf(templateTag) : -1;
  if (index !== -1) {
    const tempFileIndex = index + 1;
    const tempFileName = process.argv[tempFileIndex];
    if (tempFileName) {
      if (tempFileName.endsWith('.yaml') || tempFileName.endsWith('.yml') || tempFileName.endsWith('.json')) {
        const jsonType = tempFileName.endsWith('.json') ? true : false;
        if (
          fs.existsSync(path.join(currentDir, tempFileName)) &&
          checkTemplateFormat(path.join(currentDir, tempFileName), jsonType)
        ) {
          process.argv.splice(index, 2);
          // 对临时参数进行存储
          const tempArgv = JSON.parse(process.env['serverless_devs_temp_argv']);
          tempArgv.splice(tempArgv.indexOf(templateTag), 2);
          process.env['serverless_devs_temp_argv'] = JSON.stringify(tempArgv);
          process.env['serverless_devs_temp_template'] = path.join(currentDir, tempFileName);
          return path.join(currentDir, tempFileName);
        } else if (fs.existsSync(tempFileName) && checkTemplateFormat(tempFileName, jsonType)) {
          process.argv.splice(index, 2);
          // 对临时参数进行存储
          const tempArgv = JSON.parse(process.env['serverless_devs_temp_argv']);
          tempArgv.splice(tempArgv.indexOf(templateTag), 2);
          process.env['serverless_devs_temp_argv'] = JSON.stringify(tempArgv);
          process.env['serverless_devs_temp_template'] = tempFileName;
          return tempFileName;
        }
      }
    }
  }
  if (fs.existsSync(path.join(currentDir, 's.yaml')) && checkTemplateFormat(path.join(currentDir, 's.yaml'))) {
    process.env['serverless_devs_temp_template'] = path.join(currentDir, 's.yaml');
    return path.join(currentDir, 's.yaml');
  }
  if (fs.existsSync(path.join(currentDir, 's.yml')) && checkTemplateFormat(path.join(currentDir, 's.yml'))) {
    process.env['serverless_devs_temp_template'] = path.join(currentDir, 's.yml');
    return path.join(currentDir, 's.yml');
  }
  if (fs.existsSync(path.join(currentDir, 's.json')) && checkTemplateFormat(path.join(currentDir, 's.json'), true)) {
    process.env['serverless_devs_temp_template'] = path.join(currentDir, 's.json');
    return path.join(currentDir, 's.json');
  }
  return null;
}

export function checkTemplateFile(templateFile: string) {
  if (fs.existsSync(templateFile)) {
    return templateFile;
  }
  return null;
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
      let realKey = _.trim(keyContent.split('|')[0]);
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
        name: _.trim(realKey[0]),
        desc: _.trim(realKey[1]),
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


export default {
  checkAndReturnTemplateFile,
  checkTemplateFile,
  printn,
  mark,
  getLang,
  replaceTemplate,
  replaceFun,
  getTemplatekey,
};
