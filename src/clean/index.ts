import core from '../utils/core';
import i18n from '../utils/i18n';
import path from 'path';
import logger from '../utils/logger';
import { getConfig } from '../utils/handler-set-config';
import { emoji } from '../utils/common';
import { HandleError } from '../error';

const { rimraf, fse: fs, colors, getRootHome } = core;

const description = `Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
    
    Example:
        $ s clean --component fc-api
        $ s clean --all

    Tips:
        Get all installed component: s component

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/clean.md',
)}`;

async function run(program) {
  const command = program
    .command('clean')
    .usage('[options]')
    .option('--all', i18n('clean_up_the_environment'))
    .option('--cache [dirName]', i18n('delete_the_file_under_the_cache'))
    .option('--component [componentName]', i18n('remove_components'))
    .helpOption('-h, --help', i18n('display_help_for_command'))
    .description(description)
    .addHelpCommand(false)
    .action(async options => {
      try {
        await doAction(options);
      } catch (error) {
        await HandleError(error);
      }
    });

  const doAction = async args => {
    const sPath = getRootHome();
    const cachePath = path.join(sPath, 'cache');
    const componentsPath = path.join(sPath, 'components');
    const githubPath = path.join(componentsPath, 'github.com');
    const devsappPath = path.join(componentsPath, 'devsapp.cn');
    if (args.all) {
      const files = ['cache', 'components'];
      files.forEach((file: string) => {
        rimraf.sync(path.join(sPath, file));
      });
      try {
        const spath = await core.getTemplatePath();
        const sdir = path.join(path.dirname(spath), '.s');
        rimraf.sync(sdir);
      } catch (error) {}
      logger.log('The environment of Serverless Devs has been cleaned up successfully.', 'green');
      return;
    }
    if (args.cache) {
      // cache 无参数
      if (typeof args.cache === 'boolean') {
        rimraf.sync(path.join(cachePath));
        logger.log('Cache has been cleaned up successfully.', 'green');
      }
      // cache 有参数
      if (typeof args.cache === 'string') {
        rimraf.sync(path.join(cachePath, args.cache));
        logger.log(`Cache [${args.cache}] has been cleaned up successfully.`, 'green');
      }
      return;
    }
    if (args.component) {
      // component 无参数
      if (typeof args.component === 'boolean') {
        rimraf.sync(componentsPath);
        logger.log('Component has been cleaned up successfully.', 'green');
      }
      // component 有参数
      if (typeof args.component === 'string') {
        const registry = getConfig('registry');
        // s 源
        if (registry === 'http://registry.devsapp.cn/simple') {
          const filePath = path.join(devsappPath, args.component);
          if (fs.existsSync(filePath)) {
            rimraf.sync(filePath);
            logger.log(`Component [${args.component}] has been cleaned up successfully.`, 'green');
          }
        }
        // git 源
        if (registry === 'https://api.github.com/repos') {
          const filePath = path.join(githubPath, args.component);
          if (fs.existsSync(filePath)) {
            rimraf.sync(filePath);
            logger.log(`Component [${args.component}] has been cleaned up successfully.`, 'green');
          }
        }
      }
      return;
    }
    command.help();
  };
}

export = run;
