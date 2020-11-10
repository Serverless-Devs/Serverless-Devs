/** @format */

const fs = require('fs');
const path = require('path');
const os = require('os');
import axios from 'axios';
import {DownloadManager} from '../utils/download-manager';
import * as logger from '../utils/logger';
import {PackageType} from '../utils/package-type';
const S_PLUGIN_BASE_PATH = path.join(os.homedir(), `.s/plugins`);
import {SERVERLESS_CHECK_VERSION_URL} from '../constants/static-variable';
const TYPE_MAP: {[key: number]: string} = {
  [PackageType.component]: 'Component',
  [PackageType.plugin]: 'Plugin',
  [PackageType.application]: 'Application',
};
export interface PluginConifg {
  name: string;
}

export class PluginExeCute {
  protected pluginPath: string;

  constructor(protected pluginConfig: PluginConifg) {
    if (!fs.existsSync(S_PLUGIN_BASE_PATH)) {
      fs.mkdirSync(S_PLUGIN_BASE_PATH);
    }
    const {name} = this.pluginConfig;
    this.pluginPath = path.join(S_PLUGIN_BASE_PATH, `/${name}`);
  }
  async init() {
    const {name} = this.pluginConfig;

    if (!this.pluginExist()) {
      await this.downLoadPlugin(PackageType.plugin, name);
    } else {
      const localVersion = this.getLocalComponentVersion();
      const remoteVersion = await this.getRemotePluginVersion({name, type: PackageType.plugin});
      const isSameVersion = this.checkVersion(localVersion, remoteVersion);
      if (!isSameVersion) {
        await this.downLoadPlugin(PackageType.plugin, name);
      }
    }
  }
  pluginExist() {
    return fs.existsSync(this.pluginPath);
  }
  async getRemotePluginVersion({name, type}: {name: string; type: PackageType}) {
    let version = null;
    try {
      const result: any = await axios.get(SERVERLESS_CHECK_VERSION_URL, {
        params: {
          name,
          type: TYPE_MAP[type],
        },
      });
      if (result.data && result.data.Response && result.data.Response.Version) {
        version = result.data.Response.Version;
      } else {
        // throw new Error("Please Check the plugin name");
      }
    } catch (e) {
      logger.error(e.message);
    }
    return version;
  }
  getLocalComponentVersion() {
    const {name} = this.pluginConfig;
    const pkgFile = path.join(S_PLUGIN_BASE_PATH, `/${name}/package.json`);
    if (!fs.existsSync(pkgFile)) {
      return null;
    }
    const componentPackageJsonObj = require(pkgFile);
    return componentPackageJsonObj.version;
  }
  checkVersion(localVersion: string | null, remoteVersion: string) {
    return remoteVersion === localVersion;
  }
  async downLoadPlugin(type: PackageType, name: string) {
    const downloadManager = new DownloadManager();
    const pluginPath = path.join(S_PLUGIN_BASE_PATH, `/${name}`);
    if (!fs.existsSync(pluginPath)) {
      fs.mkdirSync(pluginPath);
    }
    await downloadManager.downloadTemplateFromAppCenter(type, name, pluginPath);
  }
  async loadPlugin() {
    const PluginModule = require(this.pluginPath);
    return PluginModule;
  }
}
