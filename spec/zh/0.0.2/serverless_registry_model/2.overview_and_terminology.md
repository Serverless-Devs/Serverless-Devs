---
title: 概述和术语
description: '概述和术语'
position: 3
category: 'Registry模型'
---


# 概述和术语

本节讲述了 SRM 及其术语。它首先是一个 Serverless Devs Model(SDM) 中不可或缺的概念，它代表的是 Serverless 的一种开发者生态，Serverless Devs 开发者工具 开发者工具将会通过 Serverless Registry 进行应用案例的拉取，或者组件的下载和使用，而 Serverless Registry Model(SRM) 则是 Serverless Registry 的规范和标准。

## 模型概述

该规范提出了一个模型，定义 Serverless Registry 如下：

> Serverless Registry 是承载 Serverless 生态的抽象概念，与 Python Pypi，Nodejs NPM 等类似，Serverless Registry 用于开放和共享 Serverless Package。

在当前版本中，Serverless Registry 定义了以下内容：
- Serverless Registry 将会同时承载应用和组件；
- 应用和组件在 Serverless Registry 上将会具有不同数据结构的元数据；
- Serverless Registry 的应用可以通过规范的 API 进行查询和获取；
- Serverless Registry 可以且仅可以承载符合 [Serverless Package Model 规范](./../serverless_package_model)的 Package （包括应用与组件）；
- Serverless Registry 所承载的内容可以在之后的版本进行拓展；
- Serverless Registry 可以根据 Registry 建设者/组织的需求增加符合自身需要的权限鉴定策略；
- Serverless Registry 中的 Package （包括应用与组件）应当具备版本的划分能力，以及 Package 的增加、删除的能力；
