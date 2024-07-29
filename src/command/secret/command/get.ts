import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import { getSecretManager } from '../utils';
import { handleSecret } from '@/command/config/utils';
import logger from '@/logger';
import { isEmpty } from 'lodash';
import jsYaml from 'js-yaml';

const description = `Preview Secrets.
 
  Example:
    $ s secret get
    $ s secret get --key demo
    
${emoji('📖')} Document: Temporarily unavailable`;

export default (program: Command) => {
  const command = program.command('get');

  command
    .usage('[options]')
    .description(description)
    .summary(`Preview secrets`)
    .option('--key <key>', 'Secret key')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { key } = options;
      const secretManager = getSecretManager();
      const secrets = handleSecret(secretManager.getAllSecrets());
      if (isEmpty(key)) {
        logger.write(jsYaml.dump(secrets));
      } else {
        if (!secrets[key]) {
          logger.error(`Secret [${key}] does not exist.`);
          return;
        }
        logger.write(jsYaml.dump(secrets[key]));
      }
    });
};
