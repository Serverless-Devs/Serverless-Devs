import { Command } from 'commander';
import { emoji } from '../../utils';
import { underline } from 'chalk';

import subRegistry from './command/registry';
import subProxy from './command/proxy';
import subAnalysis from './command/analysis';
import subLog from './command/log';

const description = `You can make some default settings for the tool here.

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export default (program: Command) => {
  const configProgram = program
    .command('set')
    .usage('[commands] [options]')
    .description(description)
    .summary(`${emoji('🔧')} Settings for the tool.`)
    .helpOption('-h, --help', 'Display help for command');

  subRegistry(configProgram);
  subProxy(configProgram);
  subAnalysis(configProgram);
  subLog(configProgram);
};
