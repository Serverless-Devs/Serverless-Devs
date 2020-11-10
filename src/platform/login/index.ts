/** @format */

import * as program from 'commander';
import {PlatformLoginManager} from './login-manager';
import {CommandError} from '../../error/command-error';
import i18n from '../../utils/i18n';
const description = `${i18n.__('Login Serverless Tool.')}

     ${i18n.__('Example')}:
        $ s platform login
        $ s platform login -u username -p password`;
program
  .name('s platform login')

  .option('-u, --username', i18n.__('Username of Serverless Devs Tool Platform'))
  .option('-p, --password', i18n.__('Password of Serverless Devs Tool Platform'))
  .option('-g, --gui', i18n.__('Start gui service'))
  .description(description)
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .parse(process.argv);
(async () => {
  const {username, password, gui} = program;
  const initManager = new PlatformLoginManager();
  await initManager.init({username, password, gui});
})().catch(err => {
  throw new CommandError(err.message);
});
