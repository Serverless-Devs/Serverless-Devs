import { Command } from "commander";
import { underline } from "chalk";
import Registry from "@serverless-devs/registry";
import { emoji } from "../../../utils";

const description = `Publish Serverless Registry.

Example:
  $ s registry publish
   
${emoji('📖')} Document: ${underline(
  'https://serverless.help/s/registry#publish',
)}`;

export = (program: Command) => {
  program.command('publish')
    .usage('[options]')
    .helpOption('-h, --help', 'Display help for command')
    .description(description)
    .action(async () => {
      const registry = new Registry({});
      await registry.publish();
    })
};
