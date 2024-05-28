import logger from '@/logger';
import { IGlobalOptions } from '@/type';
import fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
import path from 'path';
import assert from 'assert';
import { getEnvFilePath } from '@/utils';

class Action {
  constructor(private options: IGlobalOptions) {
    logger.debug(`s env update --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const { template = path.join(process.cwd(), 's.yaml') } = this.options;
    const envFilePath = await getEnvFilePath(template);
    assert(fs.existsSync(envFilePath), `The file ${envFilePath} was not found`);
    const { environments } = utils.getYamlContent(envFilePath);
    logger.output(environments);
  }
}

export default Action;
