import { Command } from 'commander';
import { getGlobalConfig, parseArgv, setGlobalConfig, clearGlobalConfig } from '@serverless-devs/utils';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { emoji } from '@/utils';
import logger from '@/logger';
import { DEFAULT_REGISTRY } from '@/constant';

const description = `Set registry information.

Example:
   $ s set registry
   $ s set registry https://api.devsapp.cn/v3
   $ s set registry clean # clean registry, fallback to default registry.
   
${emoji('📖')} Document: ${chalk.underline('https://docs.serverless-devs.com/user-guide/builtin/set/')}`;

const CUSTOMER_KEY = 'custom';
const registryInquire = [
  {
    type: 'list',
    name: 'registry',
    message: 'Choose a registry?',
    choices: [
      {
        key: DEFAULT_REGISTRY,
        name: `serverless v3 registry [${DEFAULT_REGISTRY}]`,
        value: DEFAULT_REGISTRY,
      },
      {
        key: 'http://registry.devsapp.cn/simple',
        name: `serverless v2 registry [http://registry.devsapp.cn/simple]`,
        value: 'http://registry.devsapp.cn/simple',
      },
      {
        key: 'https://api.github.com/repos',
        name: 'github registry [https://api.github.com/repos]',
        value: 'https://api.github.com/repos',
      },
      {
        key: CUSTOMER_KEY,
        name: 'custom registry',
        value: CUSTOMER_KEY,
      },
    ],
  },
];

export default (program: Command) => {
  program
    .command('registry')
    .usage('[options]')
    .description(description)
    .summary(`Set registry information`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      const { _: raw } = parseArgv(process.argv.slice(2));
      let registry: string = raw[2];
      if (registry === 'clean') {
        clearGlobalConfig('registry');
        logger.write(chalk.green(`Clean registry successfully.`));
        return;
      }
      logger.write(`\nCurrent registry: ${getGlobalConfig('registry', DEFAULT_REGISTRY)}\n`);
      if (!registry) {
        let answers = await inquirer.prompt(registryInquire);
        if (answers === CUSTOMER_KEY) {
          answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'registry',
              message: 'Please input your customer registry?',
            },
          ]);
        }
        registry = answers.registry;
      }

      setGlobalConfig('registry', registry);
      logger.write(chalk.green(`Set registry to ${registry} successfully.`));
    });
};
