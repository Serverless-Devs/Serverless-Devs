/** @format */

import core from './core';

const { Logger } = core;

const logger = new Logger('S-CLI');

logger.success = (message: string) => logger.log(message, 'green');

export default logger;
