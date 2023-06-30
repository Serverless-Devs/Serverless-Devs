import fs from 'fs';
import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../utils';
import { getRootHome } from '@serverless-devs/utils';
import path from 'path';
import logger from '../../logger';

const rimraf = require('rimraf');

const description = `Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
  
  Example:
    $ s clean --component fc-api
    $ s clean --all

  Tips:
    Get all installed component: s component
    
${emoji('📖')} Document: ${underline('https://serverless.help/s/clean')}`;

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

  const registryPath = [path.join(componentsPath, 'github.com'), path.join(componentsPath, 'devsapp.cn')];

  for (const registry of registryPath) {
    const p = path.join(registry, component as string);
    if (fs.existsSync(p)) {
      rimraf.sync(p);
    }
  }
  logger.info(`Component [${component}] has been cleaned up successfully.`);
}

export default (program: Command) => {
  program
    .command('clean')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('💥')} Clean up the environment.`)
    .option('--all', 'Clean up the environment')
    .option('--logs', 'Clean logs')
    .option('--cache [dirName]', 'Delete the <dirName> file in the cache')
    .option('--component [componentName]', 'Remove component (like: fc, fc@0.0.1)')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
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
      }

      if (component) {
        cleanComponent(component);
        return;
      }

      if (cache) {
        cleanCache(cache);
        return;
      }

      logger.error(
        "There are no specified parameters. If you need to clear all caches, please specify 's clean --all'. For more information, please use 's clean --help' to view",
      );
    });
};
