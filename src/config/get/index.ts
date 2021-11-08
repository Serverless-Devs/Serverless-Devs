import path from 'path';
import os from 'os';
import fs from 'fs';
import program from 'commander';
import logger from '../../utils/logger';
import { emoji } from '../../utils/common';
import { HandleError } from '../../error';
import core from '../../utils/core';
const { getCredential, colors, jsyaml: yaml } = core;

const description = `You can get accounts.
 
  Example:
    $ s config get
    $ s config get -a demo`;

program
  .name('s config get')
  .usage('[options] [name]')
  .helpOption('-h, --help', 'Display help for command')
  .option('-a, --access [aliasName]', 'Key pair alia, if the alias is not set, use default instead')
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);

function getSecretValue(n: number, str = ' ') {
  let temp_str = '';
  for (let i = 0; i < n; i++) {
    temp_str = temp_str + str;
  }
  return temp_str;
}

(async () => {
  const serverless_devs_temp_argv = JSON.parse(process.env['serverless_devs_temp_argv']);
  const { access = process.env['serverless_devs_temp_access'] } = program as any;
  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  const accessInfo = {};
  // eslint-disable-next-line guard-for-in
  for (const eveAccess in accessFileInfo) {
    const tempAccess = await getCredential(eveAccess);
    const tempAlias = tempAccess['Alias'];
    const tempSecretAccess = {};
    for (const eveValue in tempAccess) {
      if (eveValue !== 'Alias') {
        const valueLength: any = tempAccess[eveValue].length;
        tempSecretAccess[eveValue] =
          valueLength > 6
            ? tempAccess[eveValue].slice(0, 3) +
              getSecretValue(valueLength - 6, '*') +
              tempAccess[eveValue].slice(valueLength - 3, valueLength)
            : tempAccess[eveValue];
      }
    }
    accessInfo[tempAlias] = tempSecretAccess;
  }
  // s config get case
  if (serverless_devs_temp_argv.length === 4) {
    if (Object.keys(accessInfo).length === 0) {
      logger.log(`${emoji('🤔')} You have not yet been found to have configured key information.
    ${emoji(
      '🧭',
    )} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
    ${emoji('😈')} If you have questions, please tell us: ${colors.underline(
        'https://github.com/Serverless-Devs/Serverless-Devs/issues',
      )}
  `);
      process.exit(1);
    } else {
      logger.output(accessInfo);
      return accessInfo;
    }
  }
  if (access) {
    if (Object.keys(accessInfo).includes(access)) {
      const accessData = {};
      accessData[access] = accessInfo[typeof access === 'boolean' ? 'default' : access];
      logger.output(accessData);
      return accessData;
    } else {
      logger.error(`\n\n  ${emoji('❌')} Message: Unable to get key information with alias ${access}.
  ${emoji('🤔')} You have configured these keys: [${String(Object.keys(accessInfo))}].
  ${emoji('🧭')} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  ${emoji('😈')} If you have questions, please tell us: ${colors.underline(
        'https://github.com/Serverless-Devs/Serverless-Devs/issues',
      )}
`);
      process.exit(1);
    }
  }

  // other case output help message
  program.help();
})().catch(async error => {
  await new HandleError({
    error,
  }).report(error);
  process.exit(1);
});
