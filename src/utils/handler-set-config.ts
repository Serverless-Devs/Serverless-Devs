import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import storage from './storage';
interface ProfileParams {
  data?: any;
  configKey?: string;
  read?: boolean;
  filePath?: string;
}

interface Profile {
  [key: string]: any;
}

function setProfileFile(profile: Profile) {
  const profileFilePath = getDefaultProfilePath();
  fs.writeFileSync(profileFilePath, yaml.dump(profile));
}

function getProfileFile(): Profile {
  const profileFilePath = getDefaultProfilePath();
  if (!fs.existsSync(profileFilePath)) {
    return {};
  }
  try {
    const profileResult = yaml.safeLoad(fs.readFileSync(profileFilePath, 'utf8')) as Profile || {};
    return profileResult;
  } catch (e) {
    throw e;
  }
}

function getDefaultProfilePath(): string {
  const file = path.join(storage.getHomeDir(), 'set-config.yml');
  if (!fs.existsSync(file)) {
      fs.createFileSync(file);
  }
  return file;
}

export function setConfig(key: string, value: any) {
  const profile = getProfileFile();
  profile[key] = value;
  setProfileFile(profile);
}

export function getConfig(key: string): any {
  const profile = getProfileFile();
  return profile[key];
}

export async function handlerProfileFile(params: ProfileParams) {
  const filePath = params.filePath || 'set-config.yml';
  const profPath = path.join(os.homedir(), '.s', filePath);
  const isExists = fs.existsSync(profPath);
  let profile: Profile = {};
  // 如果文件和目录不存在则创建，存在则读取
  if (!isExists) {
    const configDir = path.join(os.homedir(), '.s');
    try {
      fs.statSync(configDir);
    } catch (e) {
      await fs.mkdirSync(configDir);
    }
  } else {
    try {
      profile = yaml.safeLoad(fs.readFileSync(profPath, 'utf8')) as Profile || {};
    } catch (e) {
      throw e;
    }
  }

  // 如果仅是读取，则拿到配置信息直接退出
  if (params.read) {
    return profile;
  }

  // 修改配置
  const configKey = params.configKey || '';
  profile[configKey] = params.data;
  await fs.writeFileSync(profPath, yaml.dump(profile));
  return profile;
}

export default {
  setConfig,
  getConfig,
  handlerProfileFile
}