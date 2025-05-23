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

![图片alt](https://img.alicdn.com/imgextra/i3/O1CN018uXKtJ22SYYkiojId_!!6000000007119-0-tps-1998-276.jpg)


> 更多关于 Serverless Devs 的介绍可以参考[项目介绍文档](https://docs.serverless-devs.com/)

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

# 项目期望

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


