/** @format */

import path from 'path';
import os from 'os';
import fs from 'fs';
import program from 'commander';
import { logger } from '../../utils';
import { emoji } from '../../utils/common';
import { handleError } from '../../error';
import core from '../../utils/core';
const { colors, jsyaml: yaml } = core;

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo`;

program
  .name('s config delete')
  .usage('[options] [name]')
  .helpOption('-h, --help', 'Display help for command')
  .option('-a, --access [aliasName]', 'Key pair alia, if the alias is not set, use default instead')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  const { access = process.env['serverless_devs_temp_access'] } = program;
  if (!access) {
    program.help();
  }

  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[access]) {
    delete accessFileInfo[access];
    fs.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
    logger.success(`Key [${access}] has been successfully removed.`);
  } else {
    logger.error(`\n\n  ${emoji('❌️')} Message: Unable to get key information with alias ${access}.
  ${emoji('🤔')} You have configured these keys: [${String(Object.keys(accessFileInfo))}].
  ${emoji('🧭️')} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  ${emoji('😈️')} If you have questions, please tell us: ${colors.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/issues',
    )}
`);
    process.exit(1);
  }
})().catch(err => {
  handleError(err);
});
