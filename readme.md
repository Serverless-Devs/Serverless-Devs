<div align=center> <img src="https://images.devsapp.cn/devs-github/logo.jpg" width="100%"/> </div>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/v/@serverless-devs/s" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/dy/@serverless-devs/s" alt="npm download">
  </a>
  <a href="https://bestpractices.coreinfrastructure.org/projects/6486"><img src="https://bestpractices.coreinfrastructure.org/projects/6486/badge"></a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%2014.14.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-Apache2.0-green" alt="license">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/issues">
    <img src="https://img.shields.io/github/issues/serverless-devs/serverless-devs" alt="issues">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/discussions">
    <img src="https://img.shields.io/github/discussions/serverless-devs/serverless-devs" alt="discussions">
  </a>
</p>

<p align="center">
  <span><b>Serverless 应用全生命周期管理工具</b></span><br>
</p>

<p align="center">
  <span><b><a href="./readme.md">中文</a> ｜ <a href="./readme_en.md">English</a></b></span><br>
</p>

**Serverless Devs** 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者不仅可以一键体验多云 Serverless 产品，极速部署 Serverless 项目，还可以在 Serverless 应用全生命周期进行项目的管理，并且非常简单快速的将 Serverless Devs 与其他工具/平台进行结合，进一步提升研发、运维效能。

# 六大优势

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

