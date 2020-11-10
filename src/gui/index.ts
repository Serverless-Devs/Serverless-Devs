import * as program from "commander";
import i18n from "../utils/i18n";
import GUIService from "./gui-service";
import { CommandError } from "../error/command-error";

const description = `${i18n.__("Start Gui Service")}

    ${i18n.__("Example:")}
        $ s gui`;

program
  .name("s gui")
  .helpOption("-h, --help", i18n.__("Display help for command"))
  .description(description)
  .option("--update", i18n.__("Upgrade GUI"))
  .parse(process.argv);

(async () => {
  const update = program.update || false;
  const guiService = new GUIService();
  await guiService.start(update);
})().catch((err) => {
  throw new CommandError(err.message);
});
