/** @format */
import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import logger from './src/utils/logger';
import yaml from 'js-yaml';

jestBeforeDetection();

function jestBeforeDetection() {
  if (!detectioIsExist('.s/access.yaml')) {
    logger.error(`Failed to execute:\n
  ❌ Message: Please install S component
  😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
    process.exit(-1);
  }
  if (Object.keys(getAccessFile()).length === 0) {
    logger.error(`Failed to execute:\n
    ❌ Message: Please configure your Secret
    😈 If you have questions, please tell us: https://github.com/Serverless-Devs/Serverless-Devs/issues\n`);
    process.exit(-1);
  }
}

function detectioIsExist(road) {
  return fs.existsSync(getPath(road));
}

function getAccessFile() {
  const accessFile = getPath('.s/access.yaml');
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf-8') || '{}');
  return accessFileInfo;
}

function getPath(road) {
  return path.join(os.homedir(), road);
}
