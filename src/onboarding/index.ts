import Manger from '@/command/init/manager';
import { red } from '@/constant';
import inquirer from 'inquirer';
import { getYamlPath } from '@serverless-devs/utils';
import logger from '@/logger';
import chalk from 'chalk';

async function onboarding() {
  if (getYamlPath('s.yaml')) {
    const arr = [
      red("A Serverless-Devs project is detected in the current directory, please deploy via 's deploy' or get more information via 's -h'"),
      `\n${red('Documents: ')}${red.underline('https://www.serverless-devs.com')}`,
      `${red('Discussions: ')}${red.underline('https://github.com/Serverless-Devs/Serverless-Devs/discussions')}`,
      `${red('Issues: ')}${red.underline('https://github.com/Serverless-Devs/Serverless-Devs/issues')}`,
    ];
    return logger.write(arr.join('\n'));
  }
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      default: 'Y',
      name: 'name',
      message: chalk.yellow('No Serverless-Devs project is currently detected. Do you want to create a new project?'),
    },
  ]);
  if (answer.name) {
    const initManager = new Manger();
    await initManager.init();
  }
}

export default onboarding;
