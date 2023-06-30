import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../utils';
import { HandleError } from '../../error';
import Manager from './manager';
import logger from '../../logger';

const description = `Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

Example:
    $ s init
    $ s init --project fc
    $ s init --project fc -d my_dir
    $ s init --project fc --app-name my-express
    $ s init --project fc --parameters '{"serviceName":"websiteService"}'
    $ s init --project git@github.com:foo/bar.git
    $ s init --project https://github.com/foo/bar.git
    
${emoji('🚀')} More applications: ${underline('https://registry.serverless-devs.com')}`;

export default (program: Command) => {
  program
    .command('init')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('💞')} Initializing a serverless project.`)
    .helpOption('-h, --help', 'Display help for command')
    .option('-d, --dir <dir>', 'Where to output the initialized app into (default: ./<ProjectName> )')
    .option('-r, --registry <url>', 'Use specify registry')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .option('--parameters <parameters>', 'Initialize with custom parameters')
    .option('--app-name <appName>', 'Modify default Application name')
    .option('--project <project>', 'Specify Template')
    .action(async options => {
      if (options.parameters) {
        try {
          options.parameters = JSON.parse(options.parameters);
        } catch (_ex) {
          throw new Error('--parameters format error');
        }
      }

      // 兼容 s init <project>
      if (!options.project) {
        const template = process.argv[3];
        if (template && !template?.startsWith('-')) {
          options.project = template;
          logger.warn(`This method has been discontinued, please use --project ${template}`);
        }
      }

      try {
        const manager = new Manager(options);
        await manager.init();
      } catch (err) {
        await HandleError(err);
      }
    });
};
