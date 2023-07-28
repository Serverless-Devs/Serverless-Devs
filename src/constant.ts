import colors from 'chalk';

// 一些颜色复用的
export const red = colors.hex('#fd5750');
export const yellow = colors.hex('#F3F99D');
export const bgRed = colors.hex('#000').bgHex('#fd5750');

export const DEFAULT_REGISTRY = 'http://registry.devsapp.cn/simple';
// 12 小时检查一次更新
export const UPDATE_CHECK_INTERVAL = 1000 * 60 * 60 * 12;
