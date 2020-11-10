import * as program from "commander";
import { PlatformInitManager } from "./platform-init-manager";
import i18n from "../../utils/i18n";
import { CommandError } from "../../error/command-error";
import GUIService from "../../gui/gui-service";
const description = `${i18n.__("Initialize a package to be released.")}

    ${i18n.__("Example")}:
        $ s platform init
        $ s platform init -t plugin`;
program
  .name("s platform init")
  .option("-t, --type <type>", i18n.__("Package type [Component/Plugin/Application]"))
  .option("-g, --gui", i18n.__("Start gui service"))
  .description(description)
  .helpOption("-h, --help", i18n.__("Display help for command"))
  .parse(process.argv);

(async () => {
  if (!program.type && !program.gui) {
    program.help();
  }
  if (program.gui) {
    const guiService = new GUIService("/app");
    guiService.start();
    return;
  }
  const platformInitManager = new PlatformInitManager();
  platformInitManager.init(program.type);
})().catch((err) => {
  throw new CommandError(err.message);
});
