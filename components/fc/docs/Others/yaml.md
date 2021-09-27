# Yaml规范说明

本文介绍了Yaml配置的相关字段含义。字段对应的权限配置可以参考[权限配置文档](./authority/yaml.md)

**目录**
- [Yaml完整配置](#Yaml完整配置)
- [字段解析](#字段解析)
    - [service字段](#service字段)
        - [role](#role)
        - [logConfig](#logConfig)
        - [vpcConfig](#vpcConfig)
        - [nasConfig](#nasConfig)
    - [function字段](#function字段)
        - [customContainerConfig](#customContainerConfig)
        - [environmentVariables](#environmentVariables)
        - [instanceLifecycleConfig](#instanceLifecycleConfig)
        - [asyncConfiguration](#asyncConfiguration)
        - [destination](#destination)
    - [triggers字段](#triggers字段)
        - [OSS触发器](#OSS触发器)
        - [Log触发器](#Log触发器)
        - [Timer触发器](#Timer触发器)
        - [Http触发器](#Http触发器)
        - [MNS触发器](#MNS触发器)
        - [CDN触发器](#CDN触发器)
    - [customDomains字段](#customDomains字段)
        - [certConfig](#certConfig)
        - [routeConfigs](#routeConfigs)
        

# Yaml完整配置

阿里云函数计算（FC）组件的Yaml字段如下：

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: ffmpeg-app        #  项目名称
access: default         #  秘钥别名

services:
  fc-deploy-test:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: cn-qingdao
      service:
        name: fc-deploy-service
        description: demo for fc-deploy component
        internetAccess: true
        role: 'acs:ram::xxx:role/AliyunFcDefaultRole'
        tracingConfig: Enable  # 'Enable' or 'Disable'
        nasConfig:
          userId: 10003
          groupId: 10003
          mountPoints:
            - serverAddr: xxx.cn-qingdao.nas.aliyuncs.com
              nasDir: /fc-deploy-service
              fcDir: /mnt/auto
        vpcConfig:
          vpcId: xxx
          securityGroupId: xxx
          vswitchIds:
            - vsw-xxx
        logConfig:
          project: xxx
          logstore: xxx
          enableRequestMetrics: true
          enableInstanceMetrics: true
      function:
        name: fc-base-service
        description: 'this is test'
        codeUri: './code.zip'
        ossBucket: xxx
        ossKey: xxx  # conflict with codeUri
        handler: 'index.handler'
        memorySize: 128
        runtime: nodejs12
        timeout: 60
        caPort: 9000
        customContainerConfig:
          image: xxx
          command: xxx
          args: xxx
          instanceID: cri-xxxxxx  # 容器镜像服务企业版实例的ID，共享实例时不需要指定该参数
          accelerationType: Default  # 镜像加速开关，'Default' or 'None'
        environmentVariables:
          key: 'value'
        initializationTimeout: 20
        initializer: index.initializer
        instanceConcurrency: 1
        instanceType: e1  # e1(弹性实例) or c1(性能实例)
        layer: 
          - xxx
          - xxx
        instanceLifecycleConfig:
          preFreeze:
            handler: index.xxx
            timeout: 60
          preStop:
            handler: index.xxx
            preStop: 60
        asyncConfiguration:
          destination:
            onSuccess: acs:fc:{region}:{uid}:services/{serviceName}.{qualifier}/functions/{functionName} 
            onFailure: acs:fc:{region}:{uid}:services/{serviceName}.{qualifier}/functions/{functionName}
            # onSuccess: acs:fc:::services/{serviceName}.{qualifier}/functions/{functionName}
            # onSuccess: acs:mns:::/queues/{queuesName}/messages # mns/queues
            # onSuccess: acs:mns:::/topics/{topicsName}/messages # mns/topics
          maxAsyncEventAgeInSeconds: 456
          maxAsyncRetryAttempts: 3
          statefulInvocation: true
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
        - name: timerTrigger
          type: timer
          config:
            cronExpression: '0 0 8 * * *'
            enable: true
            payload: 'awesome-fc'
        - name: ossTrigger
          type: oss
          role: xxx
          sourceArn: xxx
          config:
            bucketName: fassdemo
            events:
              - oss:ObjectCreated:*
              - oss:ObjectRemoved:DeleteObject
            filter:
              Key:
                Prefix: source/
                Suffix: .png
        - name: logTrigger
          type: log
          role: xxx
          sourceArn: xxx
          config:
            logConfig:
              project: fass-demo
              logstore: fc-log
            jobConfig:
              maxRetryTime: 1
              triggerInterval: 30
            sourceConfig:
              logstore: function-log
            functionParameter:
              key: val
            enable: true
        - name: mnsTrigger
          type: mns_topic
          role: xxx
          sourceArn: xxx
          config:
            topicName: test-topic
            region: cn-hangzhou
            notifyContentFormat: 'JSON'
            notifyStrategy: 'BACKOFF_RETRY'
        - name: cdnTrigger
          type: cdn_events
          role: xxx
          sourceArn: xxx
          config:
            eventName: LogFileCreated
            eventVersion: '1.0.0'
            notes: cdn events trigger test
            filter:
              domain: 
                - 'www.taobao.com'
                - 'www.tmall.com'
        - name: tablestoreTrigger
          type: tablestore
          role: xxx
          sourceArn: xxx
          config:
            instanceName: xxx
            tableName: xxxs
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /a
              serviceName: fc-deploy-service
              functionName: custom-container-function
              methods:
                - GET
          certConfig:
            certName: xxx
            certificate: xxx
            privateKey: xxx
```

# 字段解析

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| region | True | Enum | 地域 |
| service | True | Struct | 服务 |
| function | True | Struct | 函数 |
| triggers | True | Struct | 触发器 |
| customDomains | True | Struct | 自定义域名 |

地区目前支持：`cn-beijing`, `cn-hangzhou`, `cn-shanghai`, `cn-qingdao`, `cn-zhangjiakou`, `cn-huhehaote`, `cn-shenzhen`, `cn-chengdu`, `cn-hongkong`, `ap-southeast-1`, `ap-southeast-2`, `ap-southeast-3`, `ap-southeast-5`, `ap-northeast-1`, `eu-central-1`, `eu-west-1`, `us-west-1`, `us-east-1`, `ap-south-1`

## service字段
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | service名称 |
| description | False | String | Service的简短描述 |
| internetAccess | False | Boolean | 设为true让function可以访问公网 |
| tracingConfig | False | String | 链路追踪，可取值：Enable、Disable |
| role | False | String[简单配置]/Struct[详细配置] | 授予函数计算所需权限的RAM role, 使用场景包含 1. 把 function产生的 log 发送到用户的 logstore 中 2. 为function 在执行中访问其它云资源生成 token |
| logConfig | False | Enum[简单配置]/Struct[详细配置] | log配置，function产生的log会写入这里配置的logstore |
| vpcConfig | False | Enum[简单配置]/Struct[详细配置] | VPC配置, 配置后function可以访问指定VPC |
| nasConfig | False | Enum[简单配置]/Struct[详细配置] | NAS配置, 配置后function可以访问指定NAS |

### role

当`role`参数为字符串时，可以是：`acs:ram::xxx:role/AliyunFcDefaultRole`

当`role`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | 角色名 |
| policies | True | List<String> | 策略列表 |

#### policies

其中 `policies` 表示策略列表，当使用了这个字段，需要本地配置的 ak 具有创建 policy 和 role 的权限，列表中的元素支持字符串和 `policy` 结构体，该结构体可以参考:

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | 策略名称 |
| description | False | String | 策略描述 |
| statement | True | List<Struct> | 策略内容列表 |

#### statement

其中 `statement` 表示策略内容列表，列表中元素的结构体可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| Effect | True | String | 策略效果，可选值有 'Allow' 和 'Deny' |
| Action | True | List<String> | 策略动作 |
| Resource | True | String/List<String> | 策略的目标资源 |
| Condition | False | Object | 策略的目标资源 |

role 的示例如下所示：

```
role:
  name: roleName
  policies:
    - AliyunOSSFullAccess
    - name: myPolicy
      description: custom policy
      statement: 
      - Effect: Allow
        Action: 
          - log:ListProject
        Resource:
          - acs:log:*:*:project/*
```

> 相关权限可以参考[权限文档](./authority/yaml.md#如果需要操作角色)

### logConfig

当`logConfig`参数为简单配置是，可以是：`auto`

当`logConfig`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| logstore | False | String | loghub中的logstore名称 |
| project | False | String | loghub中的project名称 |
| enableRequestMetrics | False | Boolean | RequestMetrics开关，取值`true`/`false` |
| enableInstanceMetrics | False | Boolean | InstanceMetrics开关，取值`true`/`false` |

> 相关权限可以参考[权限文档](./authority/yaml.md#存在日志配置的情况)

### vpcConfig

当`vpcConfig`参数为简单配置是，可以是：`auto`

当`vpcConfig`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| securityGroupId | False | String | 安全组ID |
| vSwitchIds | False | List<String> | 交换机 ID 列表 |
| vpcId | False | String | VPC ID |

> 相关权限可以参考[权限文档](./authority/yaml.md#存在-VPC-配置)

### nasConfig

当`nasConfig`参数为简单配置是，可以是：`auto`

当`nasConfig`参数为结构时，可以参考：

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| mountPoints | False | List<Struct>[多目录配置] | 目录配置 |
| userId | False | String | userID, 默认为10003 |
| groupId | False | String | groupID, 默认为10003 |

> 相关权限可以参考[权限文档](./authority/yaml.md#存在-NAS-配置)

#### mountPoints

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| serverAddr | False | String | NAS 服务器地址 |
| nasDir | False | String | NAS目录 |
| fcDir | False | String | 函数计算目录 |


## function字段
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | function名称 |
| description | False | String | function的简短描述 |
| codeUri | False | String | 代码位置 |
| ossBucket | False | String | 代码存放的 oss 存储桶 |
| ossKey | False | String | 如果指定 oss 代码，所对应的对象，不能与codeUri同时出现  |
| handler | False | String | function执行的入口，具体格式和语言相关 |
| memorySize | False | Number | function的内存规格 |
| runtime | True | String | 运行时 |
| timeout | False | Number | function运行的超时时间 |
| caPort | False | Number | CustomContainer/Runtime指定端口 |
| customContainerConfig | False | Struct | 自定义镜像配置 |
| environmentVariables | False | List<Struct> | 环境变量 |
| initializationTimeout | False | Number | 初始化方法超时时间 |
| initializer | False | String | 初始化方法 |
| instanceConcurrency | False | Number | 单实例多并发 |
| instanceType | False | String | 函数实例类型，可选值为：e1（弹性实例）、c1（性能实例） |
| instanceLifecycleConfig | False | Struct | 扩展函数 |
| asyncConfiguration | False | Struct | 异步配置 |

runtime目前支持：`nodejs4.4`、`nodejs6`、`nodejs8`、`nodejs10`、`nodejs12`、`python2.7`、`python3`、`java8`、`java11`、`php7.2`、`dotnetcore2.1`、`custom`及`custom-container`

### customContainerConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| image | False | String | 容器镜像仓库地址 |
| command | False | String | 容器启动指令，示例值: '["/code/myserver"]' |
| args | False | String | 容器启动参数，示例值: '["-arg1", "value1"]' |
| accelerationType | False | String | 镜像加速开关，可选值：'Default'、'None'，前者表示开启，后者表示关闭 |
| instanceID | False | String | 容器镜像服务企业版实例的ID。当容器镜像选择的是企业版实例时，您需要给容器镜像服务企业版添加实例ID，该实例的默认解析必须是服务所在的VPC网络地址。目前不支持PrivateZone产品定义域名解析 |


> 相关权限可以参考[权限文档](./authority/yaml.md#Runtime-为-custom-container)

### environmentVariables

Object格式，例如：

```
TempKey: tempValue
```

### instanceLifecycleConfig

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| preFreeze | False | Struct |  PreFreeze 函数 |
| preStop | False | Struct |  PreStop 函数 |

#### preFreeze和preStop

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| handler | True | String |  函数入口 |
| timeout | False | Number |  超时时间 |

### asyncConfiguration
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| maxAsyncEventAgeInSeconds | False | Number |  消息最大存活时长，取值范围[1,2592000]。单位：秒 |
| maxAsyncRetryAttempts | False | Number |  异步调用失败后的最大重试次数，默认值为3。取值范围[0,8] |
| statefulInvocation | False | Boolean |  是否开启有状态异步调用 |
| destination | False | Struct |  异步调用目标的配置结构体 |

> 相关权限可以参考[权限文档](./authority/yaml.md#存在-asyncConfig-配置)


#### destination
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| onSuccess | False | String |  异步调用失败的目标服务 |
| onFailure | False | String |  异步调用成功的目标服务 |


## triggers字段

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| name | True | String | 触发器名称 |
| type | True | Enum | 触发器类型 |
| role | False | String | 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限 |
| sourceArn | False | String | 触发器事件源的 ARN |
| config | True | Struct | 触发器配置 |

type目前支持：`http`, `timer`, `oss`, `log`, `mns_topic`, `cdn_events`, `tablestore`

> 相关权限可以参考[权限文档](./authority/yaml.md#触发器相关权限配置)

### OSS触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| bucketName | True | String | OSS 中目标 bucket 名称 |
| events | True | List<String> | OSS 端触发函数执行的事件列表 |
| filter | True | Struct | 触发条件 |

#### filter

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| Key | False | Struct | 键值 |

##### Key

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| Prefix | False | String | 前缀 |
| Suffix | False | String | 后缀 |


### Log触发器


| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| logConfig | True | Struct | 日志配置 |
| jobConfig | True | List | job配置 |
| sourceConfig | True | Struct | source配置 |
| functionParameter | True | Struct | 该参数将作为函数Event的Parameter传入函数。默认值为空（{}） |
| enable | True | Boolean | 触发器开关 |

#### logConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| project | False | String | 日志项目名称 |
| logstore | False | String | 日志仓库名称，日志服务触发函数执行过程的日志会记录到该日志仓库中 |


#### jobConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| maxRetryTime | False | String | 表示日志服务触发函数执行时，如果遇到错误，所允许的最大尝试次数，取值范围：[0,100] |
| triggerInterval | False | String | 日志服务触发函数运行的时间间隔，取值范围：[3,600]，单位：秒 |

#### sourceConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| logstore | False | String | 触发器会定时从该日志仓库中订阅数据到函数服务进行自定义加工 |

#### functionParameter

Object格式，例如：

```
TempKey: tempValue
```

### Timer触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| cronExpression | True | String | 时间触发器表达式，支持两种设置：@every、cron 表达式 |
| enable | True | Boolean | 是否启用该触发器 |
| payload | False | String | 代表触发器事件本身的输入内容 |

### Http触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| authType | True | String | 鉴权类型，可选值：anonymous、function |
| methods | True | List<String> | HTTP 触发器支持的访问方法，可选值：GET、POST、PUT、DELETE、HEAD |

### MNS触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| topicName | True | String | mns topic的名字 |
| region | False | List | mns topic 所在的 region，如果不填，默认为和函数一样的 region |
| notifyContentFormat | False | String | 推送给函数入参 event 的格式，可选值：STREAM, JSON |
| notifyStrategy | False | String | 调用函数的重试策略，可选值：BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY |
| filterTag | False | String | 描述了该订阅中消息过滤的标签（标签一致的消息才会被推送）,不超过 16 个字符的字符串，默认不进行消息过滤，即默认不填写该字段 |

### CDN 触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| eventName | True | String | 为 CDN 端触发函数执行的事件，一经创建不能更改 |
| eventVersion | True | String | 为 CDN 端触发函数执行事件的版本，一经创建不能更改 |
| notes | True | String | 备注信息 |
| filter | True | Struct | 过滤器（至少需要一个过滤器） |

#### filter

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| domain | True | List<String> | 过滤参数值的集合 |

### Tablestore 触发器

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| instanceName | True | List<String> | 表格存储实例的名称 |
| tableName | True | List<String> | 实例中的表名称 |

## customDomains字段

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| domainName | True | String | 域名，如果是auto取值，系统则会默认分配域名 |
| protocol | True | String | 协议，取值：`HTTP`, `HTTPS`, `HTTP, HTTPS` |
| routeConfigs | True | List<Struct> | 路由 |
| certConfig | False | Struct | 域名证书 |

> 相关权限可以参考[权限文档](./authority/yaml.md#自定义域名相关权限配置)

### certConfig
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| certName | False | String | 证书名称 |
| privateKey | False | String | 表示私钥 |
| certificate | False | String | 表示证书 |

### routeConfigs
| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| path | True | String | 路径 |
| serviceName | False | String | 服务名 |
| functionName | False | String | 函数名 |
| qualifier | False | String | 服务的版本 |
