import path from 'path';
import os from 'os';
import fs from 'fs';
import yaml from 'js-yaml';
import program from 'commander';
import { CommandError } from '../../error';

import i18n from '../../utils/i18n';
import { logger } from '../../utils';

const description = i18n.__('s config delete help');

program
  .name('s config delete')
  .usage('[options] [name]')
  .helpOption('-h,--help', i18n.__('Display help for command'))
  .option('-a , --aliasName [name]', i18n.__('Key pair alia, if the alias is not set, use default instead'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const { aliasName } = program;
  if (!aliasName) {
    program.help();
  }
  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const doc = yaml.load(fs.readFileSync(accessFile, 'utf8'));
  if (doc[aliasName]) {
    delete doc[aliasName]
    fs.writeFileSync(accessFile, yaml.dump(doc));
    logger.success('delete success');
  } else {
    logger.info(`There is no secret key information whose name is [${aliasName}]`);
  }
  logger.info('The current secret key information is as follows');
  console.log(yaml.dump(doc));
})().catch(err => {
  throw new CommandError(err.message);
});
