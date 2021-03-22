import fs from 'fs';
import path from 'path';

import logger from '../utils/logger';

import { PluginExeCute } from '../plugin';
const spawnSync = require('child_process').spawnSync;

export interface HookConfig {
  Pre: boolean;
  Plugin?: string;
  Hook?: string;
  Path?: string;
}

export class Hook {
  preHooks: HookConfig[] = [];
  afterHooks: HookConfig[] = [];

  constructor(extendsParams: HookConfig[] = []) {
    extendsParams.forEach((_extend: HookConfig) => {
      if (_extend.Pre) {
        this.preHooks.push(_extend);
      } else {
        this.afterHooks.push(_extend);
      }
    });
  }

  async executePreHook() {
    if (this.preHooks.length > 0) {
      logger.info('Start the pre-hook');
      for (let i = 0; i < this.preHooks.length; i++) {
        logger.info(`[Hook / Plugin] ${this.preHooks[i].Hook || this.preHooks[i].Plugin}`);
        await this.executeByConfig(this.preHooks[i]);
      }
      logger.info('End the pre-hook');
    }
  }

  async executeAfterHook() {
    if (this.afterHooks.length > 0) {
      logger.info('Start the after-hook');
      // 2020-9-23 修复afterHooks无法处理的bug
      for (let i = 0; i < this.afterHooks.length; i++) {
        // logger.info(`[Hook / Plugin] ${this.afterHooks[i].Hook || this.afterHooks[i].Plugin}`);
        // try {
        await this.executeByConfig(this.afterHooks[i]);
        // } catch (ex) {
        //   process.env['project_error'] = String(true)
        //   const thisMessage = `> Execute Error: ${this.preHooks[i].Hook || this.preHooks[i].Plugin}\n${ex}`
        //   const tempMessage = process.env['project_error_message'] ? process.env['project_error_message'] + "\n" : ""
        //   process.env['project_error_message'] = tempMessage + thisMessage
        //   logger.error(`[Hook / Plugin] [Error]: ${ex.stdout || ex.stderr}`);
        // }
      }
      logger.info('End the after-hook');
    }
  }

  async commandExecute(command: string, executePath: string | undefined) {
    const currentDir = process.cwd();
    const cwdPath = executePath ? path.resolve(currentDir, executePath) : currentDir;
    if (fs.existsSync(cwdPath) && fs.lstatSync(cwdPath).isDirectory()) {
      process.env['next-command-execute-flag'] = 'true';
      logger.info('Executing ...');
      const result = spawnSync(command, [], { cwd: cwdPath, stdio: 'inherit', shell: true });
      if (result && result.status !== 0) {
        throw Error("> Execute Error")
      }
    }
  }

  async pluginExecute(name: string) {
    const pluginInstance = new PluginExeCute({ name });
    await pluginInstance.init();
    const pluginModule = await pluginInstance.loadPlugin();
    pluginModule.apply(null, []);
  }

  async executeByConfig(hookConfig: HookConfig) {
    if (hookConfig.Hook) {
      await this.commandExecute(hookConfig.Hook, hookConfig.Path);
    } else if (hookConfig.Plugin) {
      await this.pluginExecute(hookConfig.Plugin);
    }
  }
}
