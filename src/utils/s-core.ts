/** @format */

import os from 'os';
import path from 'path';
import fs from 'fs-extra';

const corePath = path.join(os.homedir(), '.s', 'cache', 'core');
const corePackagePath = path.join(corePath, 'package.json');

function getCore() {
  if (fs.existsSync(corePackagePath)) {
    return require(corePath);
  }
  return require('@serverless-devs/core');
}

export function getCoreVersion() {
  return fs.existsSync(corePath) ? require(corePackagePath).version : 'unknown';
}

export default getCore;
