import program from 'commander';
import core from '../utils/core';
import i18n from '../utils/i18n';
import os from 'os';
import path from 'path';

const { rimraf, minimist, fse: fs } = core;
const command = program
  .name('s clean')
  .usage('[options]')
  .option('--all', i18n('clean_up_the_environment'))
  .option('--cache [dirname]', i18n('delete_the_file_under_the_cache'))
  .option('--component [name]', i18n('remove_components'))
  .helpOption('-h, --help', i18n('display_help_for_command'))
  .addHelpCommand(false)
  .parse(process.argv);

try {
  if (process.argv.length === 2) {
    command.help();
  }

  if (process.argv.length > 2) {
    const sPath = path.join(os.homedir(), '.s');
    const cachePath = path.join(sPath, 'cache');
    const componentsPath = path.join(sPath, 'components');
    const githubPath = path.join(componentsPath, 'github.com');
    const devsappPath = path.join(componentsPath, 'devsapp.cn');
    const args = minimist(process.argv.slice(2), {
      boolean: ['all'],
    });
    if (args.all) {
      let files = fs.readdirSync(path.join(sPath));
      const excludeList = ['access.yaml', 'set-config.yml', 'logs', 'config'];
      files = files.filter((item: string) => !excludeList.includes(item));
      files.forEach((file: string) => {
        rimraf.sync(path.join(sPath, file));
      });
    }
    if (args.cache) {
      // cache 无参数
      if (typeof args.cache === 'boolean') {
        rimraf.sync(path.join(cachePath));
      }
      // cache 有参数
      if (typeof args.cache === 'string') {
        rimraf.sync(path.join(cachePath, args.cache));
        if (args.cache === 'core') {
          rimraf.sync(path.join(cachePath, '.s-core.lock'));
        }
      }
    }
    if (args.component) {
      // component 无参数
      if (typeof args.component === 'boolean') {
        rimraf.sync(componentsPath);
      }
      // component 有参数
      if (typeof args.component === 'string') {
        let [source, name] = args.component.split('/');
        // name 存在说明包含/, 比如devsapp/fc
        if (name) {
          rimraf.sync(path.join(devsappPath, name));
          rimraf.sync(path.join(devsappPath, source, name));
          rimraf.sync(path.join(githubPath, source, name));
        } else {
          rimraf.sync(path.join(devsappPath, source));
          rimraf.sync(path.join(devsappPath, 'devsapp', source));
        }
      }
    }
  }
} catch (error) {
  // ignore error in window
}
