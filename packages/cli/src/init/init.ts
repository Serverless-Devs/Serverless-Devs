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
  .option('-p, --provider [provider]', i18n.__('The cloud service provider'))
  .option('-d, --dir [dir]', i18n.__('Where to output the initialized app into (default: ./ )'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {


  if (program.args.length === 0) {
    program.help();
  }
  const initManager = new InitManager('S-CLI');
  const target = program.args[0];
  const { provider } = program;
  const { dir } = program;
  await initManager.init(target, provider, dir);
})().catch(err => {
  throw new CommandError(err.message);
});
