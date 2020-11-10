import { Command } from "commander";
import CommandManager from "./command-manager";
import { PROCESS_ENV_TEMPLATE_NAME } from "../constants/static-variable";

export default function create(
  command: string,
  customerCommandName?: string,
  description?: string,
) {
  let params: string[] = [];
  const _command = new Command(command);
  const processArgv: string[] = [];
  let start = false;

  for (let i = 0; i < process.argv.length; i++) {
    if (!start) {
      processArgv.push(process.argv[i]);
    }
 else {
      params.push(process.argv[i]);
    }
    if (process.argv[i] === command) {
      start = true;
    }
  }

  if (params.length !== 0) {
    process.env.temp_params = params.join(" ");
  }
 else {
    params = process.env.temp_params ? process.env.temp_params.split(" ") : [];
  }

  process.argv = processArgv;

  _command.description(description || "").action(() => {
    const template: string | undefined = process.env[PROCESS_ENV_TEMPLATE_NAME];
    if (template) {
      const commandManager = new CommandManager(
        template,
        command,
        customerCommandName,
        params.join(" "),
      );
      commandManager.init();
    }
  });
  return _command;
}
