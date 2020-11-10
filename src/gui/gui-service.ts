/** @format */

const rimraf = require('rimraf');
const path = require('path');
const os = require('os');
const fs = require('fs');
const {execSync} = require('child_process');
const got = require('got');
const decompress = require('decompress');
const decompressUnzip = require('decompress-unzip');
import * as download from 'download';
import axios from 'axios';
import * as logger from '../utils/logger';
import i18n from '../utils/i18n';
import {handlerProfileFile} from '../utils/handler-set-config';
import {SERVERLESS_GUI_CLIENT_VERSION_CHECK} from '../constants/static-variable';
import {ProgressService, ProgressType, ProgressBarOptions} from '@serverless-devs/s-progress-bar';
import {green} from 'colors';

const S_GUI_BASE_PATH = path.join(os.homedir(), `.s/client`);

export default class GUIService {
  constructor(guiPath = '/') {
    if (!fs.existsSync(S_GUI_BASE_PATH)) {
      fs.mkdirSync(S_GUI_BASE_PATH);
    }
    process.env.GUIPATH = guiPath;
  }

  getOsType() {
    const {platform} = process;
    let osType = 'macos';
    switch (platform) {
    case 'darwin':
      osType = 'macos';
      break;
      case 'win32':
        osType = 'windows';
        break;
    default:
        osType = 'linux';
        break;
    }
    return osType;
  }

  getGuiAppInfo(osType: string) {
    if (osType === 'macos') {
      return path.join(S_GUI_BASE_PATH, 'serverless-devs-tool-client-macos.app');
    }
    if (osType === 'windows') {
      return path.join(S_GUI_BASE_PATH, 'serverless-devs-tool-client-windows', 's.exe');
    }
    // if (osType === 'linux') {
    //   return path.join(S_GUI_BASE_PATH, 's');
    // }
  }

  async downloadAndExcuteGui(osType: string) {
    const result = await axios.get(SERVERLESS_GUI_CLIENT_VERSION_CHECK);
    const data = result.data || [];
    if (data[0]) {
      logger.info(`Current system : ${osType}, current client version: ${data[0].version} `);
      const url = data[0].url || {};
      if (url[osType]) {
        const downloadPath = url[osType];
        let len;
        try {
          const {headers} = await got(downloadPath, {method: 'HEAD'});
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

        await download(downloadPath, S_GUI_BASE_PATH).on('downloadProgress', progress => {
          bar.update(progress.transferred);
        });

        bar.terminate();

        logger.success('Download successfully, now start to unzip.');
        try {
          const tmpZipFile = path.join(S_GUI_BASE_PATH, `serverless-devs-tool-client-${osType}.zip`);
          const pbo: ProgressBarOptions = {
            total: 100,
            width: 0,
          };
          const format = `${green(i18n.__(':loading'))} ${green(i18n.__('Unziping ...'))} `;
          const newBar = new ProgressService(ProgressType.Loading, pbo, format);
          const timmer = setInterval(() => {
            newBar.update();
          }, 500);

          await decompress(tmpZipFile, S_GUI_BASE_PATH, {
            plugins: [decompressUnzip()],
          });
          clearInterval(timmer);
          newBar.terminate();
          logger.success('Unzip success begin to start.');
          const appInfo = this.getGuiAppInfo(osType);
          await this.setVersion(data[0].version);
          this.open(appInfo);
          fs.unlinkSync(tmpZipFile);
        } catch (e) {
          logger.error(e.message);
        }
      }
    }
  }

  open(appInfo: string) {
    const startInstruction = process.platform === 'win32' ? 'start' : 'open';
    execSync(`${startInstruction} ${appInfo} `);
  }

  async start(update?: boolean) {
    const osType = this.getOsType();
    const appInfo = this.getGuiAppInfo(osType);
    const versions = await this.getVersionResult();

    if (!fs.existsSync(appInfo) || update === true) {
      if (update === true) {
        logger.info('GUI updating ......');
        await rimraf(appInfo, function(err: any) {
          // 删除当前目录下的 aaa
          if (err) {
            logger.error(err);
          }
        });
      } else {
        logger.info('Check that you don’t have a gui client, download it now, it will take you about 1 minute.');
      }
      await this.downloadAndExcuteGui(osType);
      return;
    } else if (versions !== undefined && versions[0] !== versions[1]) {
      logger.info('The system has detected a new version of the GUI. You can use `s gui --update` to upgrade.');
      // 输出更新信息 versions[2]
      try {
        const lang = (await handlerProfileFile({read: true, filePath: 'set-config.yml'})).locale || 'en';
        logger.log('\n');
        logger.log('    Update information:');
        const data = versions[2][lang] || versions[2];
        data.forEach((message: any, index: any) => {
          logger.log(`        ${index + 1}. ${message}`);
        });
        logger.log('\n');
      } catch (err) {}
    }
    this.open(appInfo);
  }

  async getVersionResult() {
    const profile = await handlerProfileFile({read: true, filePath: 'cache.yml'});
    const localVersion = profile['app-store-client-version'];
    const result = await axios.get(SERVERLESS_GUI_CLIENT_VERSION_CHECK);
    const data = result.data || [];
    return data.length === 0 ? undefined : [localVersion, data[0].version, data[0].message];
  }

  async setVersion(version: string) {
    await handlerProfileFile({
      data: version,
      configKey: 'app-store-client-version',
      filePath: 'cache.yml',
    });
  }
}
