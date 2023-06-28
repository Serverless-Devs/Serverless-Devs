import rimraf from 'rimraf';
import fs from 'fs';
import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../utils';
import { getRootHome } from '@serverless-devs/utils';
import path from 'path';

const description = `Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
  
  Example:
    $ s clean --component fc-api
    $ s clean --all

  Tips:
    Get all installed component: s component
    
${emoji('📖')} Document: ${underline('https://serverless.help/s/clean')}`;

export = (program: Command) => {
  program
    .command('clean')
    .usage('[options]')
    .option('--all', 'Clean up the environment')
    .option('--cache [dirName]', 'Delete the <dirName> file in the cache')
    .option('--component [componentName]', 'Remove component (like: fc, fc@0.0.1)')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async options => {
      const { all, cache, component } = options;
      if (all) {
        cleanComponent(true);
        cleanCache(true);
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
    });
};

function cleanCache(cache: string | boolean) {
  const sPath = getRootHome();
  const cachePath = path.join(sPath, 'cache');

  // cache 无参数
  if (cache === true) {
    rimraf.sync(cachePath);
    return;
  }
  // cache 有参数
  rimraf.sync(path.join(cachePath, cache as string));
}

function cleanComponent(component: string | boolean) {
  const sPath = getRootHome();
  const componentsPath = path.join(sPath, 'components');
  if (component === true) {
    rimraf.sync(componentsPath);
    return;
  }

  const registryPath = [path.join(componentsPath, 'github.com'), path.join(componentsPath, 'devsapp.cn')];

  for (const registry of registryPath) {
    const p = path.join(registry, component as string);
    if (fs.existsSync(p)) {
      rimraf.sync(p);
      console.log(`Component [${component}] has been cleaned up successfully.`);
    }
  }
}
