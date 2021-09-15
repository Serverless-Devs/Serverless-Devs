# Serverless Devs Cli 帮助文档

<div align=center> <img src="https://images.devsapp.cn/devs-github/logo.jpg" width="100%"/> </div>

<p align="center">
  <span>像使用手机一样使用Serverless</span><br>
  <span>中文文档 ｜<a href="./readme.md">English</a> </span>
</p>

## 项目简介

```text
  _________                               .__                         ________                     
 /   _____/ ______________  __ ___________|  |   ____   ______ ______ \______ \   _______  ________
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/  |    |  \_/ __ \  \/ /  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \   |    `   \  ___/\   /\___ \ 
/_______  /\___  >__|    \_/  \___  >__|  |____/\___  >____  >____  > /_______  /\___  >\_//____  >
        \/     \/                 \/                \/     \/     \/          \/     \/         \/ 
```

Serverless Devs 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者可以一键体验多云 Serverless 产品，极速部署 Serverless 项目。



### 可支持主流 Serverless 服务/框架

Serverless Devs 是一个组件化与插件化的 Serverless 开发者平台，在该平台中，每个使用者都可以可插拔式的使用不同 Serverless 的服务和框架，同时每个使用者都可以参与开发组件和插件。在 Serverless Devs 中无论是工业级的 Serverless 服务，还是各类开源的 Serverless 框架，都可以得到非常友好的支持。开发者无需对市面上每一款 Serverless 工具进行研究和学习，只需通过 Serverless Devs ，就可以简单、快捷的“上手”主流 Serverless 服务和框架；

### 灵活与开放的使用方法

与绝大部分的开发者工具不同的是，Serverless Devs 在进行项目描述时不仅仅可以对函数计算、API 网关、对象存储等资源进行描述，也可以通过 Serverless Devs 提供的插件以及 Hook 进行Install, Build, Publish等行为描述。与此同时 Serverless Devs 不会对每个组件的命令进行限制，而是鼓励开发者针对不同的组件，开发不同的能力来应对更多、更复杂的场景，例如阿里云函数计算组件，不仅仅支持函数的部署和移除这样的传统能力，还支持日志查询，指标查询，本地构建，依赖安装，调试等更多定制化的能力。Serverless Devs 的这种灵活与开放的使用方法，可以在自动化部署、运维等领域发挥非常大的作用，将Serverless Devs与项目全生命周期进行有机融合，可使得 Serverless 项目的开发运维效能提升 90%。


## 帮助文档

- [安装文档](./zh/install.md)
- [命令行指令文档](./zh/command.md)
- [Yaml规范文档](./zh/yaml.md)
- [Package开发者文档](./zh/dev.md)
- [源文档](./zh/registry.md)

## 相关资源

[https://github.com/Serverless-Devs/package-awesome](https://github.com/Serverless-Devs/package-awesome)

## 快速体验

### 零基础部署一个博客系统

- 下载命令行工具：`npm install -g @serverless-devs/s`
- 初始化一个模版项目：`s init devsapp/start-zblog`
- 进入项目后部署项目：`cd start-zblog && s deploy`

### 零基础部署一个企业官网

- 下载命令行工具：`npm install -g @serverless-devs/s`
- 初始化一个模版项目：`s init devsapp/start-metinfo`
- 进入项目后部署项目：`cd start-metinfo && s deploy`

更多案例： `s init`
