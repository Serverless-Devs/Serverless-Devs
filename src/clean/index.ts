import program from 'commander';
import core from '../utils/core';
import i18n from '../utils/i18n';
import os from 'os';
import path from 'path';
import logger from '../utils/logger';
import { getConfig } from '../utils/handler-set-config';

const { rimraf, minimist, fse: fs } = core;

const description = `Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
    Example:
        $ s clean --component fc-api
        $ s clean --all

    Tips:
        Get all installed component: s component

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/clean.md`;
const command = program
  .name('s clean')
  .usage('[options]')
  .option('--all', i18n('clean_up_the_environment'))
  .option('--cache [dirName]', i18n('delete_the_file_under_the_cache'))
  .option('--component [componentName]', i18n('remove_components'))
  .helpOption('-h, --help', i18n('display_help_for_command'))
  .description(description)
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
      logger.success('The environment of Serverless Devs has been cleaned up successfully.');
    }
    if (args.cache) {
      // cache 无参数
      if (typeof args.cache === 'boolean') {
        rimraf.sync(path.join(cachePath));
        logger.success('Cache has been cleaned up successfully.');
      }
      // cache 有参数
      if (typeof args.cache === 'string') {
        rimraf.sync(path.join(cachePath, args.cache));
        logger.success(`Cache [${args.cache}] has been cleaned up successfully.`);
      }
    }
    if (args.component) {
      // component 无参数
      if (typeof args.component === 'boolean') {
        rimraf.sync(componentsPath);
        logger.success('Component has been cleaned up successfully.');
      }
      // component 有参数
      if (typeof args.component === 'string') {
        const registry = getConfig('registry');
        // s 源
        if (registry === 'http://registry.devsapp.cn/simple') {
          const filePath = path.join(devsappPath, args.component);
          if (fs.existsSync(filePath)) {
            rimraf.sync(filePath);
            logger.success(`Component [${args.component}] has been cleaned up successfully.`);
          }
        }
        // git 源
        if (registry === 'https://api.github.com/repos') {
          const filePath = path.join(githubPath, args.component);
          if (fs.existsSync(filePath)) {
            rimraf.sync(filePath);
            logger.success(`Component [${args.component}] has been cleaned up successfully.`);
          }
        }
      }
    }
  }
} catch (error) {
  // ignore error in window
}
