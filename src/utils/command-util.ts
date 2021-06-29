/** @format */

import fs from 'fs-extra';
import os from 'os';
import yaml from 'js-yaml';
import path from 'path';
import { Command } from 'commander';
import { CommandManager } from '../core';
import { version, Parse } from '../specification';
import { PROCESS_ENV_TEMPLATE_NAME } from '../constants/static-variable';
import storage from './storage';
import logger from './logger';
import { loadComponent } from '@serverless-devs/core/lib';

const { getSubcommand, getServiceConfig } = version;

export function createUniversalCommand(command: string, customerCommandName?: string, description?: string) {
  const _command = new Command(command);
  const processArgv: string[] = [];
  let params: string[] = [];
  let _customerCommandName = customerCommandName;
  let start = false;
  for (let i = 0; i < process.argv.length; i++) {
    if (!start) {
      processArgv.push(process.argv[i]);
    } else {
      params.push(process.argv[i]);
    }
    if (process.argv[i] === command) {
      start = true;
    }
  }

  if (params.length !== 0) {
    process.env.temp_params = params.join(' ');
    process['temp_params'] = params
  }
  process.argv = processArgv;
  _command.description(description || '').action(() => {
    const template: string | undefined = process.env[PROCESS_ENV_TEMPLATE_NAME];
    if (template) {
      const commandManager = new CommandManager(template, command, _customerCommandName, process.env.temp_params);
      commandManager.init();
    }
  });
  return _command;
}

export async function getCommandDetail(name: any, provider: any, version: any): Promise<any[]> {
  let command_list: any = [];
  return command_list;
}

export async function getParsedTemplateObj(templateFile: any) {
  const parse = new Parse(templateFile);
  const parsedObj = parse.getOriginalParsedObj();
  const result = await parse.getRealVariables(parsedObj);
  return result;
}

export function getCustomerCommandInfo(parsedTemplateObj: any): string[] {
  return getSubcommand(parsedTemplateObj);
}

function getTempCommandStr(commands: string, length: number) {
  const commandsLength = commands.length
  const tempArray = new Array(length - commandsLength).fill(' ')
  return `${commands}${tempArray.join('')} : `
}

export async function createCustomerCommand(templateFile: string): Promise<any[]> {
  const customerCommands: any = [];
  const doc = await getParsedTemplateObj(templateFile);
  const subCommands = getCustomerCommandInfo(doc);
  const commandListPromise = subCommands.map(async projectName => {
    const projectDocDetail: any = getServiceConfig(doc, projectName);
    return { projectName, projectDocDetail };
  });
  const commandListDetail = await Promise.all(commandListPromise);
  commandListDetail.forEach(({ projectName, projectDocDetail }) => {
    const customerCommand = new Command(projectName);
    const customerCommandDescription = `${os.platform()=='win32'?'':'👉'} This is a customer command please use [s ${projectName} -h]  obtain the documentation`;
    customerCommand.description(customerCommandDescription);
    const [_customerCommandName, methodName] = process.argv.slice(2);
    if (_customerCommandName === projectName && methodName && methodName.indexOf('-') !== 0) {
      customerCommand.addCommand(createUniversalCommand(methodName, projectName));
    }
    customerCommand.option('-h, --help', 'Print usage document');
    customerCommand.action(async () => {
      const { component } = projectDocDetail;
      const componentInstance: any = await loadComponent(component);
      if (componentInstance) {
        if (componentInstance.__doc) {
          const docResult = componentInstance.__doc(projectName);
          logger.info(`\n${docResult}`);
        } else {
          try {
            let componentPathYaml = path.join(componentInstance.__path, 'publish.yml');
            if (!(await fs.existsSync(componentPathYaml))) {
              componentPathYaml = path.join(componentInstance.__path, 'publish.yaml');
            }
            const publishYamlInfor = await yaml.load(fs.readFileSync(componentPathYaml, 'utf8'));
            console.log(`\n  ${publishYamlInfor['Name']}@${publishYamlInfor['Version']}: ${publishYamlInfor['Description']}\n`);
            let tempLength = 0
            if (publishYamlInfor['Commands']) {
              for (const item in publishYamlInfor['Commands']) {
                if (item.length > tempLength) {
                  tempLength = item.length
                }
              }
              for (const item in publishYamlInfor['Commands']) {
                console.log(`    ${getTempCommandStr(item, tempLength)} ${publishYamlInfor['Commands'][item]}`)
              }
              console.log(`\n  ${publishYamlInfor['HomePage'] ? `${os.platform()=='win32'?'':'🧭'} More information: ` + publishYamlInfor['HomePage'] + '\n' : ''}`)
            }
          } catch (e) {
            logger.error('Help information could not be found');
          }
        }
      } else {
        logger.error('Help information could not be found');
      }
    });

    customerCommands.push(customerCommand);
  });
  return customerCommands;
}

export function registerCommandChecker(program: any) {
  program.on('command:*', (cmds: any) => {
    const commands = program.commands.map((command: any) => command.name());
    if (!commands.includes(cmds[0])) {
      logger.error(`  error: unknown command ${cmds[0]}`);
      program.help();
    }
  });
}

export async function registerExecCommand(system_command: any, templateFile: string) {
  const execCommand = new Command('exec');
  const customerCommandDescription = `${os.platform()=='win32'?'':'🚀'} Subcommand execution analysis.`;
  execCommand.description(customerCommandDescription);
  execCommand.usage('[subcommand] -- [method] [params]');
  if (templateFile) {
    let commandName = '';
    let projectName = '';
    if (process.argv[3] === '--') {
      commandName = process.argv[4];
      const universialCommandInstance = await createUniversalCommand(commandName, projectName, '');
      execCommand.addCommand(universialCommandInstance);
    }
    if (process.argv[4] === '--' && process.argv[5]) {
      projectName = process.argv[3];
      commandName = process.argv[5];
      const customerCommand = new Command(projectName);
      const universialCommandInstance = await createUniversalCommand(commandName, projectName, '');
      customerCommand.addCommand(universialCommandInstance);
      execCommand.addCommand(customerCommand);
    }
  }
  system_command.addCommand(execCommand);
}

export async function registerCustomerCommand(system_command: any, templateFile: string) {
  if (templateFile) {
    const customerCommands = await createCustomerCommand(templateFile);
    customerCommands.forEach(command => {
      system_command.addCommand(command);
    });
  }
}

export async function registerUniversalCommand(system_command: any, templateFile: string) {
  if (templateFile) {
    const parsedTemplateObj = await getParsedTemplateObj(templateFile);
    const customerCommands = getCustomerCommandInfo(parsedTemplateObj);
    if (process.argv[2] && !customerCommands.includes(process.argv[2]) && !['-h', '--help'].includes(process.argv[2])) {
      system_command.addCommand(createUniversalCommand(process.argv[2]));
    }
    // else if (
    //     process.argv[2] &&
    //     customerCommands.includes(process.argv[2]) &&
    //     process.argv[3] &&
    //     !customerCommands.includes(process.argv[3])
    // ) {
    //     system_command.addCommand(createUniversalCommand(process.argv[3], process.argv[2]));
    // }
  }
}

export function registerVerbose(program: any) {
  if (process.argv.includes('--verbose')) {
    process.env.VERBOSE = program.verbose;
  }
}

export function recordCommandHistory(argv: string[]) {
  const file = storage.getHistoryFile();
  fs.appendFileSync(file, argv.join(',') + os.EOL);
}

export default {
  registerCommandChecker,
  recordCommandHistory,
  registerExecCommand,
  registerCustomerCommand,
  registerUniversalCommand,
};
