import * as program from "commander";
import registerCommandChecker from "../utils/command";
import i18n from "../utils/i18n";

program
  .name("s set")
  .usage("[commands] [options]")
  .helpOption("-h, --help", i18n.__("Display help for command"))
  .command("output-color", i18n.__("Control color output"))
  .command("language", i18n.__("Output language switch"))
  .command("analysis", i18n.__("Upload your usage habits to help us improve our products"))
  .description(i18n.__("You can make some default settings for the tool here."));

registerCommandChecker(program);

program.parse(process.argv);
