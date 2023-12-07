import { find, map, pick } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import * as utils from '@serverless-devs/utils';
import path from 'path';
import { assert } from 'console';
import { ENV_KEYS } from '../../constant';
import { runEnvComponent } from '@/utils';
import chalk from 'chalk';

class Action {
  constructor(private options: IOptions) {
    logger.debug(`s env update --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const { template = path.join(process.cwd(), ENVIRONMENT_FILE_NAME), ...rest } = this.options;
    const newData = pick(rest, ENV_KEYS);

    assert(fs.existsSync(template), `The file ${template} was not found`);
    const { project, environments } = utils.getYamlContent(template);
    const isExist = find(environments, item => item.name === this.options.name);
    assert(isExist, `The environment ${this.options.name} was not found`);

    // Updating Cloud Environment
    const { access, ...envProps } = isExist;
    const inputs = {
      props: {
        project,
        ...envProps,
      },
      command: 'env',
      args: ['update'],
    };

    const { project: p, ...envResult } = await runEnvComponent(inputs, access);
    const newEnvironments = map(environments, item => {
      if (item.name === this.options.name) {
        return {
          ...item,
          ...newData,
          ...envResult,
        };
      }
      return item;
    });
    fs.writeFileSync(template, yaml.dump({ project, environments: newEnvironments }));
    logger.write(chalk.green('Environment updated successfully'));
  }
}

export default Action;
