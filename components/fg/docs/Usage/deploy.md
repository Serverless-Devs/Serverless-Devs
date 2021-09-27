# 部署操作：Deploy

通过编写`s.yaml`描述文档和`s deploy`命令，可以快速部署相关资源。

## `s deploy -h`/`s deploy help`

使用该命令可以唤起帮助信息

```
Deploy

  The ability to deploy resources                                               
  If executing s deploy is equivalent to s deploy all                           

Usage

  $ s deploy <sub-command> 

SubCommand List

  all        Deploy all resources, you can get help through [s deploy all -h]                
  function   Only deploy function resources, you can get help through [s deploy function -h] 
  trigger    Only deploy trigger resources, you can get help through [s deploy trigger -h]
```

## `s deploy`

用于部署所有资源，包括函数和触发器

### nodejs函数部署案例

例如，对于如下代码

```
.
├── index.js
└── s.yaml
```

描述文档`s.yaml`内容如下

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test   #  项目名称

services:
  component-test: #  服务名称
    component: ../../lib  # 组件存放地址，可以换成对应组件名称
    # actions: # 自定义执行逻辑
    #   pre-deploy: # 在deploy之前运行
    #     - run: npm run doc  # 要运行的命令行
    #       path: ../ # 命令行运行的路径
    props:
      code:																	# 代码存放路径
        codeUri: ./
        publish: false											# 是否发布
        dryRun: false
      functionName: test										# 函数名
      description: 测试函数									
      handler: index.handler 								# 函数句柄
      endpoint: cfc.bj.baidubce.com					# 选择区域 见：https://cloud.baidu.com/doc/CFC/s/rjwvz4chn
      protocol: https												# 选择协议类型：http/https
      runtime: nodejs12											# 函数运行环境
      timeout: 30														# 设置超时时间
      memorySize: 128												# 内存大小
      environment:													# 环境变量
        additionalProp1: 环境变量1
        additionalProp2: 环境变量2
        additionalProp3: 环境变量3
      trigger:															# 触发器信息
        source: cfc-http-trigger/v1/CFCAPI	# 触发源类型
        data:																# 触发器配置，不同触发器可能不同
          Enable: Enabled										# 是否启用，Enabled/Disabled
          ResourcePath: /test   						# 触发路径
          Method: GET												# 支持method
          AuthType: anonymous								# 身份验证类型，可选值为"anonymous"或"iam"
```

`index.js`内容如下

```javascript
let resp = {
  version: '2.0',
  response: {
    outputSpeech: {
      type: 'PlainText',
      text: '你好，世界！你好Serverless',
    },
    shouldEndSession: false,
  },
};
exports.handler = (event, context, callback) => {
  callback(null, resp);
};
```

> 代码编写指南：[[函数计算CFC - 概述)](https://cloud.baidu.com/doc/CFC/s/2kd04huys)

在该目录下执行

```shell
$ s deploy
```

即可部署资源，输出信息如下：

```
[2021-08-15T14:06:56.345] [INFO ] [S-CLI] - Start ...
[2021-08-15T14:06:57.024] [INFO ] [S-CORE] - CFC Using access alias: baidu
[2021-08-15T14:06:57.025] [INFO ] [S-CORE] - CFC Using accessKeySecret: ***********ad7c
[2021-08-15T14:06:57.026] [INFO ] [S-CORE] - CFC Using accessKeyID: ***********ee63
[2021-08-15T14:06:57.026] [INFO ] [S-CORE] - CFC Using endpoing:https://cfc.bj.baidubce.com
✔ Function test does not exitst.
✔ Function test created.
[2021-08-15T14:06:57.702] [INFO ] [S-CORE] - CFC Using FunctionBrn: brn:bce:cfc:bj:eb4fdf97f9b8d875eae5eb1d91a026a1:function:test:$LATEST
✔ The trigger is a new one of test.
[2021-08-15T14:06:57.777] [INFO ] [S-CORE] - CFC Trigger infomation:
[2021-08-15T14:06:57.777] [INFO ] [S-CORE] - CFC Target:brn:bce:cfc:bj:eb4fdf97f9b8d875eae5eb1d91a026a1:function:test:$LATEST
[2021-08-15T14:06:57.777] [INFO ] [S-CORE] - CFC Source:cfc-http-trigger/v1/CFCAPI
[2021-08-15T14:06:57.778] [INFO ] [S-CORE] - CFC Data:{"Enable":"Enabled","ResourcePath":"/test","Method":"GET","AuthType":"anonymous"}
✔ Trigger created.
[2021-08-15T14:06:57.974] [INFO ] [S-CORE] - CFC Deploy info is shown here:
Function

  Description   测试函数                                                                    
  Region        bj                                                                      
  Timeout       3                                                                       
  Handler       index.handler                                                           
  Version       $LATEST                                                                 
  CodeSize      1485                                                                    
  FunctionBrn   brn:bce:cfc:bj:eb4fdf97f9b8d875eae5eb1d91a026a1:function:test:$LATEST   
  MemorySize    128                                                                     
  More          https://console.bce.baidu.com/cfc/#/cfc/function/info~name=TestTriggers 

Trigger

  RelationId   brn:bce:cfc-http-trigger:bj:eb4fdf97f9b8d875eae5eb1d91a026a1:583d0dfc5cb5970e334be9323d4e48f1/cfc/GET/test 
  Source       cfc-http-trigger/v1/CFCAPI                                                                                 
  Url          https://5zr6ptrzv4a33.cfc-execute.bj.baidubce.com/test                                                     
  More         https://console.bce.baidu.com/cfc/#/cfc/function/trigger~name=test                                         

Trigger data

  AuthType       anonymous 
  IsBinary       false     
  Method         GET       
  ResourcePath   /test     

End of method: deploy
```

访问输出信息中的trigger->url：https://5zr6ptrzv4a33.cfc-execute.bj.baidubce.com/test 

可以看到输出信息：

![image-20210815141221246](https://gitee.com/xinwuyun/myimage/raw/master/img/image-20210815141221246.png)

## `s deploy <sub-command>`子命令

有三个子命令

+ `s deploy all`：部署所有资源，效果等同于`s deploy`
+ `s deploy function`：仅部署函数
+ `s deploy trigger`：仅部署触发器



