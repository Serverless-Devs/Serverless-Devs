/** @format */

import program from 'commander';
import { configSet, logger } from '../utils';
import { InitManager } from './init-manager';

const description = `Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

    Example:
        $ s init
        $ s init project
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
        
🚀 More Case: https://github.com/Serverless-Devs/package-awesome`;

program
  .name('s init')
  .helpOption('-h, --help', 'Display help for command')
  .usage('[options] [name | url]')
  .option('-d, --dir [dir]', 'Where to output the initialized app into (default: ./<ProjectName> )')
  .option('-r, --registry [url]', 'Use specify registry ')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  const initManager = new InitManager();
  const { dir, registry } = program as any;
  if (registry) {
    configSet.setConfig('registry', registry);
  }
  const name = program.args[0];
  await initManager.init(name, dir);
})().catch(err => {
  logger.error(`\n\n  ❌ Message: ${err.message}.
  🧭 You can :
      1️⃣  Start quickly with [s init]
      2️⃣  See some cases on GitHub: https://github.com/Serverless-Devs/package-awesome
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
  process.exit(-1);
});
