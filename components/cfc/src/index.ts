const {
  // commandParse,
  // spinner,
  reportComponent,
} = require('@serverless-devs/core');
import * as core from '@serverless-devs/core';
import BaseComponent from './common/base';
import logger from './common/logger';
import Deploy from './lib/component/deploy';
import Remove from './lib/component/remove';
import { InputProps } from './common/entity';
import { COMPONENT_HELP_INFO } from './lib/help';
// import Trigger from './lib/component/trigger';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }

  /**
   * 部署
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps): Promise<any> {
    const {
      endpoint,
      credentials,
      subCommand,
      props,
      // args,
      help,
      errorMessage,
    } = await Deploy.handleInputs(inputs);
    await reportComponent('cfc', subCommand ? `deploy &(subCommand)` : 'deploy');

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }

    const deployInfo = await new Deploy({ endpoint, credentials }).deploy(props, subCommand, credentials);
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
      credentials,
      subCommand,
      props,
      // args,
      help,
      errorMessage,
    } = await Remove.handleInputs(inputs);
    await reportComponent('cfc', subCommand ? `remove &(subCommand)` : 'remove');
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }
    return await new Remove({ credentials }).remove(endpoint, props, subCommand, credentials);
  }

  /**
   * 测试
   */
  public async test(inputs: InputProps) {
    let CfcClient = require('@baiducloud/sdk').CfcClient;
    const credentials = inputs.credentials;
    const config = {
      credentials: {
        ak: credentials.AccessKeyID,
        sk: credentials.SecretAccessKey,
      },
    };
    let client = new CfcClient(config);

    const Target = 'brn:bce:cfc:bj:eb4fdf97f9b8d875eae5eb1d91a026a1:function:TestTriggers:$LATEST';
    const Source = 'duedge';

    const body = {
      Target,
      Source,
    };
    return await client
      .createRelation(body)
      .then(function (response) {
        return response;
      })
      .catch((response) => {
        if (response.message.Code === 'ResourceConflictException') {
          logger.error(response.message.Message + ', if you want to update your trigger, please provide relationId');
        } else {
          logger.error(response);
        }
      });
  }

  /**
   * 帮助
   * @returns
   */
  public async help(): Promise<void> {
    await reportComponent('cfc', 'help');
    core.help(COMPONENT_HELP_INFO);
  }

  /**
   * 解析入参
   */
  private;
}
