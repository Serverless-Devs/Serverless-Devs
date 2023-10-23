import core from '../utils/core';
import path from 'path';
import { HandleError } from '../error';
import { emoji, getCredentialWithExisted, logger, specifyServiceHelp } from '../utils';
const { chalk, loadComponent, lodash } = core;
const { underline } = chalk;
const { isEmpty, isString, includes } = lodash;

const description = `Directly use serverless devs to use components, develop and manage applications without yaml configuration.
    
    Example:
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/cli.md',
)}`;

const throwError = error => {
  let jsonMsg;
  try {
    jsonMsg = JSON.parse(error.message);
  } catch (error) { }
  if (jsonMsg && jsonMsg.tips) {
    throw new Error(
      JSON.stringify({
        code: 101,
        message: jsonMsg.message,
        tips: jsonMsg.tips,
      }),
    );
  } else {
    throw new Error(
      JSON.stringify({
        code: 101,
        message: error.message,
        stack: error.stack,
      }),
    );
  }
};

async function run(program) {
  const command = program
    .command('cli')
    .usage('[component] [method] [options]')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .option('-p, --props <jsonString>', 'The json string of props')
    .helpOption('-h, --help', 'Display help for command')
    .allowUnknownOption()
    .description(description)
    .addHelpCommand(false)
    .action(async options => {
      try {
        await doAction(options);
      } catch (error) {
        await HandleError(error);
      }
    });

  const doAction = async options => {
    const argvData = core.getGlobalArgs(process.argv.slice(2));
    const { _: rawData, access = 'default', help } = argvData;
    // s cli
    if (rawData.length === 1 || (rawData.length === 1 && help)) {
      command.help();
    }
    const [componentName, method] = rawData.slice(1);
    const instance = await loadComponent(componentName);

    async function getCurentCredential(access: string) {
      if (access === core.ALIYUN_CLI) {
        return await core.getCredential(access);
      }
      return await getCredentialWithExisted(access);
    }

    async function execComponent(_method) {
      const credentials = await getCurentCredential(access);
      let tempProp = {};
      try {
        const p = argvData.props || argvData.p;
        tempProp = p ? JSON.parse(p) : {};
      } catch (e) {
        throw new Error('-p/--props parameter format error');
      }
      const argsObj = rawData
        .slice(3)
        .filter(o => !includes(argvData._argsObj, o))
        .concat(argvData._argsObj);
      const inputs = {
        props: tempProp,
        credentials: credentials || {},
        appName: 'default',
        project: {
          component: componentName,
          access,
          projectName: 'default',
          provider: undefined,
        },
        command: _method,
        args: argsObj.join(' '),
        argsObj,
        path: {
          configPath: process.cwd(),
        },
      };
      try {
        const res = await instance[_method](inputs);
        if (isEmpty(res)) {
          return logger.success(`End of method: ${_method}`);
        }
        isString(res) ? logger.success(res) : logger.output(res);
      } catch (error) {
        throwError(error);
      }
    }

    // s cli fc-api
    if (rawData.length === 2) {
      if (instance['index']) {
        return await execComponent('index');
      }
      if (instance.__doc && instance.__doc().length > 1685) {
        const docResult = instance.__doc();
        return logger.log(docResult);
      }
      const publishPath = path.join(instance.__path, 'publish.yml');
      await specifyServiceHelp(publishPath);
      return;
    }
    // s cli fc-api listServices
    // s cli fc-api set access default
    if (rawData.length >= 3) {
      if (instance[method]) {
        return await execComponent(method);
      }
      throw new Error(
        JSON.stringify({
          code: 100,
          message: 'The specified command cannot be found.',
          tips: 'Please refer to the help document of [-h/--help] command.',
        }),
      );
    }
  };
}

export = run;
