import { HumanError } from '@/error';
import chalk from 'chalk';
import semver from 'semver';
const pkg = require('../../package.json');

function checkNodeVersion() {
  const { version } = semver.minVersion(pkg.engines.node);
  if (semver.gte(process.versions.node, version)) return;
  new HumanError(
    `Node.js version must be greater than or equal to ${version}`,
    `Your current Node.js version is ${process.versions.node}, please upgrade your Node.js version at ${chalk.underline('https://nodejs.org/en')}.`,
  );
  process.exit(1);
}

export default checkNodeVersion;
