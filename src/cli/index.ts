import program from '@serverless-devs/commander';
import core from '../utils/core';
import path from 'path';
import { CommandError } from '../error';
import { emoji, getProcessArgv, getCredentialWithExisted, logger } from '../utils';
const { chalk, loadComponent, getYamlContent, makeUnderLine, publishHelp, lodash } = core;
const { underline, bold } = chalk;
const { isEmpty, isString, isPlainObject } = lodash;

const description = `Directly use serverless devs to use components, develop and manage applications without yaml configuration.
    
    Example:
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/cli.md',
)}`;

(async () => {
  const argvData = getProcessArgv();
  const { _: rawData, noHelpArgv, access = 'default' } = argvData;

  program
    .name('s cli')
    .usage('[component] [method] [options]')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .option('-p, --props <jsonString>', 'The json string of props')
    .helpOption('-h, --help', 'Display help for command')
    .allowUnknownOption()
    .description(description)
    .addHelpCommand(false)
    .parse(noHelpArgv);

  //  s cli
  if (rawData.length === 1) {
    return program.help();
  }
  const [componentName, method] = rawData.slice(1);
  const instance = await loadComponent(componentName);
  // s cli fc-api
  if (rawData.length === 2) {
    if (instance.__doc && instance.__doc().length > 1685) {
      const docResult = instance.__doc();
      return console.log(docResult);
    }
    const publishPath = path.join(instance.__path, 'publish.yml');
    const publishYamlInfor = await getYamlContent(publishPath);
    console.log(`\n  ${publishYamlInfor['Name']}@${publishYamlInfor['Version']}: ${publishYamlInfor['Description']}\n`);
    const commands = publishYamlInfor['Commands'];
    if (commands) {
      const maxLength = publishHelp.maxLen(commands);
      let tmp = [];
      const newObj = {};
      for (const key in commands) {
        const ele = commands[key];
        isPlainObject(ele)
          ? tmp.push(publishHelp.helpInfo(ele, underline(bold(key)), maxLength, 4))
          : (newObj[key] = ele);
      }
      tmp.length > 0 && console.log(tmp.join('\n'));
      if (!isEmpty(newObj)) {
        for (const key in newObj) {
          console.log(`    ${getTempCommandStr(key, maxLength)} ${newObj[key]}`);
        }
        console.log('');
      }
      console.log(
        publishYamlInfor['HomePage']
          ? `  ${emoji('🧭')} ${makeUnderLine('More information: ' + publishYamlInfor['HomePage'])} ` + '\n'
          : '',
      );
    }
  }

  // s cli fc-api listServices
  // s cli fc-api set access default
  if (rawData.length >= 3) {
    const credentials = await getCredentialWithExisted(access);
    let tempProp = {};
    try {
      const p = argvData.props || argvData.p;
      tempProp = p ? JSON.parse(p) : {};
    } catch (e) {
      throw new Error('-p/--prop parameter format error');
    }
    const argsObj = rawData.slice(3).concat(argvData._argsObj);
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
      command: method,
      args: argsObj.join(' '),
      argsObj,
      path: {
        configPath: undefined,
      },
    };
    const res = await instance[method](inputs);
    if (isEmpty(res)) {
      return logger.success(`End of method: ${method}`);
    }
    isString(res) ? logger.success(res) : logger.output(res);
  }
})().catch(err => {
  throw new CommandError(err.message);
});

function getTempCommandStr(commands: string, length: number) {
  const commandsLength = commands.length;
  const tempArray = new Array(length - commandsLength).fill(' ');
  return `${commands}${tempArray.join('')} : `;
}
