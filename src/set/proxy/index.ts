import program from '@serverless-devs/commander';
import { logger, getProcessArgv } from '../../utils';
import { CommandError } from '../../error';
import core from '../../utils/core';
import { emoji } from '../../utils/common';
const { inquirer } = core;
import { setConfig } from '../../utils/handler-set-config';
const { colors, lodash } = core;
const { has } = lodash;

const choices = [
  {
    name: 'http_proxy',
    value: 'http_proxy',
  },
  {
    name: 'https_proxy',
    value: 'https_proxy',
  },
];

export const registryInquire = [
  {
    type: 'list',
    name: 'proxy',
    message: 'Choose a proxy?',
    choices,
  },
];
program
  .name('s set proxy')
  .usage('[options]')
  .option('--enable', 'whether to enable proxy')
  .option('--http_proxy <http_proxy_value>', 'Specify the http_proxy.')
  .option('--https_proxy <https_proxy_value>', 'Specify the https_proxy.')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(
    `Set proxy information.

     Example:
        $ s set proxy
        $ s set proxy --http_proxy xxxx:xxx --https_proxy xxxx:xxx
        $ s set proxy --enable false
        
${emoji('📖')} Document: ${colors.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
    )}`,
  )
  .parse(process.argv);
(async () => {
  const argv = getProcessArgv();
  const { http_proxy, https_proxy } = argv;
  if (http_proxy || https_proxy || has(argv, 'enable')) {
    http_proxy && setConfig('http_proxy', http_proxy);
    https_proxy && setConfig('https_proxy', https_proxy);
    has(argv, 'enable') && setConfig('proxy_enable', argv.enable === 'false' ? false : true);
    return logger.success('Setup succeeded');
  }

  if (program.args.length === 0) {
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
    setConfig('http_proxy', answer.http_proxy);
    setConfig('https_proxy', answer.https_proxy);
    setConfig('proxy_enable', answer.http_proxy_enable);
  }
})().catch(err => {
  throw new CommandError(err.message);
});
