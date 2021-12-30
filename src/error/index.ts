/** @format */
import { red, getVersion } from '../utils/common';
import core from '../utils/core';
import { getErrorMessage } from '../utils/common';

const { colors, report } = core;
export { CommandError } from './command-error';
export { ConfigDeleteError } from './config-delete-error';
export { ConfigError } from './config-error';
export { ConfigGetError } from './config-get-error';
export { InitError } from './init-error';
export { ServerlessError } from './serverless-error';
export { HumanError } from './human-error';
export { HumanWarning } from './human-warning';

function underline(prefix: string, link: string) {
  return `${colors.gray(prefix)}${colors.gray.underline(link)}`;
}
interface IConfigs {
  error: Error;
  prefix?: string;
}
export class HandleError {
  private configOption: any;
  constructor(configs: IConfigs) {
    const { error, prefix = 'Message:' } = configs;
    console.log(red(`✖ ${prefix}\n`));
    const configOption = getErrorMessage(error);
    this.configOption = configOption;
    
    if(!configOption.catchableError) {
      if (configOption.traceId) {
        console.log(colors.gray(`TraceId:     ${configOption.traceId}`));
      }
      console.log(colors.gray(`Environment: ${getVersion()}`));
      console.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
      console.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
      console.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues\n'));

      if (configOption.traceId) {
        console.log(
          colors.gray(`Please copy traceId: ${configOption.traceId} and join Dingding group: 33947367 for consultation.`),
        );
      }
    }
    console.log(colors.gray("You can run 's clean --all' to clean Serverless devs."));
  }
  async report(error: Error) {
    const { traceId, catchableError } = this.configOption;
    if(traceId && catchableError) {
      await report({
        type: 'jsError',
        content: `${error.message}||${error.stack}`,
        traceId: traceId,
      });
    }
  }
}
