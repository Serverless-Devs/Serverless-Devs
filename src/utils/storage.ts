/** @format */

import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';

export function getHomeDir(): string {
  const home = path.join(os.homedir(), '.s');
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
