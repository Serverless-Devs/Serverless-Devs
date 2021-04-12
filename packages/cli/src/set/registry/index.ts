import program from 'commander';
import * as inquirer from 'inquirer';
import { configSet, i18n, logger } from '../../utils';
import { CommandError } from '../../error';


const { setConfig } = configSet;
const CUSTOMER_KEY = 'custom';
const registryList = [{
    key: 'https://api.github.com/repos',
    name: 'open source registry [Github source]',
    value: 'https://api.github.com/repos'
}, {
    key: 'http://gitee.registry.serverlessfans.cn/simple',
    name: 'open source registry [Gitee source] ',
    value: 'http://gitee.registry.serverlessfans.cn/simple'
}, {
    key: 'http://registry.serverlessfans.cn/simple',
    name: 'serverless devs offical registry [http://registry.serverlessfans.cn/simple]',
    value: 'http://registry.serverlessfans.cn/simple'
}, {
    key: CUSTOMER_KEY,
    name: 'custom registry',
    value: CUSTOMER_KEY
}];

export const registryInquire = [
    {
        type: 'list',
        name: 'registry',
        message: i18n.__('Choose a registry?'),
        choices: registryList
    }];
program
    .name('s set registry')
    .usage('[options] [name]')
    .helpOption('-h, --help', i18n.__('Display help for command'))
    .description(
        `${i18n.__('You can set your registry.')}
    
         ${i18n.__('Example')}:
            $ s set registry <url>`,
    )
    .addHelpCommand(false).parse(process.argv);
(async () => {
    if (program.args.length === 0) {
        let answers = await inquirer.prompt(registryInquire)
        if (answers.registry === CUSTOMER_KEY) {
            answers = await inquirer.prompt([{
                type: 'input',
                name: 'registry',
                message: i18n.__('Please input your customer registry?'),
            }])
        }
        let registry = answers.registry;
        setConfig('registry', registry);
    }
    if (program.args.length > 0) {
        const r = program.args[0];
        if (r) {
            setConfig('registry', r);
            logger.success('Setup succeeded');
        }
    }
})().catch(err => {
    throw new CommandError(err.message);
});
