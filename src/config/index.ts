/** @format */

import program from 'commander';
import { emoji } from '../utils/common';

program
  .name('s config')
  .usage('[commands] [options]')
  .helpOption('-h, --help', 'Display help for command')
  .command('add', `${emoji('➕')} ` + 'Add an account')
  .command('get', `${emoji('✔️ ')} ` + 'Get accounts')
  .command('delete', `${emoji('✖️ ')} ` + 'Delete an account')
  .description(
    `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.\n\n📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md`,
  )
  .addHelpCommand(false)
  .parse(process.argv);
