import {loadComponent} from '@serverless-devs/core';
import {i18n, logger} from '../utils';

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
        const componentInstance = await loadComponent(component, null, {access});
        if (componentInstance) {
            if (componentInstance[command]) {
                let tempProp = {}
                try{
                    tempProp = JSON.parse(props || '{}')
                }catch (e) {
                    throw new Error(i18n.__("-p/--prop parameter format error"))
                }
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
                });

                logger.info(result);
            }
        }
    }
}