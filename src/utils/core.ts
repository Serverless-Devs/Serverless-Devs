import path from 'path';
import fs from 'fs';
import * as core from '@serverless-devs/core';

const semver = require('semver');

const corePath = path.join(core.getRootHome(), 'cache', 'core');
const corePackagePath = path.join(corePath, 'package.json');

function getCore() {
  if (fs.existsSync(corePackagePath)) {
    const localCoreVersion = require('@serverless-devs/core/package.json').version;
    const cacheCoreVersion = getCoreVersion();
    return semver.gt(cacheCoreVersion, localCoreVersion) ? require(corePath) : core;
  }
  return core;
}

export function getCoreVersion() {
  return fs.existsSync(corePackagePath) ? require(corePackagePath).version : undefined;
}

export default getCore();
