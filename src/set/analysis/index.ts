import program from 'commander';
import * as inquirer from 'inquirer';
import { setConfig } from '../../utils/handler-set-config';
import { CommandError } from '../../error';

program
  .name('s set analysis')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(
    `You can set your language.

     Example:
        $ s set analysis`,
  )
  .parse(process.argv);

const promptOption = [
  {
    type: 'list',
    name: 'analysis',
    message: 'Please select your analysis',
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
(async () => {
  const answers = await inquirer.prompt(promptOption);
  setConfig('analysis', answers.analysis);
})().catch(err => {
  throw new CommandError(err.message);
});
