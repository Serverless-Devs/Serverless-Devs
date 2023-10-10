import logger from '@/logger';
import { IGlobalOptions } from '@/type';
import fs from 'fs-extra';
import { ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import * as utils from '@serverless-devs/utils';
import path from 'path';
import assert from 'assert';

class Action {
  constructor(private options: IGlobalOptions) {
    logger.debug(`s env update --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const { template = path.join(process.cwd(), ENVIRONMENT_FILE_NAME) } = this.options;
    assert(fs.existsSync(template), `The file ${template} was not found`);
    const { environments } = utils.getYamlContent(template);
    logger.output(environments);
  }
}

export default Action;
