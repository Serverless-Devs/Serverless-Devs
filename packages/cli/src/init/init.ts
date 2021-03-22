import program from 'commander';


import { CommandError } from '@serverless-devs-cli/error';
import { InitManager } from '@serverless-devs-cli/init';
import i18n from '../utils/i18n';



const description = `${i18n.__('Initialize a new project based on a template.')}

    ${i18n.__('Example:')}
        $ s init
        $ s init project
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
    
    ${i18n.__('You could get a project from Serverless Devs App Store. Like:')}
        $ s search keywords
    `;

program
  .name('s init')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .usage('[options] [name | url]')
  .option('-d, --dir [dir]', i18n.__('Where to output the initialized app into (default: ./ )'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const initManager = new InitManager('S-CLI');
  const { dir} = program;
  const name = program.args[0];
  await initManager.init(name, dir);
})().catch(err => {
  throw new CommandError(err.message);
});
