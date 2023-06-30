import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import { bold, underline } from 'chalk';
import { emoji } from '../../../utils';
import { HandleError } from '../../../error';
import { handleSecret } from '../utils';
import logger from '../../../logger';

const description = `You can rename an account.
  
  Example:
    $ s config rename -s source -t target
    
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export default (program: Command) => {
  const command = program.command('rename');

  command
    .usage('[options]')
    .description(description)
    .summary(`${emoji(bold('>'))} Rename an account`)
    .option('-s, --source <source>', 'Source alias name')
    .option('-t, --target <target>', 'Target alias name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      try {
        const credential = new Credential({ logger });
        const result = await credential.rename(options);
        logger.output({
          Alias: result.access,
          credential: handleSecret(result.credential),
        });
      } catch (err) {
        await HandleError(err);
      }
    });
};
