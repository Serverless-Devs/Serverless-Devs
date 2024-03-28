import { concat, find, get, set, isEmpty } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import { ENVIRONMENT_FILE_NAME, ENVIRONMENT_FILE_PATH, ALIYUN_REMOTE_PROJECT_ENV_PARAM } from '@serverless-devs/parse-spec';
import fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
import assert from 'assert';
import { emoji } from '@/utils';
import chalk from 'chalk';

class Action {
  constructor(private options: IOptions) {
    logger.debug(`s env default --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const remoteProjectName = process.env[ALIYUN_REMOTE_PROJECT_ENV_PARAM];
    let envYamlContent: Record<string, any>;
    let envFile: string;
    let project: string;
    if (remoteProjectName) {
      envFile = utils.getAbsolutePath(get(this.options, 'template', ENVIRONMENT_FILE_NAME));
      assert(fs.existsSync(envFile), `Environment file ${envFile} is not found`);
      envYamlContent = utils.getYamlContent(envFile);
      project = remoteProjectName;
    } else {
      const sFile = utils.getAbsolutePath(get(this.options, 'template', 's.yaml'));
      assert(fs.existsSync(sFile), `Template file ${sFile} is not found`);
      const sYamlContent = utils.getYamlContent(sFile);
      const envFileName = get(sYamlContent, 'env', ENVIRONMENT_FILE_NAME);
      envFile = utils.getAbsolutePath(envFileName);
      // 未找到env.yaml文件
      assert(fs.existsSync(envFile), `Environment file ${envFile} is not found`);
      envYamlContent = utils.getYamlContent(envFile);
      project = get(sYamlContent, 'name');
    }
    // 不存在project字段
    assert(project, `Environment file ${envFile} is not a valid yaml file, you must set project field`);
    if (!get(this.options, 'name')) {
      if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
        const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
        const currentDefaultEnv = defaultEnvContent?.find(i => i.project === project && i.path === envFile);
        return logger.write(currentDefaultEnv ? `\nCurrent default environment: ${currentDefaultEnv.default}\n` : `\nNo default environment.\n`);
      }
      return logger.write(`\nNo default environment.\n`);
    }
    assert(
      find(envYamlContent.environments, o => o.name === this.options.name),
      `Environment [${this.options.name}] is not exist`,
    );
    const msg = `Set default env [${this.options.name}] for project [${project}] successfully`;
    if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
      const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
      set(defaultEnvContent, project, this.options.name);
      const currentDefaultEnv = defaultEnvContent?.find(i => i.project === project && i.path === envFile);
      if (!isEmpty(currentDefaultEnv)) {
        set(currentDefaultEnv, 'default', this.options.name);
        fs.writeJSONSync(ENVIRONMENT_FILE_PATH, defaultEnvContent, { spaces: 2 });
        return logger.write(chalk.green(msg));
      }
      fs.writeJSONSync(ENVIRONMENT_FILE_PATH, concat(defaultEnvContent, { project, default: this.options.name, path: envFile }), { spaces: 2 });
      return logger.write(chalk.green(msg));
    }
    fs.ensureFileSync(ENVIRONMENT_FILE_PATH);
    fs.writeJSONSync(ENVIRONMENT_FILE_PATH, [{ project, default: this.options.name, path: envFile }], { spaces: 2 });
    logger.write(chalk.green(msg));
  }
}

export default Action;
