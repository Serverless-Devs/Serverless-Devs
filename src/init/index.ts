import program from 'commander';
import { CommandError } from '../error';
import {i18n, configSet, logger} from '../utils';
import { InitManager } from './init-manager';
const description = `${i18n.__('Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.')}

    ${i18n.__('Example:')}
        $ s init
        $ s init project
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
        
🚀 More Case: https://github.com/Serverless-Devs/package-awesome`;

program
  .name('s init')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .usage('[options] [name | url]')
  .option('-d, --dir [dir]', i18n.__('Where to output the initialized app into (default: ./<ProjectName> )'))
  .option('-r, --registry [url]', i18n.__('Use specify registry '))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const initManager = new InitManager();
  const { dir, registry } = program as any;
  if (registry) {
    configSet.setConfig('registry', registry);
  }
  const name = program.args[0];
  await initManager.init(name, dir);
})().catch(err => {
    logger.error("No application found?\n   1️⃣  Start quickly with 's init'\n   2️⃣  See some cases on GitHub: https://github.com/Serverless-Devs/package-awesome\n   😬 Give us an issue to solve: https://github.com/Serverless-Devs/Serverless-Devs/issues")
  throw new CommandError(err.message);
});
