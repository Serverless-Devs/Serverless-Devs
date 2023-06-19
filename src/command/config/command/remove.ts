import Credential from '@serverless-devs/credential';
import { Command } from "commander";
import { underline } from "chalk";
import { emoji } from "../../../utils";
import { HandleError } from '../../../error';

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo
    
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export = (program: Command) => {
  const command = program.command('delete');

  command.usage('[options]')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async (options) => {
      try {
        const credential = new Credential();
        await credential.remove(options.access);
       
      } catch (error) {
        await HandleError(error);
      }
    })
};
