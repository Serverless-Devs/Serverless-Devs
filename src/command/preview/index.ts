import { Command } from 'commander';
import { underline } from 'chalk';
import { emoji } from '../../utils';
import { parseArgv } from '@serverless-devs/utils';
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
    // .option('-t, --template <path>', 'Specify the template file.')
    .helpOption('-h, --help', 'Display help for command')
    .configureHelp({ showGlobalOptions: true })
    .action(async options => {
      // TODO: 是否显示 global options
      // console.log(options, program.optsWithGlobals())
      const { template } = parseArgv(process.argv.slice(2));
      try {
        const spec = new ParseSpec(template).start();
        logger.debug(`template: ${get(spec, 'yaml.path')}`)
        logger.output(get(spec, 'yaml.content'))
      } catch (error) {
        HandleError(error)
      }
    });
};
