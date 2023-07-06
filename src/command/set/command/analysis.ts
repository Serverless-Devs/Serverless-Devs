import { Command } from 'commander';
import { setGlobalConfig } from '@serverless-devs/utils';
import inquirer from 'inquirer';
import { underline } from 'chalk';
import { emoji } from '../../../utils';

const description = `Set analysis action.

    Example:
        $ s set analysis
        $ s set analysis disable
        
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

const promptOption = [
  {
    type: 'list',
    name: 'analysis',
    message: 'Choose a action?',
    choices: [
      {
        name: 'enable',
        value: 'enable',
      },
      {
        name: 'disable',
        value: 'disable',
      },
    ],
  },
];

export default (program: Command) => {
  program
    .command('analysis')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('👉')} Set to enable or disable analysis`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      let type: string = process.argv[4];
      if (type) {
        if (!['enable', 'disable'].includes(type)) {
          throw new Error(`Not Supported: ${type}. Only accept parameters enable, disable`);
        }
      } else {
        const answers = await inquirer.prompt(promptOption);
        type = answers.analysis;
      }
      setGlobalConfig('analysis', type);
    });
};
