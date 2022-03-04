/** @format */

import logger from './logger';
export * from './common';
export * from './handler-set-config';
export { default as logger } from './logger';
export { default as i18n } from './i18n';

export function registerCommandChecker(program: any) {
  program.on('command:*', (cmds: any) => {
    const commands = program.commands.map((command: any) => command.name());
    if (!commands.includes(cmds[0])) {
      logger.error(`  error: unknown command ${cmds[0]}`);
      program.help();
    }
  });
}
