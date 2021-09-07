import program from 'commander';
import * as inquirer from 'inquirer';
import { configSet, i18n } from '../../utils';
import { CommandError } from '../../error';
const { setConfig } = configSet;

program
  .name('s set locale')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(
    `You can set your language.

     Example:
        $ s set locale`,
  )
  .parse(process.argv);

const promptOption = [
  {
    type: 'list',
    name: 'locale',
    message: i18n('select_current_language'),
    choices: [
      {
        name: i18n('zh'),
        value: 'zh',
      },
      {
        name: i18n('en'),
        value: 'en',
      },
    ],
  },
];
(async () => {
  const answers = await inquirer.prompt(promptOption);
  setConfig('locale', answers.locale);
})().catch(err => {
  throw new CommandError(err.message);
});
