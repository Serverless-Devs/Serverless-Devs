import { Command } from 'commander';
import chalk from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '@/utils';
import logger from '@/logger';

const description = `Login Serverless Registry.

Example:
  $ s registry login
  $ s registry login --token xxxxxxxxxxxxxxx
  $ s registry login --retoken
   
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/registry-login')}`;

export default (program: Command) => {
  program
    .command('login')
    .usage('[options]')
    .description(description)
    .summary(`Login Serverless Registry`)
    .option('--token <token>', 'Login by token')
    .option('--retoken', 'Reset login token')
    // .option('--get-token', 'Get login token')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { token, retoken, getToken } = option;

      const registry = new Registry({ logger });
      if (token) {
        await registry.login(token);
        return;
      } else if (retoken) {
        await registry.resetToken();
        return;
      }

      if (getToken) {
        const t = await registry.getToken();
        logger.output(t);
        return;
      }

      await registry.login();
    });
};
