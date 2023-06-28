import { Command } from "commander";
import { underline } from "chalk";
import Registry from "@serverless-devs/registry";
import { emoji } from "../../../utils";

const description = `View application details.

Example:
  $ s registry detail --name fc
   
${emoji('📖')} Document: ${underline(
  'https://serverless.help/s/registry#detail',
)}`;

export = (program: Command) => {
  program.command('detail')
    .usage('[options]')
    .option('--name <name>', 'Serverless Package name')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async (option) => {
      const { name } = option;
      const registry = new Registry({});
      const result = await registry.detail(name);
      console.log(JSON.stringify(result));
    })
};
