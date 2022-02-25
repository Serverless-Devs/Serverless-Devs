---
title: Environment distinguish
description: 'Serverless Devs Environment distinguish'
position: 9
category: 'Overview'
---

## Environment distinguish
The Environment configuration function helps users to use different configuration information according to different environments

## Typical scene
For example, when using Serverless Devs to deploy a [Function Compute FC](https://serverless-devs.com/fc/readme) application,The pre-release environment and the official environment are inconsistent except for [service name](https://serverless-devs.com/en/fc/yaml#service-field). Other configurations are exactly the same. Yaml configuration is as follows

```
├── code
├── s.yaml
├── s.prod.yaml
└── s.pre.yaml
```

#### `s.yaml` is default configuration
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

#### `s-pre.yaml` [ pre-release environment ]
```
services.fc-deploy-test.props.service:
  name: fc-service-pre
  tracingConfig: Disable
```

#### `s-pro.yaml` [ online environment ]
```
services.fc-deploy-test.props.service:
  name: fc-service-pro
  tracingConfig: Enable
```
The default configuration and the corresponding configuration (named configuration) file are loaded when specifying the `running environment`. The named configuration and the default configuration will be merged (using [extend2](https://www.npmjs.com/package/extend2) deep copy) into the final configuration, the named configuration item will overwrite the default configuration file with the same name configuration. For example, the `prod` environment will load the `s.prod.yaml` and `s.yaml` files, and `s.prod.yaml` will override the `s.yaml` configuration of the same name.

#### The final configuration
That is to say, the final configuration in the formal environment (`pro`) is as follows:
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
        description: "Serverless Devs Serivce"
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

#### convenient writing
Serverless Devs provides a simple and convenient way to combine `key` values through `.`
```
services.fc-deploy-test.props.service:
  name: fc-service-pro
  tracingConfig: Enable
```

#### Array merge
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
## Runtime environment
Set the current operating environment in the following two ways
#### 1. Configure via `s set` command
`s set` configures global environment variables. Such as: `s set env prod`
#### 2. Configured via the `SERVERLESS_DEVS_ENV` environment variable
Configure environment variables to set the current environment. Here are some typical ways of using variables to configure the environment
- Execute the `export SERVERLESS_DEVS_ENV=prod` command
- Add a `.env` file in the current root directory with the content `SERVERLESS_DEVS_ENV=prod`
#### 3. Specify the parameter `--env prod`
Set the current running environment by specifying the parameter `--env prod`, such as `s deploy --env prod`

> Note: The specified parameters have the highest priority, followed by the environment variable `SERVERLESS_DEVS_ENV` has higher priority than the `s set` directive. That is to say, the above priority is `3` > `2` > `1`

#### Common environment variables
Generally speaking, each company has its own environment variable values. Below are some common environment variable values and their corresponding descriptions.


| Key | Describe |
| --- | --- |
| local | local development environment |
| dev/daily/development | daily development environment |
| pre/prepub | pre-production environment |
| prod/production | Production Environment |
| test/unittest | unit test environment |
