# 插件开发指南

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
Type: Plugin
Name: 名称
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
```

部分参数取值范围：

* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
#### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

## 项目开发

本例子仅是一个开发样例，尽可能的为您描述清楚每个开发细节。如果有任何问题可以随时和我取得联系（Wechat：anycodes_02）

### 创建项目

在控制台执行：`s platform init -t plugin`，即可创建一个Component模板：

```
$ s platform init -t plugin

Initializing......
Initialization successfully
$ ls  
src    publish.yaml	    readme.md
```

此时，我们创建一个目录`src`, 并且在`src`目录下创建`index.js`， 当然，如果项目本身已经存在了，可以跳过这一步骤：：

```
$ mkdir src && cd src && touch index.js
$ ls
index.js

```
> 这里要额外说明，大家在发布自己的`plugin`的时候（即执行`s platform publish`的时候），系统会打包`src`目录下的所有文件，并且上传到服务端。所以这个目录下请勿放敏感信息和数据。
> 在用户使用您开发的组件的时候，会默认寻找`index.js`文件，所以，这个文件是必须存在的。

### 开发组件

本组件仅供测试，希望您可以通过这个组件开发过程，可以有所收获。

首先要明确的是，我们的`index.js`基本样子：

```javascript

export function plugin(inputs) {
  // 输入的参数信息
  console.log(JSON.stringify(inputs));
  
  // 返回对应的结果
  // 此处的返回的内容，将会作为组件的入参，或者是整体的返回结果，所以要认真对待
  return inputs;
}
```

此时，当用户使用该插件的时候，启动器将会将用户写的参数作为inputs传给您，您只需要按照需求处理之后，返回即可。

这里要额外注意参数格式：

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