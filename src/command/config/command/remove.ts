import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import logger from '@/logger';

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/config')}`;

export default (program: Command) => {
  const command = program.command('delete');

  command
    .usage('[options]')
    .description(description)
    .summary(`Delete an account`)
    .option('-a, --access <aliasName>', 'Specify the access alias name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const credential = new Credential({ logger });
      const access = program.optsWithGlobals().access;
      await credential.remove(access);
      logger.write(chalk.green(`Access [${access}] has been successfully deleted.`));
    });
};
