import { Command } from 'commander';
import { setGlobalConfig } from '@serverless-devs/utils';
import inquirer from 'inquirer';
import { underline } from 'chalk';
import { emoji } from '../../../utils';

const description = `Set proxy information.

Example:
   $ s set proxy
   $ s set proxy --http_proxy xxxx:xxx --https_proxy xxxx:xxx
   $ s set proxy --enable
   
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

export default (program: Command) => {
  program
    .command('proxy')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('🔧')} Set proxy information`)
    .option('--enable', 'whether to enable proxy')
    .option('--no-enable', 'whether to no enable proxy', true)
    .option('--http_proxy <http_proxy_value>', 'Specify the http_proxy.')
    .option('--https_proxy <https_proxy_value>', 'Specify the https_proxy.')
    .helpOption('-h, --help', 'Display help for command')
    .action(async option => {
      const { http_proxy, https_proxy, enable } = option || {};
      if (http_proxy || https_proxy || typeof enable === 'boolean') {
        http_proxy && setGlobalConfig('http_proxy', http_proxy);
        https_proxy && setGlobalConfig('https_proxy', https_proxy);
        typeof enable === 'boolean' && setGlobalConfig('proxy_enable', enable);
        return;
      }

      const answer = await inquirer.prompt([
        {
          type: 'input',
          message: 'Please enter http_proxy: ',
          name: 'http_proxy',
        },
        {
          type: 'input',
          message: 'Please enter https_proxy: ',
          name: 'https_proxy',
        },
        {
          type: 'confirm',
          message: 'Do you want to enable proxy',
          default: true,
          name: 'http_proxy_enable',
        },
      ]);
      setGlobalConfig('http_proxy', answer.http_proxy);
      setGlobalConfig('https_proxy', answer.https_proxy);
      setGlobalConfig('proxy_enable', answer.http_proxy_enable);
    });
};
