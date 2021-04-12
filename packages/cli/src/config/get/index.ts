
import path from 'path';
import os from 'os';
import fs from 'fs';
import program from 'commander';
import yaml from 'js-yaml';
import { getCredential, decryptCredential } from '@serverless-devs/core';
import { CommandError } from '../../error';

import i18n from '../../utils/i18n';
import logger from '../../utils/logger';



const description = i18n.__('s config get help');

program
  .name('s config get')
  .usage('[options] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .option('-a, --aliasName [name]', i18n.__('Key pair alia, if the alias is not set, use default instead'))
  .option('-l, --list', i18n.__('Show user configuration list'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const { aliasName, list } = program;
  if (!aliasName && !list) {
    program.help();
  }
  let accessInfo = {};
  if (aliasName) {
    let tempAccessInfo = await getCredential(aliasName);
    if (tempAccessInfo) {
      let alias = tempAccessInfo.Alias;
      delete tempAccessInfo.Alias;
      accessInfo[alias] = tempAccessInfo;
    }
  }
  if (list) {
    const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
    accessInfo = yaml.load(fs.readFileSync(accessFile, 'utf8'));
    Object.keys(accessInfo).forEach((key)=>{
     const translacedData = decryptCredential(accessInfo[key]);
     accessInfo[key] = translacedData;
    });
  }
  logger.info(`\n${yaml.dump(accessInfo)}`);

})().catch(err => {
  throw new CommandError(err.message);
});
