import { Command } from 'commander';
import { CLI_VERSION } from '../constant';
import { emoji } from '../utils';

import subConfig from './config';
import subSet from './set';
import subClean from './clean';
import subInit from './init';
import subRegistry from './registry';

export default async (program: Command) => {
  program
    .option('--debug', 'Open debug model.')
    .option('--skip-actions', 'Skip the extends section.')
    .option('-t, --template <path>', 'Specify the template file.')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .option('-o, --output <outputFormat>', 'Specify the output format: json, yaml, raw.')
    .version(CLI_VERSION, '-v, --version', 'Output the version number.')

  // TODO: 需要支持命令
  // program.addHelpCommand('edit', `${emoji('🙌')} Application editing.`);
  // program.addHelpCommand('component', `${emoji('🔌')} Installed component information.`);
  // program.addHelpCommand('verify', `${emoji('🔎')} Verify the application.`);
  // program.addHelpCommand('cli', `${emoji('🐚')} Command line operation without yaml mode.`);
  program.addHelpCommand('<custom>', `${emoji('🧭')} Custom Commands`);

  // 支持的系统命令
  subConfig(program);
  subSet(program);
  subClean(program);
  subInit(program);
  subRegistry(program);

  // 追加的 help 信息
  program.addHelpText('before', `${emoji('😃')} Welcome to the Serverless Devs.\n`);
  program.addHelpText('after', `
${emoji('🙌')}  Quick Start:      https://docs.serverless-devs.com/quick-start
${emoji('🌟')}  Github Repo:      https://github.com/Serverless-Devs/Serverless-Devs
${emoji('💡')}  Documentation:    https://docs.serverless-devs.com
${emoji('🚀')}  Example Projects: https://registry.serverless-devs.com
${emoji('📝')}  Feedback:         https://feedback.serverless-devs.com
`)

  program.exitOverride(async error => {
    if (error.code === 'commander.help') {
      process.exit(program.args.length > 0 ? 1 : 0);
    }
    if (error.code === 'commander.executeSubCommandAsync' || error.code === 'commander.helpDisplayed') {
      process.exit(0);
    }
  });
};
