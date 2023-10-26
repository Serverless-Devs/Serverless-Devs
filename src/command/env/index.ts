import { Command } from 'commander';
import { emoji, suggestCommand } from '@/utils';
import chalk from 'chalk';
import subInit from './command/init';
import subDefault from './command/default';
import subUpdate from './command/update';
import subDescribe from './command/describe';
import subRemove from './command/remove';
import subList from './command/list';
import subSet from './command/set';

// TODO: @封崇
const description = `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md')}`;
export default (program: Command) => {
  const envProgram = program.command('env');
  suggestCommand(envProgram);
  envProgram
    .description(description)
    .summary(`${emoji('🌱')} Configure environment`) // TODO: @封崇
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  subInit(envProgram);
  subDefault(envProgram);
  subUpdate(envProgram);
  subDescribe(envProgram);
  subRemove(envProgram);
  subList(envProgram);
  subSet(envProgram);
};
