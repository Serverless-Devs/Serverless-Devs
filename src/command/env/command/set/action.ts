import logger from '@/logger';
import { IOptions } from './type';
import { setGlobalConfig } from '@serverless-devs/utils';
import { ENV_COMPONENT_KEY } from '../../constant';

class Action {
  constructor(private options: IOptions) {
    logger.debug(`s env set --option: ${JSON.stringify(options)}`);
  }
  async start() {
    setGlobalConfig(ENV_COMPONENT_KEY, this.options.component);
    logger.write(`Set env component [${this.options.component}] successfully`)
  }
}

export default Action;
