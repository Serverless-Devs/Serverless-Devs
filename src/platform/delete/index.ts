import * as program from 'commander';
import {PlatformLoginManager} from '../login/login-manager';
import { PlatformDeleteManager } from './platform-delete-manager';
import { PlatformDeleteError } from '../../error/platform-delete-error';
import i18n from '../../utils/i18n';
import {CommandError} from '../../error/command-error';
const description = `${i18n.__('Delete package.')}

     ${i18n.__('Example')}:
        $ s platform delete -nv [name@version] -t [type] -p [provider]`;
program
  .name('s platform delete')
  .storeOptionsAsProperties(false)
  .option('-nv, --name-version <name>', i18n.__('[Required] Package name and version, like: test@0.0.1'))
  .option('-t, --type <type>', i18n.__('[Required] Package type [Component/Plugin/Application]'))
  .option('-p, --provider <provider>', i18n.__('[Required] Provider'))
  .description(description)
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .parse(process.argv);

(async () => {
  const opts = program.opts();

  if (!opts.nameVersion || !opts.type || !opts.provider) {
    program.help();
  }
  
  if (opts.nameVersion.indexOf('@') === -1) {
    throw new PlatformDeleteError('Could find package name and package version');
  } else {
    const temp = opts.nameVersion.split('@');
    opts.name = temp[0];
    opts.version = temp[1];
  }
  
  const loginManager = new PlatformLoginManager();
  if (!loginManager.isCurrentLogin()) {
    throw new PlatformDeleteError(i18n.__('Please login in first.'));
  }
  const code = loginManager.getLoginToken();
  const platformDeleteManager = new PlatformDeleteManager();
  //const opts = program.opts();
  await platformDeleteManager.delete(opts.name, opts.version, opts.type, opts.provider, code);
})().catch((err) => {
  throw new CommandError(err.message);
});