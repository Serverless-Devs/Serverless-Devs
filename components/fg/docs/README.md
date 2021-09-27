# 百度云函数计算（CFC）组件

## 组件说明

[百度云函数组件](https://github.com/xinwuyun/cfc)是一个用于支持百度云函数应用生性周期的工具，基于[Serverless Devs](https://www.serverless-devs.com/)进行开发，通过配置资源配置文件`s.yaml`，您可以简单快速地部署应用到[百度云函数计算平台](https://console.bce.baidu.com/cfc/#/cfc/overview)。

本组件使用[YAML规范](./Others/yaml.md)（`s.yaml`）定义Serverless资源，定义了您的应用的函数、触发器等资源的配置。

## 快速开始

```shell
$ git clone https://github.com/xinwuyun/cfc
$ cd cfc/example
$ s deploy
```

[^此处编写快速入门文档]:为了让您更好地体验阿里云函数计算组件，您可以参考快速入门文档

## 文档目录

+ [入门相关](./docs/Getting-started/getting-started.md)
  + [开发工具安装](./docs/Getting-started/install.md)
  + [账号配置](./docs/Getting-started/config.md)
  + [快速体验](./docs/Getting-started/Hello-world-application.md)
+ 指令使用方法
  + [部署操作：Deploy](./docs/Usage/deploy.md)
  + [移除操作：Remove](./docs/Usage/remove.md)

## 问题反馈

如您在使用中遇到问题，可以在[这里反馈](https://github.com/xinwuyun/cfc/issues)

