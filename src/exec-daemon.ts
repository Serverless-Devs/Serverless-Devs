import path from 'path';
import { spawn } from 'child_process';
import fs from "fs-extra";
import logger from './logger';


function execDaemon(filename: string, config: Record<string, any> = {}) {
  const filePath = path.join(__dirname, 'daemon', filename);
  if (!fs.existsSync(filePath)) return;
  if (process.env['serverless_devs_daemon_enable'] === 'false') {
    logger.info(`It is detected that the environment variable 'serverless_devs_daemon_enable' is false and the daemon: ${filePath} will run in the main process`);
    spawn(process.execPath, [filePath, JSON.stringify(config)], {
      stdio: 'inherit',
    })
  }

  return spawn(process.execPath, [filePath, JSON.stringify(config)], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

export default execDaemon;
