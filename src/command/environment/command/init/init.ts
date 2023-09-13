import { find, get, isEmpty, map, omit } from 'lodash';
import logger from '../../../../logger';
import { IOptions } from './type';
import ParseSpec from '@serverless-devs/parse-spec';
import inquirer from 'inquirer';
import { ENVIRONMENT_FILE_NAME, INQUIRE_OPTIONS } from './constant';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import * as utils from '@serverless-devs/utils';

class Init {
  constructor(private options: IOptions = {}) {
    logger.debug(`s environment init --option: ${JSON.stringify(options)}`);
    this.options = omit(options, 'debug');
  }
  async start() {
    const argv = process.argv.slice(2);
    const spec = await new ParseSpec(this.options.template, { argv, logger }).start();
    logger.debug(`spec info: ${JSON.stringify(spec)}`);
    const environmentFilePath = path.join(path.dirname(get(spec, 'yaml.path')), ENVIRONMENT_FILE_NAME);
    logger.debug(`environmentFilePath: ${environmentFilePath}`);
    await this.writeEnvironmentFile(environmentFilePath);
  }
  private async writeEnvironmentFile(environmentFilePath: string) {
    const data = await this.getOptions();
    logger.debug(`writeEnvironmentFile data: ${JSON.stringify(data)}`);
    fs.ensureFileSync(environmentFilePath);
    const content = utils.getYamlContent(environmentFilePath) || [];
    const exist = find(content, { name: data.name });
    const newContent = exist
      ? map(content, item => {
          if (item.name === data.name) {
            return { ...item, ...data };
          }
          return item;
        })
      : content.concat(data);
    fs.writeFileSync(environmentFilePath, yaml.dump(newContent));
  }
  private async getOptions() {
    // if no options, then use inquire
    if (isEmpty(this.options)) {
      const result = await inquirer.prompt(INQUIRE_OPTIONS);
      return {
        ...result,
        props: JSON.parse(result.props),
      };
    }
    if (this.options.props) {
      try {
        this.options.props = JSON.parse(this.options.props);
      } catch (e) {
        throw new Error('Must be a valid JSON string');
      }
    }
    return this.options;
  }
}

export default Init;
