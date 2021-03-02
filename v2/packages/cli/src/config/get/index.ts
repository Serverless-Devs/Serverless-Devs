
import program from 'commander';
import { ConfigError, CommandError } from '@serverless-devs-cli/error';

import i18n from '../../utils/i18n';
import logger from '../../utils/logger';
import { GetManager } from './get-manager';


const wrongInput = 'Get failed: Please input right format. You can obtain the key information through: s config get -h';
const description = i18n.__('s config get help');

program
  .name('s config get')
  .usage('[options] [name]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .option(
    '-p, --provider [name]',
    i18n.__('The cloud service provider. [alibaba/aws/azure/baidu/google/huawei/tencent]'),
  )
  .option('-a, --aliasName [name]', i18n.__('Key pair alia, if the alias is not set, use default instead'))
  .option('-l, --list [name]', i18n.__('Show user configuration list'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const providerAlias: Object = {
    Provider: program.provider,
    AliasName: program.aliasName,
    List: program.list,
  };
  if (program.args.length === 0 && program.provider === undefined && !program.list) {
    program.help();
  } else if (program.args.length > 0) {
    logger.error(wrongInput);
    throw new ConfigError('Query failed');
  }

  const getManager = new GetManager();
  await getManager.initAccessData(providerAlias);
  getManager.consoleRes();
})().catch(err => {
  throw new CommandError(err.message);
});
