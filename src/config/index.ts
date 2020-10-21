import * as program from 'commander';
import i18n from '../utils/i18n';

program
  .name('s config')
  .usage('[commands] [options]')
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .command('add', i18n.__('Add an account'))
  .command('get', i18n.__('Get accounts'))
  .command('delete', i18n.__('Delete an account'))
  .command('update', i18n.__('Update an account'))
  .description(i18n.__('You can configure provider accounts, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.'))
  .parse(process.argv);
