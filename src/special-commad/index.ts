import { CommanderStatic, Command } from '@serverless-devs/commander';
import core from '../utils/core';
import { isEmpty, includes } from 'lodash';
import { COMMAND_LIST } from '../constant';

const { getGlobalArgs, parse } = core;

class SpecialCommad {
  constructor(private command: CommanderStatic) {}
  async init() {
    if (includes(COMMAND_LIST, process.argv[2])) return;
    const params = getGlobalArgs(process.argv.slice(2));
    const { _: rawData, template, access, 'skip-actions': skipActions, debug } = params;
    if (isEmpty(rawData)) return;
    if (rawData.length === 1) {
      const sub = new Command(rawData[0]);
      sub.allowUnknownOption();
      this.command.addCommand(sub);
      await parse({
        syaml: template,
        method: rawData[0],
        args: process.argv.slice(2),
        globalArgs: {
          access,
          skipActions,
          debug,
        },
      });
    }

    if (rawData.length === 2) {
      const sub = new Command(params._[0]);
      this.command.addCommand(sub);
    }
  }
}

export default SpecialCommad;
