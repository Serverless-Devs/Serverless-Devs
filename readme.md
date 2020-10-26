# 欢迎使用Serverless Devs


<div align=center> <img src="https://images.serverlessfans.com/devs-github/logo.jpg" width="100%"/> </div>


<p align="center">
  <span>像使用手机一样使用Serverless</span>
</p>


- [ :thumbsup: 项目优势](#项目优势)
- [ :iphone: 像使用手机一样玩转 Serverless](#像使用手机一样玩转-Serverless)
- [ :house_with_garden: Serverless的使用场景](#使用场景)
- [ :heavy_check_mark: 快入安装和使用](#快入安装和使用)
- [ :running: 极速入门体验](#入门体验)
- [ :book: 使用文档](#使用文档)

Serverless Devs 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者可以一键体验多云 Serverless 产品，极速部署 Serverless 项目。

Serverless Devs 包括 Serverless Devs Tool （Serverless 开发者工具）和 Serverless Devs App Store（Serverless 应用中心）：

• **Serverless Devs Tool** 是一款可以让 Serverless 开发者开发和运维效率翻倍的工具。通过使用该工具，开发者可以更简单、更快速的进行应用创建、项目开发、测试、发布部署等，实现项目的全生命周期管理

• **Serverless Devs App Store** 是一个集 Serverless 应用在线搜索，一键部署以及资源可视化编辑于一体的应用中心产品。该应用中心拥有海量的生产级项目模板、案例模板，开发者可以自由选择，并将项目一键部署到指定的云平台上

## 项目优势

### 可支持主流 Serverless 服务/框架

Serverless Devs 是一个组件化与插件化的 Serverless 开发者平台，在该平台中，每个使用者都可以可插拔式的使用不同 Serverless 的服务和框架，同时每个使用者都可以参与开发组件和插件。在 Serverless Devs 中无论是工业级的 Serverless 服务，还是各类开源的 Serverless 框架，都可以得到非常友好的支持。开发者无需对市面上每一款 Serverless 工具进行研究和学习，只需通过 Serverless Devs ，就可以简单、快捷的“上手”主流 Serverless 服务和框架。

### 可视化编辑和部署

Serverless Devs 拥有完善的可视化编辑和部署流程。在 Serverless Devs App Store 中，使用者可以通过关键词快速检索到自己所需的应用案例或组件，并且可以通过可视化编辑完成项目配置，通过鼠标点击完成项目部署。

无论是进行项目体验，还是进行项目开发、运维，在应用中心的加持下，在可视化编辑和部署的加持下，Serverless 项目的整体部署时间缩短了近 1 倍。同时，Serverless Devs App Store 也是一个开发者开源共建的平台，所有用户都可以在应用中心发布自己的组件和应用供更多人学习、参考以及使用。

| ![](https://images.serverlessfans.com/devs-github/app-store.jpg) | ![](https://images.serverlessfans.com/devs-github/app-store-edit.jpg) |
| ------ | ------ |


### 灵活与开放的使用方法

与绝大部分的开发者工具不同的是，Serverless Devs 在进行项目描述时不仅仅可以对函数计算、API 网关、对象存储等资源进行描述，也可以通过 Serverless Devs 提供的插件以及 Hook 进行Install, Build, Publish等行为描述。与此同时 Serverless Devs 不会对每个组件的命令进行限制，而是鼓励开发者针对不同的组件，开发不同的能力来应对更多、更复杂的场景，例如阿里云函数计算组件，不仅仅支持函数的部署和移除这样的传统能力，还支持日志查询，指标查询，本地构建，依赖安装，调试等更多定制化的能力。

Serverless Devs 的这种灵活与开放的使用方法，可以在自动化部署、运维等领域发挥非常大的作用，将Serverless Devs与项目全生命周期进行有机融合，可使得 Serverless 项目的开发运维效能提升 90%。


## 像使用手机一样玩转 Serverless

通过 Serverless Devs，我们可以像使用手机一样的使用 Serverless。在使用手机时，我们需要通过在手机应用市场中搜索、下载各种应用，并安装到手机中进行使用；对于 Serverless Devs 开发平台来说，我们可以通过 s gui 快捷调出 Serverless Devs App Store，并在其中搜索并下载组件/插件到 Serverless Devs Tool 开始使用 Serverless，如图所示：


<div align=center> <img src="https://images.serverlessfans.com/devs-github/cli-app-like-phone-v2.png" width="100%"/> </div>

## 使用场景

Serverless Devs 是多云多资源全链路/生命周期管理平台。该平台可以在组件化和插件化共同作用下，参与到项目的创建、开发、调试、部署与运维的全流程中，以阿里云函数计算组件为例：

<div align=center> <img src="https://images.serverlessfans.com/devs-github/use.png" width="100%"/> </div>

可以通过命令行工具或者应用中心进行项目的最初创建；在项目开发过程中，我们可以通过本地调试等能力，来验证本地开发的正确性等；在项目调试的环节，可以通过本地调试与远程调用、日志查询等能力，来进行项目的最终调试；在部署环节，可以先通过依赖安装、项目构建等流程构建出完整的部署包，在进行项目的部署；在后期运维缓解，可以通过指标查询来进行项目健康度检查，可通过日志查询等来进行问题定位，可以通过项目发布等能力进行版本发布，别名发布以及灰度发布等；

## 快入安装和使用

通过 npm 包管理安装：适用于已经预装了 npm 的 Windows、Mac、Linux 平台。

在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。

```shell script
$ npm install @serverless-devs/s -g
```

> 说明:
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 Error: EACCES: permission denied，请执行命令 sudo npm install @serverless-devs/s -g。   
> - 如果安装过程较慢，可以考虑使用淘宝 npm 源，安装命令为 npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g。

安装完成之后，可以输入`s`，并按回车，来看看Serverless是否被打印出来：

```
jiangyu@B-165MLVDL-0004 ~ % s

Usage: s [options] [command]

  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \
/_______  /\___  >__|    \_/  \___  >__|  |____/\___  >____  >____  >
        \/     \/                 \/                \/     \/     \/

Welcome to the Serverless Devs Tool.
You can use the corresponding function through the following instructions.


Options:
  -v, --version   Output the version number
  --skip-extends  Skip the extends section
  -h, --help      Display help for command

Commands:
  config          Configure cloud service account.
  gui             Start GUI service.
  init            Initializing a project.
  search          Search the package.
  platform        Publish a(an) Component/Plugin/Application.
  set             Settings for the tool.

```

## 极速体验


<div align=center>

| <div align=center> <a href="https://images.serverlessfans.com/s-tool/demo/poem.mp4"> <img src="https://images.serverlessfans.com/devs-github/cli.jpg" width="80%"/> </a> </div> | <div align=center> <a href="https://images.serverlessfans.com/s-gui/docs/app-store.mp4">  <img src="https://images.serverlessfans.com/devs-github/app-store.jpg" width="80%"/> </a> </div> |
| ------ | ------ |
| <p align="center"> <span> 点击图片播放CLI视频 <br> <a href="https://github.com/Serverless-Devs/docs/blob/master/%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/%E5%85%A5%E9%97%A8%E6%A1%88%E4%BE%8B.md"> 也可以点击此处查看CLI入门案例 </a> </span> </p> | <p align="center"> <span> 点击图片播放应用中心视频 <br>  <a href="https://github.com/Serverless-Devs/docs/blob/master/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%85%A5%E9%97%A8%E6%A1%88%E4%BE%8B.md"> 也可以点击此处查看应用中心入门案例 </a> </span> </p> |

</div>


## 更多文档

* [项目介绍](https://github.com/Serverless-Devs/docs/blob/master/Serverless-Devs/Serverless-Devs介绍.md)
* 命令行工具
  * 入门文档
    * [快速开始](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/快速入门/快速开始.md)
    * [安装文档](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/快速入门/工具安装.md)
    * [账号配置](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/快速入门/密钥配置.md)
    * [Yaml配置](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/快速入门/Yaml格式规范.md)
    * [入门案例](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/快速入门/入门案例.md)
  * 指令文档
    * [Config指令](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/指令相关/Config指令.md)
    * [Init指令](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/指令相关/Init指令.md)
    * [Search指令](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/指令相关/Search指令.md)
    * [Set指令](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/指令相关/Set指令.md)
    * [Platform指令](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/指令相关/Platform指令.md)
  * 高级玩法
    * [泛指令](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/指令相关/泛指令.md)
* 应用中心
  * 入门相关
    * [快速入门](https://github.com/Serverless-Devs/docs/blob/master/应用中心/快速入门.md)
    * [入门案例](https://github.com/Serverless-Devs/docs/blob/master/应用中心/入门案例.md)
  * [应用中心版 awesome](https://github.com/Serverless-Devs/docs/blob/master/应用中心/应用汇总.md)
* 其他文档
  * [Package概念](https://github.com/Serverless-Devs/docs/blob/master/Serverless-Devs/Package概念区分.md)
  * [Package开发指南](https://github.com/Serverless-Devs/docs/blob/master/Serverless-Devs/Package开发指南.md)
* 常见问答：
  * [常见问答](https://github.com/Serverless-Devs/docs/blob/master/开发者工具/快速入门/faq.md)

## 联系我们

<div align=center>

| <div align=center>  <img src="https://images.serverlessfans.com/devs-github/wechat-helper.png" width="200px"/> </div> | <div align=center>  <img src="https://images.serverlessfans.com/devs-github/dingtalk-group.png" width="200px"/> </div> |
| ------ | ------ |
| <p align="center"> <span>微信扫码添加小助手进群</span> </p> | <p align="center"> <span>钉钉扫码进讨论交流群</span> </p> |

</div>

- 其他联系方式：
  - 网址：
    - https://www.serverless.cn
    - https://www.serverless-devs.com
  - 邮箱：service@serverlessfans.com