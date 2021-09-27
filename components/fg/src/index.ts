import { getState, reportComponent } from "@serverless-devs/core";
import * as core from "@serverless-devs/core";
import BaseComponent from "./common/base";
import logger from "./common/logger";
import Deploy from "./lib/component/deploy";
// import Remove from './lib/component/remove';
import { InputProps } from "./common/entity";
import { COMPONENT_HELP_INFO } from "./lib/help";
import Remove from "./lib/component/remove";
// import Trigger from './lib/component/trigger';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }

  /**
   *  部署
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<any> {
    const {
      endpoint,
      projectId,
      credentials,
      subCommand,
      props,
      // args,
      help,
      errorMessage,
    } = await Deploy.handleInputs(inputs);
    await reportComponent(
      "cfc",
      subCommand ? `deploy &(subCommand)` : "deploy"
    );

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }

    const deployInfo = await new Deploy(
      credentials,
      projectId,
      endpoint
    ).deploy(props, subCommand);
    logger.info(`Deploy info is shown here:`);
    core.help(deployInfo);
  }

  /**
   * 移除
   * @param inputs
   * @returns
   */
  public async remove(inputs: InputProps): Promise<any> {
    const {
      endpoint,
      projectId,
      credentials,
      subCommand,
      props,
      // args,index.handler'
      help,
      errorMessage,
    } = await Remove.handleInputs(inputs);
    await reportComponent(
      "cfc",
      subCommand ? `remove &(subCommand)` : "remove"
    );
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }
    return await new Remove(credentials, projectId, endpoint).remove(
      props,
      subCommand
    );
  }

  /**
   * 测试
   */
  public async test(inputs: InputProps) {
    const s = await getState("state");
    logger.info(s);
    return s;
  }

  /**
   * 帮助
   * @returns
   */
  public async help(): Promise<void> {
    await reportComponent("cfc", "help");
    core.help(COMPONENT_HELP_INFO);
  }

  /**
   * 解析入参
   */
  private;
}
