import { Command } from 'commander';
import { emoji, suggestCommand, mount } from '@/utils';
import chalk from 'chalk';

const description = `Managing multiple environments for serverless applications, such as testing, development, and production environments, is the best practice for serverless Devs for serverless environments.

Supported vendors: Alibaba Cloud

${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/env/')}`;
export default (program: Command) => {
  const envProgram = program.command('env');
  suggestCommand(envProgram);
  envProgram
    .description(description)
    .summary(`Environment operation`)
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  mount('env/command/init/index.ts', envProgram);
  mount('env/command/default/index.ts', envProgram);
  mount('env/command/describe/index.ts', envProgram);
  // mount('env/command/update/index.ts', envProgram);
  mount('env/command/destroy/index.ts', envProgram);
  mount('env/command/list/index.ts', envProgram);
  mount('env/command/set/index.ts', envProgram);
};
