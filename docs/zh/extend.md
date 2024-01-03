---
title: Yaml 继承
description: 'Yaml 继承'
position: 5
category: '使用文档'
---

# Yaml 继承
通过关键字`extend`， 解决多个Yaml配置冗余的问题。

- [最佳实践案例](https://github.com/devsapp/start-realwrold/tree/master/src)


## 典型场景
比如使用Serverless Devs部署一个[函数计算FC](https://serverless-devs.com/fc/readme)应用的时候，预发环境的和正式环境除了[service名称](https://serverless-devs.com/fc/yaml#service%E5%AD%97%E6%AE%B5)不一致。其他配置完全一致。Yaml配置如下
```
├── code
├── s.yaml
├── s.prod.yaml
└── s.pre.yaml
```
### `s.yaml`为默认配置
```
edition: 3.0.0
access: "default"
resources:
  fc-deploy-test:
    component: fc
    props:
      region: cn-hangzhou
      service:
        name: fc-service
        nasConfig: Auto
        description: "Serverless Devs Service"
      function:
        name: hello-function
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
```
### `s.pre.yaml`配置如下
```
extend: s.yaml
resources:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pre
        tracingConfig: Disable
```
### `s.pro.yaml`配置如下
```
extend: s.yaml
resources:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pro
        tracingConfig: Enable
```

显示的声明 `extend`关键字，获得继承能力

### 最终生效的配置
通过指定yaml配置`s deploy -t s.pro.yaml`生效
```
edition: 3.0.0
access: "default"
resources:
  fc-deploy-test:
    component: fc
    props:
      region: cn-hangzhou
      service:
        name: fc-service-pro
        tracingConfig: Enable
        nasConfig: Auto
        description: "Serverless Devs Service"
      function:
        name: hello-function
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
```

## 合并规则
配置的合并使用[extend2](https://www.npmjs.com/package/extend2) 模块进行深度拷贝。
但是考虑到`yaml`的配置层级比较深，比如上面的[示例](#/典型场景),我们在预发环境需要覆盖`resource名称`，需要严格按照层级关系进行编写，相对繁琐。 
```
resources:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pro
        tracingConfig: Enable
```
### 数组合并
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

## 最佳实践
Yaml继承一般用作环境划分，比如预发环境为`s.pre.yaml`，线上环境为`s.pro.yaml`，部署时候通过指定对应部署模版`s deploy -t s.pro.yaml`配置。

### 常见的环境变量
下面是一些常见的环境变量值以及他们对应的说明。

| 值 | 说明 |
| --- | --- |
| local | 本地开发环境 |
| dev/daily/development | 日常开发环境 |
| pre/prepub | 预生产环境 |
| prod/production | 生产环境 |
| test/unittest | 单元测试环境 |
