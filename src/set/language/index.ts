import program from 'commander';
import { configSet, logger } from '../../utils';

import { CommandError, SetLanguageError } from '../../error';


const { setConfig } = configSet;


const defaultLanguage = ['zh', 'en'];

program
  .name('s set language')
  .usage('[options] [name]')
  .helpOption('-h, --help', 'Display help for command')
  .description(
    `You can set language.

     Example:
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
