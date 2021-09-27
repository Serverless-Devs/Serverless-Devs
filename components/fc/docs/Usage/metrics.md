# 指标查询操作：Metrics

> 使用场景：当我们完成函数的部署等操作之后，我们往往需要进行一些指标的查看，例如函数被调用多少次，成功多少次，失败多少次...，此时我们可以使用fc组件为我们提供的`metrics`方法，快速在本地进行相关指标的查询和分析等；

- [快速使用](#快速使用)
    - [Yaml资源描述模式使用](#Yaml资源描述模式使用)
    - [命令行模式使用](#命令行模式使用)
    - [效果预览](#效果预览)
- [操作所需权限](../Others/authority/command.md#metrics-指令)

-----


阿里云函数计算（FC）组件为使用者提供了FC相关资源的指标查询能力。可以通过`metrics`指令，快速进行指标查询操作。

您可以通过`metrics -h`/`metrics --help`参数，唤起帮助信息。例如执行`s metrics -h`后，可以看到：


```

Metrics

  Query function metrics information

Usage

  $ s metrics <options> 

Options

  --region string          Specify the region parameter               
  --service-name string    Specify the service name parameter     
  --function-name string   Specify the function name parameter                          

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s metrics
  $ s <ProjectName> metrics
  $ s exec -- metrics --region cn-hangzhou --service-name myService --function-name myFunction

Examples with CLI

  $ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行指标的查询。

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

此时，当我部署完（`s deploy`）该应用之后，我可以通过`s metrics`查询线上函数的指标信息。`

## 命令行模式使用

在某些时候，我们单纯的需要进行某些函数资源的指标信息查看，此时我们可以通过命令行的形式直接进行操作：

```
s cli fc metrics --region ch-hangzhou --service-name myService --function-name myFunction
```

## 效果预览

指令执行之后，系统会提醒我们本地的地址：

```
[2021-06-07T12:20:06.661] [INFO ] [FC-METRICS] - 请用浏览器访问Uri地址进行查看: http://localhost:3000
```

通过浏览器打开地址，可以看到相关信息：

![image](https://user-images.githubusercontent.com/21079031/120958920-419b2400-c78b-11eb-9f3c-8b49c1354a37.png)
