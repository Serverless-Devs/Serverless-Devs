import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, runEnv } from '@/utils';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '@/logger';
import { get } from 'lodash';

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
      // 若有env或者默认env，运行环境组件的env deploy
      runEnv(env);
      const spec = await new ParseSpec(template, { logger }).start();
      if (get(spec, 'yaml.use3x')) {
        logger.debug(`Template: ${get(spec, 'yaml.path')}`);
        return logger.write(chalk.green(`Verify [${get(spec, 'yaml.path', '').split('/').pop()}] success!`));
      }
      logger.tips(`Not support template: ${get(spec, 'yaml.path')}, you can update template to 3.x version`);
    });
};
