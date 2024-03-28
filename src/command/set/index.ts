import { Command } from 'commander';
import { emoji, suggestCommand } from '@/utils';
import chalk from 'chalk';

import subRegistry from './command/registry';
import subProxy from './command/proxy';
import subAnalysis from './command/analysis';
import subLog from './command/log';
import subEnv from './command/env';

const description = `You can make some default settings for the tool here.

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/set')}`;

export default (program: Command) => {
  const configProgram = program.command('set');
  suggestCommand(configProgram);
  configProgram
    .usage('[commands] [options]')
    .description(description)
    .summary(`Settings for the tool`)
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  subRegistry(configProgram);
  subProxy(configProgram);
  subAnalysis(configProgram);
  subLog(configProgram);
  subEnv(configProgram);
};
