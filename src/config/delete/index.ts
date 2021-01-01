/** @format */

import * as program from 'commander';
import i18n from '../../utils/i18n';
import {DeleteManager} from './delete-manager';
import {ConfigError} from '../../error/config-error';
import {CommandError} from '../../error/command-error';

const description = i18n.__('s config delete help');

program
  .name('s config delete')
  .usage('[options] [name]')
  .helpOption('-h,--help', i18n.__('Display help for command'))
  .option(
    '-p,  --provider [name]',
    i18n.__('The cloud service provider. [alibaba/aws/azure/baidu/google/huawei/tencent]'),
  )
  .option('-a , --alias-name [name]', i18n.__('Key pair alia, if the alias is not set, use default instead'))
  .description(description).addHelpCommand(false).parse(process.argv);
(async () => {
  const providerAlias: Object = {
    Provider: program.provider,
    AliasName: program.aliasName,
  };

  if (program.args.length === 0 && (program.provider == undefined || program.aliasName == undefined)) {
    program.help();
  } else if (program.args.length > 0) {
    throw new ConfigError(
      'Please input right format , You can obtain the key information through: s config delete -h.'
    );
  }
  await new DeleteManager().init(providerAlias);
})().catch(err => {
  throw new CommandError(err.message);
});
