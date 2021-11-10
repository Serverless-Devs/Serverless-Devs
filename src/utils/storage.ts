/** @format */

import path from 'path';
import core from './core';
const { fse: fs, getRootHome } = core;

export function getHomeDir(): string {
  const home = getRootHome();
  if (!fs.existsSync(home)) {
    fs.mkdirSync(home);
  }
  return home;
}

export function getHistoryFile(): string {
  const file = path.join(getHomeDir(), 'history');
  if (!fs.existsSync(file)) {
    fs.createFileSync(file);
  }
  return file;
}

export default {
  getHomeDir,
  getHistoryFile,
};
