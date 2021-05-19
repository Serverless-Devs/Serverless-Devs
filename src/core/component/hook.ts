import fs from 'fs';
import path from 'path';
import {logger} from '../../utils';
import {PluginExeCute} from '../plugin';

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
            logger.info('Start the pre-action');
            for (let i = 0; i < this.preHooks.length; i++) {
                let hookIndex = i;
                logger.info(`Action: ${this.preHooks[hookIndex].Hook || this.preHooks[hookIndex].Plugin}`);
                await this.executeByConfig(this.preHooks[hookIndex]);
            }
            logger.info('End the pre-action');
        }
    }

    async executeAfterHook() {
        if (this.afterHooks.length > 0) {
            logger.info('Start the after-action');
            for (let i = 0; i < this.afterHooks.length; i++) {
                let hookIndex = i;
                logger.info(`Action: ${this.afterHooks[hookIndex].Hook || this.afterHooks[hookIndex].Plugin}`);
                await this.executeByConfig(this.afterHooks[hookIndex]);
            }
            logger.info('End the after-action');
        }
    }

    async commandExecute(command: string, executePath: string | undefined) {
        const currentDir = process.cwd();
        const cwdPath = executePath ? path.resolve(currentDir, executePath) : currentDir;
        if (fs.existsSync(cwdPath) && fs.lstatSync(cwdPath).isDirectory()) {
            process.env['next-command-execute-flag'] = 'true';
            const result = spawnSync(command, [], {cwd: cwdPath, stdio: 'inherit', shell: true});
            if (result && result.status !== 0) {
                throw new Error(`Action [${command}] run error.`)
            }
        }
    }

    async pluginExecute(name: string) {
        const pluginInstance = new PluginExeCute({name});
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
