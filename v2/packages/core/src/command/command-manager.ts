import yaml from 'js-yaml';
import { common, logger, i18n, version, Parse, Analysis } from '@serverless-devs-cli/util';
import { TEMPLATE_FILE } from '../constants/static-variable';
import {
  ComponentExeCute,
  ComponentConfig,
  generateSynchronizeComponentExeList,
  synchronizeExecuteComponentList,
} from '../component';

const { checkTemplateFile } = common;
const { getServiceConfig } = version;

export default class CommandManager {
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
      projectConfig.Params = this.deployParams; // compatible with old specifications
    }
    return projectConfig;
  }

  async init(): Promise<void> {
    try {
      logger.info(i18n.__('Start ...'));
      const templateFile = checkTemplateFile(this.templateFile);
      if (templateFile) {
        const outPutData: any = {};
        const parse = new Parse(templateFile);
        const parsedObj = parse.getOriginalParsedObj();
        if (this.customerCommandName) {
          const projectConfig = await this.assemblyProjectConfig(parse, this.customerCommandName, parsedObj);
          const componentExecute = new ComponentExeCute(projectConfig, this.method, parsedObj.edition);
          const tempResult = await componentExecute.init();
          if (tempResult) {
            outPutData[projectConfig.ProjectName] = tempResult;
          }
        } else {
          const params = this.deployParams || '';
          const realVariables = await parse.getRealVariables(parsedObj); // Get the original conversion data
          const analysis = new Analysis(realVariables, parse.dependenciesMap);
          const executeOrderList = analysis.getProjectOrder();
          logger.info(
            i18n.__(
              'It is detected that your project has the following project/projects < {{projects}} > to be execute',
              { projects: executeOrderList.join(',') },
            ),
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

        let outResult: any;
        try {
          outResult = yaml.safeDump(JSON.parse(JSON.stringify(outPutData)));
        } catch (ex) {
          logger.error(ex);
          logger.warning('Unable to format the output, the system will display the original output of the component:');
          outResult = JSON.stringify(outPutData, null, '  ');
        }

        logger.success(
          Object.keys(outPutData).length === 0
            ? i18n.__('End of method: {{method}}', { method: this.method })
            : outResult,
        );
      } else {
        const errMessage = i18n.__('Cannot find {{template}} file, please check the directory {{filepath}}', {
          template: TEMPLATE_FILE,
          filepath: this.templateFile,
        })
        logger.error(errMessage);
        process.env['project_error'] = String(true)
        process.env['project_error_message'] = process.env['project_error_message'] || "" + "\n" + errMessage

      }
    } catch (e) {
      process.env['project_error'] = String(true)
      process.env['project_error_message'] = process.env['project_error_message'] || "" + "\n" + e.message
      logger.error(e.message);
    }
    if (process.env['project_error']) {
      logger.error("\n********** " + i18n.__("The operation was not fully successful") + " **********")
      logger.error(process.env['project_error_message'])
      process.exit(1)
    }
  }
}
