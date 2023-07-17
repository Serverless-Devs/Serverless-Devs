import { Command } from 'commander';
import { ISpec } from './types';
import { parseArgv, getYamlContent } from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { get, isEmpty, each, find, first, map } from 'lodash';
import path from 'path';
import { helpFormat, emoji } from '../../utils';
import chalk from 'chalk';
import logger from '../../logger';

class Help {
  constructor(private program: Command, private spec = {} as ISpec) {}
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw } = parseArgv(argv);
    // s -h
    if (raw.length === 0) return await this.showHelp();
    // s website -h || s deploy -h
    if (raw.length === 1) return await this.showRaw1Help();
    // s website deploy -h || s website deploy function -h
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
      '  More information: https://serverless.help/custom',
      '',
    ];
    // 仅有一个组件时
    if (components.length === 1) {
      const instance = await loadComponent(first(components));
      helpInfo.push(this.customHelp(instance.commands));
      return helpInfo.join('\n');
    }
    // 多个组件
    helpInfo.push(
      helpFormat(
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
    return helpFormat(result);
  }
  // s website -h || s deploy -h
  async showRaw1Help() {
    const { projectName, steps, components } = this.spec;
    // s website -h
    if (projectName) {
      const customProgram = this.program.command(projectName);
      const componentName = find(steps, item => item.projectName === projectName)?.component;
      const instance = await loadComponent(componentName);
      const publishPath = path.join(instance.__path, 'publish.yaml');
      const publishContent = getYamlContent(publishPath);
      customProgram.addHelpText(
        'before',
        `${emoji('🚀')} ${publishContent['Name']}@${publishContent['Version']}: ${publishContent['Description']}\n`,
      );
      each(instance.commands, (item, key) => {
        customProgram.command(key).summary(get(item, 'help.summary', get(item, 'help.description')));
      });
      if (publishContent['HomePage']) {
        customProgram.addHelpText(
          'after',
          `\n${emoji('🧭')} ${'More information: ' + chalk.underline(publishContent['HomePage'])}`,
        );
      }
      return;
    }
    // s deploy -h
    // 仅有一个组件时
    if (components.length === 1) {
      return await this.singleComponentHelp(first(components));
    }
    // 多个组件
    for (const item of steps) {
      logger.info(`Start executing project ${item.projectName}`);
      const res = await this.singleComponentHelp(item.component);
      if (res) {
        res.outputHelp();
        res.helpInformation = () => '';
      }
      logger.info(`Project ${item.projectName} successfully to execute`);
    }
  }
  private async singleComponentHelp(componentName: string) {
    const { projectName, method } = this.spec;
    const instance = await loadComponent(componentName);
    const data = get(instance, `commands.${method}`);
    if (isEmpty(data)) {
      logger.info('The help information of the component is not obtained');
      return;
    }
    const description = get(data, 'help.description');
    let customProgram = projectName ? this.program.command(projectName).command(method) : this.program.command(method);
    customProgram.description(description).summary(get(data, 'help.summary', description));
    const subCommands = get(data, 'subCommands', {});
    each(subCommands, (item, key) => {
      const subDescription = get(item, 'help.description');
      const subCustomProgram = customProgram
        .command(key)
        .description(subDescription)
        .summary(get(item, 'help.summary', subDescription));
      each(get(item, 'help.option', []), item => {
        const [start, ...rest] = item;
        subCustomProgram.option(start, ...rest);
      });
    });
    each(get(data, 'help.option', []), item => {
      const [start, ...rest] = item;
      customProgram.option(start, ...rest);
    });
    return customProgram;
  }
  // s website deploy -h
  async showRaw2Help() {
    const { steps, projectName } = this.spec;
    this.program.command(projectName);
    const componentName = find(steps, item => item.projectName === projectName)?.component;
    const res = await this.singleComponentHelp(componentName);
    res.help();
  }
}

export default Help;
