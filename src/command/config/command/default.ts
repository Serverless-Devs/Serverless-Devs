import Credential from '@serverless-devs/credential';
import { Command } from 'commander';
import { bold, underline } from 'chalk';
import { emoji } from '../../../utils';
import logger from '../../../logger';

const description = `Specify an access as the default.
  
  Example:
    $ s config default
    $ s config default -a demo
    
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

export default (program: Command) => {
  const command = program.command('default', { hidden: true });

  command
    .usage('[options]')
    .description(description)
    .summary(`${emoji(bold('-'))} Set default accounts`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const credential = new Credential({ logger });
      await credential.default(program.optsWithGlobals().access);
    });
};
