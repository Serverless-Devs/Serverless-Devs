import { find } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
import path from 'path';
import assert from 'assert';
import { getEnvFilePath } from '@/utils';

class Action {
  constructor(private options: IOptions) {
    logger.debug(`s env update --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const { template = path.join(process.cwd(), 's.yaml'), name } = this.options;
    const envFilePath = await getEnvFilePath(template);
    assert(fs.existsSync(envFilePath), `The file ${envFilePath} was not found`);
    const { environments } = utils.getYamlContent(envFilePath);
    const data = find(environments, item => item.name === name);
    assert(data, `The environment ${name} was not found`);
    logger.output(data);
  }
}

export default Action;
