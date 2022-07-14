---
title: Pacakge 发布
description: 'Pacakge 发布'
position: 6
category: '开发包模型'
---
- [发布应用](#发布应用)
- [publish.yaml规范](#publish.yaml规范)
  - [默认数据类型](#默认数据类型)
    - [string](#string)
    - [bool](#bool)
  - [自定义UI](#自定义UI)
    - [oss x-bucket](#x-bucket)
    - [角色授权 x-role](#x-role)

# 发布应用
发布应用请查看[教程](https://github.com/orgs/Serverless-Devs/discussions/439)

# publish.yaml规范
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

### bool
TODO


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

##### 字段描述
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| name | `string` |  系统角色名  |
| service | `string` |  服务账号,现在支持的系统账号: OSS,FC,LOG  |
| authorities | list<`string`> |  系统策略  |
