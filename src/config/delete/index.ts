/** @format */

import path from 'path';
import os from 'os';
import fs from 'fs';
import program from 'commander';
import { logger } from '../../utils';
import { HandleError, HumanError } from '../../error';
import core from '../../utils/core';
const { colors, jsyaml: yaml } = core;

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo`;

function notFound({ access, accessFileInfo }: { access: string; accessFileInfo?: any }) {
  const errorMessage = accessFileInfo
    ? `Unable to get key information with alias ${access}, You have configured these keys: [${String(
        Object.keys(accessFileInfo),
      )}].`
    : `Unable to get key information with alias ${access}`;
  new HumanError({
    errorMessage,
    tips: `You can use [s config add -h] to view configuration help, Serverless Devs' config document can refer to：${colors.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/blob/docs/docs/zh/command/config.md',
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

  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
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
  await new HandleError({
    error,
  }).report(error);
  process.exit(1);
});
