import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import Action from './action';

// TODO: @封崇
const description = `You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --infoList value1,value2,value3

${emoji('📖')} Document: ${chalk.underline('https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/env.md')}`;

export default (program: Command) => {
  const command = program.command('default');
  command
    .usage('[options]')
    .description(description)
    // TODO: @封崇
    .summary(`${emoji(chalk.bold('+'))} default`)
    .option('--name <name>', 'Specify the env name')
    .helpOption('-h, --help', 'Displsay help for command')
    .action(async options => {
      await new Action({ ...options, ...program.optsWithGlobals() }).start();
    });
};
