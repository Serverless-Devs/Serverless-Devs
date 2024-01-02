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

const root = async (program: Command) => {
  program
    .name('s')
    .option('--debug', 'Open debug model')
    .option('--skip-actions', 'Skip the extends section')
    .option('-t, --template <path>', 'Specify the template file')
    .option('-a, --access <aliasName>', 'Specify the access alias name')
    .addOption(new Option('-o, --output <outputFormat>', 'Specify the output format').choices(['default', 'json', 'yaml', 'raw']))
    .option('--output-file <outputFilePath>', 'Specify the output file path')
    .option('--env <envName>', 'Specify the env name')
    .option('--no-verify', 'Do not verify yaml')
    .option('--silent', 'Silent mode')
    .configureHelp({ showGlobalOptions: true })
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .version(getVersion(), '-v, --version', 'Output the version number');

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

  program.command('<custom>').summary(`${emoji('🧭')} Custom Commands`);

  // 追加的 help 信息
  program.addHelpText('before', `${emoji('😃')} Welcome to the Serverless Devs\n`);
  program.addHelpText(
    'after',
    `
${customRootHelp || ''}
${emoji('🙌')}  Quick Start:      https://docs.serverless-devs.com/quick-start
${emoji('🌟')}  Github Repo:      https://github.com/Serverless-Devs/Serverless-Devs
${emoji('💡')}  Documentation:    https://docs.serverless-devs.com
${emoji('🚀')}  Example Projects: https://registry.serverless-devs.com
${emoji('📝')}  Feedback:         https://github.com/Serverless-Devs/Serverless-Devs/issues
`,
  );
};

export = root;
