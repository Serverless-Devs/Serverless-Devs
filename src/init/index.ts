/** @format */

import program from '@serverless-devs/commander';
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

program
  .name('s init')
  .helpOption('-h, --help', 'Display help for command')
  .usage('[options] [name | url]')
  .option('-d, --dir <dir>', 'Where to output the initialized app into (default: ./<ProjectName> )')
  .option('-r, --registry <url>', 'Use specify registry')
  .option('--parameters <parameters>', 'Initialize with custom parameters')
  .option('--appName <appName>', 'Modify default Application name')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  const initManager = new InitManager();
  const { dir, registry } = program as any;
  if (registry) {
    setConfig('registry', registry);
  }
  const name = program.args[0];
  await initManager.init(name, dir);
})().catch(async error => {
  await HandleError(error);
});