- **灵活部署**：得益于功能的可插拔特性，可以非常简单的支持不同云厂商的项目部署，或者一键部署到不同云平台。目前 Serverless Devs 已经支持了[阿里云函数计算](https://github.com/devsapp/fc)、[AWS Lambda](https://github.com/devscomp/lambda)、[百度智能云函数计算（CFC）](https://github.com/xinwuyun/cfc)、[华为云函数工作流](https://github.com/zy-linn/fgs-component)和[腾讯云云函数（SFC）](https://github.com/devscomp/scf)等多云的 FaaS 产品。
- **开源开放**：项目通过开源代码，开放生态进行建设的，开发者可以随时查看和参与 Serverless Devs 开发者工具的贡献，也可以随时随地进行相关组件和应用的贡献。当然，除了这种开源开放的形态，我们也鼓励一些企业级团队，通过 [Serverless Registry 模式](./spec/zh/0.0.2/serverless_registry_model/readme.md)建设自己的私有 Registry 以定制化某些不便公开的自定义组件。
- **功能可插拔**：Serverless Devs 开发者工具本身，不具备任何业务能力，所有的业务能力均是通过组件化的形式，进行可插拔式使用，并且每个组件可以根据需要，自定义相对应的命令和功能；开发者可以在一个应用中，选择不同的组件完成对应的业务能力，以满足对不同模块的诉求。
- **上手简单**：通过开放 Serverless Registry 的模型/规范，该项目可以通过应用的模式，为开发者提供多种形式，多种领域以及[多种场景的上手案例](./docs/zh/awesome.md)，帮助开发者快速了解、学习、深入、上手 Serverless 架构。例如[快速入门](./docs/zh/quick_start.md)中的[**Serverless：Hello World**](./docs/zh/quick_start.md#serverlesshello-world)、[**人工智能：目标检测**](./docs/zh/quick_start.md#人工智能目标检测)和[**传统框架：基于Django的博客项目**](./docs/zh/quick_start.md#传统框架基于django的博客项目)等项目。
- **全生命周期**：通过组件化的支持，Serverless Devs 可以在应用的全生命周期发挥重要的作用，以[阿里云函数计算的FC组件](https://github.com/devsapp/fc)为例，开发者可以在项目创建、项目的开发、调试、可观测性等多个层面进行项目的建设和管理。
- **集成与被集成**：项目具有非常好的集成性与被集成性，可以通过组件化的支持，非常简单的与传统的生态进行有机结合。同时，Serverless Devs 开发者工具也可以非常简单的被集成到海量的自动化流程中，例如 [CI/CD文档](./docs/zh/cicd.md)中，就举例了[**与 Github Action 的集成**](./docs/zh/cicd.md#与-github-action-的集成)、[**与 Gitee Go 的集成**](./docs/zh/cicd.md#与-gitee-go-的集成)和[**与 Jenkins 的集成**](./docs/zh/cicd.md#与-jenkins-的集成)等平台集成的案例。

# 设计理念

Serverless Devs 是一个开源开发的 Serverless 领域的工具链项目，他不仅仅表示单纯的某个命令行工具，在一定程度上指的是一个完整的工具链体系。

![](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/01.png)

在 Serverless Devs 中，拥有两个角色：

- **开源贡献者**：开源贡献者将按照 [Serverless Package Model](./spec/zh/0.0.2/serverless_pacakge_model/readme.md) 进行[组件/应用的开发](./docs/zh/package_dev.md)，并将内容发布到Serverless Hub中，既可以被更多人所使用；
- **Serverless开发者**：通过开发者工具（包括[命令行工具](./docs/zh/quick_start.md)以及桌面端等工具），进行[应用的初始化](./docs/zh/quick_start.md)，以及组件的使用；通过开发者工具，将业务按照预期部署到线上；

在这样一个 Serverless Devs 的应用框架上，我们不难发现可以和其他任何一种模式/生态，具有相似的命名以及模块：

- **Serverless Hub**：类似于一种组件、应用、案例中心；类似于 Docker Hub 等；
- **Serverless Registry**：类似于一种组件、应用的管理工具或者规范模型；类似于 Python 生态中的 Pypi，类似于 Node.js 生态中的 NPM；

同时通过上图也可以看到两个比较明显的词汇：Component和Application：
- **Component**：指的是组件；是由 Package developer 开发并发布的符合 Serverless Package Model 规范的一段代码，通常这段代码会在应用中被引用，并在 Serverless Devs 开发者工具 中被加载，并按照预定的规则进行执行某些动作。例如，将用户的代码部署到 Serverless 平台；将 Serverless 应用进行构建和打包；对 Serverless 应用进行调试等；
- **Application**：指的是应用；可以由 Package developer 公开发布到 Registry，以供更多人学习和使用，例如某位贡献者贡献了一个猫狗识别的案例到Registry；也可以由 Serverless developer 开发，例如某人开发了一个 人脸识别的应用；通常情况下一个应用可以引用一个或者多个组件，并通过 Serverless Devs 开发者工具 工具部署到 Serverless 平台，例如我开发了一个猫狗识别的应用，在这个应用中引用了 Lambda 组件帮助我将部分业务逻辑部署到 FaaS 平台，同时我也引用了 Website 组件帮助我把前端业务代码部署到对象存储中；

Serverless Devs 的模型设计原则，是希望可以通过更加简单、科学、规范的 Serverless 工具链体系，让开发者更专注于业务逻辑，提升 Serverless 应用开发、部署、运维效率，通过该模型，开发者可以通过一种更灵活、更通用的方法使用不同云厂商以及开源的 Serverless 产品，进而更高效、更简洁、更便利的实现 Serverless 应用管理。

# 成长历程

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

# 快速上手

❶ 安装 Node.js(>=14.14.0) 与 NPM 包管理工具；   
❷ 安装 Serverless Devs 开发者工具；   
```shell script
$ npm install @serverless-devs/s -g
```
❸ 在命令行中执行命令`s`，并按回车，开启你的 Serverless 之旅；   

> 更多详细信息可以参考[Serverless Devs 安装文档](https://docs.serverless-devs.com/user-guide/install/)和[快速入门指南](https://docs.serverless-devs.com/getting-started/)

# 帮助文档

- [安装文档](https://docs.serverless-devs.com/user-guide/install/)
- [命令行操作](https://docs.serverless-devs.com/user-guide/builtin/)
- [Yaml规范](https://docs.serverless-devs.com/user-guide/spec/)
- [配置继承/多环境](https://docs.serverless-devs.com/user-guide/spec/#yaml)
- [CI/CD平台集成](https://docs.serverless-devs.com/user-guide/cicd/)

> 如果您想为 Serverless Devs 贡献 Package（包括组件和应用），您可以参考 [Package开发文档](https://docs.serverless-devs.com/dev-guide/application/)   

> Serverless Devs 天然支持 Yaml 模式与 Cli 模式，关于两者的区别和试用场景，可以参考文档[ **Yaml 模式 Cli 模式对比**](https://docs.serverless-devs.com/user-guide/spec/#yaml-cli)；关于[**Exit Code 定义**](https://docs.serverless-devs.com/dev-guide/cli_design/#exit-code)、[**Yaml 文件优先级规范**](https://docs.serverless-devs.com/dev-guide/cli_design/#yaml)、[**密钥使用顺序与规范**](https://docs.serverless-devs.com/dev-guide/cli_design/#_11)、[**通过环境变量设置密钥**](https://docs.serverless-devs.com/dev-guide/cli_design/#_12)更多关于项目设计的一些细节可以参考[**开发者工具设计文档**](https://docs.serverless-devs.com/) 

# 相关资源

目前 Serverless Devs 项目已经支持的 FaaS 平台/产品：

- Hosted
  - 阿里云函数计算（FC）: [项目仓库](https://github.com/devsapp/fc3)
  - AWS Lambda: [项目仓库](https://github.com/devscomp/lambda)
  - 百度智能云函数计算（CFC）: [项目仓库](https://github.com/xinwuyun/cfc)
  - 华为云函数工作流（FG）: [项目仓库](https://github.com/zy-linn/fgs-component)
  - 腾讯云云函数（SCF）: [项目仓库](https://github.com/devscomp/scf)
  - 火山函数服务（veFaaS）：[项目详情](https://registry.serverless-devs.com/details/volcano-vefaas?type=Component)
- Installable
  - OpenFunction（ofn）: [项目仓库](https://github.com/OpenFunction/serverless-devs)
  - Laf: 开发中...
 
> 尽管以上 FaaS 平台/产品已经有人贡献或在持续维护中，但是我们仍然非常欢迎大家可以参与贡献/维护，除此之外，其他的 FaaS 平台/产品（例如 Google Cloud Platform Functions、Azure Functions等），我们也非常期望社区的小伙伴们可以参与开发和贡献。

> 🚀 除此之外 Serverless Devs 项目还拥有很多优秀的组件和应用，可以参考[Awesome](./docs/zh/awesome.md)

# 未来展望

- Serverless Devs 希望可以为 Serverless 开发者们提供一款可以无厂商锁定的，可以在 Serverless 应用全生命周期发挥作用的 Serverless 开发者工具；
- Serverless Registry 希望可以为 Serverless 生态提供一套完整的包管理规范，与 Python 中的 pypi， Nodejs 中的 npm 等类似，将以此来开放和分享 Serverless Package，建设 Serverless 生态；
- Serverless Developer Meetup 希望可以打造最符合 Serverless 开发者的社区活动，通过这个活动，我们希望更多人可以一起和我们交流、学习 Serverless 相关的产品；

# 项目贡献

我们非常希望您可以和我们一起贡献这个项目。贡献内容包括不限于代码的维护、应用/组件的贡献、文档的完善等，更多详情可以参考[ 🏆 贡献指南](./CONTRIBUTING.md)。

与此同时，我们也非常感谢所有[ 👬 参与贡献的小伙伴](./CONTRIBUTORS.md)，为 Serverless Devs 项目贡献的努力和汗水。

# 规范与许可

Serverless Devs 遵循 [Apache-2.0 license](./LICENSE) 开源许可。

位于`node_modules`和外部目录中的所有文件都是本软件使用的外部维护库，具有自己的许可证；我们建议您阅读它们，因为它们的条款可能与[Apache-2.0 license](./LICENSE)的条款不同。

> Serverless Devs adopts CNCF Code of Conduct. This open governance applies to all repos under kubevela org.

# 交流社区

<p align="center">
<br/><br/>

![](https://landscape.cncf.io/images/cncf-landscape-horizontal-color.svg)
  
<br/><br/>
Serverless Devs 是 CNCF Sandbox 项目，可以在 <a href="https://landscape.cncf.io/?group=serverless&view-mode=grid&item=serverless--tools--serverless-devs-serverless">CNCF Cloud Native Landscape</a> 中查看。
</p>


您如果有关于错误的反馈或者未来的期待，您可以在 [Issues](https://github.com/serverless-devs/serverless-devs/issues) 和 [Discussions](https://github.com/serverless-devs/serverless-devs/discussions) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 Serverless Devs 的最新动态，您可以通过以下渠道进行：

<p align="center">

| <img src="https://img.alicdn.com/imgextra/i2/O1CN01zifTV61Mkg9QRNBUs_!!6000000001473-2-tps-466-462.png" width="200px" > | <img src="https://img.alicdn.com/imgextra/i3/O1CN016kRQ1A24zePZnV87T_!!6000000007462-0-tps-528-528.jpg" width="200px" > | <img src="https://img.alicdn.com/imgextra/i1/O1CN01ECE9wN1RMvgS6d1JM_!!6000000002098-0-tps-881-877.jpg" width="200px" > |
|--- | --- | --- |
| <center>关注微信公众号：`serverless`</center> | <center>联系微信小助手：`xiaojiangwh`</center> | <center>加入钉钉交流群：`33947367`</center> | 

</p>

-----------

> Serverless Devs 开发者工具遵循 [Serverless Devs Model](./spec/readme.md)，更多模型/规范信息可以参考 [Serverless Registry Model](./spec/zh/0.0.2/serverless_registry_model/readme.md)，[Serverless User Model](./spec/zh/0.0.2/serverless_user_model/readme.md) 以及 [Serverless Package Model](./spec/zh/0.0.2/serverless_package_model/readme.md)。

> 隐私说明：为了给开发者提供可优化的使用体验，Serverless Devs会采集部分客户端的错误信息以帮助社区优化工具，当然这些错误信息都是被脱敏后的错误信息，如果您仍然存在疑虑或者不想使用这个功能，您可以通过命令`s set analysis disable`关闭该功能。


