---
title: Cli 命令
description: 'Cli 命令'
position: 4
category: '命令'
---
# Cli 命令

`cli`命令是去Yaml化的命令行模式，即可以通过命令行直接使用 Serverless Devs 的组件，而不需要依赖Yaml文件。

- [命令解析](#命令解析)
- [常见模式](#常见模式)
    - [通用组件的支持](#通用组件的支持)
    - [特定组件的支持](#特定组件的支持)

> Yaml 模式与 Cli 模式的区别和试用场景，可以参考文档[Yaml 模式 Cli 模式对比](./../yaml_and_cli.md)

## 命令解析

当我们执行`s cli -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s cli -h
Usage: s cli [options]

Directly use serverless devs to use components, develop and manage applications without yaml configuration.
  
  Example:
    $ s cli fc api ListServices
    $ s cli fc api ListFunctions --path '{"serviceName": "serviceName"}' --body '{"K1": "V1"}'
    
📖  Document: https://serverless.help/t/s/cli

Options:
  -p, --props <jsonString>        The json string of props
  -h, --help                      Display help for command
```

使用方法主要是：

```shell script
s cli [组件名称，例如fc，fc api等] [组件的方法] -p/--props [该方法对应的Yaml属性（JSON字符串）] -a/--access [指定密钥信息] [其他设定]
```


## 常见模式

### 通用组件的支持

在`cli`模式下，可以通过`-p, --props [jsonString]`参数对组件进行通用的支持。

例如，某Serverless Devs应用可以通过以下`s.yaml`描述：

```yaml
edition: 3.0.0
access: "myaccess"

resources:
  website-starter:
    component: devsapp/website
    props:
      bucket: testbucket
      src:
        codeUri: ./
        publishDir: ./build
        index: index.html
      region: cn-hangzhou
      hosts:
        - host: auto
```

并且，可以通过`s website-starter deploy`，将`website-starter`部分进行部署。

此时，如果通过`cli`模式进行部署，可以不需要依赖上述Yaml，但是需要在命令行中，写上完整的参数信息：

```shell script
s cli devsapp/website deploy -p "{\"bucket\":\"testbucket\",\"src\":{\"codeUri\":\"./\",\"publishDir\":\"./build\",\"index\":\"index.html\"},\"region\":\"cn-hangzhou\",\"hosts\":[{\"host\":\"auto\"}]}" -a myaccess
```

### 特定组件的支持

在 Serverless Devs 目前已经存在的组件中，已经有一些比较优秀且针对 Cli 模式设计的组件，例如`fc api`组件，就是一款命令行模式优先的组件，通过该组件，可以快速的使用阿里云函数计算的一些接口，进行操作，例如：

- 查看阿里云函数计算的某个地区下某个服务下的函数列表：
    ```shell script
    s cli fc api listFunctions --service-name my-service --region cn-beijing -a myaccess
    ```
- 通过纯命令行形式，对函数进行代码更新：
    ```shell script
    s cli fc api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --code '{"zipFile":"./"}'
    ```

除此之外，很多组件可以即对 Yaml 模式有比较好的支持，也会在某些情况下对 纯命令行模式，进行额外优化设计，例如 `fc` 组件的线上线下资源同步操作：
```shell script
s cli fc sync --region cn-shanghai --service-name myService --type config
```