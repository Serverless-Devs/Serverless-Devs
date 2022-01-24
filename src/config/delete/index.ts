/** @format */

import path from 'path';
import fs from 'fs';
import program from '@serverless-devs/commander';
import { logger } from '../../utils';
import { HandleError, HumanError } from '../../error';
import { emoji, getProcessArgv } from '../../utils';
import core from '../../utils/core';
const { colors, jsyaml: yaml, getRootHome, getYamlContent } = core;

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

(async () => {
  const { access } = getProcessArgv();
  program
    .name('s config delete')
    .usage('[options]')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .addHelpCommand(false)
    .parse(process.argv);

  if (!access) {
    program.help();
  }

  const filePath = path.join(getRootHome(), 'access.yaml');
  const accessFileInfo = await getYamlContent(filePath);
  if (accessFileInfo) {
    if (accessFileInfo[access]) {
      delete accessFileInfo[access];
      fs.writeFileSync(filePath, yaml.dump(accessFileInfo));
      logger.success(`Key [${access}] has been successfully removed.`);
    } else {
      notFound({ access, accessFileInfo });
    }
  } else {
    notFound({ access, accessFileInfo });
  }
})().catch(async error => {
  await HandleError(error);
});
