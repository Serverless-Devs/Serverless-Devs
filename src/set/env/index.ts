import program from '@serverless-devs/commander';
import { CommandError } from '../../error';
import logger from '../../utils/logger';
import core from '../../utils/core';
import { emoji } from '../../utils/common';
const { colors, setConfig, getConfig } = core;

// TODO: replace env doc

const description = `Set the current operating environment.

    Example:
        $ s set env prod
        
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

program
  .name('s set env')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(description)
  .parse(process.argv);

(async () => {
  if (program.args.length === 0) {
    getConfig('env') ? logger.log(`\n${emoji('📝')} the running environment: ${getConfig('env')}\n`) : program.help();
  }

  if (program.args.length > 0) {
    const val = program.args[0];
    if (val) {
      setConfig('env', val);
      logger.success('Setup succeeded');
    }
  }
})().catch(err => {
  throw new CommandError(err.message);
});
