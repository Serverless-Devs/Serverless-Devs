import { each, filter, find, get } from 'lodash';
import logger from '@/logger';
import { IOptions } from './type';
import fs from 'fs-extra';
import { ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import * as utils from '@serverless-devs/utils';
import path from 'path';
import assert from 'assert';
import yaml from 'js-yaml';
import { ENV_COMPONENT_KEY, ENV_COMPONENT_NAME } from "@/command/env/constant";
import loadComponent from "@serverless-devs/load-component";
import Credential from "@serverless-devs/credential";

class Action {
  constructor(private options: IOptions) {
    logger.debug(`s env update --option: ${JSON.stringify(options)}`);
  }
  async start() {
    const componentName = utils.getGlobalConfig(ENV_COMPONENT_KEY, ENV_COMPONENT_NAME);
    const componentLogger = logger.loggerInstance.__generate(componentName);
    const instance = await loadComponent(componentName, { logger: componentLogger });

    const { template = path.join(process.cwd(), ENVIRONMENT_FILE_NAME), name } = this.options;
    assert(fs.existsSync(template), `The file ${template} was not found`);
    const { project, environments } = utils.getYamlContent(template);
    const data = find(environments, item => item.name === name);
    assert(data, `The environment ${name} was not found`);
    const { access, ...rest } = data

    const inputs = {
      cwd: process.cwd(),
      userAgent: utils.getUserAgent({ component: instance.__info }),
      props: {
        ...rest,
      },
      command: 'env',
      args: ['destroy'],
      getCredential: async () => {
        const res = await new Credential({ logger: componentLogger }).get(access);
        const credential = get(res, 'credential', {});
        each(credential, v => {
          logger.loggerInstance.__setSecret([v]);
        });
        return credential;
      },
    };

    await instance.env(inputs);

    const newEnvironments = filter(environments, item => item.name !== name);
    fs.writeFileSync(template, yaml.dump({ project, environments: newEnvironments }));
    logger.write(`The environment ${name} was destroyed successfully`);
  }
}

export default Action;
