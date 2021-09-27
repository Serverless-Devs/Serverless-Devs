# 华为云函数计算（FG）组件

## 组件说明

[华为云函数组件](https://github.com/xinwuyun/fg)是一个用于支持华为云函数应用生性周期的工具，基于[Serverless Devs](https://www.serverless-devs.com/)进行开发，通过配置资源配置文件`s.yaml`，您可以简单快速地部署应用到[华为云函数计算平台](https://console.huaweicloud.com/functiongraph/#/serverless/dashboard)。

本组件使用[YAML规范](./docs/Others/yaml.md)（`s.yaml`）定义Serverless资源，定义了您的应用的函数、触发器等资源的配置。

## 快速开始

```shell
$ git clone https://github.com/xinwuyun/fg
$ cd cfc/example
$ s deploy
```

为了让您更好地体验华为云函数计算组件，您可以参考[快速入门文档](./docs/Getting-started/Hello-world-application.md)

## 文档目录

+ [入门相关](./docs/Getting-started/getting-started.md)
  + [开发工具安装](./docs/Getting-started/install.md)
  + [账号配置](./docs/Getting-started/config.md)
  + [快速体验](./docs/Getting-started/Hello-world-application.md)
+ 指令使用方法
  + [部署操作：Deploy](./docs/Usage/deploy.md)
  + [移除操作：Remove](./docs/Usage/remove.md)

## 更多案例

[start-fg](https://github.com/xinwuyun/start-fg)

## 问题反馈

如您在使用中遇到问题，可以在[这里反馈](https://github.com/xinwuyun/fg/issues)

## TODO
+ [x] 完成`function.ts`
+ [x] 完成`trigger.ts`
+ [x] 完成`deploy.ts`
+ [x] 完成`remove.ts`
+ [x] 需要更友好的错误输出
