
const inquirer = require("inquirer");
import axios from "axios";
import * as fs from "fs-extra";
import * as os from "os";
import * as path from "path";
import { InquirerCommand, CommandType } from "../../entity";
import logger from "../../utils/logger";
import { LoginError } from "../../error/login-error";
import { SERVERLESS_LOGIN_URL } from "../../constants/static-variable";
import GUIService from "../../gui/gui-service";
import i18n from "../../utils/i18n";
export interface IPlatformAddManagerData {
  username?: string;
  password?: string;
  gui?: string
}

const CONFIG_COMMAND_MAP: InquirerCommand = {
  username: {
    type: "input",
    message: i18n.__("Please input username"),
    name: "username",
    default: "" // 默认值
  },
  password: {
    type: "password",
    message: i18n.__("Please input password"),
    name: "password",
    default: "" // 默认值
  }
};

export class PlatformLoginManager {
  constructor() { }

  async init(context: IPlatformAddManagerData) {
    const { username, password, gui } = context;
    if (gui) {
      const guiService = new GUIService("/login");
      guiService.start();
      return;
    }
    if (username && password) {
      await this.login(context);
    }
 else {
      const promptList: CommandType[] = [];
      if (!username && !password) {
        Object.keys(CONFIG_COMMAND_MAP).forEach(key => {
          promptList.push(CONFIG_COMMAND_MAP[key]);
        });
        const { username, password } = await inquirer.prompt(promptList);
        await this.login({ username, password });
      }
 else if (username && !password) {
        promptList.push(CONFIG_COMMAND_MAP.password);
        const { password } = await inquirer.prompt(promptList);
        await this.login({ username, password });
      }

      //.then((answers: IPlatformAddManagerData) => {
      // 	this.login(answers);
      // });
    }
  }

  async login(loginData: IPlatformAddManagerData) {
    logger.info("In operation......");
    const options = {
      // url: LOGIN_URL,
      // type: 'post',
      timeout: 5000,
      headers: {
        "User-Agent": "s"
      }
      // data: loginData
    };

    let result;
    try {
      result = await axios.post(SERVERLESS_LOGIN_URL, { username: loginData.username, password: loginData.password }, options);
    }
 catch (err) {
      throw new LoginError("Failed to login, error: {{error}}", { error: err.message });
    }

    if (result.status !== 200) {
      throw new LoginError("Failed to login, http code: {{code}}", { code: result.status });
    }
    if (result.data.Error) {
      throw new LoginError("Failed to login, code: {{code}}, message: {{msg}}", { code: result.data.Error.Code, msg: result.data.Error.Message });
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
    logger.success("Login information obtained successfully.");
  }

  isCurrentLogin() {
    return fs.existsSync(this.getTokenFile());
  }

  getLoginToken(): string {
    return fs.readFileSync(this.getTokenFile(), "utf-8");
  }

  private getTokenFile() {
    const dir = this.getTokenDir();
    return path.join(dir, "login-token");
  }

  private getTokenDir() {
    return path.join(os.homedir(), ".s");
  }

}
