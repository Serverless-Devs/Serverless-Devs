---
title: Yaml inheritance
description: 'Yaml inheritance'
position: 9
category: 'Overview'
---

# Yaml inheritance
Through the keyword `extend`, the problem of multiple Yaml configuration redundancy is solved.

## Typical scene
For example, when using Serverless Devs to deploy a [Function Compute FC](https://serverless-devs.com/en/fc/readme) application, the pre-release environment and the official environment will be except for [service name](https://serverless-devs.com/en/fc/yaml#service-field) is inconsistent. Other configurations are exactly the same. Yaml configuration is as follows

```
├── code
├── s.yaml
├── s.prod.yaml
└── s.pre.yaml
```
### `s.yaml` is the default configuration
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
        description: "Serverless Devs Service"
      function:
        name: hello-function
        description: "Serverless Devs Function"
        codeUri: "./"
        runtime: nodejs12
        timeout: 60
```
### `s.pre.yaml` is configured as follows
```
extend: s.yaml
services:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pre
        tracingConfig: Disable
```
### `s.pro.yaml` is configured as follows
```
extend: s.yaml
services:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pro
        tracingConfig: Enable
```

Displays the declaration `extend` keyword, to gain the ability to inherit

### Final configuration
By specifying the yaml configuration `s deploy -t s.pro.yaml` takes effect
```
edition: 1.0.0
access: "default"
services:
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

## Merge rules
Configuration merging uses the [extend2](https://www.npmjs.com/package/extend2) module for deep copying.
However, considering that the configuration level of `yaml` is relatively deep, such as the above [example] (#/typical scenario), we need to override the `service name` in the pre-release environment, which needs to be written strictly according to the hierarchical relationship, which is relatively cumbersome.
```
services:
  fc-deploy-test:
    props:
      service:
        name: fc-service-pro
        tracingConfig: Enable
```

### Array merge
When data is merged, it is directly overwritten, not merged

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

## Best Practices
Yaml inheritance is generally used for environment division. For example, the pre-release environment is `s.pre.yaml`, and the online environment is `s.pro.yaml`. When deploying, specify the corresponding deployment template `s deploy -t s.pro.yaml` `Configuration.

### 常见的环境变量
Below are some common environment variable values ​​and their corresponding descriptions.

| Key | Describe |
| --- | --- |
| local | local development environment |
| dev/daily/development | daily development environment |
| pre/prepub | pre-production environment |
| prod/production | Production Environment |
| test/unittest | unit test environment |
