---
title: 概述
description: 'Serverless Devs Model(SDM) 文档是由 Serverless Devs 社区发起编写的第一版关于 Serverless 工具链的规范模型文档。该文档将会主要通过 Serverless 工具链体系中的 Registry模型，开发工具模型以及用户使用模型三个模块进行撰写'
position: 1
category: '概述'
---

# Serverless Devs Model(SDM) v0.0.2 文档

- 版本：v0.0.2
- 作者：
    - 发起人：
        - [Anycodes](https://github.com/anycodes)
    - 贡献者：
        - [heimanba](https://github.com/heimanba)
        - [lowkeyrd](https://github.com/lowkeyrd)
        - [hanxie](https://github.com/hanxie-crypto)
- 时间：2021.12.29
- 内容：
    - [Serverless Registry Model](./serverless_registry_model)
    - [Serverless Package Model](./serverless_package_model)
    - [Serverless User Model](./serverless_user_model)

## 简介

Serverless Devs Model(SDM) v0.0.2 文档是由 Serverless Devs 社区发起编写的第一版关于 Serverless 工具链的规范模型文档。该文档将会主要通过 Serverless 工具链体系中的 **Registry模型**，**开发工具模型**以及**用户使用模型**三个模块进行撰写。

![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631773288370_20210916062130083859.png)

由上图所示，Serverless Devs 的开发角色分为两部分：
- **Package developer**：指的是开发/贡献符合 Serverless Package Model 规范的组件或者公开的应用案例；这部分开发者通常会吧应用发布到对应的 Registry 上；
- **Serverless developer**：指的是 Serverless 应用的开发者，这部分开发者通过使用 Package developer 开发的公共应用案例或者引用不同的组件，将自己的应用部署到不同的 Serverless 平台，或者对应用进行不同的处理，包括不限于构建、观测、压测、调试等；

同时通过上图也可以看到两个比较明显的词汇：Component和Application：
- **Component**：指的是组件；是由 Package developer 开发并发布的符合 Serverless Package Model 规范的一段代码，通常这段代码会在应用中被引用，并在 Serverless Devs 开发者工具 中被加载，并按照预定的规则进行执行某些动作。例如，将用户的代码部署到 Serverless 平台；将 Serverless 应用进行构建和打包；对 Serverless 应用进行调试等；
- **Application**：指的是应用；可以由 Package developer 公开发布到 Registry，以供更多人学习和使用，例如某位贡献者贡献了一个猫狗识别的案例到Registry；也可以由 Serverless developer 开发，例如某人开发了一个 人脸识别的应用；通常情况下一个应用可以引用一个或者多个组件，并通过 Serverless Devs 开发者工具 工具部署到 Serverless 平台，例如我开发了一个猫狗识别的应用，在这个应用中引用了 Lambda 组件帮助我将部分业务逻辑部署到 FaaS 平台，同时我也引用了 Website 组件帮助我把前端业务代码部署到对象存储中；

通过上图，同样也可以看到 Serverless Devs Model 包含了以下三个模块： 

- **Registry模型**：一个开放的 Serverless Registry Model。Package的开发者可以将自己开发的组件，或者待分享的应用发布到该平台。该平台可以使用目前 Serverless Devs 所支持的 Github Resitry， Gitee Registry， Serverless Registry，也可以按照该规范搭建私有的 Registry 以完成部分能力。详情可以参考[Registry模型文档](serverless_registry_model)
- **开发包模型**：一个关于 Serverless Package 的规范。Package developer 需要遵循该规范进行组件的开发或者应用的共享，否则将无法被 Serverless Devs 开发者工具 工具所识别和加载，也无法被 Application 所引用，并实现预期的功能。详情可以参考[开发包模型](serverless_package_model)
- **用户使用模型**：Serverless developer 在进行应用开发时所需要遵守的约定，以确保 Serverless Devs 开发者工具 可以准确识别相对应的内容，并按照预期加载对应的 Component，完成预期的功能。详情可以参考[用户使用模型文档](serverless_user_model)

## 更新内容

- **开发包模型**
    - Commands规范升级
    - Properties规范变更为Json Schema规范

## 社区

### 贡献

有关详细信息，请参阅[贡献指南](../../../CONTRIBUTING.md)。


## 协议

Serverless Devs 是一个遵循 [Apache 2.0](../../../LICENSE) 协议的开源项目。

Serverless Devs 使用的 node_modules 以及其他第三方的依赖库都可能有其遵循的协议，我们推荐你阅读并了解这些协议，因为其中的条款可能和 Apache 2.0 协议中的不完全相同。
