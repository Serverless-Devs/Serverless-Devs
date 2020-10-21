const os = require('os');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

interface ProfileParame {
  data?: any;
  configKey?: string;
  read?: boolean;
  filePath?: string;
}

interface Profile {
  [key: string]: any;
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

export async function handlerProfileFile(parame: ProfileParame) {
  const filePath = parame.filePath || 'set-config.yml';
  const profPath = path.join(os.homedir(), `.s/${filePath}`);
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
      profile = yaml.safeLoad(fs.readFileSync(profPath, 'utf8')) || {};
    } catch (e) {
      throw e;
    }
  }

  // 如果仅是读取，则拿到配置信息直接退出
  if (parame.read) {
    return profile;
  }

  // 修改配置
  const configKey = parame.configKey || '';
  profile[configKey] = parame.data;
  await fs.writeFileSync(profPath, yaml.dump(profile));
  return profile;
}


function setProfileFile(profile: Profile) {
  const profileFilePath = getDefaultProfilePath();
  fs.writeFileSync(profileFilePath, yaml.dump(profile));
}

function getProfileFile() : Profile {
  const profileFilePath = getDefaultProfilePath();
  if (!fs.existsSync(profileFilePath)) {
    return {};
  }
  try {
    return yaml.safeLoad(fs.readFileSync(profileFilePath, 'utf8')) || {};
  } catch (e) {
    throw e;
  }
}

function getDefaultProfilePath(): string {
  return path.join(os.homedir(), '.s', 'set-config.yml');
}
