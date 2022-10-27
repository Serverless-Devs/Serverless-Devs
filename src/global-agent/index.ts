const globalAgent = require('global-agent');
import { getConfig } from '../utils/handler-set-config';

export const setProxy = () => {
  const proxy_enable = getConfig('proxy_enable');
  if (!proxy_enable) return;

  globalAgent.bootstrap();

  const http_proxy = getConfig('http_proxy');
  const https_proxy = getConfig('https_proxy');
  if (http_proxy) {
    (global as any).GLOBAL_AGENT.HTTP_PROXY = http_proxy;
  }
  if (https_proxy) {
    (global as any).GLOBAL_AGENT.HTTPS_PROXY = https_proxy;
  }
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
};
