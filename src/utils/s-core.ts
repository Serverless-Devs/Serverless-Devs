import os from 'os';
import path from 'path';
import fs from 'fs-extra';
const semver = require('semver');

const corePath = path.join(os.homedir(), '.s', 'cache', 'core');
const corePackagePath = path.join(corePath, 'package.json');

function getCore() {
  if (fs.existsSync(corePackagePath)) {
    const corePathNodeModules = path.resolve(__dirname, '../node_modules/@serverless-devs/core/package.json');
    const localCoreVersion = require(corePathNodeModules).version;
    const cacheCoreVersion = getCoreVersion();
    return semver.gt(localCoreVersion, cacheCoreVersion) ? require('@serverless-devs/core') : require(corePath);
  }
  return require('@serverless-devs/core');
}

export function getCoreVersion() {
  return fs.existsSync(corePath) ? require(corePackagePath).version : 'unknown';
}

export default getCore;
