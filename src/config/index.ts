import program from 'commander';

program
  .name('s config')
  .usage('[commands] [options]')
  .helpOption('-h, --help', 'Display help for command')
  .command('add', '➕ ' + 'Add an account')
  .command('get', '✔️  ' + 'Get accounts')
  .command('delete', '✖️  ' + 'Delete an account')
  .description('You can configure provider accounts, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.')
  .addHelpCommand(false).parse(process.argv);
