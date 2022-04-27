/** @format */
import { getVersion, getConfig, getPid, logger, aiRequest, red, bgRed } from '../utils';
import core from '../utils/core';
const { colors, report, isDebugMode, makeUnderLine, isDocker } = core;
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

interface ITmpError extends Error {
  code?: number;
}

export const HandleError = async (error: Error) => {
  const defaultPrefix = 'Message:';
  const configOption = { traceId: '', catchableError: false };
  let tmpError: ITmpError = error;

  const analysis = getConfig('analysis');
  if (analysis !== 'disable') {
    configOption.traceId = `${getPid()}${Date.now()}`;
  }

  const message = error.message ? error.message : '';
  let jsonMsg;
  try {
    jsonMsg = JSON.parse(message);
  } catch (error) {}

  if (jsonMsg && jsonMsg.tips) {
    const messageStr = jsonMsg.message ? `Message: ${jsonMsg.message}\n` : '';
    const tipsStr = jsonMsg.tips ? `* ${makeUnderLine(jsonMsg.tips.replace(/\n/, '\n* '))}` : '';
    logger.log(`\n${colors.hex('#000').bgYellow('WARNING:')}\n======================\n${tipsStr}\n`, 'yellow');
    isDebugMode() ? console.log(error.stack) : console.log(colors.grey(messageStr));
    configOption.catchableError = true;
    tmpError = jsonMsg;
  } else if (jsonMsg && jsonMsg.code) {
    console.log(red(`✖ ${jsonMsg.prefix || defaultPrefix}\n`));
    console.log(`${bgRed('ERROR:')}\n`);
    isDebugMode() ? console.log(`${jsonMsg.stack}\n`) : console.log(`${jsonMsg.message}\n`);
    await aiRequest(jsonMsg.message);
    tmpError = jsonMsg;
  } else {
    console.log(red(`✖ ${defaultPrefix}\n`));
    console.log(`${bgRed('ERROR:')}\n`);
    console.log(isDebugMode() || isDocker() ? error.stack : `${message}\n`);
    await aiRequest(message);
  }

  if (!configOption.catchableError) {
    if (configOption.traceId) {
      console.log(colors.gray(`TraceId:     ${configOption.traceId}`));
    }
    if (!isDocker()) {
      console.log(colors.gray(`Environment: ${getVersion()}`));
      console.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
      console.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
      console.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues'));
      console.log(underline('Regsitry:    ', 'https://registry.serverless-devs.com\n'));

      if (configOption.traceId) {
        console.log(
          colors.gray(
            `Please copy traceId: ${configOption.traceId} and join Dingding group: 33947367 for consultation.`,
          ),
        );
      }
    }
  }
  !isDocker() && console.log(colors.gray("You can run 's clean --all' to clean Serverless devs."));

  if (configOption.traceId && !configOption.catchableError) {
    await report({
      type: 'jsError',
      content: `${tmpError.message}||${tmpError.stack}`,
      traceId: configOption.traceId,
    });
  }
  process.exit(tmpError.code || 1);
};
