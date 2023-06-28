import { Command } from "commander";
import { emoji } from "../../utils";
import { underline } from "chalk";
import { publishHelp } from "../../utils";

const description = `You can manage Serverless Packages on Serverless Registry.

${emoji('📖')} Document: ${underline(
  'https://serverless.help/s/registry',
)}`;

const showHelp = () => {
  const commands = [
    { login: `${emoji('😃')} Login Serverless Registry` },
    { publish: `${emoji('✅')} Public Serverless Package to Serverless Regsitry` },
    { list: `${emoji('🐵')} List the packages you have published` },
    { detail: `${emoji('🌱')} View specific package details` },
    { delete: `${emoji('❌')} Delete specific package` },
  ];
  const helperLength = publishHelp.maxLen(commands);
  const output = publishHelp.helpInfo(commands, 'Commands', helperLength);

  console.log('Usage: s registry [commands] [options]');
  console.log('\n', description, '\n');
  console.log(output);
};    

export = async (program: Command) => {
  const configProgram = program.command('registry');
  configProgram.helpInformation = () => '';

  configProgram.description(description)
    .usage('[commands] [options]')
    .helpOption('-h, --help', 'Display help for command')
    .on('--help', showHelp)
    .action(() => {
      showHelp()
    })
  
  await require('./command/login')(configProgram);
  await require('./command/publish')(configProgram);
  await require('./command/list')(configProgram);
  await require('./command/detail')(configProgram);
  await require('./command/remove')(configProgram);
}
