import axios from 'axios';
import logger from './logger';
import { handlerProfileFile, getConfig } from './handler-set-config';
import { getHistoryFile } from './storage';
import {printn} from './common';
import * as fs from 'fs-extra';
import { SERVERLESS_CHECK_VERSION } from '../constants/static-variable';
import { GetManager } from '../config/get/get-manager';
import { providerArray } from '../config/common/common';
const pkg = require('../../package.json');

interface CheckVersionResult {
  [key: string]: any
}

export class CheckVersion {
  checkVersionResult: CheckVersionResult;
  hasCheckedToday = false;

  async init() {
    await this.checkTime();
    await this.getVersion();
  }

  async showMessage() {
    const isSelectVersion: boolean = process.argv.includes('-v') || process.argv.includes('--version');
    const { status, statusText, data } = this.checkVersionResult;
    const isNewVersion: boolean = data.version === pkg.version;
    const isRequestSucc: boolean = status === undefined || !(status === 200 && statusText === 'OK');
    if (!isSelectVersion) {
      // 当天还没有输出过相关信息 && 如果请求成功 || 不是最新的版本
      if (!this.hasCheckedToday && (isRequestSucc || !isNewVersion)) {
        const release_version = `Release: ${data.version}`;
        const local_version = `Local  : ${pkg.version}`;
        const release_version_line_length = 36 - release_version.length;
        const local_version_line_length = 36 - local_version.length;
        logger.log('\n   ╭──────────────────────────────────────────╮');
        logger.log('   │              Serverless Tool             │');
        logger.log('   │                                          │');
        logger.log('   │      ' + release_version + printn(release_version_line_length, ' ') + '│');
        logger.log('   │      ' + local_version + printn(local_version_line_length, ' ') + '│');
        logger.log('   │                                          │');
        logger.log('   │                                          │');
        logger.log('   │    You can upgrade through:              │');
        logger.log('   │      npm install @serverless-devs/s -g   │');
        logger.log('   ╰──────────────────────────────────────────╯\n');
      }
    } else {
      if (isNewVersion) {
        logger.log(`Serverless Tool Version: ${pkg.version} `);
        console.log('\n\n');
      } else {
        logger.log('Serverless Tool Version: ');
        logger.log(`    Release: ${data.version} `);
        logger.log(`    Local  : ${pkg.version} `);
        logger.log('');
        logger.log('    You can upgrade through : npm install @serverless-devs/s -g');
        logger.log('    Update information:');
        data.message.forEach((message: any, index: any) => {
          logger.log(`        ${index + 1}. ${message}`);
        });
        console.log('\n\n');
      }
    }
  }

  private async getVersion() {

    let SERVERLESS_CHECK_VERSION_URL;
    try {
      const lang = (await handlerProfileFile({ read: true, filePath: 'set-config.yml' }))['locale'] || 'en';
      SERVERLESS_CHECK_VERSION_URL = SERVERLESS_CHECK_VERSION + '?lang=' + lang;
    } catch (err) {
      SERVERLESS_CHECK_VERSION_URL = SERVERLESS_CHECK_VERSION;
    }
    
    
    try {
      let analysis = getConfig('analysis');
      if (analysis || analysis === undefined) {
        const historyFile = getHistoryFile();
        const historyCmds = fs.readFileSync(historyFile, 'utf-8');
        const getManager = new GetManager();
        const providerMap: any = {};
        for (let i = 0;i < providerArray.length;i++) {
          await getManager.initAccessData({'Provider': providerArray[i]});
          const tempData = await getManager.getUserSecretID({'Provider': providerArray[i]});
          if (providerArray[i] === 'alibaba') {
            providerMap[providerArray[i]] = providerMap[providerArray[i]] || [];
            // eslint-disable-next-line guard-for-in
            for (const item in tempData) {
              providerMap[providerArray[i]].push(tempData[item]['AccountID']);
            }
          } else {
            providerMap[providerArray[i]] = Object.keys(tempData).length;
          }
        }

        let postData: string;
        try {
          postData = JSON.stringify({'Account': providerMap, 'History': historyCmds});
        } catch (ex) {
          postData = String({'Account': providerMap, 'History': historyCmds});
        }

        try {
          this.checkVersionResult = await axios.post(SERVERLESS_CHECK_VERSION_URL, {state: 1, data: postData}, {
            timeout: 2000
          });
          fs.removeSync(historyFile);
        } catch (ex) {}
      } else {
        try {
          this.checkVersionResult = await axios.post(SERVERLESS_CHECK_VERSION_URL, {state: 0}, {
            timeout: 2000
          });
        } catch (ex) {}
      }
    } catch (e) {
      this.checkVersionResult = {};
    }
    await handlerProfileFile({
      data: Date.now(),
      configKey: 'check-version-time',
      filePath: 'cache.yml'
    });
  }

  // 当天是否验证过
  private async checkTime() {
    const profile = await handlerProfileFile({ read: true, filePath: 'cache.yml' });
    const checkVersionTime = profile['check-version-time'];
    console.log();
    //
    if (checkVersionTime) {
      this.hasCheckedToday = new Date(checkVersionTime).toDateString() === new Date().toDateString();
    }
  }
}