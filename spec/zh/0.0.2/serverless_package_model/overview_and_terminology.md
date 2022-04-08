---
title: 概述和术语
description: '概述和术语'
position: 3
category: '开发包模型'
---
# 概述和术语

Serverless Package Model(SPM) 是 Package 开发者所需要使用的模型，以及遵循的规范。从形态组成纬度包括应用与组件两部分；同文件树组成来看包括用于自描述的`publish.yaml`文件，以及业务代码。

## Package 分类

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648712870514_20220331074750683504.png)

Package 分为三类：

- 组件(Component)：组件是一个实现具体业务的模块，例如函数的部署、应用的调试等。通常情况下一个业务对应一个组件，通过不同方法，不同参数，实现不同的功能；组件可以被继承。
  > 举例：阿里云函数计算（FC）组件，有`deploy`、`invoke`、`instance`、`logs`等诸多方法，用户可以通过指定不同的方法，以及对应的参数的传入，实现不同的功能；函数计算（FC）组件依赖了`fc-deploy`组件实现了函数的部署能力，依赖了`fc-logs`组件实现了函数日志查看能力；
- 插件(Plugin)：插件是一个轻量化的业务实现模块，通常情况下一个插件可以实现一个轻量化能力，是在组件执行前后伴随执行，并会对参数进行处理。
  > 举例：某业务在进行部署之前，需要进行编译操作，当用户配置的源代码目录为`./code`后，通过编译插件进行编译，将产物放在了`./dist`目录，此时插件可以按照规范，对用户配置的入参进行处理，在传递给组件进行部署等操作；
- 应用(Application)：应用指的是用户的 Serverless 应用或者业务，通常情况下一个 Yaml 表示一个应用，一组 Yaml 表示一个应用的不同环境；应用可以包括多个 Service，每个 Service 只可以对应一个组件，伴随组件前后，可以有多个插件参与；
  > 举例：用户本地有`s.release.yaml`表示的是一个 Serverless 应用，且是线上环境，除此之外，该应用还有一个`s.dev.yaml`是开发环境使用的 Yaml，在该应用中，有3个服务，服务1和服务3用了组件1，服务2用了组件2，且服务1在执行前会执行插件1和插件2，服务2在执行前会执行插件1和插件3，服务3在执行前会执行插件4，在执行后会执行插件5；

在一个流程中的三者的关系：

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648714969453_20220331082249601987.png)

其中组件和插件的异同：

- 同：都是实现具体业务逻辑的代码或者脚本；
- 异：
    - 定位不同：
        - 组件是完整的业务逻辑，相对较重，可单独使用；
        - 插件是轻量化的插拔，配合组件使用，在组件执行前后发挥作用；
    - 行为不同：
        - 组件会有不同的方法，以及不同的参数来实现不同的功能；
        - 插件只有固定的方法，尽管可以接受不同的参数，但是自由度和灵活度相对来说比较低，专业程度却比较高；

## Package 与 Package Model

相对来说，Package是一个实际的产物，由规范的代码组成，目的是完成某个功能或者表示一个案例；而Package Model相对来说是抽象的存在，表示的是一种规范与规则。

- Package是由指符合 SPM 规范的代码，其目标是用来实现模型功能，包括不限于部署业务逻辑到 Serverless 平台，调试 Serverless 应用代码等；
- Package Model 是 Serverless Devs 的 Package 开发规范，只有按照该模型，遵循该规范的 Serverless Package 才可以被 Serverless Devs 开发者工具 所识别，并且可以成功的发布在符合 Serverless Registry Model 规范的 Serverless Registry 平台上；

