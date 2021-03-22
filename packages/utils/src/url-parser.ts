/** @format */

import URL from 'url';

import { GitRepoTemplate } from '@serverless-devs/entity';

export function parse(url: string): URL.Url {
  return URL.parse(url);
}

export function getProjectNameFromUrl(url: string) {
  const slash = url.lastIndexOf('/');
  if (slash && slash >= 0) {
    url = url.substr(slash + 1);
  }

  if (url.endsWith('.git')) {
    return url.substr(0, url.length - 4);
  }
  return url;
}

export function isUrlFormat(url: string) {
  return url.includes(':') || url.includes('/');
}

export function extractTemplateInfo(url: URL.Url): GitRepoTemplate {
  let pathname = url.pathname || '';
  const pathArr = pathname.split('/');
  const ownerName = pathArr[1];
  const repoName = pathArr[3];
  return {
    host: url.host,
    ownerName,
    repoName,
    branch:'',
    hasSubPath: false,
    subPath: '',
    zipFile:'',
  };
}


export default {
  extractTemplateInfo,
  getProjectNameFromUrl,
  isUrlFormat,
  parse
}