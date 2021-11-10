import path from 'path';
import fs from 'fs';
const semver = require('semver');
const core = require('@serverless-devs/core');

const corePath = path.join(core.getRootHome(), 'cache', 'core');
const corePackagePath = path.join(corePath, 'package.json');

function getCore() {
  if (fs.existsSync(corePackagePath)) {
    const localCoreVersion = require('@serverless-devs/core/package.json').version;
    const cacheCoreVersion = getCoreVersion();
    return semver.gt(localCoreVersion, cacheCoreVersion) ? require('@serverless-devs/core') : require(corePath);
  }
  return require('@serverless-devs/core');
}

export function getCoreVersion() {
  return fs.existsSync(corePath) ? require(corePackagePath).version : undefined;
}

export default getCore();
