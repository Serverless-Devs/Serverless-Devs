import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import logger from '@/logger';
import { getSecretManager } from '../utils';

const description = `Delete a secret.
  
  Example:
    $ s secret delete --key demo
    
${emoji('📖')} Document: Temporarily unavailable`;

export default (program: Command) => {
  const command = program.command('delete');

  command
    .usage('[options]')
    .description(description)
    .summary(`Delete a secret`)
    .requiredOption('--key <key>', 'Secret key')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { key } = options;
      const secretManager = getSecretManager();
      try {
        secretManager.deleteSecret(key);
        logger.write(chalk.green(`Secret [${key}] has been successfully deleted.`));
      } catch (error) {
        logger.error(error);
      }
    });
};
