import { HumanError } from '../error';
import chalk from 'chalk';

function checkNodeVersion() {
  const nodeVersion = Number(process.version.split('.')[0].slice(1));
  if (nodeVersion < 12) {
    new HumanError(
      'Node.js version must be greater than or equal to 12.0.0',
      `Your current Node.js version is ${process.version}, please upgrade your Node.js version at ${chalk.underline('https://nodejs.org/en')}.`,
    );
    process.exit(1);
  }
}

export default checkNodeVersion;
