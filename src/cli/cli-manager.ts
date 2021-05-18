import {loadComponent} from '@serverless-devs/core';
import {i18n, logger} from '../utils';
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
        const {component, command, access, props} = this.inputs;
        const componentInstance = await loadComponent(component, null, {access})
        if (componentInstance) {
            if (command === "cli-help-options") {
                const docResult = componentInstance.__doc();
                logger.info(`\n${docResult}`);
                return;
            }
            command = command ? command : 'index'; // default index
            if (componentInstance[command]) {
                let tempProp = {}
                try {
                    tempProp = JSON.parse(props || '{}')
                } catch (e) {
                    throw new Error(i18n.__("-p/--prop parameter format error"))
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
                            accessAlias: 'default',
                            AccessAlias: 'default'
                        },
                        project: {
                            component: '/Users/jiangyu/Desktop/untitled/express/dist',
                            access: 'default',
                            projectName: 'function-test'
                        },
                        command: command,
                        Command: command,
                        args: process.env.temp_params,
                        Args: process.env.temp_params,
                        path: {
                            configPath: '/Users/jiangyu/Desktop/untitled/express/start-express/s.yaml'
                        },
                        Path: {
                            ConfigPath: '/Users/jiangyu/Desktop/untitled/express/start-express/s.yaml'
                        }
                    }) || {};

                    let outResult = yaml.safeDump(JSON.parse(JSON.stringify(result)));

                    logger.success(
                        Object.keys(result).length === 0
                            ? i18n.__('End of method: {{method}}', {method: command})
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
    }
}