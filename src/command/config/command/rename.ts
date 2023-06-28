import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../../utils';
import { HandleError } from '../../../error';
import { handlerSecret } from '../utils';

const description = `You can rename an account.
  
  Example:
    $ s config rename -s source -t target
    
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export = (program: Command) => {
  const command = program.command('rename');

  command
    .usage('[options]')
    .option('-s, --source <source>', 'Source alias name')
    .option('-t, --target <target>', 'Target alias name')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async options => {
      console.log('options: ', options);
      try {
        const credential = new Credential();
        const result = await credential.rename(options);
        console.log({
          Alias: result.access,
          credential: handlerSecret(result.credential),
        });
      } catch (err) {
        await HandleError(err);
      }
    });
};
