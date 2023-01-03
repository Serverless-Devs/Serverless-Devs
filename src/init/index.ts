import { Command } from '@serverless-devs/commander';
import { setConfig } from '../utils';
import { InitManager } from './init-manager';
import { emoji } from '../utils/common';
import { HandleError } from '../error';
import core from '../utils/core';
const { colors } = core;

const description = `Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

    Example:
        $ s init
        $ s init project
        $ s init project -d my_dir
        $ s init project --appName my-express
        $ s init project --parameters '{"serviceName":"websiteService"}'
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
        
${emoji('🚀')} More applications: ${colors.underline('https://registry.serverless-devs.com')}`;

function run(program: Command) {
  program
    .command('init')
    .helpOption('-h, --help', 'Display help for command')
    .usage('[options] [name | url]')
    .option('-d, --dir <dir>', 'Where to output the initialized app into (default: ./<ProjectName> )')
    .option('-r, --registry <url>', 'Use specify registry')
    .option('--parameters <parameters>', 'Initialize with custom parameters')
    .option('--appName <appName>', 'Modify default Application name')
    .description(description)
    .addHelpCommand(false)
    .action(async () => {
      try {
        await doAction();
      } catch (error) {
        await HandleError(error);
      }
    });

  const doAction = async () => {
    const argv = process.argv.slice(2);
    const argvData = core.minimist(argv, { alias: { dir: 'd', registry: 'r' } });
    const { dir, registry } = argvData;
    const initManager = new InitManager();
    if (registry) {
      setConfig('registry', registry);
    }
    await initManager.init(argv[1], dir);
  };
}

export = run;
