import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `Set and check default environment.

Supported vendors: Alibaba Cloud

    Example:
        $ s env default -n default

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/env')}`;

export default (program: Command) => {
  const command = program.command('default');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇
    .summary(`${emoji('🔤')} Set default environment`)
    .option('-n, --name <name>', 'Env name')
    .helpOption('-h, --help', 'Displsay help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
