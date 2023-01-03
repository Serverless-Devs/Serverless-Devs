import { Command } from '@serverless-devs/commander';
import { logger } from '../../utils';
import { CommandError } from '../../error';
import core from '../../utils/core';
import { emoji } from '../../utils/common';
const { inquirer } = core;
import { setConfig, getConfig } from '../../utils/handler-set-config';
const { colors } = core;

const CUSTOMER_KEY = 'custom';
const registryList = [
  {
    key: 'http://registry.devsapp.cn/simple',
    name: 'serverless registry [http://registry.devsapp.cn/simple]',
    value: 'http://registry.devsapp.cn/simple',
  },
  {
    key: 'https://api.github.com/repos',
    name: 'github registry [https://api.github.com/repos]',
    value: 'https://api.github.com/repos',
  },
  {
    key: 'http://gitee.registry.devsapp.cn/simple',
    name: 'gitee registry [http://gitee.registry.devsapp.cn/simple] ',
    value: 'http://gitee.registry.devsapp.cn/simple',
  },
  {
    key: CUSTOMER_KEY,
    name: 'custom registry',
    value: CUSTOMER_KEY,
  },
];

const registryInquire = [
  {
    type: 'list',
    name: 'registry',
    message: 'Choose a registry?',
    choices: registryList,
  },
];

const description = `Set registry information.

Example:
   $ s set registry
   $ s set registry http://registry.devsapp.cn/simple
   
${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

function run(program: Command) {
  const command = program
    .command('registry')
    .usage('[options]')
    .helpOption('-h, --help', 'Display help for command')
    .addHelpCommand(false)
    .description(description)
    .action(async () => {
      try {
        await doAction();
      } catch (error) {
        throw new CommandError(error.message);
      }
    });

  const doAction = async () => {
    const argv = process.argv.slice(2);
    const { help } = core.minimist(argv, { alias: { help: 'h' } });
    help && command.help();
    if (argv.length === 2) {
      logger.log(`\n${emoji('🔎')} Current registry: ${getConfig('registry', 'http://registry.devsapp.cn/simple')}\n`);
      let answers = await inquirer.prompt(registryInquire);
      if (answers.registry === CUSTOMER_KEY) {
        answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'registry',
            message: 'Please input your customer registry?',
          },
        ]);
      }
      let registry = answers.registry;
      setConfig('registry', registry);
    }
    if (argv.length > 2) {
      const r = argv[2];
      if (r) {
        setConfig('registry', r);
        logger.success('Setup succeeded');
      }
    }
  };
}

export = run;
