import program from '@serverless-devs/commander';
import { emoji, getProcessArgv, logger, getCredentialWithAll } from '../../utils';
import core from '../../utils/core';
import { get, keys, toString } from 'lodash';
const { colors } = core;

const description = `You can get accounts.
 
  Example:
    $ s config get
    $ s config get -a demo
    
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md',
)}`;

function secret(data) {
  if (data) {
    const res = {};
    for (const key in data) {
      const temp = data[key];
      res[key] = {};
      for (const index in temp) {
        const val = toString(temp[index]);
        const len = val.length;
        res[key][index] = len > 6 ? val.slice(0, 3) + '*'.repeat(len - 6) + val.slice(len - 3) : val;
      }
    }
    return res;
  }
}

function notFound() {
  const msg = `
  ${emoji('🤔')} You have not yet been found to have configured key information.
  ${emoji('🧭')} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  ${emoji('😈')} If you have questions, please tell us: ${colors.underline(
    'https://github.com/Serverless-Devs/Serverless-Devs/issues',
  )}`;
  logger.log(msg);
}

(async () => {
  const { access, help } = getProcessArgv();
  program
    .name('s config get')
    .usage('[options]')
    .option('-a, --access <aliasName>', 'Specify the access alias name.')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .addHelpCommand(false)
    .parse(process.argv);

  if (help) {
    program.help();
  }
  const accessInfo = secret(await getCredentialWithAll());
  // s config get
  if (process.argv.length === 2) {
    accessInfo ? logger.output(accessInfo) : notFound();
  }

  // s config get -a default
  if (access) {
    const accessData = get(accessInfo, access);
    if (accessData) {
      logger.output({ [access]: accessData });
    } else {
      logger.error(`\n\n  ${emoji('❌')} Message: Unable to get key information with alias ${access}.
  ${emoji('🤔')} You have configured these keys: [${keys(accessInfo)}].
  ${emoji('🧭')} You can use [s config add] for key configuration, or use [s config add -h] to view configuration help.
  ${emoji('😈')} If you have questions, please tell us: ${colors.underline(
        'https://github.com/Serverless-Devs/Serverless-Devs/issues',
      )}
`);
      process.exit(1);
    }
  }
})();
