import program from '@serverless-devs/commander';
import core from '../utils/core';
import { emoji, getProcessArgv, i18n } from '../utils';
import { HandleError } from '../error';
import open from 'open';

const { colors } = core;

const description = `Application editing.
    
    Example:
        $ s edit

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/edit.md',
)}`;
const command = program
  .name('s edit')
  .usage('[options]')
  .option('-t, --template <templatePath>', 'Specify the template file.')
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
  process.env['template'] = spath;
  const port = await core.getAvailablePort(7000);
  // template 通过环境变量传递，务必环境变量template赋值后在require
  const app = require('@serverless-devs/ui');
  app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
    open(`http://localhost:${port}`);
  });
})().catch(async error => {
  await HandleError(error);
});
