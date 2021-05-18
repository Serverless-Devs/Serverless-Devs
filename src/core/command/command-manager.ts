import yaml from 'js-yaml';
import {version, Parse, Analysis} from '../../specification';
import {common, i18n, logger} from '../../utils';
import {
    ComponentExeCute,
    ComponentConfig,
    generateSynchronizeComponentExeList,
    synchronizeExecuteComponentList,
} from '../component';

const {checkTemplateFile} = common;
const {getServiceConfig} = version;


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
                    try {
                        const tempResult = await componentExecute.init();
                        if (tempResult) {
                            outPutData[projectConfig.ProjectName] = tempResult;
                        }
                    } catch (e) {
                        const errorMessage = e.message.includes("componentInstance[method] is not a function") ? `Project ${projectConfig.ProjectName} does not include [${this.method}] method` : e.message
                        throw new Error(`Project ${projectConfig.ProjectName} failed to execute:
  
  📝 Message:  ${errorMessage}
  🧭 You can get help for this component by [s ${projectConfig.ProjectName} -h]
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`)
                    }
                } else {
                    const params = this.deployParams || '';
                    const realVariables = await parse.getRealVariables(parsedObj); // Get the original conversion data
                    const analysis = new Analysis(realVariables, parse.dependenciesMap);
                    const executeOrderList = analysis.getProjectOrder();
                    logger.info(
                        i18n.__(
                            'It is detected that your project has the following projects < {{projects}} > to be execute',
                            {projects: executeOrderList.join(',')},
                        ),
                    );
                    const componentList = generateSynchronizeComponentExeList(
                        {list: executeOrderList, parse, parsedObj, method: this.method, params},
                        this.assemblyProjectConfig.bind(this),
                    );
                    const tempResult = await synchronizeExecuteComponentList(componentList);
                    for (const item in tempResult) {
                        if (executeOrderList.includes(item) && tempResult[item]) {
                            outPutData[item] = tempResult[item];
                        }
                    }
                }

                let outResult = yaml.safeDump(JSON.parse(JSON.stringify(outPutData)));

                if (process.env['s-execute-file']) {
                    throw new Error(`All projects were not deployed successfully.\n\n${yaml.dump(JSON.parse(process.env['s-execute-file']))}\n😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`)
                } else {
                    logger.success(
                        Object.keys(outPutData).length === 0
                            ? i18n.__('End of method: {{method}}', {method: this.method})
                            : outResult,
                    );
                }
            } else {
                const errMessage = i18n.__('Cannot find {{template}} file, please check the directory {{filepath}}', {
                    template: 's.yaml / s.yml / template.yaml / template.yml',
                    filepath: this.templateFile,
                })
                logger.error(errMessage);
                process.env['project_error'] = String(true)
                process.env['project_error_message'] = process.env['project_error_message'] || "" + "\n" + errMessage
            }
        } catch (e) {
            logger.error(e.message);
            process.exit(-1);
        }
    }
}
