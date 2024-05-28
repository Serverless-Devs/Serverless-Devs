import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, checkTemplateVersion } from '@/utils';
import Action from './action';

const description = `Delete specified env.

Supported vendors: Alibaba Cloud

    Example:
        $ s env destroy --name test-env

${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/env/')}`;

export default (program: Command) => {
  const command = program.command('destroy');
  command
    .usage('[options]')
    .description(description)
    .summary(`Delete specified environment`)
    .requiredOption('-n, --name <name>', 'Env name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      await checkTemplateVersion(program) ? 
        await new Action({ ...options, ...program.optsWithGlobals() }).start() : 
        null;
    });
};
