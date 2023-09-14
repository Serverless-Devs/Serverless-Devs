import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, isJson } from '../../utils';
import { isFc3 } from './utils';
import v1 from './v1';
import * as utils from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import Credential from '@serverless-devs/credential';
import { filter, get, includes, isEmpty, isString } from 'lodash';
import logger from '../../logger';
import Help from './help';

// TODO:文档链接
const description = `Directly use serverless devs to use components, develop and manage applications without yaml configuration.
  
  Example:
    $ s cli fc api ListServices
    $ s cli fc api ListFunctions --path '{"serviceName": "serviceName"}' --body '{"K1": "V1"}'
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/s/cli')}`;

export default (program: Command) => {
  const { _: raw = [], help } = utils.parseArgv(process.argv.slice(2));
  if (raw[0] !== 'cli') return;

  const cliProgram = program
    .command('cli')
    .description(description)
    .summary(`${emoji('🐚')} Command line operation without yaml mode`)
    .option('-p, --props <jsonString>>', 'The json string of props', v => isJson(v))
    .option('-h, --help', 'Display help for command', undefined) // 避免自动调用help信息（s cli fc -h）
    .allowUnknownOption();
  // s cli or s cli -h
  if (raw.length === 1 || (raw.length === 1 && help)) {
    cliProgram.help();
  }
  const [componentName] = raw.slice(1);
  if (isFc3(componentName)) {
    help && new Help(cliProgram).init();
    cliProgram.action(async () => {
      await doAction();
    });
    return;
  }
  v1(cliProgram);
};

const doAction = async () => {
  const { _: raw = [], ...rest } = utils.parseArgv(process.argv.slice(2), {
    alias: {
      props: 'p',
    },
    string: ['props', 'a'],
  });

  const [componentName, command] = raw.slice(1);
  const componentLogger = logger.loggerInstance.__generate(componentName);
  const instance = await loadComponent(componentName, { logger: componentLogger });
  const access = get(rest, 'access', 'default');
  const inputs = {
    cwd: process.cwd(),
    name: 'default',
    props: get(rest, 'props', {}),
    command: command,
    args: filter(process.argv.slice(3), v => !includes([componentName, command], v)),
    resource: {
      name: 'default',
      component: componentName,
      access,
    },
    getCredential: async () => {
      const res = await new Credential({ logger: componentLogger }).get(access);
      return get(res, 'credential', {});
    },
  };
  if (instance[command]) {
    try {
      const res = await instance[command](inputs);
      if (isEmpty(res)) return logger.write(chalk.green(`End of method: ${command}`));
      return isString(res) ? logger.write(chalk.green(res)) : logger.output(res);
    } catch (error) {
      throw new utils.DevsError(error.message, {
        stack: error.stack,
        exitCode: 101,
      });
    }
  }
  throw new utils.DevsError('The specified command cannot be found.', {
    exitCode: 100,
    tips: 'Please refer to the help document of [-h/--help] command.',
  });
};
