/** @format */

import path from 'path';
import logger from './logger';
import core from './core';
const { fse: fs } = core;
export * from './common';
export * from './handler-set-config';
export { default as logger } from './logger';
export { default as i18n } from './i18n';

export const getYamlPath = (prePath: string, name: string) => {
  const S_PATH1 = path.join(prePath, `${name}.yaml`);
  const S_PATH2 = path.join(prePath, `${name}.yml`);

  const S_PATH = fs.existsSync(S_PATH1) ? S_PATH1 : fs.existsSync(S_PATH2) ? S_PATH2 : undefined;
  return S_PATH;
};

export function registerCommandChecker(program: any) {
  program.on('command:*', (cmds: any) => {
    const commands = program.commands.map((command: any) => command.name());
    if (!commands.includes(cmds[0])) {
      logger.error(`  error: unknown command ${cmds[0]}`);
      program.help();
    }
  });
}
