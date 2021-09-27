# 查看操作：Info

> 使用场景：在使用工具对阿里云函数计算进行操作时可能会生成一些新的资源，例如在进行服务部署时，VPC等参数选择的是Auto，那么此时部署后的线上资源是什么，就会成为一个比较困扰使用者的问题；通过info指令，用户可以快速的查看到函数的详细信息，例如`s info`
 

- [快速使用](#快速使用)
    - [Yaml资源描述模式使用](#Yaml资源描述模式使用)
    - [命令行模式使用](#命令行模式使用)
- [其他替代方法](#其他替代方法)
- [操作所需权限](../Others/authority/command.md#infosync-指令)

--------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的资源查看能力。可以通过`info`指令，快速查看线上资源详情。

您可以通过`info -h`/`info --help`参数，唤起帮助信息。例如执行`s info -h`后，可以看到：

```

Info

  Query online resource details. 

Usage

  $ s info <options> 

Options
    
  --region string          Specify the region parameter                    
  --service-name string    Specify the service name parameter     
  --function-name string   Specify the function name parameter
  --trigger-name string    Specify the alicloud fc trigger name, you can set
                           names by using multiple trigger-name option, eg: --trigger-name triggerA --trigger-name triggerB.

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s info
  $ s <ProjectName> info

Examples with CLI

  $ s cli fc-info info [--service-name serviceName] [--region region] [--access 
  accessName]                                                                   
  $ s cli fc-info info [--service-name serviceName] [--function-name            
  functionName] [--trigger-name functionNameA] [--trigger-name functionNameB]   
  [--region region] [--access accessName]                                       
                                                                                
  You also can refer to the usage of fc-api and execute [s cli fc-api -h] for   
  help.                                                                         
  $ s cli fc-api listSerices                                                    
  $ s cli fc-api listFunctions --serviceName myService

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的查询。

## Yaml资源描述模式使用

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

此时，当我部署完（`s deploy`）该应用之后，我可以通过`s info`查询线上函数的信息。

## 命令行模式使用

例如我当前并没有本地的项目，但是我依旧想要查询线上香港区（cn-hongkong），服务ai-album下的函数pre-warm的详细信息，此时我可以执行：

```
s cli fc info --region cn-hongkong --service-name ai-album --function-name pre-warm
```

此时可以看到结果：

```
service:
  name: ai-album
  internetAccess: true
  role: acs:ram::<account-id>:role/al-album
  description: 基于函数计算的人工智能相册系统
  vpcConfig:
    securityGroupId: sg-xxxxxx
    vswitchIds:
      - vsw-xxxxxx
    vpcId: vpc-xxxxxx
function:
  name: pre-warm
  runtime: python3
  handler: index.handler

```

# 其他替代方法


> 类似操作：除了FC组件为我们提供info的命令，帮助我们快速查询线上的某些资源，使用者也可以使用[fc-api](https://github.com/devsapp/fc-api) 组件，进行更多信息的查询。例如查询某个地区的服务列表可以是`s cli fc-api listServices --region cn-hangzhou`, 查看函数列表`s cli fc-api listFunctions --serviceName myService  --region cn-hangzhou`，除此之外和可以查询触发器列表/详情，服务详情，函数详情，域名列表/详情，版本列表/详情等，更多操作可以参考`s cli fc-api -h`


当然，除了阿里云函数计算（FC）组件可以进行资源详情的查询，也可以通过[fc-api](https://github.com/devsapp/fc-api) 组建进行相关信息的查询。

例如:

- 查询某个服务的详情，可以参考帮助文档：`s cli fc-api getService -h`
- 查询某个函数的详情，可以参考帮助文档：`s cli fc-api getFunction -h`
- 查询某个触发器的详情，可以参考帮助文档：`s cli fc-api getTrigger -h`

