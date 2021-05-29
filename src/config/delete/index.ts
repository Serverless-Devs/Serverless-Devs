/** @format */

import path from 'path';
import os from 'os';
import fs from 'fs';
import yaml from 'js-yaml';
import program from 'commander';
import { logger } from '../../utils';

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo

🧭 If you don't know the alias of the key, you can get it through [s config get -l]`;

program
  .name('s config delete')
  .usage('[options] [name]')
  .helpOption('-h,--help', 'Display help for command')
  .option('-a , --aliasName [name]', 'Key pair alia, if the alias is not set, use default instead')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);
(async () => {
  const { aliasName } = program;
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
    logger.error(`\n\n  ❌ Message: Unable to get key information with alias ${aliasName}.
  🤔 You have configured these keys: [${String(Object.keys(accessFileInfo))}].
  🧭 You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
    process.exit(-1);
  }
})().catch(err => {
  logger.error(`\n\n  ❌ Message: ${
    err.message.includes('no such file or directory') ? 'Unable to get key information' : err.message
  }.
  🧭 You can :
      1️⃣  Manually adjust the key file format to the standard yaml format, or delete the key file. File path: ~/.s/access.yaml
      2️⃣  Use [s config add] for key configuration, or use [s config add -h] to view configuration help
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues
`);
  process.exit(-1);
});
