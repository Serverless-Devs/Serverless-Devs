import logger from '@/logger';
import { IOptions } from './type';
import { setGlobalConfig } from '@serverless-devs/utils';

class Action {
  constructor(private options: IOptions) {
    logger.debug(`s env set --option: ${JSON.stringify(options)}`);
  }
  async start() {
    setGlobalConfig('env_component', this.options.component);
    logger.write(`Set env component [${this.options.component}] successfully`)
  }
}

export default Action;
