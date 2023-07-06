// 此文件建议放在src根目录不要移动
// 避免 esbuild 或者 ncc 改变 package.json 的寻址路径
import colors from 'chalk';

// cli 的版本
export const CLI_VERSION = (() => {
  try {
    const pkg = require('../package.json');
    return pkg.version;
  } catch (e) {
    return '^3.0.0';
  }
})();

// 一些颜色复用的
export const red = colors.hex('#fd5750');
export const yellow = colors.hex('#F3F99D');
export const bgRed = colors.hex('#000').bgHex('#fd5750');

export const DEFAULT_REGISTRY = 'http://registry.devsapp.cn/simple';
