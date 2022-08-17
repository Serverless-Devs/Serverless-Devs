---
title: Pacakge model - Parameters parameter
description: 'Pacakge release'
position: 5
category: 'Development Kit Models'
---
- [Release app](https://github.com/orgs/Serverless-Devs/discussions/439)
- [Application Model Specification](https://github.com/Serverless-Devs/Serverless-Devs/blob/publish_docs/spec/en/0.0.2/serverless_package_model/package_model.md#application-model-specification)
- [Parameters UI Specification](#ParametersUI Specification)
  - [default data type](#default data type)
    - [string](#string)
    - [boolean](#boolean)
    - [secret](#secret)
  - [custom UI](#custom UI)
    - [oss x-bucket](#x-bucket)
    - [role authorization x-role](#x-role)
    - [nas network disk x-nas](#x-nas)
    - [container registry x-acr](#x-acr)
- [tips](#tips)
  - [random suffix name](#random suffix name${default-suffix})
  - [template engine](#template engine)
  - [custom filter](#custom filter filter)

# ParametersUI specification
## default data type
### string
The full description is
````
region:
  title: Territory
  type: string
  default: cn-hangzhou
  description: The region where the app is created
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
    -ap-southeast-1
    -ap-southeast-2
    -ap-southeast-3
    -ap-southeast-5
    -ap-northeast-1
    - eu-central-1
    - eu-west-1
    - us-west-1
    - us-east-1
    - ap-south-1
````
> enum represents the enumeration value, the user does not need to enter it manually, just select it directly

- The expression in cli is:
![](https://img.alicdn.com/imgextra/i4/O1CN01kOr5UI29BKmNNuZLe_!!6000000008029-2-tps-1304-334.png)

- The expression on the webpage is as
![](https://img.alicdn.com/imgextra/i4/O1CN01A49qaI23UfoB84sU2_!!6000000007259-2-tps-1968-644.png)

### boolean

The full description is

````
internetAccess:
  type: boolean
  title: allow public network access
  description: Whether the function in the configuration service can access the Internet
  default: true
````

- The expression in cli is:
  ![](https://img.alicdn.com/imgextra/i3/O1CN01sOYVzv1tDast8IvYQ_!!6000000005868-2-tps-1128-152.png)

- The expression on the webpage is as
  ![](https://img.alicdn.com/imgextra/i4/O1CN01pMntUJ1MHpDpOLFTa_!!6000000001410-2-tps-1670-472.png)

### secret

The full description is

````
secret:
  type: secret
  title: Application Admin Password
  description: letters, numbers, underscores, 8-30 digits long
  default: 12345678
````

- The expression in cli is:
  ![](https://img.alicdn.com/imgextra/i3/O1CN019EYuxL1gsjSDv9JN0_!!6000000004198-2-tps-1162-248.png)

- The expression on the webpage is as
  ![](https://img.alicdn.com/imgextra/i4/O1CN01a5k5QP1JnTkSr1Zo0_!!6000000001073-2-tps-1814-468.png)
## custom UI
The main user of the custom UI is on the web side, and the user can operate it conveniently. Usually starts with `x-`
#### x-bucket
Used for oss bucket selection
````
bucketName:
  title: OSS bucket name
  type: string
  default: ""
  description: OSS bucket name (note the same region as the function)
  x-bucket:
    dependency:
      - region # depends on other input fields region
````
![](https://img.alicdn.com/imgextra/i3/O1CN01qmCC5P1adGNimqJuM_!!6000000003352-2-tps-1946-700.png)

##### Field Description
| Field Name | Type | Description |
| --- | --- | --- |
| dependency | list<`string`> | dependency fields |

#### x-role
for character selection
````
triggerRoleArn:
  title: Trigger RAM Role ARN
  type: string
  default: ''
  pattern: '^acs:ram::[0-9]*:role/.*$'
  description: OSS uses this role to send event notifications to call functions
  required: true
  x-role:
    name: aliyunosseventnotificationrole # role name
    service: OSS # service account
    authorities:
      -AliyunFCInvocationAccess
````
![](https://img.alicdn.com/imgextra/i1/O1CN01LQCH9a1XiLw3aa09O_!!6000000002957-2-tps-2032-770.png)

> pattern stands for regular, indicating that the value of the current field needs to match the regular


##### Field Description
| Field Name | Type | Description |
| --- | --- | --- |
| name | `string` | system role name |
| service | `string` | Service account, currently supported system accounts: OSS, FC, LOG |
| authorities | list<`string`> | system policies |

#### x-nas

Choice of NAS mount points, VPCs, switches, security groups

````
mountPointsServerAddr:
  title: NAS mount point address
  type: string
  default: ""
  description: NAS mount point address, you can log in to <a href="https://nasnext.console.aliyun.com" target="_blank">NAS console</a> to view
  x-nas:
    denpendency:
      - region
````
##### Field Description

| Field Name | Type | Description |
| ---------- | -------------- | -------- |
| dependency | list<`string`> | dependency fields |


> Note that x-nas is used with the 'vpcId', 'vswitchId', 'securityGroupId' fields

````
vpcId:
  title: VPC Id
  type: string
  default: ""
  description: VPC ID where the NAS mount point is located, such as vpc-bp1lynmabizqdgt4308dt
vswitchId:
  title: Switch Id
  type: string
  default: ""
  description: VSW ID of the virtual switch where the NAS mount point is located, the switch should preferably be in the availability zone supported by FC
securityGroupId:
  title: Security Group Id
  type: string
  default: ""
  description: Log in to <a href="https://ecs.console.aliyun.com/#/securityGroup/region/cn-hangzhou" target="_blank">security group</a> to view, usually empty security created by default group (note the same region as above), for example sg-bp1cd2w08t3dy7nhrvtx
````

![](https://img.alicdn.com/imgextra/i1/O1CN01eov5OU1op5DsbN82b_!!6000000005273-2-tps-2016-750.png)

#### x-acr

Used to select and create images for Alibaba Cloud Container Image Service

```
acrRegistry:
    title: Mirror repository
    type: string
    examples: ['registry.cn-hangzhou.aliyuncs.com/fc-demo/custom-nodejs14-event-function:v0.1']
    description: The image repository address requires you to activate the service, create the repository, and set the access credentials in the https://cr.console.aliyun.com/
    x-acr:
      type: select
```

![](https://img.alicdn.com/imgextra/i4/O1CN01IwsAuR1Ur6f5MVB5n_!!6000000002570-2-tps-2238-348.png)

# tips

### Random suffix name ${default-suffix}
Used to generate a random suffix name for the field to ensure that each initialization can get a different value. Such as service name, etc.

````
serviceName:
  title: service name
  type: string
  default: web-framework-${default-suffix}
  pattern: "^[a-zA-Z_][a-zA-Z0-9-_]{0,127}$"
  description: The service name, which can only contain letters, numbers, underscores and dashes. Cannot start with a number or a dash. Length between 1-128
````

- The expression in cli is:
![](https://img.alicdn.com/imgextra/i1/O1CN01GfWUYG1tP2mjNMScE_!!6000000005893-2-tps-1178-140.png)

- The expression on the webpage is as
![](https://img.alicdn.com/imgextra/i3/O1CN01DwxGgH205XDzjlOjo_!!6000000006798-2-tps-1616-380.png)

### template engine
When the application is initialized, use [art-template](https://aui.github.io/art-template/en-cn/docs/) for template parsing

For example, when writing an application template, the user can specify the vpc configuration by himself, if it is specified, use the custom one, and use auto if it is not specified

- publish.yaml

```
vpcConfigType:
  title: VPC network configuration
  type: string
  description: Configure the network used by the functions in the service, such as whether the function can access the Internet, whether it can access resources in the VPC, and so on.
  enum:
    - auto
    - Custom configuration
```

- s.yaml

```yaml
# ...others
service:
  name: "{{ serviceName }}"
  description: Welcome to ServerlessTool
  {{if vpcConfigType === 'auto'}}
  vpcConfig: auto
  {{else}}
  vpcConfig: # VPC configuration, after configuration, the function can access the specified VPC
    vpcId: "{{vpcID}}" # VPC ID
    securityGroupId: "{{securityGroupID}}" # The security group ID
    vswitchIds: # A list of switch IDs
      - "{{vswitchID}}"
  {{/if}}
```
> For more syntax support, see the [art-template](https://aui.github.io/art-template/en-cn/docs/syntax.html) documentation

### custom filter filter
When the application is initialized, you can customize the filter when parsing the template.

- First we need to define the filter in the `hook/filter.js` file

  Example of `hook/filter.js` content
  ````js
  function timestamp(value) {
    return `your code: ${value}`
  }
  module.exports = {
    timestamp,
  };
  ````
- Then you can use the filters we have defined in the template

  `s.yaml` example using filters

 
  ```yaml
  # ...others
  time: "{{time | timestamp}}"
  ```
