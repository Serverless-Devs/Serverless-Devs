/** @format */

import * as program from 'commander';
import i18n from '../utils/i18n';
// import * as msg from './init-message';
import {InitManager} from './init-manager';
import {CommandError} from '../error/command-error';
import GUIService from '../gui/gui-service';

const description = `${i18n.__('Initialize a new project based on a template.')}

    ${i18n.__('Example:')}
        $ s init
        $ s init project
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
    
    ${i18n.__('You could get a project from Serverless Devs App Store. Like:')}
        $ s search keywords
        $ s search --gui
        $ s init --gui
    `;

program
  .name('s init')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .usage('[options] [name | url]')
  .option('-p, --provider [provider]', i18n.__('The cloud service provider'))
  .option('-d, --dir [dir]', i18n.__('Where to output the initialized app into (default: ./ )'))
  .option('-g, --gui', i18n.__('Init project through GUI service'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const gui = program.gui || false;

  if (program.args.length === 0 && gui === false) {
    program.help();
    return;
    // throw new ServerlessError(msg.initPopUpTips);
  }

  if (gui === true) {
    const guiService = new GUIService();
    await guiService.start();
  } else {
    const initManager = new InitManager();
    const target = program.args[0];
    const {provider} = program;
    const {dir} = program;
    await initManager.init(target, provider, dir);
  }
})().catch(err => {
  throw new CommandError(err.message);
});
