/** @format */

import * as program from 'commander';
import {handlerProfileFile} from '../../utils/handler-set-config';
import logger from '../../utils/logger';
import i18n from '../../utils/i18n';
import {CommandError} from '../../error/command-error';

program
  .name('s set output-color')
  .usage('[options] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .description(
    `i18n.__('Here you can set whether the output has color.')
  
   ${i18n.__('Example')}:
        # ${i18n.__('If your want output colorful')}:
            $ s set output-color enable
        # ${i18n.__('If your want output with default color')}:
            $ s set output-color disable
  `,
  )
  .parse(process.argv);
(async () => {
  let openColorStr = '';
  if (program.args.length > 0) {
    openColorStr = program.args[0];
  } else {
    return program.help();
  }
  let openColorFlag: boolean;
  if (openColorStr === 'enable') {
    logger.colorSwitch(true);
    openColorFlag = true;
    logger.success('Color output enable');
  } else if (openColorStr === 'disable') {
    logger.colorSwitch(false);
    openColorFlag = false;
    logger.success('Color output disable');
  } else {
    return program.help();
  }

  await handlerProfileFile({
    data: openColorFlag,
    configKey: 'output-color',
  });
})().catch(err => {
  throw new CommandError(err.message);
});
