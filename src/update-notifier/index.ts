import path from 'path';
import { execDaemon } from '../execDaemon';
import latestVersion from 'latest-version';
import boxen from 'boxen';
import { UPDATE_CHECK_INTERVAL } from '../constant';
import core from '../utils/core';
const { fse: fs, chalk, execa, getRootHome } = core;
const pkg = require('../../package.json');
const semver = require('semver');
const semverDiff = require('semver-diff');

const configPath = path.join(getRootHome(), 'config');
const updateNotifierPath = path.join(configPath, 'update-notifier.json');

function format(val) {
  return JSON.stringify(val, null, 2);
}

class UpdateNotifier {
  constructor() {
    if (!fs.existsSync(updateNotifierPath)) {
      fs.ensureFileSync(updateNotifierPath);
      fs.writeFileSync(updateNotifierPath, format({}));
    }
  }
  config(key?: string) {
    return key ? require(updateNotifierPath)[key] : require(updateNotifierPath);
  }
  check() {
    if (core.isCiCdEnv()) return;
    if (core.useLocal()) return;
    if (!this.config('lastUpdateCheck')) return true;
    return Date.now() - this.config('lastUpdateCheck') > UPDATE_CHECK_INTERVAL;
  }
  init() {
    if (this.check()) {
      execDaemon('update.js');
    }
    return this;
  }
  async update() {
    const latest = await latestVersion(pkg.name);
    const type = semverDiff(pkg.version, latest);
    const isInstall = ['major', 'minor'].includes(type);
    const data = {
      output: isInstall ? false : semver.gt(latest, pkg.version),
      current: pkg.version,
      latest,
      type,
      lastUpdateCheck: Date.now(),
    };
    fs.writeFileSync(updateNotifierPath, format(data));
    isInstall && this.install();
  }
  install() {
    try {
      execa.sync(`npm install ${pkg.name} -g`, { shell: true });
    } catch (error) {
      execa.sync(`yarn global add ${pkg.name}`, { shell: true });
    }
  }
  notify() {
    if (!this.config('output')) return;
    if (pkg.version === this.config('latest')) return;
    const defaultTemplate = `Update available ${chalk.dim(pkg.version)} ${chalk.reset('→')} ${chalk.green(
      this.config('latest'),
    )} \nRun ${chalk.cyan(`npm i -g ${pkg.name}`)} to update`;

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

export = UpdateNotifier;
