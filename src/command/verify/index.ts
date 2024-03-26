import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, getSchema, writeOutput, showOutput } from '@/utils';
import ParseSpec, { ISpec } from '@serverless-devs/parse-spec';
import logger from '@/logger';
import { get, isEmpty } from 'lodash';
import Ajv from 'ajv';
import { parseArgv } from '@serverless-devs/utils';

const description = `Verify Yaml format and values.

${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/verify')}`;

export default (program: Command) => {
  program
    .command('verify')
    .usage('[options]')
    .description(description)
    .summary(`Verify Yaml content`)
    .addHelpCommand(false)
    .option('--env <envName>', 'Specify the env name')
    .helpOption('-h, --help', 'Display help for command')
    .action(async options => {
      const { template } = program.optsWithGlobals();
      const argvs = parseArgv(process.argv.slice(2));
      const ajv = new Ajv({ allErrors: true });
      // 若有env或者默认env，运行环境组件的env deploy
      // await runEnv(env);
      const spec = await new ParseSpec(template, { logger }).start();
      if (get(spec, 'yaml.use3x')) {
        const errorsList = await getErrorList(spec, ajv);

        let data;
        if (!isEmpty(errorsList)) {
          if (argvs['output'] || argvs['output-format']) {
            data = errorsList;
          } else {
            throw new Error(ajv.errorsText(errorsList, { dataVar: '', separator: '\n\n' }));
          }
        } else {
          data = chalk.green(`Format verification for [${get(spec, 'yaml.path', '').split('/').pop()}] passed.`);
        }

        logger.debug(`Template: ${get(spec, 'yaml.path')}`);
        return argvs['output-file'] ? writeOutput(data) : showOutput(data);
      }
      logger.tips(`Not support template: ${get(spec, 'yaml.path')}, you can update template to 3.x version`);
    });
};

const getErrorList = async (spec: ISpec, ajv: Ajv) => {
  let errorsList = [];
  for (const i of spec.steps) {
    const schema = await getSchema(i.component);
    if (isEmpty(schema)) {
      continue;
    }
    const validate = ajv.compile(JSON.parse(schema));
    if (!validate(i.props)) {
      const errors = validate.errors;
      for (const j of errors) {
        j.instancePath = i.projectName + '/props' + j.instancePath;
        if (j.keyword === 'enum') {
          j.message = j.message + ': ' + j.params.allowedValues.join(', ');
        }
      }
      errorsList = errorsList.concat(errors);
    }
  }
  return errorsList;
};
