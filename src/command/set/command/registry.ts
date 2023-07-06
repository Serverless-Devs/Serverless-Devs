import { Command } from 'commander';
import { setGlobalConfig } from '@serverless-devs/utils';
import inquirer from 'inquirer';
import { underline } from 'chalk';
import { emoji } from '../../../utils';

const description = `Set registry information.

Example:
   $ s set registry
   $ s set registry http://registry.devsapp.cn/simple
   
${emoji('📖')} Document: ${underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md',
)}`;

const CUSTOMER_KEY = 'custom';
const registryInquire = [
  {
    type: 'list',
    name: 'registry',
    message: 'Choose a registry?',
    choices: [
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
    ],
  },
];

export default (program: Command) => {
  program
    .command('registry')
    .usage('[options]')
    .description(description)
    .summary(`${emoji('👀')} Set registry information`)
    .helpOption('-h, --help', 'Display help for command')
    .action(async () => {
      let registry: string = process.argv[4];

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
    });
};
