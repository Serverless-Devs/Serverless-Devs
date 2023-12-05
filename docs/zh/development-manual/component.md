---
title: 组件开发
description: '组件开发'
position: 2
category: '开发手册'
---

# 组件开发规范

通过Serverless Devs，可以被应用所引用，并按照用户的输入，执行预定的功能。例如某个应用中引用了FC组件，那么此时，用户可以通过传入Deploy命令进行函数的部署，而这里的FC组件，则是需要建立在组件模型基础之上，即要符合组件的开发规范；

> 🐵 温馨提示，在进行 Serverless Devs 的组件开发时，可能会遇到很多相对来说更为通用的能力，包括不限于：
> - 获取用户的密钥信息
> - 进行更规范的格式化输出
> - 对用户的输入参数进行解析   
> ......   
> 这些内容都可以通过 Serverless Devs 所提供的 [Core包](https://github.com/Serverless-Devs/core) 进行提供，更多 [Core包](https://github.com/Serverless-Devs/core) 信息，可以参考 [Core包的开发文档](https://github.com/Serverless-Devs/core)

- [快速开始](#快速开始)
- [目录结构](#目录结构)
- [组件模型元数据](#组件模型元数据)
  - [参数详解](#参数详解)
  - [代码规范](#代码规范)

## 快速开始

Serverless Devs的组件开发案例已经被集成到Serverless Devs命令行工具中，通过对Serverless Devs的命令行工具，可以进行空白组件项目的初始化，开发者只需要执行`s init`即可看到：

![s init](https://gw.alicdn.com/imgextra/i2/O1CN01nO85g424zBx2E8CnQ_!!6000000007461-1-tps-1179-792.gif)

```shell script

🚀 More applications: https://registry.serverless-devs.com

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

此时，选择最后的`Dev Template for Serverless Devs`，并按回车：

```shell script
$ s init

🚀 More applications: https://registry.serverless-devs.com

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
 Application Scaffolding 
❯  Component Scaffolding 
  Plugin Scaffolding 
```

此时，选择`Component Scaffolding`，并按回车，即可完成一个完整的Serverless Devs的Component项目的初始化，可以通过命令查看文件树：

```shell script
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____LICENSE
|____.signore
|____.prettierignore
|____README.md
|____publish.yaml
|______tests__
| |____mocks
| | |____s.yaml
| | |____code
| | | |____index.js
| |____index.test.ts
| |____cli.test.ts
|____.gitignore
|____package-lock.json
|____package.json
|____.prettierrc.js
|____tsconfig.json
|____jest.config.ts
|____src
| |____commands-help
| | |____remove.ts
| | |____index.ts
| | |____deploy.ts
| | |____alias.ts
| |____index.ts
```

## 目录结构

Component Model，即组件模型，需要通过指定的文件进行模型的规范和定义的。在这里，推荐的组件模型目录结构为：

```
|- src # 目录名字可以变更
|   └── 代码目录  
|- package.json: 需要定义好main   
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```

其中：

| 目录 | 必须 | 含义 |
| --- | --- | --- |
| src | 推荐存在 | 统一放置功能实现，当然也可以换成其他的名称，或者平铺到项目下，但是推荐通过src来做统一的存放 |
| package.json | 必须存在 |  Node.js的package.json，需要描述清楚组件的入口文件位置  |
| publish.yaml | 必须存在 | Serverless Devs Package的开发识别文档  |
| readme.md | 必须存在 | 对该组件的描述，或帮助文档信息  |
| version.md| 推荐存在 | 版本的描述，例如当前版本的更新内容等 |

## 组件模型元数据

组件模型元数据将会在`publish.yaml`中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和引用。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 3.0.0
Type: Component
Name: 名称
Provider:
  - 云厂商名称 # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
Service: # 使用的服务
  服务名:  # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Commands: # 指令，格式为指令：指令描述，例如：
  deploy: 部署函数
  invoke: 调用函数
Organization: 组织名称
Effective: 可视 / Public， Private，Organization
Parameters:
  type: object
  additionalProperties: false
  required: # 必填项
    - region
    - service
  properties:
    region: # 枚举类型
      default: cn-hangzhou
      title: 地域 # 名称
      enum: # 枚举
        - cn-beijing
        - cn-hangzhou
```

### 参数详解

| 目录 | 必须 | 结构 | 含义 |
| --- | --- | --- | --- |
| Edition | 是 | String | 当前Yaml的版本，推荐3.0.0 |
| Type | 是 | String | 类型，包括Component和Project，Plugin三个取值，此处取值Component |
| Name | 是 | String | 组件名称 |
| Provider | 是 | List<String> | 组件所支持的云厂商信息 |
| Version | 是 | String | 组件版本号，例如0.0.1 |
| Description | 是 | String | 组件描述（一句话的简短描述） |
| HomePage | 否 | String | 组件的主页，可以填写组件的仓库地址 |
| Tags | 否 | List<String> | 组件的标签 |
| Category | 是 | String | 组件的分类 |
| Service | 是 | Struct | 组件所需要的服务和相关的权限等描述，例如该组件需要函数计算，Serverless工作流等产品/服务作为支持 |
| Organization | 是 | String | 组件的组织名称 |
| Effective | 是 | String | 组件的可视权限 |
| Properties | 是 | Struct | 组件的参数描述，组件的属性定义，严格遵守Json Schema规范标准 |

###### Provider

取值范围：`阿里云`, `百度智能云`, `华为云`, `腾讯云`, `AWS`, `Azure`, `Google Cloud`, `其它`

格式参考：
```yaml
Provider:
    - 阿里云
    - 百度智能云
```    
    
###### Category

取值范围：`基础云服务`, `Web框架`, `全栈应用`, `人工智能`, `音视频处理`, `图文处理`, `监控告警`, `大数据`, `IoT`, `新手入门`, `其它`, `开源项目`

格式参考：
```yaml
Category: 基础云服务
```

###### Service

取值范围：`函数计算`, `容器服务`, `镜像服务`, `消息队列`, `工作流`, `CDN`, `对象存储`, `表格存储`, `MNS`, `日志服务`, `API网关`, `数据库`, `解析服务`, `云应用`, `其它`

格式参考：
```yaml
Service: # 使用的服务
  函数计算:
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime，取值包括：Node.JS, Python, PHP, Java, Go, 其它
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
```

###### Properties  

Properties参数的格式，严格遵循JSON Scheme的规范标准，具体格式，可以参考以下案例：
    
```yaml
Properties:
  type: object
  additionalProperties: false
  required: # 必填项
    - region
    - service
  properties:
    region: # 枚举类型
      default: cn-hangzhou
      title: 地域 # 名称
      enum: # 枚举
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
        - cn-qingdao
    service:
      title: 服务配置 # 名称
      type: object # 类型
      properties:
        name: # 正则校验
          title: 名称
          description: 只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-128 之间。
          type: string
          pattern: '^[a-zA-Z0-9-_]{1,128}$'
        internetAccess: # boolean 值
          title: 允许公网访问
          description: 配置服务中的函数是否可以访问互联网
          default: true
          type: boolean
        logConfig: # 复杂类型
          title: 日志配置
          oneOf: # 只能有一个生效
            - title: 自动配置
              enum:
                - auto
            - logConfig:
                type: object
                title: 日志配置
                additionalProperties: true
                required:
                  - project
                  - logstore
                properties:
                  project:
                    type: string
                    title: 日志项目
                    default: ''
                    examples:
                      - xx-project
                  logstore:
                    type: string
                    title: 日志仓库
                    default: ''
                    examples:
                      - xx-logstore
                  logBeginRule:
                    title: 日志分割规则
                    default: None
                    enum:
                      - DefaultRegex
                      - None
                  enableRequestMetrics:
                    type: boolean
                    title: 请求级别指标
                    default: true  # 默认值
                  enableInstanceMetrics:
                    type: boolean
                    title: 实例级别指标
                    default: false
                    examples:
                      - true
```

### 代码规范

在组件模型中，代码组成规范有两个部分：
- `package.json`中需要描述清楚入口文件所在地址；例如`{"main": "./dist/index.js"}`；
- 在代码中实现对应的用户方法。例如Package开发者希望用户可以通过deploy命令，进行项目的部署，那么就可以实现一个deploy的方法，并在方法内实现对应的部署能力；

关于代码规范部分，可以参考如下案例：

```typescript
import * as commandsHelp from './commands-help';
import { IInputs } from '@serverless-devs/component-interface';
import { parseArgv } from '@serverless-devs/utils';

// 示例组件
export default class StartComponent {
  private logger: any;
  public commands = {};
  constructor({ logger = console }) {
    this.logger = logger;
    this.commands = commandsHelp;
  }
  // 基本示例
  // 部署
  public async deploy(inputs: IInputs) {
    this.logger.debug(`deploy inputs: ${JSON.stringify(inputs)}`);
    const argv = parseArgv(inputs.args);
    this.logger.debug(`y=${argv.y}`);
    const credential = await inputs.getCredential();
    this.logger.debug(`credential: ${JSON.stringify(credential, null, 2)}`)
    this.logger.progress('this is a test message');
    return { hello: 'world', message: 'this is a deploy function', y: argv.y };
  }
}
```

其中入参`inputs`的结构为：

```ts
{
    props: Record<string, any>;
    name: string;
    command: string;
    yaml: {
        path: string;
    };
    resource: {
        name: string;
        component: string;
        access: string;
    };
    getCredential: () => Promise<ICredentials | any>;
    args: [];
    cwd: string;
    outputs?: Record<string, any>;
}
```

| 目录 | 含义 |
| --- | --- | 
| props | 用户配置的属性/参数 |
| name | 用户的项目名称 |
| command | 用户所执行的命令 |
| yaml | 用户的yaml配置文件路径 |
| resource | 用户的应用模块基本信息 | 
| getCredential | 用户的密钥信息 | 
| args| 用户传递的参数（解析后的，以数组形式传递） |
| cwd| 用户执行linux命令的当前路径 |
| outputs | 记录之前已执行完的模块输出结果 |

在上面的案例代码中，可以看到有一个deploy方法，该方法就是功能实现的方法。此时当用户使用deploy命令时，系统就会携带参数调用该方法。以一个真实案例作为举例说明：

该组件名为`hexo`，组件核心代码如上所示，具备一个test方法，此时用户侧的Yaml为：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: hello-world-app      #  项目名称
access: default  #  秘钥别名

resources:
  HexoComponent:
    component: hexo
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
  Hexo2Component:
    component: hexo
    props:
      region: 'cn-huhehaote'
      codeUri: './src'
```

当用户执行`s deploy --debug`，此时，组件代码中的`deploy`方法，收到的`inputs`参数实际上是：

```json

{
    "cwd": "/Users/start-component-v3/__tests__/mocks",
    "name": "hello-world-app",
    "props": {
        "region": "cn-huhehaote",
        "code": "./code"
    },
    "command": "deploy",
    "args": [
        "--debug"
    ],
    "yaml": {
        "path": "/Users/start-component-v3/__tests__/mocks/s.yaml"
    },
    "resource": {
        "name": "Hexo2Component",
        "component": "/Users/start-component-v3",
        "access": "default"
    },
    "outputs": {
        "HexoComponent": {
            "hello": "world",
            "message": "this is a deploy function"
        }
    }
}

```