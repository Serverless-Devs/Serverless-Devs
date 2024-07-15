import { Command } from 'commander';
import { emoji, mount, suggestCommand } from '@/utils';
import chalk from 'chalk';

const description = `Configure vendors account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/config/')}`;

export default (program: Command) => {
  const configProgram = program.command('config');
  suggestCommand(configProgram);
  configProgram
    .description(description)
    .summary(`Configure vendors account`)
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  mount('config/command/add.ts', configProgram);
  mount('config/command/get.ts', configProgram);
  mount('config/command/remove.ts', configProgram);
  mount('config/command/rename.ts', configProgram);
  mount('config/command/default.ts', configProgram);
};
