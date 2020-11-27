# 应用开发指南

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
Type: Application
Name: 名称
Provider:
  - 云厂商名称 # Alibaba/Baidu/Huawei/AWS/Google Cloud/Azure/Vercel/Tencent
Version: 版本，例如0.0.1
Description: 
  zh: 简短的描述/介绍
  en: English
HomePage: 项目首页地址
Tags: #标签详情
  - zh: 部署函数
    en: English
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  - Name: 服务名 # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限权限
      - zh: 创建函数 # 所需要的权限
        en: English
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


## 应用开发

本例子仅是一个开发样例，尽可能的为您描述清楚每个开发细节。如果有任何问题可以随时和我取得联系（Wechat：anycodes_02）

### 创建项目

在控制台执行：`s platform init -t application`，即可创建一个Application模板：

### 编写项目

在`src`目录下，编写您的应用。例如一个音视频处理的例子，一个hello world的例子等。

其实应用更多来说就是一个写好的项目，您可以通过代码+Yaml的方法，将他打包分享给别人，而分享方法则可以通过Serverless Devs App Store来实现。

> 这里要额外说明，大家在发布自己的`component`的时候（即执行`s platform publish`的时候），系统会打包`src`目录下的所有文件，并且上传到服务端。所以这个目录下请勿放敏感信息和数据。

### 测试项目

项目测试方法很简单，只需要在`src`目录下执行`template.yaml`中的指令即可。例如样例中，使用的阿里云函数计算组件，则此时执行`s deploy`等方法可以正常部署即可。

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