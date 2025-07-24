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

## ✨ 主要功能

- **灵活部署**: 可插拔的功能设计，让您轻松部署项目到阿里云、腾讯云、AWS、Google Cloud、百度云、华为云等多个平台。
- **开源开放**: 项目代码开源，开发者可参与贡献，企业也可通过 Serverless Registry 模型建设私有组件库。
- **功能可插拔**: 工具能力通过组件化实现，开发者可自定义组件以满足不同模块的业务需求。
- **简单上手**: 提供丰富的[应用案例](./docs/zh/awesome.md)，覆盖不同行业场景，帮助开发者快速入门 Serverless 架构。
- **全生命周期管理**: 配套组件支持项目的创建、开发、调试、观测等全生命周期管理。
- **优秀的集成性**: 可轻松与 CI/CD 工具（如 GitHub Actions, Gitee Go, Jenkins）等传统生态集成。

## 🚀 快速上手

### 1. 安装工具

确保您的环境中已安装 Node.js (>=14.14.0) 和 NPM。

```shell script
npm install @serverless-devs/s -g
```

### 2. 配置密钥

以阿里云为例，获取 [AccessKey](https://usercenter.console.aliyun.com/#/manage/ak) 后，执行配置命令：

```shell script
s config add
```
根据提示，选择云厂商并输入您的密钥信息。

### 3. 初始化一个示例项目

```shell script
s init start-fc3-nodejs
```

### 4. 部署项目

```shell script
cd start-fc3-nodejs && s deploy
```

部署成功后，您将获得可访问的 URL。更多信息请参考[快速入门指南](./docs/zh/quick_start.md)。

## 🙌 交流社区

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

## 📚 更多文档

- [安装文档](./docs/zh/quick_start.md)
- [命令行操作](./docs/zh/command/readme.md)
- [Yaml规范](./docs/zh/yaml.md)
- [CI/CD平台集成](./docs/zh/cicd.md)
- [Package开发文档](./docs/zh/package_dev.md)

## 🤝 参与贡献

我们非常欢迎您参与贡献这个项目！无论是代码维护、功能开发、应用/组件贡献还是文档完善，您的任何贡献都对社区至关重要。更多详情请参考[贡献指南](./CONTRIBUTING.md)。

我们也非常感谢所有[参与贡献的小伙伴](./CONTRIBUTORS.md)，为 Serverless Devs 项目贡献的努力和汗水。

## 📄 规范与许可

Serverless Devs 遵循 [Apache-2.0 license](./LICENSE) 开源许可。

> Serverless Devs adopts CNCF Code of Conduct. This open governance applies to all repos under an org.


