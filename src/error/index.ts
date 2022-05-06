/** @format */
import { getVersion, getConfig, logger, aiRequest, red, bgRed } from '../utils';
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
    configOption.traceId = process.env['serverless_devs_trace_id'];
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
    isDebugMode() ? logger.log(error.stack) : logger.log(colors.grey(messageStr));
    configOption.catchableError = true;
    tmpError = jsonMsg;
  } else if (jsonMsg && jsonMsg.code) {
    logger.log(red(`✖ ${jsonMsg.prefix || defaultPrefix}\n`));
    logger.log(`${bgRed('ERROR:')}\n`);
    isDebugMode() ? logger.log(`${jsonMsg.stack}\n`) : logger.log(`${jsonMsg.message}\n`);
    await aiRequest(jsonMsg.message);
    tmpError = jsonMsg;
  } else {
    logger.log(red(`✖ ${defaultPrefix}\n`));
    logger.log(`${bgRed('ERROR:')}\n`);
    logger.log(isDebugMode() || isDocker() ? error.stack : `${message}\n`);
    await aiRequest(message);
  }

  if (!configOption.catchableError) {
    if (configOption.traceId) {
      logger.log(colors.gray(`TraceId:     ${configOption.traceId}`));
    }
    if (!isDocker()) {
      logger.log(colors.gray(`Environment: ${getVersion()}`));
      logger.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
      logger.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
      logger.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues'));
      logger.log(underline('Regsitry:    ', 'https://registry.serverless-devs.com\n'));

      if (configOption.traceId) {
        logger.log(
          colors.gray(
            `Please copy traceId: ${configOption.traceId} and join Dingding group: 33947367 for consultation.`,
          ),
        );
      }
    }
  }
  !isDocker() && logger.log(colors.gray("You can run 's clean --all' to clean Serverless devs."));

  if (configOption.traceId && !configOption.catchableError) {
    await report({
      type: 'jsError',
      content: `${tmpError.message}||${tmpError.stack}`,
      traceId: configOption.traceId,
    });
  }
  process.exit(tmpError.code || 1);
};
