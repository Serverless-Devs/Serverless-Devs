const { HLogger } = require("@serverless-devs/core");

export default class ComponentLogger {
  @HLogger("S-CORE") static logger;
  static CONTENT = "CFC";
  static setContent(content) {
    ComponentLogger.CONTENT = content;
  }
  static log(
    m,
    color?:
      | "black"
      | "red"
      | "green"
      | "yellow"
      | "blue"
      | "magenta"
      | "cyan"
      | "white"
      | "whiteBright"
      | "gray"
  ) {
    this.logger.log(m, color);
  }
  static info(m) {
    this.logger.info(ComponentLogger.CONTENT, m);
  }

  static debug(m) {
    this.logger.debug(ComponentLogger.CONTENT, m);
  }

  static error(m) {
    this.logger.error(ComponentLogger.CONTENT, m);
  }

  static warning(m) {
    this.logger.warn(ComponentLogger.CONTENT, m);
  }

  static success(m) {
    this.logger.log(m, "green");
  }
}
