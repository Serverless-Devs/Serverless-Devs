/** @format */
import { getVersion } from '../utils/common';
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
export const HandleError = async (configs: IConfigs) =>  { 
    const { error, prefix = 'Message:' } = configs;
    const { traceId, catchableError } = await getErrorMessage(error, prefix);
    if(!catchableError) {
      if (traceId) {
        console.log(colors.gray(`TraceId:     ${traceId}`));
      }
      console.log(colors.gray(`Environment: ${getVersion()}`));
      console.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
      console.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
      console.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues\n'));

      if (traceId) {
        console.log(
          colors.gray(`Please copy traceId: ${traceId} and join Dingding group: 33947367 for consultation.`),
        );
      }
    }
    console.log(colors.gray("You can run 's clean --all' to clean Serverless devs."));

    if(traceId && catchableError) {
      await report({
        type: 'jsError',
        content: `${error.message}||${error.stack}`,
        traceId: traceId,
      });
    }
}
