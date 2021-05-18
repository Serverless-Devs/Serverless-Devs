import {loadComponent} from '@serverless-devs/core';
import {logger} from '../utils';
import yaml from "js-yaml";

interface CliParams {
    component: string;
    command: string;
    access: string;
    props: string
}

export default class CliManager {
    protected inputs: CliParams

    constructor(inputs: CliParams) {
        this.inputs = inputs
    }

    async init() {
        try {
            let {component, command, access, props} = this.inputs;
            const componentInstance = await loadComponent(component, null, {access})
            if (componentInstance) {
                if(!command){
                    if(componentInstance['index']){
                        command = 'index'
                    }else{
                        command = 'cli-help-options'
                    }
                }
                if (command === "cli-help-options") {
                    const docResult = componentInstance.__doc();
                    logger.info(`\n${docResult}`);
                    return;
                }
                if (componentInstance[command]) {
                    let tempProp = {}
                    try {
                        tempProp = JSON.parse(props || '{}')
                    } catch (e) {
                        throw new Error("-p/--prop parameter format error")
                    }
                    try {
                        const result = await componentInstance[command]({
                            props: tempProp,
                            Properties: tempProp,
                            Credentials: {},
                            credentials: {},
                            appName: 'default',
                            Project: {
                                ProjectName: 'default',
                                projectName: 'default',
                                component: component,
                                Component: component,
                                provider: undefined,
                                Provider: undefined,
                                accessAlias: access || 'default',
                                AccessAlias: access || 'default'
                            },
                            project: {
                                component: '',
                                access: access || 'default',
                                projectName: ''
                            },
                            command: command,
                            Command: command,
                            args: process.env.temp_params,
                            Args: process.env.temp_params,
                            path: {
                                configPath: ''
                            },
                            Path: {
                                ConfigPath: ''
                            }
                        }) || {};

                        let outResult = yaml.safeDump(JSON.parse(JSON.stringify(result)));

                        logger.success(
                            Object.keys(result).length === 0
                                ? `End of method: ${command}`
                                : outResult,
                        );
                    } catch (e) {
                        logger.error(`Failed to execute:\n
  📝 Message: ${e.message}
  🧭 You can get help for this component by [s ${component} -h]
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`)
                        process.exit(-1);
                    }
                } else {
                    logger.error(`Failed to execute:\n
  📝 Message: Component ${component} does not include [${command}] method
  🧭 You can get help for this component by [s ${component} -h]
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`)
                    process.exit(-1);
                }
            }
        }catch (e) {
            logger.error(`Failed to execute:\n
  📝 Message: ${e.message}
  🧭 You can get more component on: https://github.com/Serverless-Devs/package-awesome
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`)
                    process.exit(-1);
        }
    }
}