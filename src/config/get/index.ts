
import path from 'path';
import os from 'os';
import fs from 'fs';
import program from 'commander';
import yaml from 'js-yaml';
import { getCredential, decryptCredential } from '@serverless-devs/core';
import { CommandError } from '../../error';
import logger from '../../utils/logger';
import {
  common,
} from '../../utils';

const { mark } = common;
const description = `You can get accounts.
 
     Example:
        $ s config get -l
        $ s config get -a demo`

program
  .name('s config get')
  .usage('[options] [name]')
  .helpOption('-h, --help', 'Display help for command')
  .option('-a, --aliasName [name]', 'Key pair alia, if the alias is not set, use default instead')
  .option('-l, --list', 'Show user configuration list')
  .description(description).addHelpCommand(false).parse(process.argv);

(async () => {

  let { aliasName, list } = program as any;
  if (!aliasName && !list) {
    program.help();
  }
  let accessInfo = {};
  if (aliasName) {
    aliasName = typeof aliasName === 'boolean' ? 'default' : aliasName;
    let tempAccessInfo = await getCredential(aliasName);
    if (tempAccessInfo) {
      let alias = tempAccessInfo.Alias;
      delete tempAccessInfo.Alias;
      accessInfo[alias] = tempAccessInfo;
    }
  } else if (list) {
    const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
    accessInfo = yaml.load(fs.readFileSync(accessFile, 'utf8'));
  } else {
    logger.info(`\n Please enter the correct access`);
    return;
  }
  if (JSON.stringify(accessInfo) !== '{}') {
    Object.keys(accessInfo).forEach((key) => {
      const translacedData: any = decryptCredential(accessInfo[key]);
      Object.keys(translacedData).forEach((_key) => {
        translacedData[_key] = mark(translacedData[_key]);
      })
      accessInfo[key] = translacedData;
    });
    logger.info(`\n${yaml.dump(accessInfo)}`);
  } else {
    logger.info(`\nYou have not set the key information`);
  }

})().catch(err => {
  throw new CommandError(err.message);
});
