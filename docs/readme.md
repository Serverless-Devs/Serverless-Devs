<div align=center> <img src="https://images.devsapp.cn/devs-github/logo.jpg" width="100%"/> </div>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/v/@serverless-devs/s" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/dy/@serverless-devs/s" alt="npm download">
  </a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%2010.8.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
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

**Serverless Devs** 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者不仅可以一键体验多云 Serverless 产品，极速部署 Serverless 项目，还可以在 Serverless 应用全生命周期进行项目的管理，并且非常简单快速的将 Serverless Devs 与其他工具/平台进行结合，进一步提升研发、运维效能。

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

> 更多关于 Serverless Devs 的介绍可以参考[项目介绍文档](./zh/readme.md)

# 快速上手

❶ 安装 Node.js(>=10.8.0) 与 NPM 包管理工具；   
❷ 安装 Serverless Devs 开发者工具；   
```shell script
$ npm install @serverless-devs/s -g
```
❸ 在命令行中执行命令`s`，并按回车，开启你的 Serverless 之旅；   

> 更多详细信息可以参考[Serverless Devs 安装文档](./zh/install.md)和[快速入门指南](./zh/quick_start.md)

# 帮助文档

- [安装文档](zh/install.md)
- [命令行操作](zh/command/readme.md)
- [Yaml规范](zh/yaml.md)
- [CI/CD平台集成](zh/cicd.md)

> 如果您想为 Serverless Devs 贡献 Package（包括组件和应用），您可以参考 [Package开发文档](zh/package_dev.md)  

> Serverless Devs 天然支持 Yaml 模式与 Cli 模式，关于两者的区别和试用场景，可以参考文档[ **Yaml 模式 Cli 模式对比**](./zh/yaml_and_cli.md)；关于[**Exit Code 定义**](./zh/tool.md#exit-code-定义)、[**Yaml 文件优先级规范**](./zh/tool.md#yaml-文件优先级规范)、[**密钥使用顺序与规范**](./zh/tool.md#密钥使用顺序与规范)、[**通过环境变量设置密钥**](./zh/tool.md#通过环境变量设置密钥)更多关于项目设计的一些细节可以参考[**开发者工具设计文档**](./zh/tool.md) 

# 相关资源

目前 Serverless Devs 项目已经支持的 FaaS 平台/产品：

- 阿里云函数计算（FC）: [项目仓库](https://github.com/devsapp/fc)
- AWS Lambda: [项目仓库](https://github.com/devscomp/lambda)
- 百度智能云函数计算（CFC）: [项目仓库](https://github.com/xinwuyun/cfc)
- 华为云函数工作流（FG）: [项目仓库](https://github.com/xinwuyun/fg)
- 腾讯云云函数（SCF）: [项目仓库](https://github.com/devscomp/scf)

> 尽管以上 FaaS 平台/产品已经有人贡献或在持续维护中，但是我们仍然非常欢迎大家可以参与贡献/维护，除此之外，其他的 FaaS 平台/产品（例如 Google Cloud Platform Functions、Azure Functions等），我们也非常期望社区的小伙伴们可以参与开发和贡献。

> 🚀 除此之外 Serverless Devs 项目还拥有很多优秀的组件和应用，可以参考[Awesome](./zh/awesome.md)

# 项目期望

- Serverless Devs 希望可以为 Serverless 开发者们提供一款可以无厂商锁定的，可以在 Serverless 应用全生命周期发挥作用的 Serverless 开发者工具；
- Serverless Registry 希望可以为 Serverless 生态提供一套完整的包管理规范，与 Python 中的 pypi， Nodejs 中的 npm 等类似，将以此来开放和分享 Serverless Package，建设 Serverless 生态；
- Serverless Developer Meetup 希望可以打造最符合 Serverless 开发者的社区活动，通过这个活动，我们希望更多人可以一起和我们交流、学习 Serverless 相关的产品；

# 项目贡献

我们非常希望您可以和我们一起贡献这个项目。贡献内容包括不限于代码的维护、应用/组件的贡献、文档的完善等，更多详情可以参考[ 🏆 贡献指南](../CONTRIBUTING.md)。

与此同时，我们也非常感谢所有[ 👬 参与贡献的小伙伴](../CONTRIBUTORS.md)，为 Serverless Devs 项目贡献的努力和汗水。

# 开源许可

Serverless Devs 遵循 [MIT License](../LICENSE) 开源许可。

位于`node_modules`和外部目录中的所有文件都是本软件使用的外部维护库，具有自己的许可证；我们建议您阅读它们，因为它们的条款可能与[MIT License](../LICENSE)的条款不同。

# 交流社区

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="200px" > |
|--- | --- | --- |
| <center>关注微信公众号：`serverless`</center> | <center>联系微信小助手：`xiaojiangwh`</center> | <center>加入钉钉交流群：`33947367`</center> | 

</p>

-----------

> Serverless Devs 开发者工具遵循 [Serverless Devs Model](../spec/readme.md)，更多模型/规范信息可以参考 [Serverless Registry Model](../spec/zh/0.0.1/serverless_registry_model/readme.md)，[Serverless User Model](../spec/zh/0.0.1/serverless_user_model/readme.md) 以及 [Serverless Package Model](../spec/zh/0.0.1/serverless_pacakge_model/readme.md)；