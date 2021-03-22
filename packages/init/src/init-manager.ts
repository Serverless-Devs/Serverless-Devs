import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import * as inquirer from 'inquirer';
import { loadApplication } from '@serverless-devs/core';
import { configSet } from '@serverless-devs-cli/util';
import { InitError } from '@serverless-devs-cli/error';
import logger from './logger';
import i18n from './i18n';
import { DEFAULT_REGIRSTRY, DEFAULT_REPO, APPLICATION_TEMPLATE } from './config';

export class InitManager {
    constructor(content = '') {
        if (content) {
            logger.setContent(content)
        }
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

    async executeInit(name: string, dir?: string) {
        logger.info(i18n.__('Initializing......'));
        if (name.split('/').length === 1) {
            const repo = configSet.getConfig('repo') || DEFAULT_REPO;
            name = `${repo}/${name}`;
        }
        const appName = name.split('/')[1] || name;
        const registry = configSet.getConfig('registry') || DEFAULT_REGIRSTRY;
        const tmpDir = path.join(os.tmpdir(), this.generateUUID());
        fs.mkdirSync(tmpDir);
        const result = await loadApplication(name, registry, tmpDir);
       
        const appSrc = path.join(result, 'src');
        if (!dir) {
            dir = process.cwd();
        }
        fs.copySync(appSrc, path.join(dir, appName), { dereference: true });
        fs.removeSync(tmpDir);
        logger.success(i18n.__('Initialization successfully'));
    }

    async init(name: string, dir?: string) {
        try {
            if (!name) {
                inquirer.prompt(APPLICATION_TEMPLATE).then(async (answers) => {
                    const appKey = Object.keys(answers)[0];
                    const appName = answers[appKey];
                    await this.executeInit(appName, dir);
                });
            } else {
                await this.executeInit(name, dir);
            }
        } catch (err) {
            throw new InitError(err.message);
        }
    }


}
