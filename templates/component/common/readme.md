# 组件开发指南

## 前言

感谢您有想法为Serverless Devs Tool贡献一份力量。

Serverless目前被很多人炒的火热，但是实际上Serverless仍然算是一个"萌新"，厂商高度绑定、没有合适的开发工具......很多问题，让很多接触Serverless的开发者望而生畏，为了缓解这个尴尬的局面，Serverless Devs社区立志做一款社区驱动，完全开源开放的Serverless工具类产品，并且希望可以根据这个工具，可以拓展其生态，可以为广大的开发者提供更多的学习资源、案例资源以及最佳实践等。

为了更加开放，为了Serverless，我们推出了应用中心这个产品，您可以将您的应用，包，插件分享给更多平台上的用户，同时，我们也非常感谢您为Serverless做的一起贡献，和我们一起Serverless，让我们每个人都是Serverless的贡献者、推动者，Serverless将会因为您的贡献而变得更加美好。

## 开发规范

以下开发规范仅是测试版的规范（但是之后的规范会兼容这套规范），规范会在后期不断完善，也期待您可以给我们更多的意见、建议。

项目目录必须遵守以下格式：

```
|- src
|   └── 项目代码   
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介   
```

#### publish.yaml

这个文件时项目的描述文档。系统将会在您发布资源的时候，读取该文档并且进行相关信息的录入，请您务必认真填写。

```yaml
Type: Component
Name: 名称
Provider:
  - 云厂商名称 # Alibaba/Baidu/Huawei/AWS/Google Cloud/Azure/Vercel/Tencent
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  - Name: 服务名 # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Commands: # 指令，格式为指令：指令描述，例如：
  deploy: 部署函数
  invoke: 调用函数
Properties:
  Region: # 参数
    Description: 参数描述
    Required: true # 参数必选，true/false
    Type: # 参数类型
      - String
```

部分参数取值范围：

* 云厂商：
    ```Alibaba, Baidu, Huawei, Tencent, AWS, Google, Azure, Vercel, Other```
    
* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
* 云厂商：
    ```函数计算, 容器服务, 镜像服务, 消息队列, 工作流, CDN, 对象存储, 表格存储, MNS, 日志服务, API网关, 数据库, 解析服务, 云应用, 其他```
    
* 运行时：
    ```Node.JS 12, Node.JS 10, Node.JS 8, Node.JS 6, Python3, Python2, PHP7, PHP5, MNS, Java8, Go, Other```

#### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

## 项目开发

本例子仅是一个开发样例，尽可能的为您描述清楚每个开发细节。如果有任何问题可以随时和我取得联系（Wechat：anycodes_02）

### 创建项目

在控制台执行：`s platform init -t component`，即可创建一个Component模板：

```
$ s platform init -t component

Initializing......
Initialization successfully
$ ls  
src    publish.yaml	    readme.md
```

此时，我们创建一个目录`src`, 并且在`src`目录下创建`index.js`, 当然，如果项目本身已经存在了，可以跳过这一步骤：

```
$ mkdir src && cd src && touch index.js
$ ls
index.js

```
> 这里要额外说明，大家在发布自己的`component`的时候（即执行`s platform publish`的时候），系统会打包`src`目录下的所有文件，并且上传到服务端。所以这个目录下请勿放敏感信息和数据。
> 在用户使用您开发的组件的时候，会默认寻找`index.js`文件，所以，这个文件是必须存在的。

### 开发组件

本组件仅供测试，希望您可以通过这个组件开发过程，可以有所收获。

首先要明确的是，我们的`index.js`基本样子：

```javascript
const { Component } = require('@serverless-devs/s-core')
class MyComponent extends Component {
}
module.exports = MyComponent
```

我们需要对外暴露的方法，直接写在`MyComponent`中即可，例如，我需要对外暴露一个`test`方法，就是输出Hello World，那么此时：

