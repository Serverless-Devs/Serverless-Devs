import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { get } from 'lodash';
const semver = require('semver');
const pkg = require('../../package.json');

const corePath = path.join(os.homedir(), '.s', 'cache', 'core');
const corePackagePath = path.join(corePath, 'package.json');

function getCore() {
  if (fs.existsSync(corePackagePath)) {
    const localCoreVersion = get(pkg, ['dependencies', '@serverless-devs/core']);
    const cacheCoreVersion = getCoreVersion();
    return semver.gt(localCoreVersion.replace(/\^/, ''), cacheCoreVersion)
      ? require('@serverless-devs/core')
      : require(corePath);
  }
  return require('@serverless-devs/core');
}

export function getCoreVersion() {
  return fs.existsSync(corePath) ? require(corePackagePath).version : 'unknown';
}

export default getCore;
