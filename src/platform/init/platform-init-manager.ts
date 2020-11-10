/** @format */

import * as fs from 'fs-extra';
import * as path from 'path';
import {PlatformInitError} from '../../error/platform-init-error';
import logger from '../../utils/logger';

export class PlatformInitManager {
  init(type: string) {
    type = type.toLocaleLowerCase();
    if (type !== 'component' && type !== 'plugin' && type != 'application') {
      throw new PlatformInitError('Unknown package type: {{type}}', {type});
    }
    logger.info('Initializing......');
    const srcDir = path.join(__dirname, `../../../templates/${type}/common`);
    fs.copySync(srcDir, process.cwd());
    logger.success('Initialization successfully');
  }
}
