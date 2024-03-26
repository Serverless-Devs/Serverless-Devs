import { Command } from 'commander';
import { emoji, suggestCommand } from '@/utils';
import chalk from 'chalk';
import subInit from './command/init';
import subDefault from './command/default';
import subDescribe from './command/describe';
import subDestroy from './command/destroy';
import subList from './command/list';
import subSet from './command/set';

const description = `Managing multiple environments for serverless applications, such as testing, development, and production environments, is the best practice for serverless Devs for serverless environments.

Supported vendors: Alibaba Cloud

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/env')}`;
export default (program: Command) => {
  const envProgram = program.command('env');
  suggestCommand(envProgram);
  envProgram
    .description(description)
    .summary(`Environment operation`)
    .usage('[commands] [options]')
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  subInit(envProgram);
  subList(envProgram);
  // 暂时不需要
  // subUpdate(envProgram);
  subDescribe(envProgram);
  subDestroy(envProgram);
  subDefault(envProgram);
  subSet(envProgram);
};
