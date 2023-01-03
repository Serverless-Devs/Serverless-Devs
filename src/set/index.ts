import { Command } from '@serverless-devs/commander';
import { emoji } from '../utils/common';
import core from '../utils/core';

const { colors, publishHelp } = core;

const description = `You can make some default settings for the tool here.

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

function run(program: Command) {
  const command = program
    .command('set')
    .usage('[commands] [options]')
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .description(description)
    .action(() => {
      const argv = process.argv.splice(2);

      const { help } = core.minimist(argv, { alias: { help: 'h' } });
      if (help || argv.length === 1) {
        command.outputHelp();
        const commands = [
          { registry: `${emoji('👀')} Set registry information` },
          { proxy: `${emoji('🔧')} Set proxy information` },
          { analysis: `${emoji('👉')} Set to enable or disable analysis` },
          { workspace: `${emoji('🙊')} Set workspace path` },
        ];
        const helperLength = publishHelp.maxLen(commands);
        const output = publishHelp.helpInfo(commands, 'Commands', helperLength);
        console.log(`\n${output}`);
      }
    });

  require('./analysis')(command);
  require('./proxy')(command);
  require('./registry')(command);
  require('./workspace')(command);
}

export = run;
