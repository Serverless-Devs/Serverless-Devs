import core from '../utils/core';
import { bgRed } from '../utils/common';

const { colors, report } = core;
export class HumanError extends Error {
  constructor(errorMessage: string, tips: string, error: Error) {
    super();
    console.log(`\n${bgRed('ERROR:')}`);
    console.log(`${errorMessage} ${colors.gray(tips)}\n`);
    report({
      type: 'jsError',
      content: `${errorMessage}, ${error.stack}`,
    }).then(() => process.exit(1));
  }
}
