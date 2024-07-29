import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import { getSecretManager } from '../utils';
import logger from '@/logger';

const description = `Add a secret or overwrite a secret.

    Example:
        $ s secret add --key demo --value demo
        $ s secret add --key demo --value demo -f

${emoji('📖')} Document: Temporarily unavailable`;

export default (program: Command) => {
  const command = program.command('add');

  command
    .usage('[options]')
    .description(description)
    .summary(`Add a secret`)
    .requiredOption('--key <key>', 'Secret key')
    .requiredOption('--value <value>', 'Secret value')
    .option('-f, --force', 'Mandatory overwrite key information')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const secretManager = getSecretManager();
      const value = secretManager.getSecret(options.key);
      if (value && !options.force) {
        logger.warn(`The secret ${options.key} already exists, please use --force to overwrite`);
        return;
      }
      secretManager.addSecret(options.key, options.value);
      logger.write(chalk.green(`Secret [${options.key}] has been successfully added.`));
    });
};
