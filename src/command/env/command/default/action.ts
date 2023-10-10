import { concat, find, get, set } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import { ENVIRONMENT_FILE_NAME, ENVIRONMENT_FILE_PATH } from '@serverless-devs/parse-spec';
import fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
import assert from 'assert';

class Action {
  constructor(private options: IOptions = {}) {
    logger.debug(`s env default --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const envFile = utils.getAbsolutePath(get(this.options, 'template', ENVIRONMENT_FILE_NAME));
    // 未找到env.yaml文件
    assert(fs.existsSync(envFile), `Environment file ${envFile} is not found`);
    const envYamlContent = utils.getYamlContent(envFile);
    const project = get(envYamlContent, 'project');
    // env.yaml文件中不存在project字段
    assert(project, `Environment file ${envFile} is not a valid yaml file, you must set project field`);
    assert(find(envYamlContent.environments, o => o.name === this.options.name), `Environment [${this.options.name}] is not exist`)
    const msg = `Set default env [${this.options.name}] for project [${project}] successfully`;
    if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
      const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
      console.log(defaultEnvContent)
      set(defaultEnvContent, project, this.options.name);
      fs.writeJSONSync(ENVIRONMENT_FILE_PATH, concat(defaultEnvContent, { project, default: this.options.name, path: envFile }), { spaces: 2 });
      return logger.write(msg);
    }
    fs.ensureFileSync(ENVIRONMENT_FILE_PATH);
    fs.writeJSONSync(ENVIRONMENT_FILE_PATH, [{ project, default: this.options.name, path: envFile }], { spaces: 2 });
    logger.write(msg);
  }
}

export default Action;