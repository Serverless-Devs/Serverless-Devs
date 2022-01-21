import program from '@serverless-devs/commander';
import core from '../utils/core';
import path from 'path';
import { emoji, getProcessArgv, getCredentialWithExisted, logger } from '../utils';
import { isEmpty, isString } from 'lodash';
const { colors, loadComponent, getYamlContent, makeUnderLine } = core;

const description = `Directly use serverless devs to use components, develop and manage applications without yaml configuration.
    
    Example:
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"

${emoji('📖')} Document: ${colors.underline(
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
    let tempLength = 0;
    if (publishYamlInfor['Commands']) {
      for (const item in publishYamlInfor['Commands']) {
        if (item.length > tempLength) {
          tempLength = item.length;
        }
      }
      for (const item in publishYamlInfor['Commands']) {
        console.log(`    ${getTempCommandStr(item, tempLength)} ${publishYamlInfor['Commands'][item]}`);
      }
      console.log(
        `\n  ${
          publishYamlInfor['HomePage']
            ? `${emoji('🧭')} ${makeUnderLine('More information: ' + publishYamlInfor['HomePage'])} ` + '\n'
            : ''
        }`,
      );
    }
  }

  // s cli fc-api listServices
  if (rawData.length === 3) {
    const credentials = await getCredentialWithExisted(access);
    let tempProp = {};
    try {
      const p = argvData.props || argvData.p;
      tempProp = p ? JSON.parse(p) : {};
    } catch (e) {
      throw new Error('-p/--prop parameter format error');
    }
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
      args: argvData._args,
      argsObj: argvData._argsObj,
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
})();

function getTempCommandStr(commands: string, length: number) {
  const commandsLength = commands.length;
  const tempArray = new Array(length - commandsLength).fill(' ');
  return `${commands}${tempArray.join('')} : `;
}
