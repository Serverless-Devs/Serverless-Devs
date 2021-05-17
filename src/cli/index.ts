
import program, { Command } from 'commander';
import { CommandError } from '../error';
import { i18n } from '../utils';
import CliManager from './cli-manager';
const description = `${i18n.__('Directly use serverless devs to use components, develop and manage applications without yaml configuration.')}

    ${i18n.__('Example:')}
        $ s cli fc list-service
        $ s cli fc list-function --service-name my-service
        $ s cli fc deploy -p "{/"function/": /"function-name/"}"
    `;


program
    .name('s cli')
    .usage('s cli [component] [method] [options]')
    .option('-a, --access [access-alias]', i18n.__('Specify the key name'))
    .option('-p, --props [json-string]', i18n.__('The json string of props'))
    .helpOption('-h, --help', i18n.__('Display help for command'))
    .description(description).addHelpCommand(false).parse(process.argv);
const subCommandName = process.argv[2];
if (subCommandName) {
    const execCommand = new Command(subCommandName);
    const customerCommandDescription = i18n.__("Subcommand execution analysis");
    execCommand.usage("[subcommand] -- [method] [params]");
    execCommand.description(customerCommandDescription).addHelpCommand(true)
    program.addCommand(execCommand);
}

(async () => {
    if (program.args.length === 0) {
        program.help();
    }
    const [component, command] = program.args;
    const { access, props } = program as any;
    const cliManager = new CliManager({ command, component, access, props });
    cliManager.init();
})().catch(err => {
    throw new CommandError(err.message);
});
