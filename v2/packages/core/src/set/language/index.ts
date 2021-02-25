/** @format */

import program from 'commander';

import { configSet, i18n, logger } from '@serverless-devs-cli/util';
import { CommandError, SetLanguageError } from '@serverless-devs-cli/error';


const { setConfig } = configSet;


const defaultLanguage = ['zh', 'en'];

program
  .name('s set language')
  .usage('[options] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .description(
    `${i18n.__('You can set language.')}

     ${i18n.__('Example')}:
        $ s set language zh
        $ s set language en`,
  )
  .addHelpCommand(false).parse(process.argv);
(async () => {
  if (program.args.length === 0) {
    program.help();
  }

  if (program.args.length > 0) {
    const lang = program.args[0];
    if (defaultLanguage.indexOf(lang) === -1) {
      throw new SetLanguageError('Setup failed');
    } else {
      setConfig('locale', lang);
      logger.success('Setup succeeded');
    }
  }
})().catch(err => {
  throw new CommandError(err.message);
});
