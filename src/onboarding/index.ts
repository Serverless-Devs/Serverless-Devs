import * as inquirer from 'inquirer';
import { colors } from '@serverless-devs/core';
import { InitManager } from '../init/init-manager';
import { i18n } from '../utils';
import { emoji } from '../utils/common';

async function onboarding() {
  const { templateFile } = process.env;
  if (templateFile === 'null') {
    return await projectWithNoDevs();
  }
  await projectWithDevs();
}

async function projectWithDevs() {
  console.log(colors.red(`Serverless › ${i18n('tip_for_a_serverless_project')} `));

  console.log(
    `\n${emoji('📘')} ${colors.red('Documents: ')} ${colors.red.underline(
      'https://www.github.com/serverless-devs/docs',
    )}`,
  );
  console.log(
    `${emoji('🙌')} ${colors.red('Discussions: ')} ${colors.red.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/discussions',
    )}`,
  );
  console.log(
    `${emoji('⁉️')} ${colors.red(' Issues: ')} ${colors.red.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/issues',
    )}`,
  );
}

async function projectWithNoDevs() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      default: 'Y',
      name: 'name',
      message: `Serverless: ${colors.yellow(i18n('create_a_new_project'))}`,
    },
  ]);
  if (answer.name) {
    const initManager = new InitManager();
    await initManager.init();
  }
}

export default onboarding;
