---
title: Yaml 模式 Cli 模式对比
description: 'Serverless Devs Yaml 模式 Cli 模式对比'
position: 4
category: '概述'
---

# Yaml 模式 Cli 模式对比

Serverless Devs 开发者工具从根本上提供了两种使用方法。
- Yaml模式：需要依赖资源描述文档进行操作的模式
- Cli模式：可以在任何目录下直接执行，而不需要依赖资源描述文档；

这两者的核心区别是：

1. 如果想要使用 Yaml 模式，在当前目录下，必须要有`s.yaml`/`s.yml`文件，或通过`-t`/`--template`指定的资源部描述文件；
2. 如果想要试用 Cli 模式，则必须是 `s cli 组件名 方法 参数`的格式进行，此时不需要 Yaml 文件；

举一个非常简单的例子，如果有一个应用的资源描述文件`s.yaml`如下：

```yaml
name: myApp
edition: 3.0.0
access: "myaccess"

resources:
  website-starter:
    component: devsapp/website
    props:
      bucket: testbucket
  backend-starter:
    component: devsapp/demo
    props:
      service:
        name: serviceName
      function:
        name: functionName
      region: cn-hangzhou
```

此时，可以执行`s deploy`进行`myApp`应用部署，如果执行`s backend-starter deploy`则可以进行`myApp`应用下的`backend-starter`项目/服务部署。

此时，部署过程中，所需要的相关参数，可以通过该 Yaml 文件进行读取。

但是，在某些情况下，并不方便直接使用 Serverless Devs 规范的 Yaml 文件（例如，将线上资源同步到本地，或者要将 Funcraft 的 Yaml 转换成为 Serverless Devs 的 Yaml），此时可以选择纯命令行形式，即`s cli`模式。

在 `s cli` 模式下，由于不会读取 Yaml 等资源描述文件，所以很多参数都需要自行填写，这时的填写方法有两种：

1. 通过 `s cli` 天然支持的 `-p`/`--prop` 参数，进行相关 Yaml 参数的赋值，例如上述案例的`s backend-starter deploy`，此时可以改写成：
    ```shell script
    s cli devsapp/demo -p "{\"service\":{\"name\":\"serviceName\"},\"function\":{\"name\":\"functionName\"},\"region\":\"cn-hangzhou\"}"
    ```
2. 通过 demo 组件本身所支持的一些参数，例如通过`s cli devsapp/demo -h`，可以得到帮助信息，部分内容如下：
    ```shell script
      --region [region]               [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1  
      --service-name [serviceName]    [C-Required] Specify the fc service name  
      --function-name [functionName]  [Optional] Specify the fc function name   
    ```
    此时，就可与通过下面的命令实现上述功能：
    ```shell script
    s cli devsapp/demo --region cn-hangzhou --service-name serviceName --function-name functionName
    ```

## 特点对比

| 模式 | 使用方法 | 优势 |  劣势 |  适用场景  |
| --- | --- | --- | --- | --- |
| Yaml模式 | 在具有符合Serverless Devs规范，且存在资源/行为描述的Yaml文件的应用目录下，执行组件对应的命令，即可直接使用，例如`s deploy`，`s servicename build`等 | 可以一键部署一个完整的应用（例如，某个应用中规定了多个Service，可以通过该命令一键部署）；同时，通过资源/行为描述文档，可以更佳简单，清晰的对应用进行描述； | 需要学习Yaml的规范，且在某些时候与一些自动化流程进行结合，会比较复杂； | 部署、运维等操作，尤其是批量操作时更为合适； |
| 纯Cli模式 | 在任何目录下，通过子命令`cli`进行触发，同样适用全部组件，例如`s cli deploy -p "{/"function/": /"function-name/"}"`，`s cli fc api listFunctions --service-name my-service` | 相对来说可以更加简单，快速上手工具，并且可以非常简单的与自动化流程进行结合，降低了Yaml格式/规范的学习难度 | 对于一些复杂项目而言，需要在命令行中写过多的参数，出错的概率会比较高； | 更适合项目的管理，源自化操作 |

## 设计思路

> ❓ 为什么要同时存在 Yaml 模式和 Cli 模式？   
> 💬 因为在长期的实践过程中，我们发现通过 Yaml 进行资源描述会相对来说更简单和方便，例如 K8S 等也都是通过 Yaml 进行资源描述的；但是，在某些情况下，Yaml 文件也可能成为一种负担，例如想要查看某个服务下的函数列表，查看某个地区下的服务列表，因为这样一个简单的事情要额外的去完成一个 Yaml 文件，就显得过于臃肿，所以，在 Serverless Devs 项目中，同时保留了两种使用方法。
