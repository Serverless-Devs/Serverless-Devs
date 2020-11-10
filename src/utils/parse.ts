/** @format */

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
import * as logger from './logger';
interface MAP_OBJECT {
  [key: string]: any;
}

const COMMON_VARIABLE_TYPE_REG = new RegExp(/\$\{(.*)\}/, 'i');
const SPECIALL_VARIABLE_TYPE_REG = new RegExp(/(.*)\((.*)\)/, 'i');

const OTHER_BASIC_DATA_TYPE = ['[object Number]', '[object Boolean]'];
// const BASIC_DATA_TYPE = ['string', 'number', 'boolean'];
// parse file get variables
// find variables value
export class Parse {
  protected parsedObj: any = {};
  public dependenciesMap: {[key: string]: any} = {};
  protected globalJsonKeyMap: any = {};
  protected globalKeyArr: any[] = [];
  protected magicVariablesArray: any[] = [];
  // private globalJsonKeyMparentKeyap: any;
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
        fileObj = JSON.parse(fs.readFileSync(filePath));
      }
    } catch (e) {
      logger.error(e.message);
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
    if (type === 'Literal') {
      return this.globalJsonKeyMap[variableName] || '${' + variableName + '}';
    }
    if (type === 'Fun' && funName === 'Env') {
      return process.env[funVariable];
    }
    if (type === 'Fun' && funName === 'File') {
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
        // try {
        //   if (!BASIC_DATA_TYPE.includes(typeof objValue)) {
        //     objValue = JSON.stringify(objValue);
        //   }
        // } catch (e) {
        //   objValue = objValue.toString();
        // }
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
        // try {
        //   if (typeof _arrValue !== 'string') {
        //     _arrValue = JSON.stringify(_arrValue);
        //   }
        // } catch (e) {
        //   _arrValue = _arrValue.toString();
        // }
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
    // console.log(objValue);
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
          // eg Env(SecretId) or ${File(./path)}
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
        return this.findVariableValue(variableObj);
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
    Object.keys(variable).forEach(key => {
      const objValue = variable[key];
      variable[key] = this.iteratorToSetValue(objValue, key);
    });
    return variable;
  }

  async getRealVariables(parsedObj: any) {
    this.globalKeyArr = this.generateMagicVariables(parsedObj);
    const replacedObj = this.replaceVariable(parsedObj);
    return replacedObj;
  }
}
