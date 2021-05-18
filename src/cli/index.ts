import program, {Command} from 'commander';
import {CommandError} from '../error';
import {i18n} from '../utils';
import CliManager from './cli-manager';

const description = `${i18n.__('Directly use serverless devs to use components, develop and manage applications without yaml configuration.')}

    ${i18n.__('Example:')}
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"
    `;


const cliCommand = program
    .name('s cli')
    .usage('s cli [component] [method] [options]')
    .option('-a, --access [access-alias]', i18n.__('Specify the key name'))
    .option('-p, --props [json-string]', i18n.__('The json string of props'))
    .helpOption('-h, --help', i18n.__('Display help for command'))
    .description(description).addHelpCommand(false);

const subCommandName = process.argv[2];
if (subCommandName && !['-h', '--help'].includes(subCommandName)) {
    const execCommand = new Command(subCommandName);
    const customerCommandDescription = i18n.__("Subcommand execution analysis.");
    execCommand.usage("[subcommand] -- [method] [params]");
    execCommand.description(customerCommandDescription).addHelpCommand(true)
    program.addCommand(execCommand);
}

(async () => {
    if ((process.argv.length == 2) || (process.argv.length == 3 && ['-h', '--help'].includes(process.argv[2]))) {
        program.help();
    } else {
        const tempCommand = process.argv[3]
        let start = false;
        const processArgv: string[] = [];
        let params: string[] = [];
        for (let i = 0; i < process.argv.length; i++) {
            if (!start || (['-a', '--access', '-p', '--props'].includes(lastArgs) || ['-a', '--access', '-p', '--props'].includes(process.argv[i]))) {
                processArgv.push(process.argv[i]);
            } else {
                params.push(process.argv[i]);
            }
            if (process.argv[i] === tempCommand) {
                start = true;
                if(['-h', '--help'].includes(tempCommand)){
                    processArgv.pop()
                    processArgv.push("cli-help-options")
                }
            }
        }
        if (params.length !== 0) {
            process.env.temp_params = params.concat(process.env.temp_params).join(' ');
        }
        process.argv = processArgv;
        cliCommand.parse(process.argv)
        const [component, command] = program.args;
        const {access, props} = program as any;
        const cliManager = new CliManager({command, component, access, props});
        cliManager.init();

    }
})().catch(err => {
    throw new CommandError(err.message);
});
