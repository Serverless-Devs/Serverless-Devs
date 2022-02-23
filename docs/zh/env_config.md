---
title: 多环境配置
description: 'Serverless Devs 多环境配置'
position: 9
category: '概述'
---

# 多环境配置
多环境配置功能，帮助用户根据不同的环境，来使用不同的配置信息。

## 典型场景
比如使用Serverless Devs部署一个[函数计算FC](https://serverless-devs.com/fc/readme)应用的时候，预发环境的和正式环境除了[service名称](https://serverless-devs.com/fc/yaml#service%E5%AD%97%E6%AE%B5)不一致。其他配置完全一致。Yaml配置如下
```
├── code
├── s.yaml
├── s-prod.yaml
└── s-pre.yaml
```
#### `s.yaml`为默认配置
```
edition: 1.0.0
access: "default"
services:
  fc-deploy-test:
    component: fc
    props:
      region: cn-hangzhou
      service:
        name: fc-service
        nasConfig: Auto
        description: "Serverless Devs Serivce"
      function:
        name: hello-function
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
```
#### `s-pre.yaml`[预发]配置如下
```
services.fc-deploy-test.service:
  name: fc-service-pre
  tracingConfig: Enable
```
#### `s-pro.yaml`[线上]配置如下
```
services.fc-deploy-test.service:
  name: fc-service
  tracingConfig: Disable
```

`s.yaml`为默认的配置文件，所有的环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。

当指定`运行环境`时候会加载默认配置以及对于的配置(具名配置)文件。具名配置和默认配置将合并(使用[extend2](https://www.npmjs.com/package/extend2)深拷贝)成最终的配置，具名配置项会覆盖默认配置文件的同名配置。比如`prod`环境会加载`s.prod.yaml`和`s.yaml` 文件,同时`s.prod.yaml`会覆盖`s.yaml`的同名配置。

#### 最终生效的配置
也就是说在预发环境(`pre`)中最终生效的配置如下：
```
edition: 1.0.0
access: "default"
services:
  fc-deploy-test:
    component: fc
    props:
      region: cn-hangzhou
      service:
        name: fc-service-pre
        tracingConfig: Enable
        nasConfig: Auto
        description: "Serverless Devs Serivce"
      function:
        name: hello-function
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
```

## 合并规则
配置的合并使用[extend2](https://www.npmjs.com/package/extend2) 模块进行深度拷贝。
但是考虑到`yaml`的配置层级比较深，比如上面的[示例](#/典型场景),我们在预发环境需要覆盖`service名称`，需要严格按照层级关系进行编写，相对繁琐。 
```
services:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pre
        tracingConfig: Enable
```
#### 便捷写法
Serverless Devs 提供了简便捷的写法，可以将`key`值通过`.`的进行合并
```
services.fc-deploy-test.service:
  name: fc-service
  tracingConfig: Disable
```

#### 数组合并
数据在做合并的时候，直接覆盖，而不是合并操作
```
const a = {
  arr: [1, 2],
};
const b = {
  arr: [3],
};
extend(true, a, b);
// => { arr: [ 3 ] }
```

## 运行环境
通过以下两种方式来设置当前的运行环境

#### 通过`s set`指令配置
`s set`配置的是全局环境变量。如: `s set env prod`
#### 通过`SERVERLESS_DEVS_ENV`环境变量配置
配置环境变量来设置当前的环境。这里提供几种配置环境的变量的典型使用方式

- 执行`export SERVERLESS_DEVS_ENV=prod`命令
- 在当前根目录中添加`.env`文件,内容为`SERVERLESS_DEVS_ENV=prod`


> 注意： 环境变量`SERVERLESS_DEVS_ENV`的优先级高于`s set`指令的


#### 常见的环境变量
一般来说，每个公司都有一些自己的环境变量值，下面是一些常见的环境变量值以及他们对应的说明。


| 值 | 说明 |
| --- | --- |
| local | 本地开发环境 |
| dev/daily/development | 日常开发环境 |
| pre/prepub | 预生产环境 |
| prod/production | 生产环境 |
| test/unittest | 单元测试环境 |
