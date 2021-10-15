/** @format */

import path from 'path';
import { spawn } from 'child_process';
import core from './utils/core';
const { fse: fs } = core;
interface IConfig {
  [key: string]: any;
}

export function execDaemon(filename: string, config?: IConfig) {
  const filePath = path.join(__dirname, 'daemon', filename);
  if (!fs.existsSync(filePath)) return;
  const subprocess = spawn(process.execPath, [filePath], {
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, ...config },
  });
  subprocess.unref();
}
