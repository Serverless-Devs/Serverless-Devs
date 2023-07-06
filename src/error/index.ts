import logger from '../logger';

export { CommandError } from './command-error';
export { ConfigDeleteError } from './config-delete-error';
export { ConfigError } from './config-error';
export { ConfigGetError } from './config-get-error';
export { InitError } from './init-error';
export { ServerlessError } from './serverless-error';
export { HumanError } from './human-error';
export { HumanWarning } from './human-warning';

export const HandleError = async (error: Error) => {
  logger.write('TODO: HandleError\n', error);
  process.exit(1);
};
