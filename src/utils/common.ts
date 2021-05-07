
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import { handlerProfileFile } from './handler-set-config';

function checkTemplateFormat(filePath: string, json = false) {
  const content = fs.readFileSync(filePath, 'utf8')
  let fileObj = json ? JSON.parse(content) : yaml.safeLoad(content);
  for (const eveKey in fileObj) {
    if (fileObj[eveKey].Component && fileObj[eveKey].Provider && fileObj[eveKey].Properties) {
      return true
    }
  }
  return false
}

export function checkAndReturnTemplateFile() {
  const currentDir = process.cwd();
  const index = process.argv.indexOf('-t') || process.argv.indexOf('--template');
  if (index !== -1) {
    const tempFileIndex = index + 1;
    const tempFileName = process.argv[tempFileIndex];
    if (tempFileName) {
      if (tempFileName.endsWith('.yaml') || tempFileName.endsWith('.yml') || tempFileName.endsWith('.json')) {
        const jsonType = tempFileName.endsWith('.json') ? true : false
        if (fs.existsSync(path.join(currentDir, tempFileName)) && checkTemplateFormat(path.join(currentDir, tempFileName), jsonType)) {
          process.argv.splice(index, 2);
          return path.join(currentDir, tempFileName);
        } else if (fs.existsSync(tempFileName) && checkTemplateFormat(tempFileName, jsonType)) {
          process.argv.splice(index, 2);
          return tempFileName;
        }
      }
    }
  }
  if (fs.existsSync(path.join(currentDir, 's.yaml'))) {
    return path.join(currentDir, 's.yaml');
  }
  if (fs.existsSync(path.join(currentDir, 's.yml'))) {
    return path.join(currentDir, 's.yml');
  }
  if (fs.existsSync(path.join(currentDir, 's.json'))) {
    return path.join(currentDir, 's.json');
  }
  if (fs.existsSync(path.join(currentDir, 'template.yaml'))) {
    return path.join(currentDir, 'template.yaml');
  }
  if (fs.existsSync(path.join(currentDir, 'template.yml'))) {
    return path.join(currentDir, 'template.yml');
  }
  if (fs.existsSync(path.join(currentDir, 'template.json'))) {
    return path.join(currentDir, 'template.json');
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

export async function getLang() {
  try {
    return (await handlerProfileFile({ read: true, filePath: 'set-config.yml' })).locale || 'en';
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
  return arr.filter(result => result).map((matchValue) => {
    let keyContent = matchValue.replace(/{{|}}/g, '');
    let realKey = keyContent.split('|');
    return {
      name: _.trim(realKey[0]),
      desc: realKey[1] || ''
    }
  })
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
  if (!source) { return source; }
  const subStr = source.slice(-4);
  return `***********${subStr}`;
}

export default {
  checkAndReturnTemplateFile,
  checkTemplateFile,
  printn,
  mark,
  getLang,
  replaceTemplate,
  replaceFun,
  getTemplatekey
}
