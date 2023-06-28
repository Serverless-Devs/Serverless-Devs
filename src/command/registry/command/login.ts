import { Command } from 'commander';
import { underline } from 'chalk';
import Registry from '@serverless-devs/registry';
import { emoji } from '../../../utils';

const description = `Login Serverless Registry.

Example:
  $ s registry login
  $ s registry login --token xxxxxxxxxxxxxxx
  $ s registry login --retoken
   
${emoji('📖')} Document: ${underline('https://serverless.help/s/registry#login')}`;

export = (program: Command) => {
  program
    .command('login')
    .usage('[options]')
    .option('--token <token>', 'Login by token')
    .option('--retoken', 'Reset login token')
    .option('--get-token', 'Get login token')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async option => {
      const { token, retoken, getToken } = option;

      const registry = new Registry({});
      if (token) {
        await registry.login(token);
        return;
      } else if (retoken) {
        await registry.resetToken();
        return;
      }

      if (getToken) {
        const t = await registry.getToken();
        console.log(t);
        return;
      }

      await registry.login();
    });
};
