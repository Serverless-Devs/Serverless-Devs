import { Command } from 'commander';
import * as utils from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { each, get, isEmpty } from 'lodash';
import logger from '@/logger';

class Help {
  private raw: string[] = [];
  private logger = logger;
  constructor(private program: Command) {}
  async init() {
    const {
      _: [, ...raw],
    } = utils.parseArgv(process.argv.slice(2));
    this.raw = raw;
    if (raw.length === 1) {
      return await this.showRaw1();
    }
    if (raw.length === 2) {
      return await this.showRaw2();
    }
    return await this.showRaw3();
  }
  async showRaw1() {
    const [componentName] = this.raw;
    const componentCommand = this.program.command(componentName).allowUnknownOption();
    const instance = await loadComponent(componentName, { logger: this.logger.loggerInstance.__generate(componentName) });
    each(get(instance, 'commands'), (item, key) => {
      const desc = get(item, 'help.description');
      const subCommand = componentCommand
        .command(key)
        .description(desc)
        .summary(get(item, 'help.summary', desc));
      each(get(item, 'help.option', []), obj => {
        const [start, ...rest] = obj;
        subCommand.option(start, ...rest);
      });
      each(get(item, 'subCommands', {}), (obj, cmd) => {
        const desc = get(obj, 'help.description');
        subCommand
          .command(cmd)
          .description(desc)
          .summary(get(obj, 'help.summary', desc));
      });
    });
    componentCommand.help();
  }
  async showRaw2() {
    const [componentName, command] = this.raw;
    const componentCommand = this.program.command(componentName).command(command).allowUnknownOption();
    const instance = await loadComponent(componentName, { logger: this.logger.loggerInstance.__generate(componentName) });
    const data = get(instance, `commands.${command}`);
    if (isEmpty(data)) {
      throw new utils.DevsError(`The command ${command} does not exist in the component ${componentName}`);
    }
    const desc = get(data, 'help.description');
    const subCommand = componentCommand.description(desc).summary(get(data, 'help.summary', desc));
    each(get(data, 'help.option', []), obj => {
      const [start, ...rest] = obj;
      subCommand.option(start, ...rest);
    });
    each(get(data, 'subCommands', {}), (obj, cmd) => {
      const desc = get(obj, 'help.description');
      const childCommand = subCommand
        .command(cmd)
        .description(desc)
        .summary(get(obj, 'help.summary', desc));

      each(get(obj, 'help.option', []), obj => {
        const [start, ...rest] = obj;
        childCommand.option(start, ...rest);
      });
    });
    subCommand.help();
  }

  async showRaw3() {
    const [componentName, command, subCmd] = this.raw;
    const componentCommand = this.program.command(componentName).command(command).command(subCmd).allowUnknownOption();
    const instance = await loadComponent(componentName, { logger: this.logger.loggerInstance.__generate(componentName) });
    const data = get(instance, `commands.${command}.subCommands.${subCmd}`);
    if (isEmpty(data)) {
      throw new utils.DevsError(`The sub command ${subCmd} does not exist in the component ${componentName} ${command}`);
    }
    const desc = get(data, 'help.description');
    const subCommand = componentCommand.description(desc).summary(get(data, 'help.summary', desc));
    each(get(data, 'help.option', []), obj => {
      const [start, ...rest] = obj;
      subCommand.option(start, ...rest);
    });
    subCommand.help();
  }
}

export default Help;
