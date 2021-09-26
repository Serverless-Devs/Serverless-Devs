import * as inquirer from 'inquirer';
import { InitManager } from '../init/init-manager';
import { i18n } from '../utils';
import { emoji, red } from '../utils/common';
import getCore from '../utils/s-core';
const { colors } = getCore();

async function onboarding() {
  const { templateFile } = process.env;
  if (templateFile === 'null') {
    return await projectWithNoDevs();
  }
  await projectWithDevs();
}

async function projectWithDevs() {
  console.log(red(`${i18n('tip_for_a_serverless_project')} `));

  console.log(`\n${emoji('📘')} ${red('Documents: ')} ${red.underline('https://www.serverless-devs.com')}`);
  console.log(
    `${emoji('🙌')} ${red('Discussions: ')} ${red.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/discussions',
    )}`,
  );
  console.log(
    `${emoji('⁉️')} ${red(' Issues: ')} ${red.underline('https://github.com/Serverless-Devs/Serverless-Devs/issues')}`,
  );
}

async function projectWithNoDevs() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      default: 'Y',
      name: 'name',
      message: colors.yellow(i18n('create_a_new_project')),
    },
  ]);
  if (answer.name) {
    const initManager = new InitManager();
    await initManager.init();
  }
}

export default onboarding;
