import { Command, Option } from 'commander';
import { emoji, getVersion } from '@/utils';

import subConfig from './config';
import subEnv from './env';
import subSet from './set';
import subClean from './clean';
import subInit from './init';
import subRegistry from './registry';
import subPreview from './preview';
import subCli from './cli';
import subComponent from './component';
import subVerify from './verify';

import Custom from './custom';
import chalk from 'chalk';

const root = async (program: Command) => {
  program
    .name('s')
    .option('--debug', 'Open debug model')
    .addOption(new Option('--skip-actions', 'Skip the extends section').hideHelp())
    .option('-t, --template <path>', 'Specify the template file')
    .option('-a, --access <aliasName>', 'Specify the access alias name')
    .addOption(new Option('--output <outputFormat>', 'Specify the output format').choices(['default', 'json', 'yaml', 'raw']).hideHelp())
    .addOption(new Option('-o, --output-format <outputFormat>', 'Specify the output format').choices(['default', 'json', 'yaml', 'raw']))
    .addOption(new Option('--output-file <outputFilePath>', 'Specify the output file path').hideHelp())
    .addOption(new Option('--env <envName>', 'Specify the env name').hideHelp())
    .addOption(new Option('--no-verify', 'Do not verify yaml').hideHelp())
    .option('--silent', 'Silent mode')
    .configureHelp({ showGlobalOptions: true })
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .version(getVersion(), '-v, --version', 'Show version information');

  // 支持的系统命令
  subConfig(program);
  subEnv(program);
  subSet(program);
  subRegistry(program);
  subPreview(program);
  subComponent(program);
  subClean(program);
  subInit(program);
  subVerify(program);
  await subCli(program);

  // 自定义指令，所有的系统的指令必须写在自定义指令之前 否则会被抢先注册
  const customRootHelp = await new Custom(program).init();

  program.command('<custom>').summary(`Custom Commands`);

  // 追加的 help 信息
  program.addHelpText('before', `${emoji('😃')} Welcome to the Serverless Devs\n`);
  program.addHelpText(
    'after',
    `
${customRootHelp || ''}
${chalk.gray(
  `Quick Start:      https://manual.serverless-devs.com/getting-started
Github Repo:      https://github.com/Serverless-Devs/Serverless-Devs
Documentation:    https://manual.serverless-devs.com
Example Projects: https://registry.serverless-devs.com
Feedback:         https://github.com/Serverless-Devs/Serverless-Devs/issues`,
)}
`,
  );
};

export = root;
