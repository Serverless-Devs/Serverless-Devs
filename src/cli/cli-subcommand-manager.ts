/** @format */

import { Command } from 'commander';
import { loadComponent } from '@serverless-devs/core';
import { logger } from '../utils';
export default class CliSubCommandManager {
  constructor(protected cliCommand, protected subCommandName) {}
  async init() {
    const execCommand = new Command(this.subCommandName);
    const customerCommandDescription = '🚀 ' + 'Subcommand execution analysis.';
    execCommand.usage('[method] [options]');
    const subCommandInstance: any = await loadComponent(this.subCommandName);
    if (subCommandInstance) {
      const listApi = subCommandInstance.__listApi();
      execCommand.description(customerCommandDescription).addHelpCommand(true);
      listApi.forEach((item: any) => {
        const { name, desc, params } = item;
        let apiCommand = new Command(name);
        apiCommand.description(desc);
        params.forEach(param => {
          apiCommand.option(
            `--${param.paramName} [${param.paramName}]`,
            `${param.type ? `${param.type} 类型` : ''}:${param.paramDesc}`,
          );
        });
        apiCommand.addHelpCommand(false);
        apiCommand.action(async () => {
          const paramsList = params.map(_item => apiCommand[_item.paramName]).filter(item => item);
          if (paramsList.length === 0) {
            apiCommand.help();
          }
          const result = await subCommandInstance[name](...paramsList);
          logger.info(result);
        });
        execCommand.addCommand(apiCommand);
      });
      this.cliCommand.addCommand(execCommand);
    }
    return this.cliCommand;
  }
}
