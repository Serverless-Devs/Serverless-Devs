import { Command } from 'commander';
import { emoji, suggestCommand } from '../../utils';
import chalk from 'chalk';
import subInit from './command/init';

const description = `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md')}`;
export default (program: Command) => {
  const configProgram = program.command('environment');
  suggestCommand(configProgram);
  configProgram
    .description(description)
    .summary(`${emoji('🌱')} Configure environment`) // TODO:text
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  subInit(configProgram);
};
