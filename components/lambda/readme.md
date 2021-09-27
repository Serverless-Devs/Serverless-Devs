## 前言

通过本组件，您可以简单快速的将项目部署到Lambda。

### template.yaml

````
MyFunctionDemo:
  Component: lambda
  Provider: aws
  Properties:
    Region: ap-southeast-1
    Function:
      CodeUri: ./index.js
      Name: aws-lambda-dome
      Handler: index.handler
      Runtime: nodejs12.x
      Description: 测试的
    Events:
      - Name: triggerName
        Type: Api
        Properties:
          Path: /dome
          Method: ANY

````
> Function 属性可参照： https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/API_CreateFunction.html#API_CreateFunction_RequestBody



### index.js

````
exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from wss!'),
  };
  return response;
};
````

## 发布本组件

1. 修改 publish.yaml 的版本
2. 执行 npm run publish
