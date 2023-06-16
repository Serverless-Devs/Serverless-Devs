import { Command } from "commander";
import { emoji } from "../../utils";
import { underline, bold } from "chalk";
import { publishHelp } from "../../utils";

const description = `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

const showHelp = () => {
  const commands = [
    { add: `${emoji(bold('+'))}` + 'Add an account' },
    { get: `${emoji(bold('√'))}` + 'Get accounts' },
    { delete: `${emoji(bold('×'))}` + 'Delete an account' },
    { rename: `${emoji(bold('>'))}` + 'Rename an account' },
  ];
  const helperLength = publishHelp.maxLen(commands);
  const output = publishHelp.helpInfo(commands, 'Commands', helperLength);
  console.log('\n', output);
};

export = async (program: Command) => {
  const configProgram = program.command('config');

  configProgram.description(description)
    // .argument('<string>', 'string to split')
    .usage('[commands] [options]')
    .helpOption('-h, --help', 'Display help for command')
    .on('--help', showHelp);
  
  await require('./add')(configProgram);
}
