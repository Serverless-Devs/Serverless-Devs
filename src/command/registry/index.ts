import { Command } from 'commander';
import { emoji, mount, suggestCommand } from '@/utils';
import chalk from 'chalk';

const description = `You can manage Serverless Packages on Serverless Registry.

${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/registry/')}`;

export default (program: Command) => {
  const configProgram = program.command('registry');
  suggestCommand(configProgram);
  configProgram
    .description(description)
    .usage('[commands] [options]')
    .summary(`Serverless registry platform`)
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  mount('registry/command/login.ts', configProgram);
  mount('registry/command/publish.ts', configProgram);
  mount('registry/command/list.ts', configProgram);
  mount('registry/command/detail.ts', configProgram);
  mount('registry/command/remove.ts', configProgram);
};
