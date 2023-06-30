import { Command } from 'commander';
import { emoji } from '../../utils';
import { underline } from 'chalk';

import subLogin from './command/login';
import subPublish from './command/publish';
import subList from './command/list';
import subDetail from './command/detail';
import subDelete from './command/remove';

const description = `You can manage Serverless Packages on Serverless Registry.

${emoji('📖')} Document: ${underline('https://serverless.help/s/registry')}`;

export default (program: Command) => {
  const configProgram = program.command('registry');

  configProgram
    .description(description)
    .usage('[commands] [options]')
    .summary(`${emoji('📖')} Manage serverless packages on serverless registry`)
    .helpOption('-h, --help', 'Display help for command');

  subLogin(configProgram);
  subPublish(configProgram);
  subList(configProgram);
  subDetail(configProgram);
  subDelete(configProgram);
};
