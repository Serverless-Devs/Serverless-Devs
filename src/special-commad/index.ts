import { CommanderStatic, Command } from '@serverless-devs/commander';
import core from '../utils/core';
import { isEmpty, includes, keys, get } from 'lodash';

const { getGlobalArgs, execCommand, getTemplatePath, getYamlContent } = core;

class SpecialCommad {
  constructor(private command: CommanderStatic) {}
  async init() {
    const argv = getGlobalArgs(process.argv.slice(2));
    const { _: rawData, template, access, 'skip-actions': skipActions, debug } = argv;
    if (isEmpty(rawData)) return;
    const sub = new Command(rawData[0]);
    sub.allowUnknownOption();
    this.command.addCommand(sub);
    const { serverName, method } = await this.getParams(argv);
    return await execCommand({
      syaml: template,
      serverName,
      method,
      args: process.argv.slice(2),
      globalArgs: {
        access,
        skipActions,
        debug,
      },
    });
  }

  async getParams(argv): Promise<{ method: string; serverName?: string }> {
    const { _: rawData, template } = argv;
    const spath = await getTemplatePath(template);
    if (spath) {
      process.env['templateFile'] = spath;
    }
    if (rawData.length === 1) {
      return {
        method: rawData[0],
      };
    }
    if (rawData.length === 2) {
      const yamlData = await getYamlContent(spath);
      const servicesName = keys(get(yamlData, 'services'));
      return includes(servicesName, rawData[0])
        ? {
            serverName: rawData[0],
            method: rawData[1],
          }
        : {
            method: rawData[0],
          };
    }
  }
}

export default SpecialCommad;
