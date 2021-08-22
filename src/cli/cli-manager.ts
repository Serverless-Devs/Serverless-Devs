/** @format */

import { logger } from '../utils';
import yaml from 'js-yaml';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { emoji } from '../utils/common';
import getCore from '../utils/s-core';
const { getCredential, loadComponent } = getCore();
export interface CliParams {
  component: string;
  command: string;
  access: string;
  props: string;
}

export default class CliManager {
  protected inputs: CliParams;

  constructor(inputs: CliParams) {
    this.inputs = inputs;
  }

  getTempCommandStr(commands: string, length: number) {
    const commandsLength = commands.length;
    const tempArray = new Array(length - commandsLength).fill(' ');
    return `${commands}${tempArray.join('')} : `;
  }

  async init(): Promise<any> {
    let result = '';
    try {
      let { component, command, access, props } = this.inputs;
      // 获取密钥信息
      let credentials = {};
      try {
        const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
        const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
        if (accessFileInfo[access]) {
          credentials = await getCredential(access);
        }
      } catch (e) {
        credentials = {};
      }
      console.log('私包测试');
      const componentInstance = await loadComponent(component, null, { access });
      if (componentInstance) {
        if (!command) {
          if (componentInstance['index']) {
            command = 'index';
          } else {
            command = 'cli-help-options';
          }
        }
        if (command === 'cli-help-options') {
          if (componentInstance.__doc && componentInstance.__doc().length > 1685) {
            const docResult = componentInstance.__doc();
            console.log(`${docResult}`);
          } else {
            try {
              let componentPathYaml = path.join(componentInstance.__path, 'publish.yml');
              if (!(await fs.existsSync(componentPathYaml))) {
                componentPathYaml = path.join(componentInstance.__path, 'publish.yaml');
              }
              const publishYamlInfor = await yaml.load(fs.readFileSync(componentPathYaml, 'utf8'));
              console.log(
                `\n  ${publishYamlInfor['Name']}@${publishYamlInfor['Version']}: ${publishYamlInfor['Description']}\n`,
              );
              let tempLength = 0;
              if (publishYamlInfor['Commands']) {
                for (const item in publishYamlInfor['Commands']) {
                  if (item.length > tempLength) {
                    tempLength = item.length;
                  }
                }
                for (const item in publishYamlInfor['Commands']) {
                  console.log(`    ${this.getTempCommandStr(item, tempLength)} ${publishYamlInfor['Commands'][item]}`);
                }
                console.log(
                  `\n  ${
                    publishYamlInfor['HomePage']
                      ? `${emoji('🧭')} More information: ` + publishYamlInfor['HomePage'] + '\n'
                      : ''
                  }`,
                );
              }
            } catch (e) {
              logger.error('Help information could not be found');
            }
          }
          return 'help';
        }
        if (componentInstance[command]) {
          let tempProp = {};
          try {
            tempProp = JSON.parse(props || '{}');
          } catch (e) {
            throw new Error('-p/--prop parameter format error');
          }
          try {
            result =
              (await componentInstance[command]({
                props: tempProp,
                Properties: tempProp,
                Credentials: credentials,
                credentials: credentials,
                appName: 'default',
                Project: {
                  ProjectName: 'default',
                  projectName: 'default',
                  component: component,
                  Component: component,
                  provider: undefined,
                  Provider: undefined,
                  accessAlias: access || 'default',
                  AccessAlias: access || 'default',
                },
                project: {
                  component: '',
                  access: access || 'default',
                  projectName: '',
                },
                command: command,
                Command: command,
                args: process.env.temp_params,
                argsObj: process['temp_params'],
                Args: process.env.temp_params,
                ArgsObj: process['temp_params'],
                path: {
                  configPath: '',
                },
                Path: {
                  ConfigPath: '',
                },
              })) || {};

            let outResult = yaml.dump(JSON.parse(JSON.stringify(result)));

            logger.success(Object.keys(result).length === 0 ? `End of method: ${command}` : outResult);
          } catch (e) {
            logger.error(`Failed to execute:\n
  ${emoji('❌')} Message: ${e.message}
  ${emoji('🧭')} You can get help for this component by [s cli ${component} -h]
  ${emoji('😈')} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
            process.exit(-1);
          }
        } else {
          logger.error(`Failed to execute:\n
  ${emoji('❌')} Message: Component ${component} does not include [${command}] method
  ${emoji('🧭')} You can get help for this component by [s cli ${component} -h]
  ${emoji('😈')} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
          process.exit(-1);
        }
      }
    } catch (e) {
      logger.error(`Failed to execute:\n
  ${emoji('❌')} Message: ${e.message}
  ${emoji('🧭')} You can get more component on: https://github.com/Serverless-Devs/package-awesome
  ${emoji('😈')} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
      process.exit(-1);
    }
    return result;
  }
}
