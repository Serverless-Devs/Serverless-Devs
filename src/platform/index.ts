import * as program from 'commander';
import i18n from '../utils/i18n';

const description = `${i18n.__('Package management.For component/plugin/application developers:  including publishing, query, delete and other functions.')}`;
program
  .name('s platform')
  .command('login', i18n.__('Login Serverless Tool.'))
  .command('init', i18n.__('Initialize a package to be released.'))
  .command('publish', i18n.__('Publish package.'))
  .command('delete', i18n.__('Delete package.'))
  .description(description)
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .parse(process.argv);

// (async () => {
//       let name = undefined;
//       if (program.args.length > 0) {
//           name = program.args[0];
//       }
//       console.log(name, "name");

//   })().catch((err) => {
//       console.error(err);
//       process.exit(-1);
//   });

