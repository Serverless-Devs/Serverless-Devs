---
title: Pacakge 模型
description: 'Pacakge 模型'
position: 4
category: '开发包模型'
---

# Pacakge 模型

Pacakge 模型部分介绍了 Serverless Package Model (SPM) 的建设模型，包括了：

- [模型的组成](#模型的组成)
- [模型的规范](#模型的规范)
    - [组件模型规范](#组件模型规范)
        - [组件模型元数据](#组件模型元数据)
            - [参数详解](#参数详解)
                - [Provider](#Provider)
                - [Category](#Category)
                - [Service](#Service)
                - [Commands](#Commands)
                - [Properties](#Properties)
        - [组件模型代码规范](#组件模型代码规范)
    - [应用模型规范](#应用模型规范)
        - [应用模型元数据](#应用模型元数据)
            - [参数详解](#参数详解-1)
                - [Provider](#Provider-1)
                - [Category](#Category-1)
                - [Service](#Service-1)
                - [Parameters](#Parameters)
    - [插件模型规范](#插件模型规范)
        - [插件模型元数据](#插件模型元数据)
            - [参数详解](#参数详解-1)
                - [Provider](#Provider-1)
                - [Category](#Category-1)
                - [Service](#Service-1)
                - [Parameters](#Parameters)
## 模型的组成

Serverless Package Model 包括两个部分：

- Component Model：组件模型，即通过Serverless Devs，可以被应用所引用，并按照用户的输入，执行预定的功能。例如某个应用中引用了FC组件，那么此时，用户可以通过传入Deploy命令进行函数的部署，而这里的FC组件，则是需要建立在组件模型基础之上，即要符合组件的开发规范；
- Application Model：应用模型，即通过Serverless Devs，可以被初始化的应用案例，通常一个应用案例包括了一个yaml文件，在该文件中可以包括一个或多个组件来共同完成某个业务。这里所说的应用，就是需要建立在应用模型基础之上的，或者说是需要符合应用开发规范的；

## 模型的规范

### 组件模型规范

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


#### 组件模型元数据

组件模型元数据将会在`publish.yaml`中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和引用。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 0.0.2
Type: Component
Name: 名称
Provider:
  - 云厂商名称 
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/全栈应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  服务名:  # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Commands: # 指令，格式为指令：指令描述，例如：
  deploy: 部署函数
  invoke: 调用函数
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
```

##### 参数详解

| 目录 | 必须 | 结构 | 含义 |
| --- | --- | --- | --- |
| Edition | 是 | String | 当前Yaml的版本，推荐0.0.2 |
| Type | 是 | String | 类型，包括Component和Application，Plugin三个取值，此处取值Component |
| Name | 是 | String | 组件名称 |
| Provider | 是 | List<String> | 组件所支持的云厂商信息 |
| Version | 是 | String | 组件版本号，例如0.0.1 |
| Description | 是 | String | 组件描述（一句话的简短描述） |
| HomePage | 否 | String | 组件的主页，可以填写组件的仓库地址 |
| Tags | 否 | List<String> | 组件的标签 |
| Category | 是 | String | 组件的分类 |
| Service | 是 | Struct | 组件所需要的服务和相关的权限等描述，例如该组件需要函数计算，Serverless工作流等产品/服务作为支持 |
| Commands | 是 | Struct | 组件支持的命令 |
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

###### Commands

组件所支持的命令，有两种形式：

- 形式一：
    ```
    Commands:
        demo: 案例命令
        test: 测试命令
    ```
- 形式二：
        ```
    Commands:
        Deploy & Build:
            deploy: 项目部署
            build: 项目构建
        Others:
            demo: 案例命令
            test: 测试命令
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

#### 组件模型代码规范

在组件模型中，代码组成规范有两个部分：
- `package.json`中需要描述清楚入口文件所在地址；例如`{"main": "./dist/index.js"}`；
- 在代码中实现对应的用户方法。例如Package开发者希望用户可以通过deploy命令，进行项目的部署，那么就可以实现一个deploy的方法，并在方法内实现对应的部署能力；

关于代码规范部分，可以参考如下案例：

```typescript
import logger from './common/logger';
import { InputProps } from './common/entity';

export default class ComponentDemo {
  /**
   * demo 实例
   * @param inputs
   * @returns
   */
  public async test(inputs: InputProps) {
    logger.debug(`input: ${JSON.stringify(inputs.props)}`);
    logger.info('command test');
    return { hello: 'world' };
  }
}
```

其中入参`inputs`的结构为：

```json
{
    "command": "", 
    "project": {
        "projectName": "", 
        "component": "",
        "provider": "",
        "access": ""
    },
    "credentials": {},
    "props": {},
    "args": "",
    "argsObj": [],
}
```

| 目录 | 含义 |
| --- | --- | 
| command | 用户所执行的命令 | 
| project | 用户的项目基本信息 | 
| credentials | 用户的密钥信息 | 
| props | 用户配置的属性/参数 |
| args| 用户传递的参数（字符串形式） | 
| argsObj| 用户传递的参数（解析后的，以数组形式传递） |


在上面的案例代码中，可以看到有一个test方法，该方法就是功能实现的方法。此时当用户使用test命令时，系统就会携带参数调用该方法。以一个真实案例作为举例说明：

该组件名为`hexo`，组件核心代码如上所示，具备一个test方法，此时用户侧的Yaml为：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1  #  秘钥别名

services:
  HexoComponent:
    component: hexo
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
```

当用户执行`s test mytest -a -b abc`，此时，组件代码中的`test`方法，收到的`inputs`参数实际上是：

```json
{
    "command": "test", 
    "project": {
        "projectName": "HexoComponent", 
        "component": "hexo",
        "provider": "alibaba",
        "access": "release"
    },
    "credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********"
    },
    "props": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "args": "mytest -a -b abc",
    "argsObj": [
      "mytest", "-a", "-b", "abc"
    ]
}
```

此时test方法会打印日志信息等，并返回最终的结果给命令行工具：`{ "hello": "world" }`

### 应用模型规范

Application Model，即应用模型，需要通过指定的文件进行模型的规范和定义的，在这里，推荐的应用模型目录结构为：

```
|- src # 目录名字不可以变更
|   └── 应用目录
|   └── s.yml: 应用描述文件
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```

其中：

| 目录 | 必须 | 含义 |
| --- | --- | --- |
| src | 必须存在 | 应用所在目录 |
| s.yml | 必须存在 | 应用的资源描述Yaml，需要符合该应用对应的publish，yaml规范 |
| publish.yaml | 必须存在 | Serverless Devs Package的开发识别文档  |
| readme.md | 必须存在 | 对该应用的描述，或帮助文档信息  |
| version.md| 推荐存在 | 版本的描述，例如当前版本的更新内容等 |

#### 应用模型元数据

应用模型元数据将会在`publish.yaml`中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和初始化。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 0.0.2
Type: Application
Name: 名称
Provider:
  - 云厂商名称 
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/全栈应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  服务名: # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
```

##### 参数详解

| 目录 | 必须 | 结构 | 含义 |
| --- | --- | --- | --- |
| Edition | 是 | String | 当前Yaml的版本，推荐0.0.2 |
| Type | 是 | String | 类型，包括Component和Application，Plugin三个取值，此处取值Application |
| Name | 是 | String | 组件名称 |
| Provider | 是 | List<String> | 组件所支持的云厂商信息 |
| Version | 是 | String | 组件版本号，例如0.0.1 |
| Description | 是 | String | 组件描述（一句话的简短描述） |
| HomePage | 否 | String | 组件的主页，可以填写组件的仓库地址 |
| Tags | 否 | List<String> | 组件的标签 |
| Category | 是 | String | 组件的分类 |
| Service | 是 | Struct | 组件所需要的服务和相关的权限等描述，例如该组件需要函数计算，Serverless工作流等产品/服务作为支持 |
| Parameters | 是 | Struct | 应用中Yaml内需要填写的字段，严格遵守Json Schema规范标准 |

###### Provider

取值范围：`阿里云`, `百度智能云`, `华为云`, `腾讯云`, `AWS`, `Azure`, `Google Cloud`, `其它`

格式参考：
```yaml
Provider:
    - 阿里云
    - 百度智能云
```

###### Category

取值范围：`基础云服务`, `Web框架`, `全栈应用`, `人工智能`, `音视频处理`, `图文处理`, `监控告警`, `大数据`, `IoT`, `新手入门`, `其它`, `开源项目`其他`

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

    
###### Parameters

在应用模型中，尽管已经有一个完整的`s.yaml`用来描述应用的信息，但是实际上还会存在诸如下面的情况：
- 某些`s.yaml`中的参数需要使用者来填写，例如某些应用需要连接数据库，此时需要用户在初始化应用的时候进行参数的填写；
- 某些`s.yaml`中的参数尽管存在默认值，但是仍任需要用户关注，或者需要用户在某些情况下自定义；
所以，Serverless Package模型，针对Application类型，提供了`Parameters`参数。通过该参数，可以描述`s.yaml`中的相关参数，例如：
    
```yaml
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
    regionName: # 枚举类型
      type: string,
      description: 地域Region
      default: cn-hangzhou # 默认值
      title: 地域
      enum: # 枚举类型
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
```

此时，在`s.yaml`中可以引用该字段，例如：
    
```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test   #  项目名称
vars: # [全局变量，提供给各个服务使用]
  domain: xxxx.yyy.com

services:
  component-test:
    component: demo
    props:
      name: {{ inputsrgs }}
```
    
为了兼容[spec 0.0.1](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.1/serverless_package_model/package_model.md#%E5%BA%94%E7%94%A8%E6%A8%A1%E5%9E%8B%E8%A7%84%E8%8C%83) 中，关于`s.yaml`的特殊格式定义，在当前版本中：
1. 如果`s.yaml`中存在类似`'{{ bucket | alibaba oss bucket }}'`的内容 ，则直接提醒用户需要输入bucket这样的一个参数，作为Yaml中所必须的参数，并以`|`之后的内容"alibaba oss bucket"作为解释这个参数的含义；
2. 如果`s.yaml`中存在类似`"{{ access }}"`内容，则判断`publish.yaml`中是否存在`Parameters`参数以及相关的Key：
    - 如果存在，则默认进行对应；
    - 如果不存在，直接提醒用户需要输入access这样的一个参数，作为Yaml中所必须的参数；

> 关于Parameters参数的格式，严格遵循JSON Scheme的规范标准，更多使用示例可查看[Pacakge 模型 - Parameters参数](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.2/serverless_package_model/publish_model.md)文档。

### 插件模型规范

Plugin Model，即插件模型，需要通过指定的文件进行模型的规范和定义的。在这里，推荐的插件模型目录结构为：

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
| readme.md | 必须存在 | 对该插件的描述，或帮助文档信息  |
| version.md| 推荐存在 | 版本的描述，例如当前版本的更新内容等 |

#### 插件模型元数据

插件模型元数据将会在`publish.yaml`中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和初始化。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 0.0.2
Type: Plugin
Name: 名称
Provider:
  - 云厂商名称 
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/全栈应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  服务名: # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
```

##### 参数详解

| 目录 | 必须 | 结构 | 含义 |
| --- | --- | --- | --- |
| Edition | 是 | String | 当前Yaml的版本，推荐0.0.2 |
| Type | 是 | String | 类型，包括Component和Application，Plugin三个取值，此处取值Plugin |
| Name | 是 | String | 组件名称 |
| Provider | 是 | List<String> | 组件所支持的云厂商信息 |
| Version | 是 | String | 组件版本号，例如0.0.1 |
| Description | 是 | String | 组件描述（一句话的简短描述） |
| HomePage | 否 | String | 组件的主页，可以填写组件的仓库地址 |
| Tags | 否 | List<String> | 组件的标签 |
| Category | 是 | String | 组件的分类 |
| Service | 是 | Struct | 组件所需要的服务和相关的权限等描述，例如该组件需要函数计算，Serverless工作流等产品/服务作为支持 |
| Parameters | 是 | Struct | 应用中Yaml内需要填写的字段，严格遵守Json Schema规范标准 |

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

    
###### Parameters

在插件模型中，可以通过`Parameters`定义插件的参数信息：
    
```yaml
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
    regionName: # 枚举类型
      type: string,
      description: 地域Region
      default: cn-hangzhou # 默认值
      title: 地域
      enum: # 枚举类型
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
```

#### 插件模型代码规范

在插件模型中，代码组成规范有两个部分：
- `package.json`中需要描述清楚入口文件所在地址；例如`{"main": "./dist/index.js"}`；
- 在代码中实现默认等方法。

关于代码规范部分，可以参考如下案例：

```javascript
const core = require("@serverless-devs/core");
const { lodash, fse, rimraf } = core;
/**
 * Plugin 插件入口
 * @param inputs 组件的入口参数
 * @param args 插件的自定义参数
 * @return inputs
 */

module.exports = async function index(inputs, args) {
  return lodash.merge(inputs, {
    props: {
      function: {
        runtime: "custom",
        codeUri: path.join(__dirname, "./code"),
        customRuntimeConfig: {
          command: ["node"],
          args: ["/code/index.js"],
        },
      },
    },
  });
};
```

在上面的案例中，插件的方法有两个入参，分别是`inputs`和`args`的结构为：

- `inputs`参数：
    ```json
    {
        "command": "", 
        "project": {
            "projectName": "", 
            "component": "",
            "provider": "",
            "access": ""
        },
        "credentials": {},
        "props": {},
        "args": "",
        "argsObj": [],
        "services": [],
        "output": {},
    }
    ```
    
    | 目录 | 含义 |
    | --- | --- | 
    | command | 用户所执行的命令 | 
    | project | 用户的项目基本信息 | 
    | credentials | 用户的密钥信息 | 
    | props | 用户配置的属性/参数 |
    | args| 用户传递的参数（字符串形式） | 
    | argsObj| 用户传递的参数（解析后的，以数组形式传递） |
    | services| 记录服务的传递参数 |
    | output| 如果在组件执行之前使用插件，无此参数，如果在组件执行之后使用插件，有此参数，此参数表示组件的输出结果 |

- `args`参数是插件的入参，格式为`object`


由于返回结果（`reutrn`），可能会作为组件的输入，所以该格式，与inputs的整体规范基本一致（无`outputs`对象），即：

```json
{
    "command": "", 
    "project": {
        "projectName": "", 
        "component": "",
        "provider": "",
        "access": ""
    },
    "credentials": {},
    "props": {},
    "args": "",
    "argsObj": [],
    "services": [],
    "plugin": {}
}
```

例如上面的案例中，返回内容是：
```javascript
return lodash.merge(inputs, {
    props: {
      function: {
        runtime: "custom",
        codeUri: path.join(__dirname, "./code"),
        customRuntimeConfig: {
          command: ["node"],
          args: ["/code/index.js"],
        },
      },
    },
  });
```

即将原结构返回，并针对`props`重的部分参数进行升级。

以一个真实案例作为举例说明：

该组件名为`hexo`，组件核心代码如上所示，具备一个test方法，此时用户侧的Yaml为：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1  #  秘钥别名

services:
  HexoComponent:
    component: hexo
    actions: 
      - pre-deploy:
          - plugin: test
            args:
              key: value
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
```

当用户执行`s test mytest -a -b abc`，此时，插件代码中的默认方法，收到的`inputs`参数实际上是：

```json
{
    "command": "test", 
    "project": {
        "projectName": "HexoComponent", 
        "component": "hexo",
        "provider": "alibaba",
        "access": "release"
    },
    "credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********"
    },
    "props": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "args": "mytest -a -b abc",
    "argsObj": [
      "mytest", "-a", "-b", "abc"
    ]
}
```

`args`参数实际上是：

```json
{
  "key": "value"
}
```
