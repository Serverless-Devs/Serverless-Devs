/** @format */

import program from 'commander';
import { configSet } from '@serverless-devs-cli/util';
import { CommandError, SetAnalysisError } from '@serverless-devs-cli/error';

import i18n from '../../utils/i18n';
import logger from '../../utils/logger';

const { setConfig } = configSet;


program
  .name('s set analysis')
  .usage('[options] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .description(
    `${i18n.__('Upload your usage habits to help us improve our products')}

    ${i18n.__('Example')}:
        # ${i18n.__('Upload your usage habits')}:
            $ s set analysis enable
        # ${i18n.__('Do not upload your usage habits')}: 
            $ s set analysis disable`,
  )
  .addHelpCommand(false).parse(process.argv);
(async () => {
  // console.log("language")
  if (program.args.length === 0) {
    program.help();
  }
  if (program.args.length > 1) {
    throw new SetAnalysisError('Too many args input');
  }

  const flag = program.args[0].toLowerCase();
  if (flag === 'enable') {
    await setConfig('analysis', true);
  } else if (flag === 'disable') {
    await setConfig('analysis', false);
  } else {
    throw new SetAnalysisError('Unknown input: {{input}}', { input: flag });
  }

  logger.success('Setup succeeded');
})().catch(err => {
  throw new CommandError(err.message);
});
