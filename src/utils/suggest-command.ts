import { Command } from 'commander';
import chalk from 'chalk';
import leven from 'leven';
import { get } from 'lodash';
import { HumanError } from '@/error';

const suggestCommand = (program: Command) => {
  program.on('command:*', ([unknownCommand]) => {
    const availableCommands = program.commands.map(cmd => get(cmd, '_name'));
    let suggestion = '';
    availableCommands.forEach(cmd => {
      const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion, unknownCommand);
      if (leven(cmd, unknownCommand) <= 3 && isBestMatch) {
        suggestion = cmd;
      }
    });
    new HumanError(`Unknown command ${chalk.yellow(unknownCommand)}.`, suggestion && `Did you mean ${chalk.yellow(suggestion)}?`);
    if (process.env.NODE_ENV === 'test') return;
    process.exit(1);
  });
};

export default suggestCommand;
