import { Command } from 'commander';
import { emoji } from '../../utils';
import { underline } from 'chalk';
import { publishHelp } from '../../utils';

const description = `You can make some default settings for the tool here.

${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

const showHelp = () => {
  const commands = [
    { registry: `${emoji('👀')} Set registry information` },
    // { language: `${emoji('📝')} Set up Serverless Devs tools language` },
    { proxy: `${emoji('🔧')} Set proxy information` },
    { analysis: `${emoji('👉')} Set to enable or disable analysis` },
    { log: `${emoji('🔊')} Set to enable or disable log` },
    { workspace: `${emoji('🙊')} Set workspace path` },
  ];
  const helperLength = publishHelp.maxLen(commands);
  const output = publishHelp.helpInfo(commands, 'Commands', helperLength);

  console.log('Usage: s config [commands] [options]');
  console.log('\n', description, '\n');
  console.log(output);
};

export = async (program: Command) => {
  const configProgram = program.command('set');
  configProgram.helpInformation = () => '';

  configProgram
    .description(description)
    .usage('[commands] [options]')
    .helpOption('-h, --help', 'Display help for command')
    .on('--help', showHelp);

  await require('./command/registry')(configProgram);
  // await require('./command/language')(configProgram);
  await require('./command/proxy')(configProgram);
  await require('./command/analysis')(configProgram);
  await require('./command/log')(configProgram);
  await require('./command/workspace')(configProgram);
};
