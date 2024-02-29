import colors from 'chalk';

// 一些颜色复用的
export const red = colors.hex('#fd5750');
export const yellow = colors.hex('#F3F99D');
export const bgRed = colors.hex('#000').bgHex('#fd5750');

export const DEFAULT_REGISTRY = 'https://api.devsapp.cn/v3';
// 工具 12小时检查一次更新
export const UPDATE_CHECK_INTERVAL = 1000 * 60 * 60 * 12;

// 组件 10分钟检查一次更新
export const UPDATE_COMPONENT_CHECK_INTERVAL = 1000 * 60 * 10;

export const REPORT_BASE_URL = 'http://serverless-devs3-metrics.cn-hangzhou.log.aliyuncs.com/logstores/serverless-devs/track';

// 环境变量key
export const CICD_ENV_KEY = 'CICD_ENV';
