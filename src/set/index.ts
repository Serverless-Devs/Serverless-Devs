/** @format */

import program from 'commander';
import os from 'os';

program
  .name('s set')
  .usage('[commands] [options]')
  .helpOption('-h, --help', 'Display help for command')
  .command('registry', `${os.platform()=='win32'?'':'👀'} Set up a custom registry`)
  .description('You can make some default settings for the tool here.')
  .addHelpCommand(false)
  .parse(process.argv);
