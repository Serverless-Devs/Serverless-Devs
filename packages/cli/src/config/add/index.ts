import program from 'commander';
import { setCredential } from '@serverless-devs/core';

import { CommandError } from '../../error';
import { i18n } from '../../utils';

const intro = i18n.__('You can add an account');
const example = ['Example:', '\t$ s config add'].join('\n');
const description = `${intro}\n    ${example}\n`    // i18n.__('You can add an account');

program
  .name('s config add')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  setCredential();
})().catch(err => {
  throw new CommandError(err.message);
});
