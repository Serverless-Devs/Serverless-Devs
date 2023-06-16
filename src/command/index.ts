import { Command } from "commander";
import { CLI_VERSION } from "../constant";
import { emoji } from "../utils";
import publishHelp, { makeUnderLine } from "../utils/publish-help";

const description = {
  Options: [
    { '--debug': 'Open debug model.' },
    { '--skip-actions': 'Skip the extends section.' },
    { '-t, --template <path>': 'Specify the template file.' },
    { '-a, --access <aliasName>': 'Specify the access alias name.' },
    { '-o, --output <outputFormat>': 'Specify the output format: json, yaml, raw.' },
    { '-v, --version': 'Output the version number.' },
    { '-h, --help': 'Display help for command.' },
  ],
  Commands: [
    { config: '👤  Configure venders account.' },
    { init: '💞  Initializing a serverless project.' },
    { cli: '🐚  Command line operation without yaml mode.' },
    { verify: '🔎  Verify the application.' },
    { set: '🔧  Settings for the tool.' },
    { clean: '💥  Clean up the environment.' },
    { component: '🔌  Installed component information.' },
    { edit: '🙌  Application editing.' },
  ],
  Examples: [{ init: 'Perform [s init] fast experience Serverless Devs.' }],
};

const handlerHelp = async (): Promise<string> => {
  const helperLength = publishHelp.maxLen(description.Options);
  const tmp = [];
  // TODO: yaml 的输出 help 处理
  tmp.push('\n');

  const output = [
    `${emoji('🚀')} Welcome to the Serverless Devs.\n\n`,
    publishHelp.helpInfo(description.Options, 'Options', helperLength) + '\n',
    publishHelp.helpInfo(description.Commands, 'Commands', helperLength) + '\n',
  ]
    .concat(
      tmp,
      publishHelp.helpInfo(description.Examples, 'Examples', helperLength) + '\n',
      `${emoji('🧭')} ${makeUnderLine('More information: https://github.com/Serverless-Devs/Serverless-Devs')}\n`,
      `${emoji('🚀')} ${makeUnderLine('More applications: https://registry.serverless-devs.com')}\n`,
    )
    .join('');

  return output;
}

export = async (program: Command) => {
  const helpMessage = await handlerHelp();
  program.helpInformation = () => '';
  program
    .version(CLI_VERSION, '-v, --version', 'Output the version number.')
    .option('--debug', 'Open debug model.')
    .on('--help', () => {
      console.log(helpMessage);
    });

  
  program.exitOverride(async error => {
    if (error.code === 'commander.help') {
      process.exit(program.args.length > 0 ? 1 : 0);
    }
    if (error.code === 'commander.executeSubCommandAsync' || error.code === 'commander.helpDisplayed') {
      process.exit(0);
    }
  });
}
