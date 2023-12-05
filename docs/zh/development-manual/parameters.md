---
title: Parameters参数
description: 'Pacakge 发布'
position: 4
category: '开发手册'
---
# Parameters 规范
Parameters 参数是 Publish.yaml 中用来描述 yaml 的相关参数，严格遵守Json Schema规范标准

- [Parameters UI规范](#ParametersUI规范)
  - [默认数据类型](#默认数据类型)
    - [string](#string)
    - [boolean](#boolean)
    - [secret](#secret)
    - [integer](#integer--int)
    - [int](#integer--int)
  - [自定义UI](#自定义UI)
    - [oss x-bucket](#x-bucket)
    - [角色授权 x-role](#x-role)
    - [nas网盘 x-nas](#x-nas)
    - [容器镜像 x-acr](#x-acr)
    - [kafka x-kafka](#x-kafka)
    - [域名配置 x-domain](#x-domain)
- [tips小贴士](#tips小贴士)
  - [随机后缀名](#随机后缀名${default-suffix})
  - [模版引擎](#模版引擎)
  - [自定义过滤器](#自定义过滤器filter)

## 默认数据类型
### string
完整的描述为
```
region:
  title: 地域
  type: string
  default: cn-hangzhou
  description: 创建应用所在的地区
  enum:
    - cn-beijing
    - cn-hangzhou
    - cn-shanghai
    - cn-qingdao
    - cn-zhangjiakou
    - cn-huhehaote
    - cn-shenzhen
    - cn-chengdu
    - cn-hongkong
    - ap-southeast-1
    - ap-southeast-2
    - ap-southeast-3
    - ap-southeast-5
    - ap-northeast-1
    - eu-central-1
    - eu-west-1
    - us-west-1
    - us-east-1
    - ap-south-1
```
> enum代表枚举值，用户无需手动输入，直接选择

- 在cli 的表现形式为:
![](https://img.alicdn.com/imgextra/i4/O1CN01kOr5UI29BKmNNuZLe_!!6000000008029-2-tps-1304-334.png)

- 在网页端表现形式为
![](https://img.alicdn.com/imgextra/i4/O1CN01A49qaI23UfoB84sU2_!!6000000007259-2-tps-1968-644.png)

### boolean

完整的描述为

```
internetAccess:
  type: boolean
  title: 允许公网访问
  description: 配置服务中的函数是否可以访问互联网
  default: true
```

- 在 cli 的表现形式为:
  ![](https://img.alicdn.com/imgextra/i3/O1CN01sOYVzv1tDast8IvYQ_!!6000000005868-2-tps-1128-152.png)

- 在网页端表现形式为
  ![](https://img.alicdn.com/imgextra/i4/O1CN01pMntUJ1MHpDpOLFTa_!!6000000001410-2-tps-1670-472.png)

### secret

完整的描述为

```
secret:
  type: secret
  title: 应用管理员密码
  description: 字母、数字、下划线，长度8-30位
  default: 12345678
```

- 在 cli 的表现形式为:
  ![](https://img.alicdn.com/imgextra/i3/O1CN019EYuxL1gsjSDv9JN0_!!6000000004198-2-tps-1162-248.png)

- 在网页端表现形式为
  ![](https://img.alicdn.com/imgextra/i4/O1CN01a5k5QP1JnTkSr1Zo0_!!6000000001073-2-tps-1814-468.png)

### integer | int

完整的描述为

```
gpuMemorySize:
  title: 显存大小
  type: integer | int
  default: 4096
  description: 应用分配显存大小
```

- 在 cli 的表现形式为:
  ![](https://img.alicdn.com/imgextra/i3/O1CN01KFRzeg22H6Wo4QABg_!!6000000007094-2-tps-1448-164.png)

- 在网页端表现形式为
  ![](https://img.alicdn.com/imgextra/i4/O1CN01JAlEQn20jq98w0heO_!!6000000006886-2-tps-1521-145.png)

## 自定义UI
自定义UI主要用户在web端，用户能够方便的进行操作。一般以`x-`开头
#### x-bucket
用于oss bucket选择
```
bucketName:
  title: OSS存储桶名
  type: string
  default: ""
  description: OSS存储桶名(注意和函数同地域)
  x-bucket:
    dependency:
      - region # 依赖其他输入字段region
```
![](https://img.alicdn.com/imgextra/i3/O1CN01qmCC5P1adGNimqJuM_!!6000000003352-2-tps-1946-700.png)

required中不包含bucketName时页面UI展示

启用状态
![](https://img.alicdn.com/imgextra/i4/O1CN01vM0QX31cwcMRn3Xwe_!!6000000003665-2-tps-2670-774.png)

禁用状态
![](https://img.alicdn.com/imgextra/i2/O1CN01yaCNXx20b8Z3JpxX5_!!6000000006867-2-tps-2442-178.png)


##### 字段描述
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| dependency | list<`string`> |  依赖字段  |

#### x-role
用于角色的选择
```
triggerRoleArn:
  title: 触发器RAM角色ARN
  type: string
  default: ''
  pattern: '^acs:ram::[0-9]*:role/.*$'
  description: OSS使用此角色来发送事件通知来调用函数
  required: true
  x-role:
    name: aliyunosseventnotificationrole # 角色名
    service: OSS # 服务账号
    authorities:
      - AliyunFCInvocationAccess
```
![](https://img.alicdn.com/imgextra/i1/O1CN01LQCH9a1XiLw3aa09O_!!6000000002957-2-tps-2032-770.png)

> pattern代表正则，表示当前字段的值需要匹配该正则


##### 字段描述
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| name | `string` |  系统角色名  |
| service | `string` |  服务账号,现在支持的系统账号: OSS,FC,LOG  |
| authorities | list<`string`> |  系统策略  |

#### x-nas

用于 NAS挂载点, VPC, 交换机, 安全组 的选择

```
mountPointsServerAddr:
  title: NAS挂载点地址
  type: string
  default: ""
  description: NAS 挂载点地址，可以登录 <a href="https://nasnext.console.aliyun.com" target="_blank">NAS控制台</a> 查看
  x-nas:
    denpendency:
      - region
```
##### 字段描述

| 字段名     | 类型           | 描述     |
| ---------- | -------------- | -------- |
| dependency | list<`string`> | 依赖字段 |


> 注意，x-nas 配合 'vpcId', 'vswitchId', 'securityGroupId' 字段使用

```
vpcId:
  title: VPC Id
  type: string
  default: ""
  description: NAS 挂载点所在 VPC ID, 例如 vpc-bp1lynmabizqdgt4308dt
vswitchId:
  title: 交换机 Id
  type: string
  default: ""
  description: NAS 挂载点所在虚拟交换机VSW ID, 交换机最好在 FC 支持的可用区
securityGroupId:
  title: 安全组 Id
  type: string
  default: ""
  description: 登录 <a href="https://ecs.console.aliyun.com/#/securityGroup/region/cn-hangzhou" target="_blank">安全组</a> 查看, 通常默认创建的空安全组即可(注意和上面地域相同), 例如 sg-bp1cd2w08t3dy7nhrvtx
```

![](https://img.alicdn.com/imgextra/i1/O1CN01eov5OU1op5DsbN82b_!!6000000005273-2-tps-2016-750.png)

#### x-acr

用于阿里云容器镜像服务镜像的选择和创建

```
acrRegistry:
  title: 镜像仓库
  type: string
  examples: ['registry.cn-hangzhou.aliyuncs.com/fc-demo/custom-nodejs14-event-function:v0.1']
  description: 镜像仓库地址，需要在 https://cr.console.aliyun.com/ 中开通服务、创建仓库以及设置访问凭证
  x-acr:
    type: select
```

![](https://img.alicdn.com/imgextra/i4/O1CN01IwsAuR1Ur6f5MVB5n_!!6000000002570-2-tps-2238-348.png)
##### 字段描述

| 字段名     | 类型           | 描述     |
| ---------- | -------------- | -------- |
| type | String | select:选择镜像， tag: 创建Tag |

#### x-kafka

用于kafka实例ID, kafkaEndpoint, VPC, 交换机, 安全组 的选择

```
kafkaInstanceID:
  title: kafka instance id
  type: string
  default: ''
  description: kafka 实例 id
  x-kafka:
    denpendency:
      - region
    related:
      - kafkaEndpoint
      - vpcId
      - vswitchId
      - securityGroupId
```

##### 字段描述

| 字段名     | 类型           | 描述     |
| ---------- | -------------- | -------- |
| dependency | list<`string`> | 依赖字段 |
| related | list<`string`> | 关联字段 |


> 注意，x-kafka 配合 'kafkaEndpoint', 'vpcId', 'vswitchId', 'securityGroupId' 字段使用

```
kafkaEndpoint:
  title: kafka endpoint
  type: string
  default: ''
  description: kafka endpoint, 可以从 kafka 控制台获取
vpcID:
  title: kafka 实例所在 vpc id
  type: string
  default: ''
  description: VPC id。请注意需要填写函数计算支持的 az
vswitchID:
  title: vswitchID
  type: string
  default: ''
  description: vpc 中 vswitch id，用于内网访问 kafka
securityGroupID:
  title: security group id
  type: string
  default: ''
  description: vpc 下安全组 id，用于内网访问 kafka
```

![](https://img.alicdn.com/imgextra/i3/O1CN01wwZp7m1sSsUeXvXDI_!!6000000005766-2-tps-2324-766.png)

#### x-domain
用于可配置域名来访问您的函数

```
domainName:
  title: 域名配置
  type: string
  default: auto
  required: false
  x-domain: true
```

##### 字段描述

| 字段名     | 类型           | 描述     |
| ---------- | -------------- | -------- |
| x-domain | Boolean | x-domain: true，可在web端显示域名配置项  |

##### 自动配置UI

![](https://img.alicdn.com/imgextra/i2/O1CN01XZFXdd1NIZWVVKHit_!!6000000001547-2-tps-2576-212.png)

##### 自定义配置域名UI

![](https://img.alicdn.com/imgextra/i2/O1CN01iPn9PR1V1doJEP4Y5_!!6000000002593-2-tps-2366-290.png)

# tips小贴士

### 随机后缀名default-suffix
用于字段生成一个随机后缀名，以保证每次初始化时候都可以得到不同的值。比如服务名称等。

```
serviceName:
  title: 服务名
  type: string
  default: web-framework-${default-suffix}
  pattern: "^[a-zA-Z_][a-zA-Z0-9-_]{0,127}$"
  description: 服务名称，只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-128 之间
```

- 在cli 的表现形式为:
![](https://img.alicdn.com/imgextra/i1/O1CN01GfWUYG1tP2mjNMScE_!!6000000005893-2-tps-1178-140.png)

- 在网页端表现形式为
![](https://img.alicdn.com/imgextra/i3/O1CN01DwxGgH205XDzjlOjo_!!6000000006798-2-tps-1616-380.png)

### 模版引擎
应用初始化时，使用[art-template](https://aui.github.io/art-template/zh-cn/docs/)进行模版解析

比如：编写应用模板时，用户可以自己指定vpc配置，如果指定了就用自定义的，没指定就用auto

- publish.yaml

```
vpcConfigType:
  title: VPC网络配置
  type: string
  description: 配置服务中函数使用的网络，例如配置函数是否可以访问公网，是否可以访问 VPC 中的资源等。
  enum:
    - auto
    - 自定义配置
```

- s.yaml

```yaml
# ...others
service:
  name: "{{ serviceName }}"
  description: 欢迎使用ServerlessTool
  {{if vpcConfigType === 'auto'}}
  vpcConfig: auto
  {{else}}
  vpcConfig: # VPC配置, 配置后function可以访问指定VPC
    vpcId: "{{vpcID}}" # VPC ID
    securityGroupId: "{{securityGroupID}}" # 安全组ID
    vswitchIds: # 交换机 ID 列表
      - "{{vswitchID}}"
  {{/if}}
```
> 更多语法支持可以查看[art-template](https://aui.github.io/art-template/zh-cn/docs/syntax.html)文档

### 自定义过滤器filter
应用初始化时，对模版解析的时候可以自定义过滤器。

- 首先我们需要在`hook/filter.js`文件里定义过滤器

  `hook/filter.js` 内容示例
  ```js
  function timestamp(value) {
    return `your code: ${value}`
  }
  module.exports = {
    timestamp,
  };
  ```
- 然后在模版里就可以使用我们定义过的过滤器

  `s.yaml`使用过滤器示例

  ```yaml
  # ...others
  time: "{{time | timestamp}}"
  ```
