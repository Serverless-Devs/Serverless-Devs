/** @format */
import getCore from '../utils/s-core';
const { colors, spinner, report } = getCore();
export { CommandError } from './command-error';
export { ConfigDeleteError } from './config-delete-error';
export { ConfigError } from './config-error';
export { ConfigGetError } from './config-get-error';
export { InitError } from './init-error';
export { ServerlessError } from './serverless-error';

function underline(prefix: string, link: string) {
  return `${colors.gray(prefix)}${colors.gray.underline(link)}`;
}
export function handleError(error: Error, prefix = 'Message:', exit = true) {
  spinner(colors.red(prefix)).fail();
  console.log(colors.gray(`\nEnvironment: ${process.platform}-${process.arch}, node-${process.version}`));
  console.log(underline('Documents:   ', 'https://www.serverless-devs.com'));
  console.log(underline('Discussions: ', 'https://github.com/Serverless-Devs/Serverless-Devs/discussions'));
  console.log(underline('Issues:      ', 'https://github.com/Serverless-Devs/Serverless-Devs/issues\n'));
  console.log(colors.red('Error:'));
  console.log(error);
  console.log(`${colors.gray("\nRun again with the '--debug' option or 's -h' to get more logs.\n")}`);
  report({
    type: 'error',
    content: error,
  });
  exit && process.exit(-1);
}
