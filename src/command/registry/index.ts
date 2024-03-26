import { Command } from 'commander';
import { emoji, suggestCommand } from '@/utils';
import chalk from 'chalk';

import subLogin from './command/login';
import subPublish from './command/publish';
import subList from './command/list';
import subDetail from './command/detail';
import subDelete from './command/remove';

const description = `You can manage Serverless Packages on Serverless Registry.

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/registry')}`;

export default (program: Command) => {
  const configProgram = program.command('registry');
  suggestCommand(configProgram);
  configProgram
    .description(description)
    .usage('[commands] [options]')
    .summary(`Serverless registry platform`)
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command');

  subLogin(configProgram);
  subPublish(configProgram);
  subList(configProgram);
  subDetail(configProgram);
  subDelete(configProgram);
};
