/** @format */

import program from 'commander';
import os from 'os';

program
  .name('s config')
  .usage('[commands] [options]')
  .helpOption('-h, --help', 'Display help for command')
  .command('add', `${os.platform()=='win32'?'':'➕'} ` + 'Add an account')
  .command('get', `${os.platform()=='win32'?'':'✔️'} ` + 'Get accounts')
  .command('delete', `${os.platform()=='win32'?'':'✖️'} ` + 'Delete an account')
  .description(
    'You can configure provider accounts, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.',
  )
  .addHelpCommand(false)
  .parse(process.argv);
