import path from 'path';
import fs from 'fs';
import { Command } from '@serverless-devs/commander';
import { logger } from '../../utils';
import { HandleError, HumanError } from '../../error';
import { emoji } from '../../utils';
import core from '../../utils/core';
const { colors, jsyaml: yaml, getRootHome, getYamlContent } = core;

const description = `You can rename an account.
  
  Example:
    $ s config rename sourceAliasName targetAliasName
    
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

function notFound({ source, accessFileInfo }: { source: string; accessFileInfo?: any }) {
  const errorMessage = accessFileInfo
    ? `Unable to get key information with alias ${source}, You have configured these keys: [${String(
        Object.keys(accessFileInfo),
      )}].`
    : `Unable to get key information with alias ${source}`;
  new HumanError({
    errorMessage,
    tips: `You can use [s config add -h] to view configuration help, Serverless Devs' config document can refer to：${colors.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/config.md',
    )}`,
  });
}

function exists({ target, accessFileInfo }: { target: string; accessFileInfo?: any }) {
  const errorMessage = `${target} had exists, please do not configured these keys: [${String(
    Object.keys(accessFileInfo),
  )}].`;
  new HumanError({
    errorMessage,
    tips: `You can use [s config get] list accounts`,
  });
}

function run(program: Command) {
  const command = program
    .command('rename')
    .usage('<sourceAliasName> <targetAliasName>')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .addHelpCommand(false)
    .action(async () => {
      try {
        await doAction();
      } catch (error) {
        await HandleError(error);
      }
    });

  const doAction = async () => {
    const source = process.argv[process.argv.indexOf('rename') + 1];
    const target = process.argv[process.argv.indexOf('rename') + 2];
    if (!source || !target) {
      command.help();
    }
    const filePath = path.join(getRootHome(), 'access.yaml');
    const accessFileInfo = await getYamlContent(filePath);
    if (accessFileInfo) {
      if (accessFileInfo[target]) {
        exists({ target, accessFileInfo });
      } else if (accessFileInfo[source]) {
        accessFileInfo[target] = accessFileInfo[source];
        delete accessFileInfo[source];
        fs.writeFileSync(filePath, yaml.dump(accessFileInfo));
        logger.success(`Key [${source}] has been successfully rename to [${target}].`);
      } else {
        notFound({ source, accessFileInfo });
      }
    } else {
      notFound({ source, accessFileInfo });
    }
  };
}

export = run;
