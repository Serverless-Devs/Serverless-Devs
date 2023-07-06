import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import { bold, underline } from 'chalk';
import { emoji } from '../../../utils';
import { HandleError } from '../../../error';
import { handleSecret } from '../utils';
import logger from '../../../logger';

const description = `You can get accounts.
 
  Example:
    $ s config get
    $ s config get -a demo
    
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export default (program: Command) => {
  const command = program.command('get');

  command
    .usage('[options]')
    .description(description)
    .summary(`${emoji(bold('√'))} Get accounts`)
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      try {
        const credential = new Credential({ logger });
        if (options.access) {
          const result = await credential.get(options.access);

          logger.output({
            Alias: result.access,
            Credential: handleSecret(result.credential),
          });
        } else {
          const result = await credential.getAll();
          const show = {};
          for (const alias in result) {
            const value = result[alias];
            show[alias] = handleSecret(value);
          }
          logger.output(show);
        }
      } catch (error) {
        if (error.message.includes('Not found access')) {
          const msg = `
  ${emoji('🤔')} You have not yet been found to have configured key information.
  ${emoji('🧭')} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  ${emoji('😈')} If you have questions, please tell us: ${underline(
            'https://github.com/Serverless-Devs/Serverless-Devs/issues',
          )}`;
          logger.write(msg);
          return;
        }
        await HandleError(error);
      }
    });
};