```javascript
const { Component } = require('@serverless-devs/s-core')
class MyComponent extends Component {
    async test(inputs){
        return "hello world"
    }   
}
module.exports = MyComponent
```

这里要额外注意，所有对外暴露的方法，会默认有一个入参，参数格式：

```
{
    "Command": "deploy", // 用户使用的方法名称
    "Project": {
        "ProjectName": "DjangoProject",  // 用户Yaml的ProjectName，在当前Yaml文件下唯一
        "Component": "website", // 用户使用的组件名，实际上就是你目前开发的组件
        "Provider": "huaweicloud",  // 用户的云厂商名称
        "AccessAlias": "demo" // 用户使用的密钥别名
    },
    "Credentials": {}, // 密钥信息
    "Properties": {}, // Yaml输入
    "Args": "" // 命令行输入的参数
}
```

例如，用户的Yaml格式为：

```yaml
HexoComponent:
  Component: hexo
  Provider: alibaba
  Access: release
  Properties:
    Region: 'cn-hangzhou'
    CodeUri: './src'
```

当用户执行`s deploy mytest -a -b abc`，此时，您的`deploy`方法，收到的`inputs`参数实际上是：

```
{
    "Command": 'deploy', 
    "Project": {
        ProjectName: 'HexoComponent', 
        Component: 'hexo',
        Provider: 'alibaba',
        AccessAlias：'release'
    },
    "Credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********",
    },
    "Properties": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "Args": "mytest -a -b abc"
}
```

* 关于Credentials的说明，不同云厂商会提供不同的Key，例如：
    ```
    {
      alibaba: ['AccountID', 'AccessKeyID', 'AccessKeySecret'],
      aws: ['AccessKeyID', 'SecretAccessKey'],
      baidu: ['AccessKeyID', 'SecretAccessKey'],
      huawei: ['AccessKeyID', 'SecretAccessKey'],
      azure: ['KeyVault', 'Secret'],
      tencent: ['AccountID', 'SecretID', 'SecretKey'],
      google: ['AccountID', 'PrivateKeyData']
    }
    ```
  如果，用户此时是使用的在当前项目下的`access.yml`/`access.yaml`文件中的临时密钥，则此处的`Key`是该临时密钥。例如用户虽然配置了`Provider: alibaab`，但是他使用了`access.yaml`：
  ```
  # access.yaml
  
  mytest:
    Key1: Value1
    Key2: Value2
  ```
  此时，用户也配置了`Access`，且`Access: mytest`，那么此时您收到的`Credentials`，则为：
  ```
  "Credentials": {
      "Key1": "Value1",
      "Key2": "Value2"
  },
  ```
  
* 关于`Args`参数说明，这部分您收到的是字符串，但是实际上您可以通过继承的方法，直接解析出来，例如：
  ```
  this.args(inputs.Args)
  ```
  此时，我在控制台输入：
  
  ```
  s deploy c-1 c-2 c-3 -a b --cc d
  ```
  
  这一部分的解析结果是：
  
  ```
  { Commands: [ 'c-1', 'c-2', 'c-3' ], Parameters: { a: 'b', cc: 'd' } }
  ```
  
  其实在this.args()方法中是有三个参数的，即：
  
  - argsStr: 这部分是String类型，是参数
  - boolList: 这部分是Array类型，是告诉解析时有那些参数是true/false类型
  - moreList: 这部分是Array类型，是告诉解析时有那些参数是带有空格的
  
  例如，当我boolList设置成了`['a', 'b']`，那么当我传入的数据为`-a 1 -b 2 -c 3`
  
  系统为我解析的结果是： 
  
  ```
  {
    Commands: [ '1', '2' ],
    Parameters: {
      a: true,
      b: true,
      c: '3'
    }
  }
  ```
  
  再例如，当我们的moreList设置为`['start-time']`之后，当我传入`-a 1 2 3 --start-time 4 5 6`
  
  系统为我解析的结果是： 
  
  ```
  {
    Commands: [ '2', '3' ],
    Parameters: {
      a: '1',
      start-time: '4 5 6'
    }
  }
  ```
  
