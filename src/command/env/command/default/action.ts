import { get, isEmpty, set } from 'lodash';
import logger from '../../../../logger';
import { IOptions } from './type';
import { ENVIRONMENT_FILE_NAME, ENVIRONMENT_FILE_PATH } from '@serverless-devs/parse-spec';
import fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';

class Action {
  constructor(private options: IOptions = {}) {
    logger.debug(`s env init --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const envFile = utils.getAbsolutePath(get(this.options, 'template', ENVIRONMENT_FILE_NAME));
    if (!fs.existsSync(envFile)) {
      throw new Error(`Environment file ${envFile} is not found`);
    }
    const envYamlContent = utils.getYamlContent(envFile);
    const project = get(envYamlContent, 'project');
    if (isEmpty(project)) {
      throw new Error(`Environment file ${envFile} is not a valid yaml file`);
    }
    const msg = `Set default env [${this.options.name}] for project [${project}] successfully`;
    if (fs.existsSync(ENVIRONMENT_FILE_PATH)) {
      const defaultEnvContent = require(ENVIRONMENT_FILE_PATH);
      set(defaultEnvContent, project, this.options.name);
      fs.writeJSONSync(ENVIRONMENT_FILE_PATH, defaultEnvContent, { spaces: 2 });
      return logger.write(msg);
    }
    fs.writeJSONSync(ENVIRONMENT_FILE_PATH, { [project]: this.options.name }, { spaces: 2 });
    logger.write(msg);
  }
}

export default Action;
