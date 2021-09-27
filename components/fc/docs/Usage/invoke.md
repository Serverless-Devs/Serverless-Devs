# 远程调用操作：Invoke

- [快速使用](#快速使用)
    - [简单使用](#简单使用)
        - [Yaml资源描述模式使用](#Yaml资源描述模式使用)
        - [命令行模式使用](#命令行模式使用)
    - [高级使用](#高级使用)
- [其他替代方法](#其他替代方法)
- [操作所需权限](../Others/authority/command.md#invoke-指令)


------


阿里云函数计算（FC）组件为使用者提供了FC相关资源的在线调用能力。可以通过`invoke`指令，快速进行函数的调用操作。

您可以通过`invoke -h`/`invoke --help`参数，唤起帮助信息。例如执行`s invoke -h`后，可以看到：

```

Invoke

  Invoke/trigger online functions.

Usage

  $ s invoke <options> 

Options
    
  -t, --invocation-type string   Invocation type: optional value "async"|"sync", default value "sync" (default: "sync")                       
  -e, --event string             Event data (strings) passed to the function during invocation (default: "").Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明] 
  -f, --event-file string        Event funtion: A file containing event data passed to the function during invoke. Http function: A file containing http request options sent to http trigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
  -s, --event-stdin              Read from standard input, to support script pipeline.Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]                       
  --region string                 Specify region in cli mode               
  --service-name string           Specify service name in cli mode     
  --function-name string          Specify function name in cli mode

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s invoke
  $ s <ProjectName> invoke
  $ s exec -- invoke --invocation-type sync --event <payload>
  $ s exec -- invoke --event-file <file-path>
  $ s exec -- invoke --event-stdin

Examples with CLI

  $ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event <payload>
  $ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-file <file-path>
  $ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-stdin 
  You also can refer to the usage of fc-api and execute [s cli fc-api -h] for help. $ s cli fc-api invokeFunction -h

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行函数的调用。

## 简单使用

### Yaml资源描述模式使用

Serverless Devs是通过Yaml进行资源描述，通常情况下一个标准的Serverless Devs的项目是包括一个类似`s.yml`的资源描述文档，例如，此时我有一个描述文档为：

```
# s.yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称

services:
  fc-deploy-test: 
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-hangzhou
      service:
        name: fc-deploy-service
        description: 'demo for fc-deploy component'
        internetAccess: true
      function:
        name: http-trigger-function
        description: this is a test
        runtime: nodejs10
        codeUri: ./
        handler: index.handler
        memorySize: 128
        timeout: 60
```

此时，当我部署完（`s deploy`）该应用之后，我可以通过`s invoke`进行线上函数的触发。

### 命令行模式使用

例如我当前并没有本地的项目，但是我依旧想要查询线上香港区（cn-hongkong），服务ai-album下的函数pre-warm的详细信息，此时我可以执行：

```
s cli fc invoke --region cn-hongkong --service-name ai-album --function-name pre-warm
```

此时可以看到结果：

```
[2021-06-07T17:41:38.758] [INFO ] [S-CLI] - Start ...
https://1583208943291465.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-function/

========= FC invoke Logs begin =========
FC Initialize Start RequestId: f9c7e925-b9c5-4b30-bd9d-84e35a9ee81e
load code for handler:index.initializer
2021-06-07T09:41:48.592Z f9c7e925-b9c5-4b30-bd9d-84e35a9ee81e [verbose] i am initializing
FC Initialize End RequestId: f9c7e925-b9c5-4b30-bd9d-84e35a9ee81e
FC Invoke Start RequestId: f9c7e925-b9c5-4b30-bd9d-84e35a9ee81e
load code for handler:index.handler
2021-06-07T09:41:48.603Z f9c7e925-b9c5-4b30-bd9d-84e35a9ee81e [verbose] hello world
FC Invoke End RequestId: f9c7e925-b9c5-4b30-bd9d-84e35a9ee81e

Duration: 5.72 ms, Billed Duration: 6 ms, Memory Size: 128 MB, Max Memory Used: 49.55 MB
========= FC invoke Logs end =========

FC Invoke Result:
{
    "message": "Hello World",
    "path": "/",
    "queries": {},
    "headers": {
        "accept": "application/json",
        "authorization": "FC LTAI4G8rgRovHuP7WRJVtZCW:ep6HtOdPcMQwMPI7KDYKO0BxpJgzSVg09ZmJICCXmo0=",
        "date": "Mon, 07 Jun 2021 09:41:47 GMT",
        "host": "1583208943291465.cn-hangzhou.fc.aliyuncs.com",
        "user-agent": "Node.js(v12.15.0) OS(darwin/x64) SDK(@alicloud/fc2@v2.2.2)",
        "x-forwarded-proto": "http"
    },
    "method": "GET",
    "requestURI": "/2016-08-15/proxy/fc-deploy-service/http-trigger-function/",
    "clientIP": "106.11.31.167",
    "uuid": "069d2d15-8bc0-4e72-94ad-2a40baadb405",
    "body": ""
}


```

## 高级使用

我们往往在进行调用时，需要指定相对应的事件，例如oss的事件，cdn的事件......这些事件的格式，往往需要我们通过线上的帮助文档获取，此时我们可以通过[fc-event](https://github.com/devsapp/fc-event) 组件获取。

例如，我需要使用oss的事件，进行测试，此时我可以执行：

```
s cli fc-event oss
```

完成之后，可以看到系统会提醒我们相对应的路径等信息：

```
      OSS event template created successfully.
      
      👓 Event Template Path: event-template/oss-event.json
      
      You could user fc/fc-api component invoke method and specify the event.
      E.g: [s projectName invoke --event-file  event-template/oss-event.json]
      
      More information about OSS Trigger: 
        📝 https://help.aliyun.com/document_detail/74763.htm
```

此时，我们利用该路径的模板（可以额外进行修改），触发函数：

```
s invoke --event-file  event-template/oss-event.json
```

# 其他替代方法


> 类似操作：除了FC组件为我们提供invoke的命令，帮助我们快速触发线上的某些资源，使用者也可以使用[fc-api](https://github.com/devsapp/fc-api) 组件，进行相对应的。


当然，除了阿里云函数计算（FC）组件可以进行资源详情的查询，也可以通过[fc-api](https://github.com/devsapp/fc-api) 组建进行相关信息的查询。

例如:

- 调用函数，可以参考帮助文档：`s cli fc-api invokeFunction -h`

