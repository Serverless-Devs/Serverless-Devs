import { Command } from 'commander';
import { emoji, suggestCommand } from '@/utils';
import chalk from 'chalk';
import subAdd from './command/add';
import subGet from './command/get';
import subDefault from './command/default';
import subRename from './command/rename';
import subRemove from './command/remove';

const description = `Configure vendors account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/config')}`;

export default (program: Command) => {
  const configProgram = program.command('config');
  suggestCommand(configProgram);
  configProgram
    .description(description)
    .summary(`Configure vendors account`)
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  subAdd(configProgram);
  subGet(configProgram);
  subRemove(configProgram);
  subRename(configProgram);
  subDefault(configProgram);
};
