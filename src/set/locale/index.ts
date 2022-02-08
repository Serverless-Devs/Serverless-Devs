import program from '@serverless-devs/commander';
import { i18n, logger } from '../../utils';
import { CommandError } from '../../error';
import core from '../../utils/core';
const { inquirer, colors } = core;
import { emoji } from '../../utils/common';
import { setConfig, getConfig } from '../../utils/handler-set-config';

const description = `Set language information.

    Example:
        $ s set locale
        $ s set locale zh
        
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

program
  .name('s set locale')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(description)
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
  if (program.args.length === 0) {
    logger.log(`\n💬 Current language: ${i18n(getConfig('locale'))}\n`);
    const answers = await inquirer.prompt(promptOption);
    setConfig('locale', answers.locale);
  }
  if (program.args.length > 0) {
    const val = program.args[0];
    if (val) {
      setConfig('locale', val);
      logger.success('Setup succeeded');
    }
  }
})().catch(err => {
  throw new CommandError(err.message);
});
