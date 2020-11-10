/** @format */

import * as program from 'commander';
import {setConfig} from '../../utils/handler-set-config';
import logger from '../../utils/logger';
import i18n from '../../utils/i18n';
import {SetAnalysisError} from '../../error/set-analysis-error';
import {CommandError} from '../../error/command-error';

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
  .parse(process.argv);
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
    throw new SetAnalysisError('Unknown input: {{input}}', {input: flag});
  }

  logger.success('Setup succeeded');
})().catch(err => {
  throw new CommandError(err.message);
});
