import { loadComponent } from '@serverless-devs/core';
import { logger } from '../utils';
interface CliParams {
    component: string;
    command: string;
    params: string;
    region: string;
    doc: boolean;
    access: string
}
export default class CliManager {
    protected inputs: CliParams
    constructor(inputs: CliParams) {
        this.inputs = inputs
    }

    async init() {
        let { component, command, params, doc, region, access } = this.inputs;
        const componentInstance = await loadComponent(component, null, { region, access });
        if (componentInstance) {
            if (doc) {
                const result = await componentInstance.__doc();
                logger.info(`文档查询结果：\n${result}`);
            }
            command = command ? command : 'index'; // default index
            if (componentInstance[command]) {
                let methodInput = params;
                try {
                    methodInput = JSON.parse(params);
                } catch (e) {
                }
                const result = await componentInstance[command](methodInput);
                logger.info(result);
            } 

        }
    }
}