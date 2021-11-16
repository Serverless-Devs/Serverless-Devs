/** @format */
import { red, bgRed, getVersion } from '../utils/common';
import { getConfig } from '../utils/handler-set-config';
import core from '../utils/core';
const { colors, report, getMAC } = core;
export { CommandError } from './command-error';
export { ConfigDeleteError } from './config-delete-error';
export { ConfigError } from './config-error';
export { ConfigGetError } from './config-get-error';
export { InitError } from './init-error';
export { ServerlessError } from './serverless-error';
export { HumanError } from './human-error';
export { HumanWarning } from './human-warning';

function getPid() {
  try {
    return getMAC().replace(/:/g, '');
  } catch (error) {
    return 'unknown';
  }
}

function underline(prefix: string, link: string) {
  return `${colors.gray(prefix)}${colors.gray.underline(link)}`;
}
interface IConfigs {
  error: Error;
  prefix?: string;
}
export class HandleError {
  private traceId: string;
  constructor(configs: IConfigs) {
    const { error, prefix = 'Message:' } = configs;
    this.traceId = `${getPid()}${Date.now()}`;
    console.log(red(`✖ ${prefix}\n`));
    const analysis = getConfig('analysis');
    if (analysis !== 'disable') {
      console.log(colors.gray(`TraceId:     ${this.traceId}`));
    }
    console.log(colors.gray(`Environment: ${getVersion()}`));
    console.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
    console.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
    console.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues\n'));
    console.log(`${bgRed('ERROR:')}\n${error}\n`);
    if (analysis !== 'disable') {
      console.log(
        colors.gray(`Please copy traceId: ${this.traceId} and join Dingding group: 33947367 for consultation.`),
      );
    }
    console.log(colors.gray("You can run 's clean --cache' to prune Serverless devs."));
    console.log(colors.gray("And run again with the '--debug' option or 's -h' to get more logs.\n"));
  }
  async report(error: Error) {
    report({
      type: 'jsError',
      content: `${error.message}||${error.stack}`,
      traceId: this.traceId,
    });
  }
}
