import yaml from 'js-yaml';
import { version, Parse, Analysis } from '../../specification';
import { common, i18n, logger } from '../../utils';
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
      projectConfig.Params = this.deployParams; // compatible with old specifications
    }
    return projectConfig;
  }

  async init(): Promise<void> {
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
      try {
        let outResult = yaml.safeDump(JSON.parse(JSON.stringify(outPutData)));
        logger.success(
          Object.keys(outPutData).length === 0
            ? i18n.__('End of method: {{method}}', { method: this.method })
            : outResult,
        );
      } catch (ex) {
        logger.error(ex);
        logger.warning('Unable to format the output, the system will display the original output of the component:');
      }

    } else {
      const errMessage = i18n.__('Cannot find {{template}} file, please check the directory {{filepath}}', {
        template: 'template.yaml',
        filepath: this.templateFile,
      })
      logger.error(errMessage);
      process.env['project_error'] = String(true)
      process.env['project_error_message'] = process.env['project_error_message'] || "" + "\n" + errMessage

    }
  }
}
