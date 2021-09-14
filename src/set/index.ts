import program from 'commander';
import { emoji } from '../utils/common';

program
  .name('s set')
  .usage('[commands] [options]')
  .command('registry', `${emoji('👀')} Set up a custom registry`)
  .command('locale', `${emoji('👉')} Set up current language`)
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description('You can make some default settings for the tool here.')
  .parse(process.argv);
