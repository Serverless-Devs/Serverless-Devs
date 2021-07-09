/** @format */

import yaml from 'js-yaml';
import { version, Parse, Analysis } from '../../specification';
import os from 'os';
import { common, logger } from '../../utils';
import {
  ComponentExeCute,
  ComponentConfig,
  generateSynchronizeComponentExeList,
  synchronizeExecuteComponentList,
} from '../component';

const { checkTemplateFile } = common;
const { getServiceConfig } = version;

export class CommandManager {
  protected deployParams: any;

  constructor(
    protected templateFile: string,
    protected method: string,
    protected customerCommandName?: string,
    params?: any,
  ) {
    this.deployParams = params;
  }

  async assemblyProjectConfig(parse: Parse, projectName: string, parsedObj: any): Promise<ComponentConfig> {
    const realVariables = await parse.getRealVariables(parsedObj); // Get the original conversion data
    const projectConfig: any = getServiceConfig(realVariables, projectName);
    projectConfig.appName = realVariables.name; // app name;
    projectConfig.ProjectName = projectName;
    if (this.deployParams) {
      projectConfig.params = this.deployParams;
    }
    return projectConfig;
  }

  async init(): Promise<void> {
    try {
      logger.info('Start ...');
      const templateFile = checkTemplateFile(this.templateFile);
      if (templateFile) {
        const outPutData: any = {};
        const parse = new Parse(templateFile);
        const parsedObj = parse.getOriginalParsedObj();
        const realVariables = await parse.getRealVariables(parsedObj); // Get the original conversion data
        const analysis = new Analysis(realVariables, parse.dependenciesMap);
        const executeOrderList = analysis.getProjectOrder();
        if (this.customerCommandName || executeOrderList.length === 1) {
          const tempCustomerCommandName = executeOrderList[0];
          const projectConfig = await this.assemblyProjectConfig(
            parse,
            this.customerCommandName || tempCustomerCommandName,
            parsedObj,
          );
          if (process.env['serverless_devs_temp_access']) {
            projectConfig.Access = process.env['serverless_devs_temp_access'];
            projectConfig.access = process.env['serverless_devs_temp_access'];
          }
          const componentExecute = new ComponentExeCute(projectConfig, this.method, parsedObj.edition, templateFile);
          try {
            const tempResult = await componentExecute.init();
            if (tempResult) {
              outPutData[projectConfig.ProjectName] = tempResult;
            }
          } catch (e) {
            const errorMessage = e.message.includes('componentInstance[method] is not a function')
              ? `Project ${projectConfig.ProjectName} does not include [${this.method}] method`
              : e.message;
            logger.error(`Project ${projectConfig.ProjectName} failed to execute:
  
  ${os.platform()=='win32'?'':'📝'} Message:  ${errorMessage}
  ${os.platform()=='win32'?'':'🧭'} You can get help for this component by [s ${projectConfig.ProjectName} -h]
  ${os.platform()=='win32'?'':'😈'} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
            process.exit(-1);
          }
        } else {
          const params = this.deployParams || '';
          logger.info(
            `It is detected that your project has the following projects < ${executeOrderList.join(
              ',',
            )} > to be execute`,
          );

          const componentList = generateSynchronizeComponentExeList(
            { list: executeOrderList, parse, parsedObj, method: this.method, params },
            this.assemblyProjectConfig.bind(this),
          );
          const tempResult = await synchronizeExecuteComponentList(componentList);
          for (const item in tempResult) {
            if (executeOrderList.includes(item) && tempResult[item]) {
              outPutData[item] = tempResult[item];
            }
          }
        }
        let outResult = yaml.dump(JSON.parse(JSON.stringify(outPutData)));
        if (process.env['s-execute-file']) {
          logger.error(`All projects were not deployed successfully.
  
${yaml.dump(
    JSON.parse(process.env['s-execute-file'])['Error'],
  )}  ${os.platform()=='win32'?'':'😈'} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
          process.exit(-1);
        } else {
          logger.success(Object.keys(outPutData).length === 0 ? `End of method: ${this.method}` : outResult);
        }
      } else {
        logger.error(`Failed to execute:\n
  ${os.platform()=='win32'?'':'❌'} Message: Cannot find s.yaml / s.yml / template.yaml / template.yml file, please check the directory ${this.templateFile}
  ${os.platform()=='win32'?'':'🧭'} If you want to use Serverless Devs, you should have a s.yaml or use [s cli] command.
      ${os.platform()=='win32'?'':'1️⃣'} Yaml document: https://github.com/Serverless-Devs/docs/blob/master/zh/yaml.md
      ${os.platform()=='win32'?'':'2️⃣'} Cli document: [s cli -h]
  ${os.platform()=='win32'?'':'😈'} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
        process.exit(-1);
      }
    } catch (e) {
      logger.error(`Failed to execute:\n
  ${os.platform()=='win32'?'':'❌'} Message: ${e.message}
  ${os.platform()=='win32'?'':'😈'} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
      process.exit(-1);
    }
  }
}
