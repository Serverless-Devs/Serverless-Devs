import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import * as inquirer from 'inquirer';
import { loadApplication } from '@serverless-devs/core';
import { configSet, logger, i18n } from '../utils';
import { DEFAULT_REGIRSTRY, APPLICATION_TEMPLATE } from './init-config';
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export class InitManager {
    constructor() {
    }
    private generateUUID(): string {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    }

    async executeInit(name: string, dir?: string, downloadurl?: boolean) {
        const tmpDir = path.join(os.tmpdir(), this.generateUUID());
        try {
            logger.info(i18n.__('Initializing......'));
            const appName = name.split('/')[1] || name;
            const registry = downloadurl ? downloadurl : configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
            fs.mkdirSync(tmpDir);
            const result = await loadApplication(name, registry, tmpDir);
            const appSrc = path.join(result, 'src');
            if (!dir) {
                dir = process.cwd();
            }
            fs.copySync(appSrc, path.join(dir, appName), { dereference: true });
            fs.removeSync(tmpDir);
            logger.success(i18n.__('Initialization successfully'));
        } catch (e) {
            logger.error(e.message);
            fs.removeSync(tmpDir);
        }

    }
    async gitCloneProject(name: string, dir?: string) {
        return new Promise((resolve) => {
            const gitCmd = spawn('git', ['clone', name], { shell: true, cwd: dir ? dir : './', stdio: ['ignore', 'inherit', 'inherit'] });
            gitCmd.on('close', (code) => {
                resolve({ code });
            });
        })
    }

    async init(name: string, dir?: string) {
        if (!name) {
            inquirer.prompt(APPLICATION_TEMPLATE).then(async (answers) => {
                const appKey = Object.keys(answers)[0];
                const appName = answers[appKey];
                const formatName = appName.substr(appName.lastIndexOf('/') + 1);
                await this.executeInit(formatName, dir, appName);
            });
        } else if (name.lastIndexOf('.git') !== -1) {
            await this.gitCloneProject(name, dir);
        } else {
            await this.executeInit(name, dir);
        }
    }


}
