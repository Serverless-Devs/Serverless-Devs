import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import logger from './logger';
import { getYamlContent, getRootHome } from '@serverless-devs/utils';

function execDaemon(filename: string, config: Record<string, any> = {}) {
  // 测试环境不上报
  if (process.env.NODE_ENV === 'test') return;
  // set analysis+
  const data = getYamlContent(path.join(getRootHome(), 'set-config.yml'));
  if (data?.analysis === 'disable' && filename === 'report.js') return;
  const filePath = path.join(__dirname, 'daemon', filename);
  if (!fs.existsSync(filePath)) return;
  if (process.env['serverless_devs_daemon_enable'] === 'false') {
    logger.info(`It is detected that the environment variable 'serverless_devs_daemon_enable' is false and the daemon: ${filePath} will run in the main process`);
    return spawn(process.execPath, [filePath, JSON.stringify(config)], {
      stdio: 'inherit',
    });
  }

  return spawn(process.execPath, [filePath, JSON.stringify(config)], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

export default execDaemon;
