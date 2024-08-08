import { Command, Option } from 'commander';
import { emoji, getVersion, mount, mountAsync } from '@/utils';
import { parseArgv } from '@serverless-devs/utils';

// import Custom from './custom';
import chalk from 'chalk';

const commandDict = {
  config: 'config/index.ts',
  env: 'env/index.ts',
  set: 'set/index.ts',
  clean: 'clean/index.ts',
  init: 'init/index.ts',
  registry: 'registry/index.ts',
  preview: 'preview/index.ts',
  component: 'component/index.ts',
  verify: 'verify/index.ts',
  cli: 'cli/index.ts',
  secret: 'secret/index.ts',
};

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
    .option('--baseline-template <templateName>', 'Baseline Yaml file to do diff on')
    .configureHelp({ showGlobalOptions: true })
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .version(getVersion(), '-v, --version', 'Show version information');

  const argv = process.argv.slice(2);
  const { version, _: rest } = parseArgv(argv);
  if (version) return;
  let customRootHelp = null;

  // 支持的系统命令
  if (rest.length !== 0) {
    if (Object.keys(commandDict).includes(rest[0])) {
      if (rest[0] === 'cli') {
        await mountAsync(commandDict[rest[0]], program);
      } else {
        await mount(commandDict[rest[0]], program);
      }
    } else {
      // 自定义指令，所有的系统的指令必须写在自定义指令之前 否则会被抢先注册
      const Custom = (await import('./custom')).default;
      customRootHelp = await new Custom(program).init();
    }
  } else {
    for (const command of Object.values(commandDict)) {
      await mount(command, program);
      // 自定义指令，所有的系统的指令必须写在自定义指令之前 否则会被抢先注册
      const Custom = (await import('./custom')).default;
      customRootHelp = await new Custom(program).init();
    }
  }
  // const Custom = require('./custom/index.ts').default;
  // customRootHelp = await new Custom(program).init();
  // subConfig(program);
  // subEnv(program);
  // subSet(program);
  // subRegistry(program);
  // subPreview(program);
  // subComponent(program);
  // console.log(subClean.default);
  // subClean.default(program);
  // subInit(program);
  // subVerify(program);
  // await subCli(program);  // ！！！！时间很长

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
