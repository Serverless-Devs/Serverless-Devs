import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../utils';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '../../logger';
import { get } from 'lodash';
import { HandleError } from '../../error';
// TODO:文档链接
const description = `Application priview.
  
  Example:
    $ s priview
    
${emoji('📖')} Document: ${underline('https://serverless.help/s/priview')}`;


export default (program: Command) => {
  program
    .command('preview')
    .description(description)
    .summary(`${emoji('👀')} Preview Yaml render results.`)
    .helpOption('-h, --help', 'Display help for command')
    .configureHelp({ showGlobalOptions: true })
    .action(async options => {
      const { template } = program.optsWithGlobals();
      try {
        const spec = new ParseSpec(template).start();
        if (get(spec, 'yaml.use3x')) {
          logger.debug(`template: ${get(spec, 'yaml.path')}`)
          return logger.output(get(spec, 'yaml.content'))
        }
        logger.tips(`not support template: ${get(spec, 'yaml.path')}, you can update template to 3.x version`)
      } catch (error) {
        HandleError(error)
      }
    });
};
