# clean命令

`cli`命令是去Yaml化的命令行模式，即可以通过命令行直接使用 Serverless Devs 的组件，而不需要依赖Yaml文件。

当我们执行`s cli -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s cli -h
Usage: s cli [component] [method] [options]

Directly use serverless devs to use components, develop and manage applications without yaml configuration.
    Example:
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"
    
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/cli.md

Options:
  -a, --access [aliasName]  Specify the access alias name
  -p, --props [jsonString]  The json string of props
  -h, --help                Display help for command
```

使用方法主要是：

```shell script
s cli [组件名称，例如fc，fc-api等] [组件的方法] -p/--props [该方法对应的Yaml属性（JSON字符串）] -a/--access [指定密钥信息] [其他设定]
```


## 常见模式

### 通用组件的支持

在`cli`模式下，可以通过`-p, --props [jsonString]`参数对组件进行通用的支持。

例如，某Serverless Devs应用可以通过以下`s.yaml`描述：

```yaml
edition: 1.0.0
access: "myaccess"

services:
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

在 Serverless Devs 目前已经存在的组件中，已经有一些比较优秀且针对 Cli 模式设计的组件，例如`fc-api`组件，就是一款命令行模式优先的组件，通过该组件，可以快速的使用阿里云函数计算的一些接口，进行操作，例如：

- 查看阿里云函数计算的某个地区下某个服务下的函数列表：
    ```shell script
    s cli fc-api listFunctions --service-name my-service --region cn-beijing -a myaccess
    ```
- 通过纯命令行形式，对函数进行代码更新：
    ```shell script
    s cli fc-api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --code '{"zipFile":"./"}'
    ```

除此之外，很多组件可以即对 Yaml 模式有比较好的支持，也会在某些情况下对 纯命令行模式，进行额外优化设计，例如 `fc` 组件的线上线下资源同步操作：
```shell script
s cli fc sync --region cn-shanghai --service-name myService --type config
```

## 特点对比

| 模式 | 使用方法 | 优势 |  劣势 |  适用场景  |
| --- | --- | --- | --- | --- |
| Yaml模式 | 在具有符合Serverless Devs规范，且存在资源/行为描述的Yaml文件的应用目录下，执行组件对应的命令，即可直接使用，例如`s deploy`，`s servicename build`等 | 可以一键部署一个完整的应用（例如，某个应用中规定了多个Service，可以通过该命令一键部署）；同时，通过资源/行为描述文档，可以更佳简单，清晰的对应用进行描述； | 需要学习Yaml的规范，且在某些时候与一些自动化流程进行结合，会比较复杂； | 部署、运维等操作，尤其是批量操作时更为合适； |
| 纯Cli模式 | 在任何目录下，通过子命令`cli`进行触发，同样适用全部组件，例如`s cli deploy -p "{/"function/": /"function-name/"}"`，`s cli fc-api listFunctions --service-name my-service` | 相对来说可以更加简单，快速上手工具，并且可以非常简单的与自动化流程进行结合，降低了Yaml格式/规范的学习难度 | 对于一些复杂项目而言，需要在命令行中写过多的参数，出错的概率会比较高；mei you ban fa | 更适合项目的管理，源自化操作 |