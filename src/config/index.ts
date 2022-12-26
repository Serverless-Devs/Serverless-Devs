import { Command } from '@serverless-devs/commander';
import { emoji } from '../utils/common';
import core from '../utils/core';

const { colors, publishHelp } = core;

const description = `Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

function run(program: Command) {
  const command = program
    .command('config')
    .usage('[commands] [options]')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .addHelpCommand(false)
    .action(() => {
      const argv = process.argv.splice(2);
      const { help } = core.minimist(argv, { alias: { help: 'h' } });
      // s config -h , s config
      if (help || argv.length === 1) {
        command.outputHelp();
        const commands = [
          { add: `${emoji(colors.bold('+'))}` + 'Add an account' },
          { get: `${emoji(colors.bold('√'))}` + 'Get accounts' },
          { delete: `${emoji(colors.bold('×'))}` + 'Delete an account' },
          { rename: `${emoji(colors.bold('>'))}` + 'Rename an account' },
        ];
        const helperLength = publishHelp.maxLen(commands);
        const output = publishHelp.helpInfo(commands, 'Commands', helperLength);
        console.log(`\n${output}`);
      }
    });

  require('./add')(command);
  require('./delete')(command);
  require('./get')(command);
  require('./rename')(command);
}

export = run;
