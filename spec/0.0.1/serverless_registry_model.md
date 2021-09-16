# Serverless Registry Model (SRM)

## 目录
- [目的和目标](#目的和目标)
- [概述和术语](#概述和术语)
    - [模型概述](#模型概述)
- [Registry模型](#Registry模型)
    - [元数据规范](#元数据规范)
    - [Registry规范](#Registry规范)
- [适用范围](#适用范围)
- [设计原则](#设计原则)

## 目的和目标

Serverless Registry Model(简称SRM，下文将使用SRM代替)的目标是定义一种 Serverless 架构下的 Registry 的规范，与 Python 中的 pypi， Nodejs 中的 npm 等类似，将以此来开放和分享 Serverless Package，建设 Serverless 生态。

为了让大家更简单的理解 Serverless Registry， 可以通过与 Python Pypi， Nodejs NPM 的对比，进行深入探索：

|  |  **Serverless Reigstry**   | Python Pypi  | Nodejs NPM  |
|  ----  | ----  | ----  |  ----  |
| 存储内容  | **Serverless packages**<br>**(包括 Components 和 Application)** | Python packages | Nodejs packages |
| 是否开放标准  | **是** |  是 |  是 |
| 官方源 | **registry.devsapp.cn/simple** | pypi.python.org | registry.npmjs.org |
| 其它源举例 | **Github registry** <br> **Gitee registry** | 清华源 <br> 豆瓣源 | tnpm <br> cnpm |
| 是否支持私有化 | **支持** | 支持 | 支持 |
| 配套工具 | **Serverless Devs CLI** | Python包管理工具(pip) | Node.js打包管理工具(npm) |
| 配套命令 | **s** | pip | npm |
| 如何使用 | 在`s.yaml`中直接引用 | 安装之后，在代码中引用 | 安装之后，在代码中引用 |

本规范，提供了对 Serverless 应用开发和部署的相关生态的支持，通过本规范可以快速的创建公开的/私有化的 Serverless Registry，并通过 Serverless Devs CLI 进行使用，助力 Serverless 应用开发者可以更简单，更快速，更方便的使用不同平台的 Serverless 产品，可以提升功能效能。

## 概述和术语

本节讲述了 SRM 及其术语。它首先是一个 Serverless Devs Model(SDM) 中不可或缺的概念，它代表的是 Serverless 的一种开发者生态，Serverless Devs CLI 开发者工具将会通过 Serverless Registry 进行应用案例的拉取，或者组件的下载和使用，而 Serverless Registry Model(SRM) 则是 Serverless Registry 的规范和标准。

### 模型概述

该规范提出了一个模型，定义 Serverless Registry 如下：

> Serverless Registry 是承载 Serverless 生态的抽象概念，与 Python Pypi，Nodejs NPM 等类似，Serverless Registry 用于开放和共享 Serverless Package。

在当前版本中，Serverless Registry 定义了以下内容：
- Serverless Registry 将会同时承载应用和组件；
- 应用和组件在 Serverless Registry 上将会具有不同数据结构的元数据；
- Serverless Registry 的应用可以通过规范的 API 进行查询和获取；
- Serverless Registry 可以且仅可以承载符合 [Serverless Package Model 规范](./serverless_pacakge_model.md)的 Package （包括应用与组件）；
- Serverless Registry 所承载的内容可以在之后的版本进行拓展；
- Serverless Registry 可以根据 Registry 建设者/组织的需求增加符合自身需要的权限鉴定策略；
- Serverless Registry 中的 Package （包括应用与组件）应当具备版本的划分能力，以及 Package 的增加、删除的能力；

## Registry 模型

Registry 模型部分介绍了 Serverless Registry Model (SRM) 的建设模型，包括了：

- 元数据规范
- Registry 规范

### 元数据规范

Serverless Reigstry 需要获得并存储 Package 以下信息：

| 数据名 |  类型   | 描述  |
|  ----  | ----  | ----  |
| Name  | String | Package名称 |
| Type  | String | Component/Application |
| Version  | String | Package版本，需要符合`主版本号.子版本号.修正版本号`格式 |
| PublishTime  | Number | 发布时间戳（秒） |
| VersionBody  | String | 版本对应的描述 |

> 除了以上基础规范，Serverless Registry 的提供者/组织还可以根据具体需求，存储更多的数据/信息，包括不限于用于鉴权使用的 Package 贡献者id，用户确定 Package 状态的status等；

### Registry 规范

Package 开发者和 Serverless 开发者在发布 Package 以及使用 Package 的流程可以简化为：

![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631783208215_20210916090651949970.png)

通过上述流程，可以看到对于 Package 开发者而言，需要按照[Serverless Package Model 规范](./serverless_pacakge_model.md)提供相对应的 Package 到 Serverless Registry，而对于 Serverless 开发者而言，则需通过 Serverless Devs CLI 工具中，进行 Package 的下载和使用。在整个过程中，涉及到的核心规范如下：

- Serverless Registry 在接受 Package 开发者贡献的组件与应用时，接受且只接受标准zip格式的压缩包，且压缩包中包括的代码等内容符合且必须符合符合 [Serverless Package Model 规范](./serverless_pacakge_model.md)；
- 对于发布在 Serverless Registry 上的应用和组件，Serverless Registry 需要按照以下规范提供对应 Package 版本查询功能以及相对应的下载功能：
    - 全部版本查询：
        - Method：GET
        - URI：{package-name}/releases/latest
        - Response：
            ```
            {
                "tag_name": "1.1.13",
                "created_at": "2021-01-04T07:41:23Z",
                "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
                "body": "- 中文\r\n  - 修复边界条件下临时密钥获取失败的BUG\r\n- English: \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
            }
            ```
    - 最新版本查询：
        - Method：GET
        - URI：{package-name}/releases/latest
        - Response：
            ```
            {
                "tag_name": "1.1.13",
                "created_at": "2021-01-04T07:41:23Z",
                "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
                "body": "- 中文\r\n  - 修复边界条件下临时密钥获取失败的BUG\r\n- English: \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
            }
            ```
    - Package下载：
        - Method：GET
        - URI：{package-name}/zipball/{version}
        - Response：组件压缩包

> 除了以上基础规范，Serverless Registry 的提供者/组织还可以根据具体需求，提供 Package 更新，删除以及权限变更等相关的额外能力。

## 适用范围

以上规范适于条件仅限于 Serverless Devs CLI 所支持、所识别的文件格式，以及所必须的流程接口。用户/组织可以通过上述的规范可以建立的 Serverless Registry 可以直接被 Serverless Devs CLI 所识别和使用。

但是并不代表 Serverless Registry 的功能仅如此，作为 Serverless Registry 的建设者和维护者，有权在保证符合上述规范的前提下丰富相对应的接口以及能力。包括不限于所春初的元数据的丰富，所支持的接口能力的丰富等，这些额外的能力将作为 Serverless Registry 的拓展能力存在，并不作为 Serverless Registry Model的一部分。
 
## 设计原则

为了更加公平和开放，上述的设计规范参照于Github相关接口设计，所以可以认为 Serverless Devs CLI 天然支持 Github 作为其默认的 Serverless Registry (https://api.github.com/repos/)。

