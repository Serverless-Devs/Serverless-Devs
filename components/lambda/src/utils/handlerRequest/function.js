const { packTo } = require('@serverless-devs/s-zip');
const { Logger } = require('@serverless-devs/core');
const path = require('path');
const fs = require('fs');
const { sleep, randomStr } = require('../utils')

const trustPolicyDocument = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["sts:AssumeRole"],
    "Principal": {
      "Service": ["lambda.amazonaws.com"]
    }
  }]
}`;

class Function {
  constructor(aws) {
    // super();
    const lambda = aws.lambda();
    const iam = aws.iam();
    this.lambda = async (functionKey, inputs) => {
      return await new Promise((resolve, reject) => {
        lambda[functionKey](inputs, (e, data) => {
          if (e) {
            reject(e);
          }
          resolve(data);
        });
      })
    }
    this.iam = async (functionKey, inputs) => {
      return await new Promise((resolve, reject) => {
        iam[functionKey](inputs, (e, data) => {
          if (e) {
            reject(e);
          }
          resolve(data);
        });
      })
    }
  }
  
  async prepareCode (inputs) {

    let codeUri = inputs.Code || inputs.CodeUri;

    const artifactConfigured = (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war'))
    if (!artifactConfigured) {
      const outputFileName = `${inputs.FunctionName}.zip`;
      const packToParame = {
        codeUri,
        outputFileName
      };
      const test = await packTo(packToParame);
      if (!test.count) {
        throw new Error('Zip file error')
      }
      codeUri = path.join(process.cwd(), './.s/.cache', outputFileName);
    }
  
    const data = await fs.readFileSync(codeUri);
    return {
      ZipFile: data
    };
  }

  async createRole (functionName) {
    Logger.log(`The configuration does not have role information, and the component generates the role automatically.`, 'yellow');
    const roleName = `s-${functionName}-role-${randomStr()}`;
    Logger.log(`Start generating roleName: ${roleName}`);
    const { Role } = await this.iam('createRole', {
      RoleName: roleName,
      AssumeRolePolicyDocument: trustPolicyDocument,
      Description: 's auto generate role.'
    });
    await this.iam('attachRolePolicy', {
      RoleName: roleName,
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
    });
    Logger.log('Successfully generated role.');
    return Role.Arn;
  }

  /**
   * 
   * @param {*} functionInput 参数
   * @param {*} retry 重试次数
   * @param {*} times 第几次重试
   */
  async createFunction (functionInput, retry = 1, times = 1) {
    const functionName = functionInput.FunctionName;
    if (!functionInput.Role) {
      retry = 5;
      functionInput.Role = await this.createRole(functionName);
      Logger.log('Start trying to create functions after 6 seconds of sleep.', 'yellow');
      await sleep(6000);
    }

    try {
      return await this.lambda('createFunction', functionInput);
    } catch (e) {
      if (times < retry && e.message === 'The role defined for the function cannot be assumed by Lambda.') {
        Logger.log(`Create Failure: ${e.message}`, 'red');
        Logger.log(`Retry ${times} times`);
        await sleep(1500);
        return await this.createFunction(functionInput, retry, times + 1);
      }
      throw new Error(e.message)
    }
  }

  async deploy (properties) {
    const functionInput = JSON.parse(JSON.stringify(properties.Function));
    const functionName = functionInput.FunctionName;
    Logger.log('Start compressing code.');

    const code = await this.prepareCode(functionInput);
    Logger.log('Successful compression code.');

    try {
      await this.lambda('getFunction', { FunctionName: functionName });
      await this.lambda('updateFunctionCode', {
        FunctionName: functionName,
        ZipFile: code.ZipFile
      });
      delete functionInput.Code;
      delete functionInput.CodeUri;
      return await this.lambda('updateFunctionConfiguration', functionInput);
    } catch (e) {
      if (e.code === 'ResourceNotFoundException') {
        functionInput.Code = code;
        delete functionInput.CodeUri;
        return await this.createFunction(functionInput);
      }
      throw new Error(e.message)
    }
  }
  
  async remove (properties) {
    const functionName = properties.Function.FunctionName;

    return await this.lambda('deleteFunction', { FunctionName: functionName });
  }
}

module.exports = Function;