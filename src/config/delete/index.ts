/** @format */

import path from 'path';
import os from 'os';
import fs from 'fs';
import yaml from 'js-yaml';
import program from 'commander';
import { logger } from '../../utils';
import { emoji } from '../../utils/common';
import { handleError } from '../../error';

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo

${emoji('🧭️')} If you don't know the alias of the key, you can get it through [s config get -l]`;

program
  .name('s config delete')
  .usage('[options] [name]')
  .helpOption('-h,--help', 'Display help for command')
  .option('-a , --aliasName [name]', 'Key pair alia, if the alias is not set, use default instead')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  let { aliasName } = program;
  aliasName = aliasName || process.env['serverless_devs_temp_access'];
  if (!aliasName) {
    program.help();
  }

  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[aliasName]) {
    delete accessFileInfo[aliasName];
    fs.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
    logger.success(`Delete key ${aliasName} success.`);
  } else {
    logger.error(`\n\n  ${emoji('❌️')} Message: Unable to get key information with alias ${aliasName}.
  ${emoji('🤔')} You have configured these keys: [${String(Object.keys(accessFileInfo))}].
  ${emoji('🧭️')} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  ${emoji('😈️')} If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
    process.exit(-1);
  }
})().catch(err => {
  handleError(err);
});
