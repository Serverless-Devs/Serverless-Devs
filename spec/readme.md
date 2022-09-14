# Serverless Devs Model(SDM)

<p align="center">
  <span><b><a href="./readme.md">中文</a> ｜ <a href="./readme_en.md">English</a></b></span><br>
</p>


Serverless Devs Model(SDM，下文简称SDM)的官方文档，主要用于介绍 SDM 的模型详情与相关规范。

Serverless Devs Model(SDM) 是一种与厂商 FaaS 平台无关的 Serverless 架构工具链模型，用于定义通用的 Serverless 架构工具使用标准，让开发者更专注于业务逻辑，提升 Serverless 应用开发、部署、运维效率，通过该模型，开发者可以通过一种更灵活、更通用的方法使用不同云厂商以及开源的 Serverless 产品，进而更高效、更简洁、更便利的实现 Serverless 应用管理。

## 介绍

"Serverless应用的开发人员应该更关心业务代码，而不需要更多精力去适应不同Serverless平台（包括不同厂商的开发者工具学习，不同功能的使用等）。"

![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631771269638_20210916054752754202.png)

### 为什么需要工具模型

就目前来看 Serverless 架构厂商锁定严重，不同厂商会有不同的工具，不同的使用途径，这使得开发者在应用开发的过程中，以及在混合云部署、运维的过程中面临了诸多困难：

- **学习难度大**：开发者要针对不同的云厂商学习不同的工具使用方法，接受不同 Serverless 平台的使用方法，包括不限于发布部署、运维、构建等众多流程；
- **工具扩展差**：很多 Serverless 平台提供的开发者工具，往往是由开发团队提供对应的功能，使用者仅具有使用的功能，如需进行部分的定制化能力，或拓展能力，是难以扩展的；
- **适配成本高**：多云部署，业务迁移是生产过程中常见的行为，由于 Serverless 架构厂商锁定严重导致多云部署、业务迁移时学习成本以及转换成本非常高；

在 Serverless Devs Model(SDM) 中，我们提出了一种以应用为中心，以组件为途径的方法：

- **应用概念优先**：该模型将会以应用纬度进行项目管理，而不再单单以资源形式进行项目管理，这将对应用的开发和定义有着更清晰的定义；
- **组件化功能透出**：该模型将不会提供任何与 Serverless 平台相关的功能，这些所有的功能都将会通过组件，以一种可插拔的形式对开发者透出，Serverless 开发者可以在一个应用中，同时使用多种组件，实现一个完整的应用部署，甚至可以同时实现混合云的部署；
- **通用功能的抽象**：该模型将会推进 Serverless 架构在不同平台下的通用功能的抽象，例如应用的构建、调试功能等都可以通过组件形式进一步抽象为更多的 Serverless 开发者提供开发支持；

:trophy: 我们的目标是：

- 开发者可以通过一套工具更简单、更方便、更快速的使用不同 Serverless 平台的产品/功能，包括不限于构建、调试、部署、运维等不同的流程或者阶段；
- 开发者可以以应用的视角去看到 Serverless 应用，甚至是可以通过一行命令将 Serverless 应用部署到不同的 Serverless 平台；
- 开发者可以非常简单的进行Onboarding的流程，可以体验一致的进行不能上层能力的抽象；

## 模型学习

模型本身由 Serverless Devs 项目驱动，并作为一组版本话 API 文档进行维护，如下所示：

- [v0.0.2 (Serverless Devs v2.1.x)](zh/0.0.2/readme.md)
- [v0.0.1 (Serverless Devs v2.0.x)](zh/0.0.1/readme.md)

## 社区

### 贡献

> 有关详细信息，请参阅[贡献指南](../CONTRIBUTING.md)。

针对 spec 的贡献也可以参考以下内容：
- 将 Serverless Devs 仓库 fork 到自己的账号/组织下；
- 对 spec 内容进行修改，更新，完善；
- 对对应版本下的`readme.md`进行更新，添加自己到`作者`->`贡献者`中；
- 提`Pull requests`到仓库`Serverless-Devs/Serverless-Devs`的`docs`分支下；并添加 [Anycodes](https://github.com/anycodes) 、 [hanxie](https://github.com/hanxie-crypto) 等作为Reviewers，同时在Comment中填写好更新理由；

### 会议时间

- 等待社区反馈

## 协议

Serverless Devs 是一个遵循 [Apache 2.0](../LICENSE) 协议的开源项目。

Serverless Devs 使用的 node_modules 以及其他第三方的依赖库都可能有其遵循的协议，我们推荐你阅读并了解这些协议，因为其中的条款可能和 Apache 2.0 协议中的不完全相同。
