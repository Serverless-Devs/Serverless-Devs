import { CommanderStatic, Command } from '@serverless-devs/commander';
import core from '../utils/core';
import path from 'path';
import { emoji } from '../utils';
const { getGlobalArgs, execCommand, getYamlContent, publishHelp, lodash } = core;
const { isEmpty, includes, keys, get } = lodash;
class SpecialCommad {
  constructor(private command: CommanderStatic) {}
  async init() {
    const argv = getGlobalArgs(process.argv.slice(2));
    const { _: rawData, template, access, 'skip-actions': skipActions, debug, env, help } = argv;
    if (isEmpty(rawData)) return;
    const sub = new Command(rawData[0]);
    sub.allowUnknownOption();
    this.command.addCommand(sub);
    const { serverName, method, spath } = await this.getParams(argv);
    // s helloworld -h
    if (serverName && isEmpty(method) && help) {
      return await this.help({ spath, serverName });
    }
    return await execCommand({
      syaml: template,
      serverName,
      method,
      args: process.argv.slice(2),
      globalArgs: {
        access,
        skipActions,
        debug,
        env,
      },
    });
  }

  async help({ spath, serverName }) {
    const yamlData = await getYamlContent(spath);

    const component = get(yamlData, ['services', serverName, 'component']);
    const instance = await core.loadComponent(component);
    const publishPath = path.join(instance.__path, 'publish.yaml');
    const publishContent = await getYamlContent(publishPath);
    const commands = publishContent.Commands;
    const customCmds = [];
    if (commands) {
      for (const key in commands) {
        customCmds.push({ [key]: commands[key] });
      }
    }
    const helperLength = publishHelp.maxLen(customCmds);
    const output = [
      `${emoji('🚀')} ${publishContent.Name}@${publishContent.Version}: ${publishContent.Description}\n`,
      publishHelp.helpInfo(customCmds, 'Commands', helperLength),
      `${emoji('🧭')} ${core.makeUnderLine(`More information: ${publishContent.HomePage}`)}\n`,
    ].join('\n');
    console.log(output);
  }

  async getParams(argv): Promise<{ method: string; serverName?: string; spath?: string }> {
    const { _: rawData, template } = argv;
    const originSpath = await core.getTemplatePath(template);
    const spath = await core.transforYamlPath(originSpath, { warn: false });
    if (spath) {
      process.env['templateFile'] = originSpath;
    }
    const yamlData = await getYamlContent(spath);
    const servicesName = keys(get(yamlData, 'services'));
    return includes(servicesName, rawData[0])
      ? {
          serverName: rawData[0],
          method: rawData[1],
          spath,
        }
      : {
          method: rawData[0],
        };
  }
}

export default SpecialCommad;
