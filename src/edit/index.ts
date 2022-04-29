import program from '@serverless-devs/commander';
import core from '../utils/core';
import { emoji, getProcessArgv, i18n } from '../utils';
import { HandleError } from '../error';
import execa from 'execa';

const { colors } = core;

const description = `Get details of installed components.
    
    Example:
        $ s component
        $ s component --component fc-api

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/component.md',
)}`;
const command = program
  .name('s component')
  .usage('[options]')
  .option('--component [componentName]', 'Gets the specified component information (like: fc, fc@0.0.1)')
  .helpOption('-h, --help', i18n('display_help_for_command'))
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);

(async () => {
  const { help, template } = getProcessArgv();
  if (help) {
    command.help();
  }
  const spath = await core.getTemplatePath(template);
  const port = await core.getAvailablePort(7000);
  execa(process.execPath, [`${require('@xsahxl/devs-ui')}`, '--template', spath, '--port', port], {
    stdio: 'inherit',
    shell: true,
  });
})().catch(async error => {
  await HandleError(error);
});
