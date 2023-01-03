import { Command } from '@serverless-devs/commander';
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

function run(program: Command) {
  const command = program
    .command('locale')
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .description(description)
    .action(async () => {
      try {
        await doAction();
      } catch (error) {
        throw new CommandError(error.message);
      }
    });

  const doAction = async () => {
    const argv = process.argv.splice(2);
    const { help } = core.minimist(argv, { alias: { help: 'h' } });
    help && command.help();
    if (argv.length === 2) {
      logger.log(`\n💬 Current language: ${i18n(getConfig('locale'))}\n`);
      const answers = await inquirer.prompt(promptOption);
      setConfig('locale', answers.locale);
    }
    if (argv.length > 2) {
      const val = argv[2];
      if (val) {
        setConfig('locale', val);
        logger.success('Setup succeeded');
      }
    }
  };
}

export = run;
