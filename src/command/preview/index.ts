import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, showOutput, writeOutput, runEnvComponent } from '@/utils';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '@/logger';
import { get, omit, find } from 'lodash';
import { parseArgv } from '@serverless-devs/utils';
import { ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import assert from 'assert';
import * as utils from '@serverless-devs/utils';
import path from 'path';
// TODO:文档链接
const description = `Application preview.
  
  Example:
    $ s preview
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/preview')}`;

export default (program: Command) => {
  program
    .command('preview')
    .description(description)
    .summary(`${emoji('👀')} Preview Yaml render results`)
    // TODO: @封崇
    .option('--env <envName>', 'Specify the environment name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { template, env } = program.optsWithGlobals();
      if (env && env !== true) {
        const template = path.join(process.cwd(), ENVIRONMENT_FILE_NAME);
        const { environments } = utils.getYamlContent(template);
        const data = find(environments, item => item.name === env);
        assert(data, `The environment ${env} was not found`);
        const { access, ...rest } = data

        const inputs = {
          props: {
            ...rest,
          },
          command: 'env',
          args: ['deploy'],
        };

        await runEnvComponent(inputs, access);
      }
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
