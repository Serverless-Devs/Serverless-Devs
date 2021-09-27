// createEventSourceMapping
const { Logger } = require('@serverless-devs/core');
const uuid = require('uuid');

class EventSource {
  constructor (aws) {
    const lambda = aws.lambda();
    const apigatewayv2 = aws.apigatewayv2();

    this.lambda = async (functionKey, inputs) => {
      return await new Promise((resolve, reject) => {
        lambda[functionKey](inputs, (e, data) => {
          if (e) {
            reject(e);
          }
          resolve(data);
        });
      })
    }
    this.apigatewayv2 = async (functionKey, inputs) => {
      return await new Promise((resolve, reject) => {
        apigatewayv2[functionKey](inputs, (e, data) => {
          if (e) {
            reject(e);
          }
          resolve(data);
        });
      })
    }
  }

  async handlerApi (apiName, functionArn) {
    const { Items } = await this.apigatewayv2('getApis');
    for (const item of Items) {
      if (item.Name === apiName) {
        return item;
      }
    }
    Logger.log(`The API Gateway does not exist '${apiName}',start creating API automatically.`)
    const createApiRes = await this.apigatewayv2('createApi', {
      Name: apiName,
      ProtocolType: 'HTTP',
      Description: `S is automatically created.`,
      Target: functionArn
    });
    Logger.log(`Successfully created API.`)
    return createApiRes;
  }

  async handlerIntegration({ ApiId }, properties, functionArn) {
    const {
      Method = 'post',
      PayloadFormatVersion,
      TimeoutInMillis,
    } = properties;
    const { Items } = await this.apigatewayv2('getIntegrations', { ApiId });
    for (const item of Items) {
      if (item.IntegrationUri === functionArn) {
        return await this.apigatewayv2('updateIntegration', {
          ApiId,
          IntegrationId: item.IntegrationId,
          IntegrationMethod: Method,
          PayloadFormatVersion,
          TimeoutInMillis
        })
      }
    }
    Logger.log(`There is no '${functionArn}' in the Integration, start creating Integration automatically.`)
    const createRes = await this.apigatewayv2('createIntegration', {
      ApiId,
      ConnectionType: 'INTERNET',
      Description: 'S is automatically created.',
      IntegrationMethod: Method,
      IntegrationType: 'AWS_PROXY',
      IntegrationUri: functionArn,
      PayloadFormatVersion: PayloadFormatVersion || '2.0',
      TimeoutInMillis: TimeoutInMillis || 30000,
    });
    Logger.log(`Successfully created Integration.`)
    return createRes;
  }

  async handlerRoute({ ApiId }, properties, integrationId) {
    const { Items } = await this.apigatewayv2('getRoutes', { ApiId });
    const routeKey = `${properties.Method.toLocaleUpperCase()} ${properties.Path}`;
    for (const item of Items) {
      if (item.RouteKey === routeKey) {
        return item;
      }
    }

    Logger.log(`There is no '${routeKey}' in the Routes, start creating Route automatically.`)
    const createRouteRes = await this.apigatewayv2('createRoute', {
      ApiId,
      RouteKey: routeKey,
      AuthorizationType: 'NONE',
      Target: `integrations/${integrationId}`
    });
    Logger.log(`Successfully created Route.`)
    return createRouteRes;
  }

  async addApiTrigger (functionName, eventName, functionConfig, properties) {
    const functionArn = functionConfig.FunctionArn;
    const apiRes = await this.handlerApi(eventName, functionArn);
    const integrationRes = await this.handlerIntegration(apiRes, properties, functionArn);
    await this.handlerRoute(apiRes, properties, integrationRes.IntegrationId)

    const arns = functionArn.split(':');

    try {
      await this.lambda('removePermission', {
        FunctionName: functionName,
        StatementId: this.getUUID(functionName)
      });
    } catch (e) {}

    await this.lambda('addPermission', {
      FunctionName: functionName,
      StatementId: this.getUUID(functionName),
      Action: 'lambda:InvokeFunction',
      Principal: 'apigateway.amazonaws.com',
      SourceArn: `arn:aws:execute-api:${arns[3]}:${arns[4]}:${apiRes.ApiId}/*/*${properties.Path}`
    });

    return {
      ApiEndpoint: apiRes.ApiEndpoint,
      Uri: `${apiRes.ApiEndpoint}${properties.Path}`
    }
  }

  getUUID (functionName) {
    return uuid.v5(functionName, '8bbea2bd-3bcf-5055-932f-5b38be2464b1')
  }

  async deploy (events, functionName, functionConfig) {
    if (!(events && functionName)) {
      return;
    }
    const resConfig = {};

    for (const eventName in events) {
      if (events[eventName].Type !== 'Api') {
        const mes = `${events[eventName].Type} is not supported, so skip this configuration`;
        Logger.log(mes, 'yellow');
        resConfig[eventName] = { Message: mes };
        continue;
      }
      Logger.log(`Start deploying ${eventName}.`);
      const properties = events[eventName].Properties;
      resConfig[eventName] = await this.addApiTrigger(functionName, eventName, functionConfig, properties);
      Logger.log(`Successfully deploy ${eventName}.`);
    }
    return resConfig;
  }

  async removeApiTrigger (apiName, functionName) {
    const { Items } = await this.apigatewayv2('getApis');
    for (const item of Items) {
      if (item.Name === apiName) {
        try {
          Logger.log(`Start remove API: ${apiName}`);
          await this.apigatewayv2('deleteApi', { ApiId: item.ApiId });
          Logger.log(`Successfully remove API.`)
        } catch (e) {
          Logger.log(`Delete Failed: ${e.message}`, 'red')
        }
        break;
      }
    }

    Logger.log(`Start remove permission.`);
    await this.lambda('removePermission', {
      FunctionName: functionName,
      StatementId: this.getUUID(functionName)
    });
    const mes = `Successfully remove Amazon API Gateway Trigger.`;
    Logger.log(mes);
    return { Message: mes };
  }

  async remove (events, functionName) {
    if (!(events && functionName)) {
      return;
    }

    const resConfig = {};

    for (const eventName in events) {
      if (events[eventName].Type !== 'Api') {
        const mes = `${events[eventName].Type} is not supported, so skip this configuration`;
        Logger.log(mes, 'yellow');
        resConfig[eventName] = { Message: mes };
        continue;
      }
      resConfig[eventName] = await this.removeApiTrigger(eventName, functionName);
    }
    return resConfig;
  }
}

module.exports = EventSource