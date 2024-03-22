import { Command } from 'commander';
import { ISpec } from './types';
import { parseArgv, getYamlContent } from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { get, isEmpty, each, find, first, map, filter, includes } from 'lodash';
import path from 'path';
import { formatHelp, emoji } from '@/utils';
import chalk from 'chalk';
import logger from '@/logger';

class Help {
  constructor(private program: Command, private spec = {} as ISpec) {}
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw } = parseArgv(argv);
    // s -h
    if (raw.length === 0) return await this.showHelp();
    if (raw.length === 1) return await this.showRaw1Help();
    if (raw.length > 1) return await this.showRaw2Help();
  }
  // s -h
  async showHelp() {
    const { steps, components } = this.spec;
    if (isEmpty(steps)) return;
    const helpInfo = [
      'Custom Commands',
      '  Can be used in projects with Serverless Devs Yaml. Usage：',
      '    - s <component_command>：Operate on the project, E.x: s deploy',
      '    - s <project_name> <component_command>：Operate on the resource, E.x: s website deploy',
      '  More information: https://serverless.help/t/s/custom',
      '',
    ];
    // 仅有一个组件时
    if (components.length === 1) {
      const instance = await loadComponent(first(components), { logger });
      helpInfo.push(this.customHelp(instance.commands));
      return helpInfo.join('\n');
    }
    // 多个组件
    helpInfo.push(
      formatHelp(
        map(steps, item => ({
          command: `${item.projectName} [options]`,
          description: `Please use [s ${item.projectName} -h]  obtain the documentation.`,
        })),
      ),
    );
    return helpInfo.join('\n');
  }
  private customHelp(commands: Record<string, any> = {}) {
    const result = [];
    each(commands, (item, key) => {
      result.push({ command: key, description: get(item, 'help.summary', get(item, 'help.description')) });
    });
    return formatHelp(result);
  }
  // s website -h || s deploy -h
  async showRaw1Help() {
    const { projectName, steps, components } = this.spec;
    // s website -h
    if (projectName) {
      const customProgram = this.program.command(projectName);
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      const instance = await loadComponent(componentName, { logger });
      const publishPath = path.join(instance.__path, 'publish.yaml');
      const publishContent = getYamlContent(publishPath);
      customProgram.addHelpText('before', `${emoji('🚀')} ${publishContent['Name']}@${publishContent['Version']}: ${publishContent['Description']}\n`);
      each(instance.commands, (item, key) => {
        customProgram.command(key).summary(get(item, 'help.summary', get(item, 'help.description')));
      });
      customProgram.addHelpCommand(false);
      if (publishContent['HomePage']) {
        customProgram.addHelpText('after', `\n${emoji('🧭')} ${'More information: ' + chalk.underline(publishContent['HomePage'])}`);
      }
      return;
    }
    if (components.length > 1) {
      // 多个组件
      await this.multiComponentHelp();
      return;
    }
    const res = await this.singleComponentHelp(first(components));
    res.option('--env <envName>', '[Optional] Specify the env name');
    res.option('--skip-actions', '[Optional] Skip the extends section');
    res && res.outputHelp();
  }
  private async singleComponentHelp(componentName: string) {
    const { projectName, command } = this.spec;
    const instance = await loadComponent(componentName, { logger });
    const data = get(instance, `commands.${command}`);
    if (isEmpty(data)) {
      logger.info('The help information of the component is not obtained');
      return;
    }
    const description = get(data, 'help.description');
    let customProgram = projectName ? this.program.command(projectName).command(command) : this.program.command(command);
    customProgram.description(description).summary(get(data, 'help.summary', description)).option('-h, --help', 'Display help for command', undefined); // 手动调用help信息
    each(get(data, 'help.option', []), item => {
      const [start, ...rest] = item;
      customProgram.option(start, ...rest);
    });
    each(get(data, 'subCommands', {}), (item, key) => {
      const desc = get(item, 'help.description');
      customProgram.command(key).description(desc).summary(get(item, 'help.summary', desc)).option('-h, --help', 'Display help for command', undefined); // 手动调用help信息
    });
    const argv = process.argv.slice(2);
    const { _: raw } = parseArgv(argv);
    const subCommand = filter(raw, o => !includes([projectName, command], o));
    if (isEmpty(subCommand)) return customProgram;

    const subCommandInfo = get(data, `subCommands.${subCommand}`, {});
    const subDescription = get(subCommandInfo, 'help.description');
    const subCustomProgram = customProgram
      .command(first(subCommand))
      .description(subDescription)
      .summary(get(subCommandInfo, 'help.summary', subDescription))
      .option('-h, --help', 'Display help for command', undefined); // 手动调用help信息
    each(get(subCommandInfo, 'help.option', []), item => {
      const [start, ...rest] = item;
      subCustomProgram.option(start, ...rest);
    });
    return subCustomProgram;
  }
  private async multiComponentHelp() {
    const { steps } = this.spec;
    for (const item of steps) {
      logger.info(`Start executing project ${item.projectName}`);
      const res = await this.singleComponentHelp(item.component);
      res.option('--env <envName>', '[Optional] Specify the env name');
      res.option('--skip-actions', '[Optional] Skip the extends section');
      res && res.outputHelp();
      logger.info(`Project ${item.projectName} successfully to execute`);
    }
  }
  // s website deploy -h
  // s deploy function -h
  // s website deploy function -h
  async showRaw2Help() {
    const { steps, projectName, components } = this.spec;
    if (projectName) {
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      const res = await this.singleComponentHelp(componentName);
      res && res.outputHelp();
      return;
    }
    // 多个组件
    if (components.length > 1) {
      await this.multiComponentHelp();
      return;
    }
    // 仅有一个组件时
    const res = await this.singleComponentHelp(first(components));
    res.option('--env <envName>', '[Optional] Specify the env name');
    res.option('--skip-actions', '[Optional] Skip the extends section');
    res && res.outputHelp();
  }
}

export default Help;
