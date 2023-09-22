import path from 'path';
import execDaemon from '@/exec-daemon';
import latestVersion from 'latest-version';
import boxen from 'boxen';
import { UPDATE_CHECK_INTERVAL } from '@/constant';
import { getRootHome } from '@serverless-devs/utils';
import fs from 'fs-extra';
import chalk from 'chalk';
import semver from 'semver';
import semverDiff from 'semver-diff';
const pkg = require('../../package.json');

const configPath = path.join(getRootHome(), 'config');
const updateNotifierPath = path.join(configPath, 'update-notifier.json');

function format(val) {
  return JSON.stringify(val, null, 2);
}

class UpdateNotifier {
  constructor() {
    if (!fs.existsSync(updateNotifierPath)) {
      fs.ensureDirSync(configPath);
      fs.writeFileSync(updateNotifierPath, format({}));
    }
  }
  config(key?: string) {
    return key ? require(updateNotifierPath)[key] : require(updateNotifierPath);
  }
  check() {
    if (!this.config('lastUpdateCheck')) return true;
    return Date.now() - this.config('lastUpdateCheck') > UPDATE_CHECK_INTERVAL;
  }
  init() {
    if (this.check()) {
      execDaemon('update-cli.js');
    }
    return this;
  }
  async update() {
    const latest = await latestVersion(pkg.name);
    const type = semverDiff(pkg.version, latest);
    const data = {
      output: semver.gt(latest, pkg.version),
      current: pkg.version,
      latest,
      type,
      lastUpdateCheck: Date.now(),
    };
    fs.writeFileSync(updateNotifierPath, format(data));
  }
  notify() {
    if (!this.config('output')) return;
    if (pkg.version === this.config('latest')) return;
    const defaultTemplate = `Update available ${chalk.dim(pkg.version)} ${chalk.reset('→')} ${chalk.green(this.config('latest'))} \nRun ${chalk.cyan(
      `npm i -g ${pkg.name}`,
    )} to update`;

    const message = boxen(defaultTemplate, {
      padding: 1,
      margin: 1,
      align: 'center',
      borderColor: 'yellow',
      borderStyle: 'round',
    });
    process.on('exit', () => {
      console.log(message);
      fs.writeFileSync(updateNotifierPath, format({ ...this.config(), output: false }));
    });
  }
}

export default UpdateNotifier;
