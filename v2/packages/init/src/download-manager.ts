/** @format */

import path from 'path';

import os from 'os';
import ChildProcess from 'child_process';
import URL from 'url';
import util from 'util';
import got from 'got';

import download from 'download';
import fs from 'fs-extra';
import axios from 'axios';
import inquirer from 'inquirer';

import { green } from 'colors';

import { ProgressService, ProgressType, ProgressBarOptions } from '@serverless-devs/s-progress-bar';
import { InitError } from '@serverless-devs-cli/error';
import { PackageType, RepoTemplate } from '@serverless-devs/entity';
import logger from './logger';
import i18n from './i18n';

const SERVERLESS_API = 'https://tool.serverlessfans.com/api';
const SERVERLESS_GET_PACKAGE_PROVIDER = SERVERLESS_API + '/package/object/provider';
const SERVERLESS_GET_APP_INFO_URL = SERVERLESS_API + '/package/get/object/url';

export class DownloadManager {
    constructor() { }

    /**
     * Download template from app center
     * @param packageType: package type, such as application, component or plugin
     * @param packageName: package name
     * @param outputDir: outputDir
     * @param provider: package provider, will promopt if not given
     */
    async downloadTemplateFromAppCenter(
        packageType: PackageType,
        packageName: string,
        outputDir: string,
        provider?: string,
    ) {
        if (packageType !== PackageType.plugin && !provider) {
            try {
                provider = await this.getPackageProvider(packageType, packageName);
                logger.info('  Init Information:');
                logger.info(i18n.__(`    Package: {{package}}    Provider: {{provider}}`, { package: packageName, provider }));
            } catch (err) {
                throw new InitError(err.message);
            }
        }

        try {
            const url = await this.getPackageDownloadUrl(packageType, packageName, provider);
            await this.downloadTemplateByUrl(
                {
                    zipFile: url,
                    hasSubPath: false,
                },
                outputDir,
            );
            // logger.success('Download Success......');
        } catch (err) {
            throw err;
        }
    }

    async downloadTemplateByUrl(template: RepoTemplate, outputDir: string) {
        const uuid = this.generateUUID();
        const srcDirName = path.join(os.tmpdir(), `${uuid}`);
        try {
            await this.proxyDownload(template.zipFile, srcDirName, { extract: true, strip: 1 });
        } catch (err) {
            throw new InitError('Download template by url failed, error: {{msg}}', { msg: err.message });
        }

        if (!template.hasSubPath) {
            fs.copySync(srcDirName, outputDir, { dereference: true });
        } else {
            const srcSubDirName = path.join(srcDirName, template.subPath || '');
            const destSubDirName = path.join(outputDir, template.subPath || '');
            fs.copySync(srcSubDirName, destSubDirName, { dereference: true });
        }
    }

    async downloadTemplateByGitClone(url: URL.Url, outputDir: string) {
        const cmd = `git clone ${url.href} ${outputDir}`;
        const exec = util.promisify(ChildProcess.exec);
        try {
            await exec(cmd);
        } catch (err) {
            throw err;
        }
    }

    private async getPackageProvider(packageType: PackageType, project: string): Promise<string> {
        const options = {
            url: SERVERLESS_GET_PACKAGE_PROVIDER,
            type: 'get',
            timeout: 5000,
            headers: {},
            params: {
                name: project,
                type: PackageType[packageType],
            },
        };

        let result;
        try {
            result = await axios.request(options);
        } catch (err) {
            throw new InitError('Failed to get package provider, error: {{msg}}', { msg: err.message });
        }
        if (result.status !== 200) {
            throw new InitError('Failed to get package provider, http code: {{code}}', { code: result.status });
        }
        if (result.data.Error) {
            throw new InitError('Failed to get package provider, error message: {{msg}}', { msg: result.data.Error });
        }

        const providers: string[] = result.data.Response.Providers;
        if (!providers || providers.length === 0) {
            throw new InitError('No available provider for {{project}}', { project });
        }

        if (providers.length === 0) {
            throw new InitError('Could not get package.');
        } else if (providers.length === 1) {
            return providers[0];
        } else {
            const { provider } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'provider',
                    message: i18n.__('Please choose a provider'),
                    choices: providers,
                },
            ]);
            return new Promise((resolve, reject) => {
                resolve(provider);
            });
        }
    }

    private async getPackageDownloadUrl(packageType: PackageType, packageName: any, provider: any): Promise<string> {
        const options = {
            url: SERVERLESS_GET_APP_INFO_URL,
            type: 'get',
            timeout: 5000,
            headers: {
                'User-Agent': 's',
            },
            params: {
                name: packageName,
                provider,
                type: PackageType[packageType],
            },
        };
        const result = await axios.request(options);
        if (result.status !== 200) {
            throw new InitError('Failed to get package information, http code: {{code}}', { code: result.status });
        }
        if (!result.data.Response) {
            throw new InitError('Failed to get package information, error: {{msg}}', {
                msg: result.data.Response || i18n.__('Please try again later'),
            });
        }
        return new Promise((resolve, reject) => {
            resolve(result.data.Response.Url);
        });
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

    async proxyDownload(url: string, dest: string, options: download.DownloadOptions) {
        let len;
        try {
            const { headers } = await got(url, { method: 'HEAD' });
            len = parseInt(headers['content-length'], 10);
        } catch (err) {
            // ignore error
        }

        let bar: ProgressService;
        if (len) {
            const pbo: ProgressBarOptions = {
                total: len,
            };
            bar = new ProgressService(ProgressType.Bar, pbo);
        } else {
            const pbo: ProgressBarOptions = {
                total: 100,
                width: 0,
            };
            const format = `${green(':loading')} ${green(i18n.__('Downloading ...'))} `;
            bar = new ProgressService(ProgressType.Loading, pbo, format);
        }

        await download(url, dest, options).on('downloadProgress', progress => {
            bar.update(progress.transferred);
        });
        bar.terminate();

    }
}
