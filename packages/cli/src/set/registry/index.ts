import program from 'commander';
import { configSet } from '@serverless-devs-cli/util';
import { CommandError } from '@serverless-devs-cli/error';
import i18n from '../../utils/i18n';
import logger from '../../utils/logger';

const { setConfig } = configSet;

program
    .name('s set registry')
    .usage('[options] [name]')
    .helpOption('-h, --help', i18n.__('Display help for command'))
    .description(
        `${i18n.__('You can set your registry.')}
    
         ${i18n.__('Example')}:
            $ s set registry <url>`,
      )
    .addHelpCommand(false).parse(process.argv);
(async () => {
    if (program.args.length === 0) {
        program.help();
    }
    if (program.args.length > 0) {
        const r = program.args[0];
        if (r) {
            setConfig('registry', r);
            logger.success('Setup succeeded');
        }
    }
})().catch(err => {
    throw new CommandError(err.message);
});
