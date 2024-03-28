import fs from 'fs';
import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '@/utils';
import { getRootHome } from '@serverless-devs/utils';
import path from 'path';
import logger from '@/logger';

const rimraf = require('rimraf');

const description = `Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
  
  Example:
    $ s clean --component fc api
    $ s clean --all

  Tips:
    Get all installed component: s component
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/clean')}`;

function cleanLogs() {
  const sPath = getRootHome();
  const p = path.join(sPath, 'logs');
  rimraf.sync(p);
  logger.info('Logs cleaned up successfully.');
}

function cleanCache(cache: string | boolean) {
  const sPath = getRootHome();
  const cachePath = path.join(sPath, 'cache');

  // cache 无参数
  if (cache === true) {
    rimraf.sync(cachePath);
    logger.info('Cache cleaned up successfully.');
    return;
  }
  // cache 有参数
  rimraf.sync(path.join(cachePath, cache as string));
  logger.info(`Cache [${cache}] has been cleaned up successfully.`);
}

function cleanComponent(component: string | boolean) {
  const sPath = getRootHome();
  const componentsPath = path.join(sPath, 'components');
  if (component === true) {
    rimraf.sync(componentsPath);
    logger.info('Component cleaned up successfully.');
    return;
  }

  const p = path.join(componentsPath, 'devsapp.cn', component as string);
  if (!fs.existsSync(p)) {
    return logger.tips(`Component [${component}] does not exist.`, 'Please check whether the component has been downloaded.');
  }
  rimraf.sync(p);
  logger.info(`Component [${component}] has been cleaned up successfully.`);
}

export default (program: Command) => {
  program
    .command('clean')
    .usage('[options]')
    .description(description)
    .summary(`Clean up the environment`)
    .option('--all', 'Clean up the environment')
    .option('--logs', 'Clean logs')
    .option('--cache [dirName]', 'Delete the <dirName> file in the cache')
    .option('--component [componentName]', 'Remove component (like: fc, fc@0.0.1)')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      try {
        doAction(options);
      } catch (error) {
        // EPERM: operation not permitted, unlink 'C:\Users\Administrator\.s\logs\0926105449\s_cli.log'
        // windows 可能会出现这个问题，但是文件是删除了的，所以这里忽略
      }
    });

  const doAction = options => {
    const { all, cache, component, logs } = options;
    if (all) {
      cleanComponent(true);
      cleanCache(true);
      cleanLogs();
      logger.info('The environment of Serverless Devs has been cleaned up successfully.');
      return;
    }

    if (logs) {
      cleanLogs();
      return;
    }

    if (component) {
      cleanComponent(component);
      return;
    }

    if (cache) {
      cleanCache(cache);
      return;
    }
    logger.error("There are no specified parameters. If you need to clear all caches, please specify 's clean --all'. For more information, please use 's clean --help' to view");
  };
};
