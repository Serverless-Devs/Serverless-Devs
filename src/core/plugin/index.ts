import fs from 'fs';
import path from 'path';
import os from 'os';
const S_PLUGIN_BASE_PATH = path.join(os.homedir(), '.s', 'plugins');

export interface PluginConifg {
  name: string;
}

export class PluginExeCute {
  protected pluginPath: string;

  constructor(protected pluginConfig: PluginConifg) {
    if (!fs.existsSync(S_PLUGIN_BASE_PATH)) {
      fs.mkdirSync(S_PLUGIN_BASE_PATH);
    }
    const { name } = this.pluginConfig;
    this.pluginPath = path.join(S_PLUGIN_BASE_PATH, name);
  }
  async init() {
    const { name } = this.pluginConfig;
    if (!this.pluginExist()) {
      await this.downLoadPlugin(name);
    }
  }
  pluginExist() {
    return fs.existsSync(this.pluginPath);
  }
  

  async downLoadPlugin(name: string) {
   // const initManager = new InitManager();
    const pluginPath = path.join(S_PLUGIN_BASE_PATH, name);
    if (!fs.existsSync(pluginPath)) {
      fs.mkdirSync(pluginPath);
    }
    // await initManager.init(name, S_PLUGIN_BASE_PATH);
  }

  async loadPlugin() {
    const PluginModule = require(this.pluginPath);
    return PluginModule;
  }
}
