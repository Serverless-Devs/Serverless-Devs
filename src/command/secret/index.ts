import { Command } from 'commander';
import { emoji, mount, suggestCommand } from '@/utils';
import chalk from 'chalk';

const description = `Secret Manager is used to manage the secret of cloud vendors.

${emoji('📖')} Document: Temporarily unavailable`;

export default (program: Command) => {
  const configProgram = program.command('secret');
  suggestCommand(configProgram);
  configProgram
    .description(description)
    .summary(`Manage the secret of cloud vendors`)
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  mount('secret/command/add.ts', configProgram);
  mount('secret/command/get.ts', configProgram);
  mount('secret/command/remove.ts', configProgram);
};
