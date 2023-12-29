---
title: 简介
description: 'Serverless Devs 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者不仅可以一键体验多云 Serverless 产品，极速部署 Serverless 项目，还可以在 Serverless 应用全生命周期进行项目的管理，并且非常简单快速的将 Serverless Devs 与其他工具/平台进行结合，进一步提升研发、运维效能'
position: 0
category: '概述'
---

# Serverless Devs 项目介绍

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635390357469_20211028030558116850.png)


<p align="center">
<a href="./quick_start.md">安装文档</a> |  <a href="./command/readme.md">命令行操作</a> | <a href="./yaml.md">Yaml规范</a> | <a href="./cicd.md">CI/CD平台集成</a> | <a href="./package_dev.md">Package开发文档</a>
</p>



**Serverless Devs** 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者不仅可以一键体验多云 Serverless 产品，极速部署 Serverless 项目，还可以在 Serverless 应用全生命周期进行项目的管理，并且非常简单快速的将 Serverless Devs 与其他工具/平台进行结合，进一步提升研发、运维效能。


- [6大优势](#6大优势)
- [设计哲学](#设计哲学)
- [成长历史](#成长历史)
- [未来展望](#未来展望)
- [交流社群](#交流社群)

## 6大优势

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

- **无厂商锁定**：得益于功能的可插拔特性，可以非常简单的支持不同云厂商的项目部署，或者一键部署到不同云平台。目前 Serverless Devs 已经支持了[阿里云函数计算](https://github.com/devsapp/fc) 、[AWS Lambda](https://github.com/devscomp/lambda) 、[百度智能云函数计算](https://github.com/xinwuyun/cfc) 、[华为云函数工作流](https://github.com/zy-linn/fgs-component) 、[腾讯云云函数](https://github.com/devscomp/scf) 等多云的 FaaS 产品；
- **开源形式建设**：项目通过开源代码，开放生态进行建设的，开发者可以随时查看和参与 Serverless Devs 开发者工具的贡献，也可以随时随地进行相关组件和应用的贡献。当然，除了这种开源开放的形态，我们也鼓励一些企业级团队，通过 [Serverless Registry Model](./../../spec/zh/0.0.2/serverless_registry_model/readme.md) 建设自己的私有 Registry 以定制化某些不便公开的自定义组件；
- **功能灵活可插拔**：Serverless Devs 开发者工具本身，不具备任何业务能力，所有的业务能力均是通过组件化的形式，进行可插拔式使用，并且每个组件可以根据需要，自定义相对应的命令和功能；开发者可以在一个应用中，选择不同的组件完成对应的业务能力，以满足对不同模块的诉求；
- **简单快速上手**：通过开放 Serverless Registry 的模型/规范，该项目可以通过应用的模式，为开发者提供多种形式，多种领域以及[多种场景的上手案例](./awesome.md)，帮助开发者快速了解、学习、深入、上手 Serverless 架构，例如[新手引导](./quick_start.md)中的[**Serverless：Hello World**](./quick_start.md#serverlesshello-world)、[**人工智能：目标检测**](./quick_start.md#人工智能目标检测)、[**传统框架：基于Django的博客项目**](./quick_start.md#传统框架基于django的博客项目)等项目；
- **应用全生命周期管理**：通过组件化的支持，Serverless Devs 可以在应用的全生命周期发挥重要的作用，以 [阿里云函数计算的FC组件](https://github.com/devsapp/fc) 为例，开发者可以在项目创建、项目的开发、调试、可观测性等多个层面进行项目的建设和管理；
- **良好的集成与被集成性**：项目具有非常好的集成性与被集成性，可以通过组件化的支持，非常简单的与传统的生态进行有机结合。同时，Serverless Devs 开发者工具也可以非常简单的被集成到海量的自动化流程中，例如 [CI/CD文档](./cicd.md) 中，就举例了[**与 Github Action 的集成**](./cicd.md#与-github-action-的集成)、[**与 Gitee Go 的集成**](./cicd.md#与-gitee-go-的集成)[**与 Jenkins 的集成**](./cicd.md#与-jenkins-的集成) 等平台集成的案例；

## 设计哲学

Serverless Devs 是一个开源开发的 Serverless 领域的工具链项目，他不仅仅表示单纯的某个命令行工具，在一定程度上指的是一个完整的工具链体系。

![](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/01.png)

在 Serverless Devs 中，拥有两个角色：

- **开源贡献者**：开源贡献者将按照 [Serverless Package Model](./../../spec/zh/0.0.2/serverless_pacakge_model/readme.md) 进行[组件/应用的开发](./package_dev.md) ，并将内容发布到Serverless Hub中，既可以被更多人所使用；
- **Serverless开发者**：通过开发者工具（包括[命令行工具](./quick_start.md)以及桌面端等工具），进行[应用的初始化](./quick_start.md)，以及组件的使用；通过开发者工具，将业务按照预期部署到线上；

在这样一个 Serverless Devs 的应用框架上，我们不难发现可以和其他任何一种模式/生态，具有相似的命名以及模块：

- **Serverless Hub**：类似于一种组件、应用、案例中心；类似于 Docker Hub 等；
- **Serverless Registry**：类似于一种组件、应用的管理工具或者规范模型；类似于 Python 生态中的 Pypi，类似于 Node.js 生态中的 NPM；

当然，细心的你应该已经发现了，在 Serverless Hub 中，有两种形态的 Package（组件和应用）：

同时通过上图也可以看到两个比较明显的词汇：Component和Application：
- **Component**：指的是组件；是由 Package developer 开发并发布的符合 Serverless Package Model 规范的一段代码，通常这段代码会在应用中被引用，并在 Serverless Devs 开发者工具 中被加载，并按照预定的规则进行执行某些动作。例如，将用户的代码部署到 Serverless 平台；将 Serverless 应用进行构建和打包；对 Serverless 应用进行调试等；
- **Application**：指的是应用；可以由 Package developer 公开发布到 Registry，以供更多人学习和使用，例如某位贡献者贡献了一个猫狗识别的案例到Registry；也可以由 Serverless developer 开发，例如某人开发了一个 人脸识别的应用；通常情况下一个应用可以引用一个或者多个组件，并通过 Serverless Devs 开发者 工具部署到 Serverless 平台，例如我开发了一个猫狗识别的应用，在这个应用中引用了 Lambda 组件帮助我将部分业务逻辑部署到 FaaS 平台，同时我也引用了 Website 组件帮助我把前端业务代码部署到对象存储中；

Serverless Devs 的模型设计原则，是希望可以通过更加简单、科学、规范的 Serverless 工具链体系，让开发者更专注于业务逻辑，提升 Serverless 应用开发、部署、运维效率，通过该模型，开发者可以通过一种更灵活、更通用的方法使用不同云厂商以及开源的 Serverless 产品，进而更高效、更简洁、更便利的实现 Serverless 应用管理。

## 成长历史

![](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/02.png)

如果说 Serverless 提升了传统应用的开发效能，那么 Serverless Devs 开发者工具就是提升了 Serverless 应用开发的效能。随着时间的发展，Serverless Devs 也从 1.0 版本 到了 2.0 版本，更是从简单的单纯的效能提升，变成了更加规范、更加科学的效能提升。我们真切希望可以通过 Serverless Devs 的工具链模式和思路，为应用的开发，传统项目上 Serverless 架构提供巨大的便利和更科学的管理。

- 2020年 10月23日，Serverless 开发者平台 Serverless Devs 正式开源
- 2020 年11月，Serverless Devs 被 CNCF Landsacpe 收录, 成为国内首个进驻的 Serverless 工具
- 2020 年11月，Serverless Developer Meetup 首召开，成 Serverless 开发者技术新渠道
- 2020 年 11月，入围 InfoQ 评选 2020 年度十大开源新锐项目
- 2020 年12月，Serverless Devs 下载次数突破 5000，组件&应用累计使用次数突破 10000
- 2021年4月，Serverless Developer Meetup 在上海召开，并正式发布 Serverless Devs 2.0
- 2021年6月，Serverless Devs 下载次数突破 10000
- 2021年7月，Serverless Developer Meetup 在杭州召开，阿里云函数计算团队在会上正式发布端云联调、桌面客户端等功能
- 2021年8月，Serverless Devs 下载次数突破 20000
- 2021年10月，在 2021 OpenInfra Days China 会议上，Serverless Devs 带来了《Serverless Devs：Serverless全生命周期的工具链建设》的主题演讲
- 2021年12月，Serverless Developer Meetup 在深圳召开，并尝试性的对外展示了Serverless Devs Model


## 未来展望

Serverless Devs 将会在未来支持：
- 支持更多的云厂商，云产品；
- 将会开发和上线 Serverless Devs IDE Plugin；
- 将会持续推动 Serverless 生态尤其是 Serverless 工具链生态的前进；

关于我们的 Roadmap，可以参考 [Github Projects](https://github.com/Serverless-Devs/Serverless-Devs/projects) 。

## 交流社群

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="200px" > |
|--- | --- | --- |
| <center>关注微信公众号：`serverless`</center> | <center>联系微信小助手：`xiaojiangwh`</center> | <center>加入钉钉交流群：`33947367`</center> | 

</p>

