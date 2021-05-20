import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

import {getServiceList} from './version';
import {logger} from "../utils";

interface MAP_OBJECT {
    [key: string]: any;
}

const COMMON_VARIABLE_TYPE_REG = new RegExp(/\$\{(.*)\}/, 'i');
const SPECIALL_VARIABLE_TYPE_REG = new RegExp(/(.*)\((.*)\)/, 'i');

const OTHER_BASIC_DATA_TYPE = ['[object Number]', '[object Boolean]'];

export class Parse {
    protected parsedObj: any = {};
    public dependenciesMap: { [key: string]: any } = {};
    protected globalJsonKeyMap: any = {};
    protected globalKeyArr: any[] = [];
    protected magicVariablesArray: any[] = [];

    constructor(protected path: string) {
        if (fs.existsSync(path)) {
            try {
                this.init(path);
            } catch (ex) {
                throw new Error(ex.message);
            }
        }
    }

    getFileObj(filePath: string) {
        let fileObj = {};
        try {
            const extname = path.extname(filePath);
            if (extname.indexOf('.yaml') !== -1 || extname.indexOf('.yml') !== -1) {
                fileObj = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
            }
            if (extname.indexOf('.json') !== -1) {
                fileObj = JSON.parse(fs.readFileSync(filePath).toString());
            }
        } catch (e) {
            if (process.env["serverless_devs_out_put_help"] !== 'true') {
                logger.error(`Failed to execute:\n
  ❌ Message: The file converted by parse is abnormal ${e.message}
  🧭 Please make sure your Yaml/JSON file is standard. 
      📚 Yaml document: https://github.com/Serverless-Devs/docs/blob/master/zh/yaml.md
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`)
                process.exit(-1);
            }
        }
        return fileObj;
    }

    async init(filePath: string) {
        this.parsedObj = this.getFileObj(filePath);
    }

    getOriginalParsedObj() {
        return this.parsedObj;
    }

    private findVariableValue(variableObj: any) {
        const {variableName, type, funName, funVariable} = variableObj;
        const result = '';
        if (type === 'Literal') { // 兼容新版本的规范 services
            return this.globalJsonKeyMap[variableName] || this.globalJsonKeyMap[`services.${variableName}`] || '${' + variableName + '}';
        }
        if (type === 'Fun' && (funName === 'Env' || funName === 'env')) {
            return process.env[funVariable];
        }
        if (type === 'Fun' && (funName === 'Path' || funName === 'path')) {
            return path.join(process.cwd(), funVariable);
        }

        if (type === 'Fun' && (funName === 'File' || funName === 'file')) {
            return this.getFileObj(funVariable);
        }
        return result;
    }

    generateMagicVariables(value: any, arr: any[] = [], parentStr = '') {
        if (Object.prototype.toString.call(value) === '[object Object]') {
            if (parentStr !== '') {
                parentStr = `${parentStr}.`;
            }
            Object.keys(value).map(key => {
                const showKey = `${parentStr}${key}`;
                const objValue = value[key];
                arr.push(showKey);
                arr.concat(this.generateMagicVariables(objValue, arr, `${showKey}`));
                this.globalJsonKeyMap[showKey] = objValue;
            });
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
            value.forEach((_arrValue: any, i: number) => {
                const showKey = `${parentStr}[${i}]`;
                const showKeyNe = `${parentStr}[${i - value.length}]`;
                arr.push(showKey);
                arr.push(showKeyNe);
                arr.concat(this.generateMagicVariables(_arrValue, arr, `${showKey}`));
                arr.concat(this.generateMagicVariables(_arrValue, arr, `${showKeyNe}`));
                this.globalJsonKeyMap[showKey] = _arrValue;
                this.globalJsonKeyMap[showKeyNe] = _arrValue;
            });
        } else {
            arr = [];
        }
        return arr;
    }

    isProjectProperties(topKey: string, parentKey: any) {
        let projProperties = false;
        if (parentKey === 'Properties' && this.globalJsonKeyMap[`${topKey}.${parentKey}`]) {
            projProperties = true;
        }
        return projProperties;
    }

    iteratorToSetValue(objValue: any, topKey: string, parentKey?: any) {
        if (OTHER_BASIC_DATA_TYPE.includes(Object.prototype.toString.call(objValue))) {
            return objValue;
        }
        if (Object.prototype.toString.call(objValue) === '[object String]') {
            // const filePath = !this.isProjectProperties(topKey, parentKey) ? path.resolve(this.path, '..', objValue) : objValue;
            const regResult = objValue.match(COMMON_VARIABLE_TYPE_REG);
            if (regResult) {
                const matchResult = regResult[1]; // get match result like projectName.key.variable
                const variableObj = {variableName: matchResult, type: 'Literal', funName: null, funVariable: ''};
                const funMatchResult = matchResult.match(SPECIALL_VARIABLE_TYPE_REG);
                if (funMatchResult) {
                    // eg Env(SecretId) or File(./path)
                    variableObj.funName = funMatchResult[1];
                    variableObj.funVariable = funMatchResult[2];
                    variableObj.type = 'Fun';
                } else {
                    let topKeyDependencisMap = this.dependenciesMap[topKey];
                    if (!topKeyDependencisMap) {
                        topKeyDependencisMap = {};
                    }
                    const dependProjName = matchResult.split('.')[0];
                    topKeyDependencisMap[dependProjName] = 1; // Dependent priority
                    this.dependenciesMap[topKey] = topKeyDependencisMap;
                }
                let realValue = this.findVariableValue(variableObj);
                return Object.prototype.toString.call(realValue) === '[object String]' ? objValue.replace(COMMON_VARIABLE_TYPE_REG, realValue) : realValue;
            }
            this.dependenciesMap[topKey] = {};

            return objValue;
        }
        if (Object.prototype.toString.call(objValue) === '[object Array]') {
            return objValue.map((item: any) => {
                return this.iteratorToSetValue(item, topKey);
            });
        }
        if (Object.prototype.toString.call(objValue) === '[object Object]') {
            Object.keys(objValue).forEach(key => {
                objValue[key] = this.iteratorToSetValue(objValue[key], topKey, parentKey || key);
            });
            return objValue;
        }
    }

    replaceVariable(variable: any | MAP_OBJECT) {
        const _variable = getServiceList(variable);
        Object.keys(_variable).forEach(key => {
            const objValue = _variable[key];
            _variable[key] = this.iteratorToSetValue(objValue, key);
        });
        if (variable.services) {
            variable.services = _variable;
        } else {
            variable = _variable;
        }
        return variable;
    }

    async getRealVariables(parsedObj: any) {
        this.globalKeyArr = this.generateMagicVariables(parsedObj);
        const replacedObj = this.replaceVariable(parsedObj);
        return replacedObj;
    }
}
