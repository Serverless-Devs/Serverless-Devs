
import program, { Command } from 'commander';
import CliSubCommandManager from './cli-subcommand-manager';
import { CommandError } from '../error';
import { i18n, logger } from '../utils';
// import CliManager from './cli-manager';
const description = `${i18n.__('Directly use serverless devs to use components, develop and manage applications without yaml configuration.')}

    ${i18n.__('Example:')}
        $ s cli fc list-service
        $ s cli fc list-function --service-name my-service
        $ s cli fc deploy -p "{/"function/": /"function-name/"}"
    `;

(async () => {
    let cliCommand = program
        .name('s cli')
        .usage('[component] [method] [options]')
        .helpOption('-h, --help', i18n.__('Display help for command'));
    const subCommandName = process.argv[2];
    if (subCommandName && subCommandName.indexOf('-') !== 0) {
        const cliManager = new CliSubCommandManager(cliCommand, subCommandName);
        cliCommand = await cliManager.init();
    }
    cliCommand.description(description).addHelpCommand(false).parse(process.argv);
    if (cliCommand.args.length === 0) {
        cliCommand.help();
    }
})().catch(err => {
    throw new CommandError(err.message);
});
