/** @format */

import program from 'commander';
import { emoji } from '../utils/common';
import core from '../utils/core';

const { colors } = core;

const description = `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

program
  .name('s config')
  .usage('[commands] [options]')
  .helpOption('-h, --help', 'Display help for command')
  .command('add', `${emoji('➕')} ` + 'Add an account')
  .command('get', `${emoji('✔️')} ` + 'Get accounts')
  .command('delete', `${emoji('✖️')} ` + 'Delete an account')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