其实，在整个组件在执行过程中，你可以认为是在执行一段脚本。

其中日志输出可以使用`console.log()`，如果是最终的一些结果，展示给用户，可以`return object`。

### 其他操作

#### 状态存储

状态的存储和读取，实际上是在项目中经常用到的，通过这个功能，我们可以存储简单的状态。

> 例如，当用户部署一个hexo组件的时候，在用户没有指定函数名时，我们会为用户生成一个随机的函数名，当用户再次更部署的时候，我们需要检测到上次用户的一个函数名详情，进行更新操作，而不是创建新的操作。此时，就需要使用状态存储，存储一些额外的状态了；
> 再例如，腾讯云的API网关的唯一Key的serviceId，那么这个Id只有我们部署完成，才会得到，所以我们在部署完成之后，要将该Id保存，再次部署的时候指定这个Id，而不是重新创建新的API网关服务。

首先进行部分初始化：

```
await this.init()
```

然后进行可以读取状态和存储状态：

读取状态：

```
const state = this.state
```

存储状态：

```
this.state = {}
this.save()
```

#### 组件加载、调用

这个部分主要是组件之间的依赖，例如在使用某个组件的时候，可能需要依赖某些基础组件，此时，我们就可以通过这个方法使用。

例如，我在做某个Component的时候，需要导入fc组件，则：

```
const fc = await this.load('fc', 'Component', 'alibaba');
```

其中load有三个参数，分别是：

- componentName： 组件名
- componentAlias：设置的别名
- provider：组件的提供商


#### 帮助文档

在某些多级指令下，组件内，可能需要输出帮助文档，可以使用本方法。

直接将s启动器的inputs和help传入即可，例如：

```
this.help(inputs, {
    "description": "这是帮助文档",
    "commands": [{
          "name": "指令1",
          "desc": "指令1描述",
        },{
          "name": "指令2",
          "desc": "指令2描述",
        }],
        "args": [{
          "name": "参数1",
          "desc": "参数1描述",
        },{
          "name": "参数2",
          "desc": "参数2描述",
    }],
})

```

当用户执行`s deploy -h/--help`的时候：

```

    这是帮助文档


  Commands: 
      指令1: 指令1描述
      指令2: 指令2描述

  Args: 
      参数1: 参数1描述
      参数2: 参数2描述


```

#### 如何本地测试组件

本地测试组件的方法很简单，我们只需要在Component中写上本地路径即可，即通过这个路径，直接就可以找到`index.js`文件。例如：

```
HexoComponent:
  Component: /Users/jiangyu/Desktop/components/fc/src
  Provider: alibaba
  Properties:
    Region: 'cn-hangzhou'
    CodeUri: './src'
```

#### 获取密钥信息

通过`await this.credentials(inputs)`可获取密钥信息。


## 额外说明

* 包类型+包名称+云厂商+版本 是包的唯一标识，全局唯一不可重复；
* 您一但共享包，将代表着可以被其他人下载，使用。如果您不想被其他人使用，或者共享的包内有敏感信息，请您及时删除包版本等；
* 包所属人是该包第一个发布者，包发布者发布包之后，该包将会和该开发者的账号体系绑定，只有该用户可删除、升级该包，除非该开发者删除掉该包所有版本；
* 包发布者每个版本仅可以发布一次，包一旦发布，不支持修改，如果需要修改，请升级包版本；
* 包如果发布失败，您可以重新发布包，无需升级版本信息；
* 以上额外说明可能会在后续系统升级时进行修改、更正，您可以及时关注Serverless Devs官网，恕不另行通知；

## 联系方式


项目官网：`serverless.cn`，
    
邮箱地址：`service@serverlessfans.com` 