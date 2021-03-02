import axios from 'axios';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { LoginError } from '@serverless-devs-cli/error';
import { configSet } from "@serverless-devs-cli/util";

import logger from '../utils/logger';

export const SERVERLESS_LOGIN_URL = 'https://tool.serverlessfans.com/api/user/login';
export interface IPlatformAddManagerData {
  username?: string;
  password?: string;
  gui?: string;
  context?: string;
}

const { handlerProfileFile } = configSet;

export class PlatformLoginManager {
  constructor(context?: string) {
    if (context) {
      logger.setContent(context);
    }
  }

  async init(context: IPlatformAddManagerData) {
    const { username, password } = context;
    if (username && password) {
      await this.login(context);
    }
  }

  async login(loginData: IPlatformAddManagerData) {
    logger.info('In operation......');
    const options = {

      timeout: 5000,
      headers: {
        'User-Agent': 's',
      },
      // data: loginData
    };

    let result;
    try {
      const lang = (await handlerProfileFile({ read: true, filePath: 'set-config.yml' })).locale || 'en';
      result = await axios.post(
        SERVERLESS_LOGIN_URL + `?lang=${lang}`,
        { username: loginData.username, password: loginData.password },
        options,
      );
    } catch (err) {
      throw new LoginError('Failed to login, error: {{error}}', { error: err.message });
    }

    if (result.status !== 200) {
      throw new LoginError('Failed to login, http code: {{code}}', { code: result.status });
    }
    if (result.data.Error) {
      throw new LoginError('Failed to login, code: {{code}}, message: {{msg}}', {
        code: result.data.Error.Code,
        msg: result.data.Error.Message,
      });
    }
    const token = result.data.Response.Code;

    if (!fs.existsSync(this.getTokenDir())) {
      fs.mkdirSync(this.getTokenDir());
    }
    const tokenFile = this.getTokenFile();
    if (fs.existsSync(tokenFile)) {
      fs.removeSync(tokenFile);
    }
    fs.writeFileSync(tokenFile, token);
    logger.success('Login information obtained successfully.');
  }

  isCurrentLogin() {
    return fs.existsSync(this.getTokenFile());
  }

  getLoginToken(): string {
    return fs.readFileSync(this.getTokenFile(), 'utf-8');
  }

  private getTokenFile() {
    const dir = this.getTokenDir();
    return path.join(dir, 'login-token');
  }

  private getTokenDir() {
    return path.join(os.homedir(), '.s');
  }
}
