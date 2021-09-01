/** @format */

import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs-extra';

interface IConfig {
  [key: string]: any;
}

export function execDaemon(filename: string, config?: IConfig) {
  const filePath = path.join(__dirname, 'daemon', filename);
  if (!fs.existsSync(filePath)) return;
  const subprocess = spawn(process.execPath, [filePath], {
    detached: true,
    stdio: 'inherit',
    env: { ...process.env, ...config },
  });
  subprocess.unref();
}
