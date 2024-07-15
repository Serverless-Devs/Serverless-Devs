import { Command } from 'commander';
import { emoji, mount, suggestCommand } from '@/utils';
import chalk from 'chalk';

const description = `You can make some default settings for the tool here.

${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/set/')}`;

export default (program: Command) => {
  const configProgram = program.command('set');
  suggestCommand(configProgram);
  configProgram
    .usage('[commands] [options]')
    .description(description)
    .summary(`Settings for the tool`)
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  mount('set/command/registry.ts', configProgram);
  mount('set/command/proxy.ts', configProgram);
  mount('set/command/analysis.ts', configProgram);
  mount('set/command/log.ts', configProgram);
  mount('set/command/env/index.ts', configProgram);
};
