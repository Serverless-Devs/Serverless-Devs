/** @format */

import {Command} from 'commander';
import axios from 'axios';
import logger from './logger';
import * as storage from './storage';
import {CheckVersion} from './check-version';
import {Parse} from './parse';
import * as fs from 'fs-extra';
import * as os from 'os';
import createUniversalCommand from '../command';
import {SERVERLESS_COMMAND_DESC_URL} from '../constants/static-variable';
export async function getCommandDetail(name: any, provider: any, version: any): Promise<any[]> {
  let command_list: any = [];
  try {
    const result: any = await axios.get(SERVERLESS_COMMAND_DESC_URL, {
      params: {
        name,
        provider,
        version,
      },
    });
    if (result.data && result.data.Response) {
      const command = result.data.Response.Command || {};
      command_list = Object.keys(command).map(key => {
        return {
          name: key,
          desc: command[key],
        };
      });
    }
  } catch (e) {
    logger.error(e.message);
  }
  return command_list;
}
export async function getParsedTemplateObj(templateFile: any) {
  const parse = new Parse(templateFile);
  const parsedObj = parse.getOriginalParsedObj();
  return await parse.getRealVariables(parsedObj);
}

export function getCustomerCommandInfo(parsedTemplateObj: any): string[] {
  return Object.keys(parsedTemplateObj).filter(key => key !== 'Global');
}

export async function createCustomerCommand(templateFile: string): Promise<any[]> {
  const customerCommands: any = [];
  const doc = await getParsedTemplateObj(templateFile);
  const commandListPromise = getCustomerCommandInfo(doc).map(async projectName => {
    const projectDocDetail = doc[projectName];
    const {Provider, Component} = projectDocDetail;
    const commandList = await getCommandDetail(Component, Provider, '');
    return {projectName, commandList, projectDocDetail};
  });
  const commondListDetail = await Promise.all(commandListPromise);
  commondListDetail.forEach(({projectName, commandList, projectDocDetail}) => {
    const customerCommand = new Command(projectName);
    commandList.forEach(async command => {
      const {name: commandName, desc} = command;
      const universialCommandInstance = await createUniversalCommand(commandName, projectName, desc);
      customerCommand.addCommand(universialCommandInstance);
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
      logger.error();
      program.help();
    }
  });
}

export async function registerExitOverride(program: any) {
  const checkVersion = new CheckVersion();
  await checkVersion.init();
  program.exitOverride(async () => {
    checkVersion.showMessage();
  });
}

export async function registerCustomerCommand(system_command: any, templateFile: string) {
  if (templateFile) {
    const customerCommands = await createCustomerCommand(templateFile);
    customerCommands.forEach(command => {
      system_command.addCommand(command);
    });
  }
}
export async function regiserUniversalCommand(system_command: any, templateFile: string) {
  if (templateFile) {
    const parsedTemplateObj = await getParsedTemplateObj(templateFile);
    const customerCommands = getCustomerCommandInfo(parsedTemplateObj);
    if (process.argv[2] && !customerCommands.includes(process.argv[2])) {
      system_command.addCommand(createUniversalCommand(process.argv[2]));
    } else if (
      process.argv[2] &&
      customerCommands.includes(process.argv[2]) &&
      process.argv[3] &&
      !customerCommands.includes(process.argv[3])
    ) {
      system_command.addCommand(createUniversalCommand(process.argv[3]));
    }
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

export default registerCommandChecker;
