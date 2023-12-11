import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, getSchema, runEnv } from '@/utils';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '@/logger';
import { get, isEmpty } from 'lodash';
import Ajv from 'ajv';

const description = `Verify Yaml format and values.

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/verify')}`;

export default (program: Command) => {
  program
    .command('verify')
    .usage('[commands] [options]')
    .description(description)
    .summary(`${emoji('🔭')} Verify Yaml content`)
    .addHelpCommand(false)
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { template, env } = program.optsWithGlobals();
      const ajv = new Ajv({ allErrors: true });
      // 若有env或者默认env，运行环境组件的env deploy
      runEnv(env);
      const spec = await new ParseSpec(template, { logger }).start();
      for (const i of spec.steps) {
        const schema = await getSchema(i.component);
        if (isEmpty(schema)) continue;
        const validate = ajv.compile(JSON.parse(schema));
        if (!validate(i.props)) {
          throw new Error(ajv.errorsText(validate.errors));
        }
      }
      if (get(spec, 'yaml.use3x')) {
        logger.debug(`Template: ${get(spec, 'yaml.path')}`);
        return logger.write(chalk.green(`Verify [${get(spec, 'yaml.path', '').split('/').pop()}] success!`));
      }
      logger.tips(`Not support template: ${get(spec, 'yaml.path')}, you can update template to 3.x version`);
    });
};
