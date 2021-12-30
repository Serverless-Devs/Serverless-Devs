/** @format */

import path from 'path';
import fs from 'fs';
import program from '@serverless-devs/commander';
import { logger } from '../../utils';
import { HandleError, HumanError } from '../../error';
import { emoji } from '../../utils/common';
import core from '../../utils/core';
const { colors, jsyaml: yaml, getRootHome } = core;

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo
    
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

function notFound({ access, accessFileInfo }: { access: string; accessFileInfo?: any }) {
  const errorMessage = accessFileInfo
    ? `Unable to get key information with alias ${access}, You have configured these keys: [${String(
        Object.keys(accessFileInfo),
      )}].`
    : `Unable to get key information with alias ${access}`;
  new HumanError({
    errorMessage,
    tips: `You can use [s config add -h] to view configuration help, Serverless Devs' config document can refer to：${colors.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/config.md',
    )}`,
  });
}

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

  const accessFile = path.join(getRootHome(), 'access.yaml');
  if (!fs.existsSync(accessFile)) {
    return notFound({ access });
  }
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[access]) {
    delete accessFileInfo[access];
    fs.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
    logger.success(`Key [${access}] has been successfully removed.`);
  } else {
    notFound({ access, accessFileInfo });
    process.exit(1);
  }
})().catch(async error => {
  await HandleError({ error });
  process.exit(1);
});
