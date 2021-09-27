const AWS = require('aws-sdk');

class Client {
  constructor(credentials = {}, region) {
    this.config = {
      credentials: {
        accessKeyId: credentials.AccessKeyID,
        secretAccessKey: credentials.SecretAccessKey,
      },
      apiVersion: 'latest',
      region
    }
  }

  lambda () {
    const lambda = new AWS.Lambda(this.config);
    return lambda;
  }

  apigatewayv2 () {
    const apigatewayv2 = new AWS.ApiGatewayV2(this.config);
    return apigatewayv2;
  }

  iam () {
    const iam = new AWS.IAM(this.config);
    return iam;
  }
}

module.exports = Client;
