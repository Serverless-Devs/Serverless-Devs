/** @format */

import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import { getConfig } from './handler-set-config';
import os from 'os';
import osLocale from 'os-locale';
import getCore from './s-core';
const { colors } = getCore();

export const red = colors.hex('#fd5750');
export const bgRed = colors.hex('#000').bgHex('#fd5750');

function checkTemplateFormat(filePath: string, json = false) {
  const content = fs.readFileSync(filePath, 'utf8');
  let fileObj = json ? JSON.parse(content) : yaml.load(content);
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
  try {
    let lang: string = getConfig('locale');
    if (_.isEmpty(lang)) {
      const langKey = osLocale.sync();
      const obj = {
        'en-US': 'en',
        'zh-CN': 'zh',
      };
      lang = _.get(obj, langKey, 'en');
    }
    return lang;
  } catch (e) {
    return 'en';
  }
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

export function emoji(emoji: string): string {
  return os.platform() === 'win32' ? '' : emoji;
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
