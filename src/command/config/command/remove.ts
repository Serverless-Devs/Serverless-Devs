import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import { bold, underline } from 'chalk';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `You can delete an account.
  
  Example:
    $ s config delete -a demo
    
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export = (program: Command) => {
  const command = program.command('delete');

  command
    .usage('[options]')
    .description(description)
    .summary(`${emoji(bold('×'))} Delete an account`)
    .helpOption('-h, --help', 'Display help for command')
    .configureHelp({ showGlobalOptions: true })
    .action(async options => {
      const credential = new Credential({ logger });
      const access = program.optsWithGlobals().access;
      await credential.remove(access);
    });
};
