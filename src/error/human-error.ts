import { bgRed } from '@/constant';
import colors from 'chalk';
import logger from '@/logger';

class HumanError extends Error {
  constructor(message: string, tips?: string) {
    super(message);
    logger.write(`\n${bgRed('ERROR:')}`);
    logger.write(`\n${message}\n`);
    tips && logger.write(`${colors.gray(tips)}\n`);
  }
}

export default HumanError;
