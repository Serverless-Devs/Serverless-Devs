import { Command } from 'commander';
import chalk from 'chalk';
import { emoji } from '../../utils';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '../../logger';
import { get, omit } from 'lodash';
// TODO:文档链接
const description = `Application priview.
  
  Example:
    $ s priview
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/s/priview')}`;

export default (program: Command) => {
  program
    .command('preview')
    .description(description)
    .summary(`${emoji('👀')} Preview Yaml render results`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { template } = program.optsWithGlobals();
      const spec = await new ParseSpec(template, { logger }).start();
      if (get(spec, 'yaml.use3x')) {
        logger.debug(`Template: ${get(spec, 'yaml.path')}`);
        const content = get(spec, 'yaml.content');
        return logger.output(omit(content, ['extend']));
      }
      logger.tips(`Not support template: ${get(spec, 'yaml.path')}, you can update template to 3.x version`);
    });
};
