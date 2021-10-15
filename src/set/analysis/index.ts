import program from 'commander';
import { setConfig } from '../../utils/handler-set-config';
import { CommandError } from '../../error';
import i18n from '../../utils/i18n';
import core from '../../utils/core';
const { inquirer } = core;

program
  .name('s set analysis')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(
    `You can set your analysis.

     Example:
        $ s set analysis`,
  )
  .parse(process.argv);

const promptOption = [
  {
    type: 'list',
    name: 'analysis',
    message: i18n('record_your_log_information'),
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
