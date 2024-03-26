import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import logger from '@/logger';

const description = `Specify an access as the default.
  
  Example:
    $ s config default
    $ s config default -a demo
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/config')}`;

export default (program: Command) => {
  const command = program.command('default', { hidden: true });

  command
    .usage('[options]')
    .description(description)
    .summary(`Set default accounts`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const credential = new Credential({ logger });
      await credential.default(program.optsWithGlobals().access);
      // TODO: 交互式失效
      if (program.optsWithGlobals().access) {
        logger.write(chalk.green(`Access [${program.optsWithGlobals().access}] has been set as default.`));
      }
    });
};
