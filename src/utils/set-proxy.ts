import { getGlobalConfig } from '@serverless-devs/utils';
const globalAgent = require('global-agent');

const setProxy = () => {
  const proxy_enable = getGlobalConfig('proxy_enable');
  if (!proxy_enable) return;

  globalAgent.bootstrap();

  const http_proxy = getGlobalConfig('http_proxy');
  const https_proxy = getGlobalConfig('https_proxy');
  if (http_proxy) {
    (global as any).GLOBAL_AGENT.HTTP_PROXY = http_proxy;
  }
  if (https_proxy) {
    (global as any).GLOBAL_AGENT.HTTPS_PROXY = https_proxy;
  }
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
};

export default setProxy;
