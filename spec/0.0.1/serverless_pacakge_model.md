# Serverless Package Model (SPM)

## 目录
- [目的和目标](#目的和目标)
- [概述和术语](#概述和术语)
    - [模型概述](#模型概述)
- [Package 模型](#Package模型)
    - [元数据规范](#元数据规范)
    - [Registry规范](#Registry规范)
- [适用范围](#适用范围)
- [设计原则](#设计原则)

## 目的和目标

Serverless Package Model(简称SPM，下文将使用SPM代替)的目标是定义一种 Serverless Package 开发模型以及开发者规范；核心目的是基于这套模型或者规范所开发的项目，可以被 Serverless Registry 所接受，并且被 Serverless Devs 开发者工具所识别，按照 Serverless 开发者的预期实现实现预定的功能。

## 概述和术语

Serverless Package Model(SPM) 是 Package 开发者所需要使用的模型，以及遵循的规范。从形态组成纬度包括应用与组件两部分；同文件树组成来看包括用于自描述的`publish.yaml`文件，以及业务代码`

SPM 包括两部分，分别是 Component Model 和 Application Model，这两者分别对应 Serverless Devs 中的组件模型和应用模型：

![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631934027954_20210918030028156081.png)


### 组件与组件模型

- 组件是由指符合 SPM 规范的代码，其目标是用来实现模型功能，包括不限于部署业务逻辑到 Serverless 平台，调试 Serverless 应用代码等；
- 组件模型指的是 SPM 规范中的 Component Model 部分，是 Serverless Devs 的 Package 开发规范，只有按照该模型，遵循该规范的 Serverless Package 才可以被 Serverless Devs CLI 所识别，并且可以成功的发布在符合 Serverless Registry Model 规范的 Serverless Registry 平台上；

### 应用与应用模型

- 应用是由

## Package 模型

## 适用范围

## 设计原则