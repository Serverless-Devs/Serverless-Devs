/** @format */

import * as logger from '../utils/logger';
import * as urlParser from '../utils/url-parser';
import * as msg from './init-message';
import * as fs from 'fs-extra';
import * as path from 'path';
// import * as bluebird from "bluebird";
import {InitError} from '../error/init-error';
import {DownloadManager} from '../utils/download-manager';
import {PackageType} from '../utils/package-type';

export class InitManager {
  downloadManager: DownloadManager;

  constructor() {
    this.downloadManager = new DownloadManager();
  }

  async init(target: string, provider: string, dir: any) {
    logger.info('Initializing......');
    try {
      if (urlParser.isUrlFormat(target)) {
        await this.downloadUrlTemplate(target, dir);
      } else {
        await this.downloadAppTemplate(target, provider, dir);
      }
      logger.success(msg.INIT_SUCCESS_TIPS);
    } catch (err) {
      throw err;
      // logger.error(err);
    }
  }

  async downloadAppTemplate(project: string, provider?: string, dir?: any) {
    const outputDir = path.resolve(process.cwd(), dir || project);
    if (fs.existsSync(outputDir)) {
      throw new InitError('Directory already exists: {{{outputDir}}}', {
        outputDir,
      });
    }

    try {
      await this.downloadManager.downloadTemplateFromAppCenter(PackageType.application, project, outputDir, provider);
    } catch (err) {
      throw err;
    }
  }

  async downloadUrlTemplate(address: string, dir?: any) {
    const url = urlParser.parse(address);

    if (url.protocol && (url.protocol.startsWith('https') || url.protocol.startsWith('http'))) {
      if (!url.hostname || !url.hostname.includes('github')) {
        throw new InitError('Unknown host({{host}}), we support github currently.', {
          host: url.host,
        });
      }
      // do with normal download
      const repoTemplate = urlParser.extractTemplateInfo(url);
      const outputDir = path.resolve(process.cwd(), dir || repoTemplate.repoName);
      if (fs.existsSync(outputDir)) {
        throw new InitError('Directory already exists: {{{outputDir}}}', {
          outputDir,
        });
      }

      try {
        await this.downloadManager.downloadTemplateByUrl(repoTemplate, outputDir);
      } catch (err) {
        throw err;
      }
    } else if (url.href.startsWith('git@')) {
      const outputDir = path.resolve(process.cwd(), dir || urlParser.getProjectNameFromUrl(url.href));
      if (fs.existsSync(outputDir)) {
        throw new InitError('Directory already exists: {{{outputDir}}}', {
          outputDir,
        });
      }
      try {
        await this.downloadManager.downloadTemplateByGitClone(url, outputDir);
      } catch (err) {
        throw new InitError('Git clone Template failed: {{msg}}', {
          msg: err.message,
        });
      }
    } else {
      throw new InitError('Unknown project format: {{target}}', {
        target: url.href,
      });
    }
  }
}
