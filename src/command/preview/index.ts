import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, showOutput, writeOutput } from '@/utils';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '@/logger';
import { get, omit } from 'lodash';
import { parseArgv } from '@serverless-devs/utils';
// TODO:文档链接
const description = `Application priview.
  
  Example:
    $ s priview
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/priview')}`;

export default (program: Command) => {
  program
    .command('preview')
    .description(description)
    .summary(`${emoji('👀')} Preview Yaml render results`)
    // TODO: @封崇
    .option('--env <envName>', 'Specify the environment name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { template } = program.optsWithGlobals();
      const spec = await new ParseSpec(template, { logger }).start();
      if (get(spec, 'yaml.use3x')) {
        logger.debug(`Template: ${get(spec, 'yaml.path')}`);
        const content = get(spec, 'yaml.content');
        const argvs = parseArgv(process.argv.slice(2));
        const data = omit(content, ['extend']);
        return argvs['output-file'] ? writeOutput(data) : showOutput(data);
      }
      logger.tips(`Not support template: ${get(spec, 'yaml.path')}, you can update template to 3.x version`);
    });
};
