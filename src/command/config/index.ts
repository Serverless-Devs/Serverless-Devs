import { Command } from 'commander';
import { emoji } from '../../utils';
import { underline } from 'chalk';
import subAdd from './command/add';
import subGet from './command/get';
import subDefault from './command/default';
import subRename from './command/rename';
import subRemove from './command/remove';

const description = `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export default (program: Command) => {
  const configProgram = program.command('config');

  configProgram
    .description(description)
    .summary(`${emoji('👤')} Configure venders account.`)
    .usage('[commands] [options]')
    .helpOption('-h, --help', 'Display help for command');

  subAdd(configProgram);
  subGet(configProgram);
  subRemove(configProgram);
  subRename(configProgram);
  subDefault(configProgram);
};
