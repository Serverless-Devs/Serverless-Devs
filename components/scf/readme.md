## 前言

通过本组件，您可以简单快速的将腾讯云函数计算项目部署到线上。

## 使用

### 最简使用方法

模版拉取：

```
s init python3 -p tencent
```

其中Yaml的默认配置为：

```yaml
MyFunction:
  Component: scf
  Provider: tencent
  Access: release
  Properties:
    Region: ap-guangzhou # 函数所在区域
    Namespace:
      Name: default
    Function:
      Name: Test
      Role: exRole # 云函数执行角色
      CodeUri: ./src
      Handler: index.main_handler #入口
      Runtime: Python3.6 # 运行环境
      Description: This is a function in application.
      MemorySize: 128 # 内存大小，单位MB
      Timeout: 20 # 超时时间，单位秒
```

### 完整Yaml示例

```yaml
MyFunction:
  Component: scf
  Provider: tencent
  Access: release
  Properties:
    Region: ap-guangzhou # 函数所在区域
    Namespace:
      Name: default
    Function:
      Name: Name
      Role: exRole # 云函数执行角色
      EnableRoleAuth: true # 默认会尝试创建 SCF_QcsRole 角色，如果不需要配置成 false 即可
      # 1. 默认写法，新建特定命名的 cos bucket 并上传
      CodeUri: ./src
      # 2. CodeUri 为对象，并且制定忽略上传文件夹 node_modules
      # CodeUri:
      #   Src: ./code
      #   Exclude:
      #     - 'node_modules/**'
      # 3. 指定 bucket name 和文件的方式，直接上传 cos 中的文件部署云函数
      # CodeUri:
      #    Bucket: tinatest   # bucket name，当前会默认在bucket name后增加 appid 后缀, e.g. bucketname-appid
      #    Key: 'code.zip'      # bucket key 指定存储桶内的文件
      # 4. 指定本地文件到 bucket
      # CodeUri:
      #   Bucket: tinatest   # bucket name
      #   Src:         # 指定本地路径
      Handler: index.main_handler #入口
      Runtime: Nodejs10.15 # 运行环境 默认 Nodejs10.15
      Description: This is a function in application.
      MemorySize: 128 # 内存大小，单位MB
      Timeout: 20 # 超时时间，单位秒
      Environment: #  环境变量
        - Key: key
          Value: value
      PublicAccess: true # 是否开启公网访问
      Vpc: # 私有网络配置
        VpcId: '' # 私有网络的Id
        SubnetId: '' # 子网ID
      Cfs: # cfs配置
        - CfsId: cfs-123
          MountInsId: cfs-123
          LocalMountDir: /mnt/
          RemoteMountDir: /
      DeadLetter: # 死信队列配置
        Type: deadLetterType
        Name: deadLetterName
        FilterType: deadLetterFilterType
      Layers: #layer配置
        - Name: scfLayer #  layer名称
          Version: 1 #  版本
      Cls: # 函数日志
        LogsetId: ClsLogsetId
        TopicId: ClsTopicId
      Eip: true/false # 是否开启固定IP
      Tags: #标签配置
        - Key: key
          Value: value
      Triggers: # 触发器
        - Type: timer # 定时触发器
          Name: timername#触发器名称，默认timer-${name}-${stage}
          Parameters:
            CronExpression: '*/5 * * * *' # 每5秒触发一次
            Enable: true
            Argument: argument # 额外的参数
        - Type: apigw # api网关触发器，已有apigw服务，配置触发器
          Name: apigwname#触发器名称，默认apigw-${name}-${stage}
          Parameters:
            Id: service-8dsikiq6
            Protocols:
              - http
            NetTypes:
              - OUTER
            Description: the serverless service
            Environment: release
            API:
              - Path: /users
                Method: POST
              - Path: /test/{abc}/{cde}
                Id: api-id
                Method: GET
                Description: Serverless REST API
                EnableCORS: TRUE
                ResponseType: HTML
                ServiceTimeout: 10
                Parameters:
                  - Name: abc
                    Position: PATH
                    Required: 'TRUE'
                    Type: string
                    DefaultValue: abc
                    Description: mytest
                  - Name: cde
                    Position: PATH
                    Required: 'TRUE'
                    Type: string
                    DefaultValue: abc
                    Description: mytest
                Function:
                  IsIntegratedResponse: TRUE
                  FunctionQualifier: $DEFAUlt
                UsagePlan:
                  UsagePlanId: 1111
                  UsagePlanName: slscmp
                  UsagePlanDesc: sls create
                  MaxRequestNum: 1000
                Auth:
                  ServiceTimeout: 15
                  SecretName: secret
                  SecretIds:
                      - xxx
        - Type: apigw # api网关触发器，无apigw服务，自动创建服务
          Name: apigwname_2 #触发器名称，默认apigw-${name}-${stage}
          Parameters:
            Protocols:
              - http
            Description: the serverless service
            Environment: release
            API:
              - path: /users
                method: POST
        - Type: cos # cos触发器
          Name: cosname #触发器名称，默认cos-${name}-${stage}
          Parameters:
            Bucket: cli-appid.cos.ap-beijing.myqcloud.com
            Filter:
              Prefix: filterdir/
              Suffix: .jpg
            Events: 'cos:ObjectCreated:*'
            Enable: true
        - Type: cmq # CMQ Topic 触发器
          Name: cmqname #触发器名称，默认cmq-${name}-${stage}
          Parameters:
            Name: test-topic-queue
            Enable: true
            FilterType: 1 # 消息过滤类型，1为标签类型，2为路由匹配类型
            FilterKey: # 当 filterType 为1时表示消息过滤标签，当 filterType 为2时表示 Binding Key
              - key1
              - key2
        - Type: ckafka # ckafka触发器
          Name: ckafkaname  #触发器名称，默认ckafka-${name}-${stage}
          Parameters:
            Name: ckafka-2o10hua5
            Topic: test
            MaxMsgNum: 999
            Offset: latest
            Enable: true
```

### 详细使用方法

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| Region | true | Enum | 地域 |
| Namespace | false | Struct | 命名空间 |
| Function | true | Struct | 函数 |



#### Namespace

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| Name | false | String | 命名空间 |

#### Function

| 参数名称                 | 是否必选 | 类型 | 默认值                                                                                                         | 描述                                                                                                                                                                                                                                                               |
| ------------------------ | -------- |  -------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name                     | true  | String     | `${name}-${stage}-${app}`                                                                                      | 创建的函数名称。函数名称支持 26 个英文字母大小写、数字、连接符和下划线，第一个字符只能以字母开头，最后一个字符不能为连接符或者下划线，名称长度 2-60。**云函数名称又是资源 ID，为了保证资源的唯一性，默认采用 `${name}-${stage}-${app}` 变量方式。**                |
| Role                     | false  | String     |                                                                                                                | 云函数绑定的运行角色。                                                                                                                                                                                                                                             |
| EnableRoleAuth           | false  | Boolean     | `true`                                                                                                         | 默认会尝试创建 `SCF_QcsRole` 角色。`SCF_QcsRole` 为 SCF 默认配置角色。该服务角色用于提供 SCF 配置对接其他云上资源的权限，包括但不限于代码文件访问、触发器配置。配置角色的预设策略可支持函数执行的基本操作。如果不需要配置成 false 即可。 |
| CodeUri                   | true  | Struct     |                                                                                                                | 函数代码路径。                                                                                                                                                                                              |
| Handler                  | false   | String    | Pyton/Php/Nodejs 默认值为 `index.main_handler`，Java 默认值为 `example.Hello::mainHandler`，Go 默认值为 `main` | 函数处理方法名称，名称格式支持 "文件名称.方法名称" 形式，文件名称和函数名称之间以"."隔开，文件名称和函数名称要求以字母开始和结尾，中间允许插入字母、数字、下划线和连接符，文件名称和函数名字的长度要求是 2-60 个字符。                                             |
| Runtime                  | false  | String     | `Nodejs10.15`                                                                                                  | 函数运行环境，目前仅支持: `Nodejs6.10，Nodejs8.9，Nodejs10.15，Nodejs12.16，Python2.7，Python3.6，PHP5，PHP7，Go1，Java8 和 CustomRuntime`，使用 `CustomRuntime`                                                          |                                                                                            | 云函数所在区域。详见产品支持的 [地域列表][函数地域列表]。                                                                                                                                                                                                          |
| Description              | false   | String    | `This is a function in ${app} application`                                                                     | 函数描述,最大支持 1000 个英文字母、数字、空格、逗号、换行符和英文句号，支持中文                                                                                                                                                                                    |
| MemorySize               | false  | Number     | `128`                                                                                                          | 函数运行时内存大小，默认为 128M，可选范围 64、128MB-3072MB，并且以 128MB 为阶梯                                                                                                                                                                                    |
| Timeout                  | false  | Number     | `3`                                                                                                            | 函数最长执行时间，单位为秒，可选值范围 1-900 秒，默认为 3 秒                                                                                                                                                                                                       |
| Eip                      | false  | Boolean     | `false`                                                                                                        | 是否固定出口 IP                                                                                                                                                                                                                          |
| PublicAccess             | false  | Boolean     | `true`                                                                                                         | 是否开启公网访问                                                                                                                                                                                                                                                   |
| Environment | false       |    <Struct>List   |                                                                                                         | 函数的环境变量                                                                                                                                                                                                        |
| Vpc   | false       |          Struct |                                                                                                       | 函数的私有网络配置                                                                                                                                                                                                         |
| Layers       | false       |   <Struct>List |                                                                                                             | 云函数绑定的 layer                                                                                                                                                                                                        |
| DeadLetter  | false       |       Strcut |                                                                                                         | 死信队列配置                                                                                                                                                                                                           |
| Cls        | false       |       Strcut |                                                                                                         | 函数日志配置                                                                                                                                                                                                         |
| Tags                     | false       |     <Struct>List                                                                                                           | 标签设置。可设置多对 key-value 的键值对                                                                                                                                                                                                                            |
| Cfs          | false       |       <Struct>List                                                                                                         | 文件系统挂载配置，用于云函数挂载文件系统。                                                                                                                                                                                   |
| Triggers        | false       |    <Struct>List                                                                                                            | 触发器数组。支持以下几种触发器：timer（定时触发器）、apigw（网关触发器）、cos（COS 触发器）、cmq（CMQ Topic 触发器）、ckafka（CKafka 触发器）                                                                                 |


##### CodeUri

| 参数名称 | 是否必选 |      类型       | 默认值 | 描述                                                                                                                                                                                 |
| -------- | :------: | :-------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Src      |    true    |     String      |        | 代码路径。与 object 不能同时存在。                                                                                                                                                   |
| Exclude  |    false    | <String>List |        | 不包含的文件或路径, 遵守 glob 语法                                                                                                                              |
| Bucket   |    false    |     String      |        | bucket 名称。如果配置了 src，表示部署 src 的代码并压缩成 zip 后上传到 bucket-appid 对应的存储桶中；如果配置了 object，表示获取 bucket-appid 对应存储桶中 object 对应的代码进行部署。 |
| Object   |    false    |     String      |        | 部署的代码在存储桶中的路径。                                                                                                                                                         |


##### Environment

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| Key | false | String |  环境Key |
| Value | false | String | 环境Value |

##### Vpc

| 参数名称 | 是否必选 | 类型   | 描述           |
| -------- | -------- | ------ | -------------- |
| SubnetId | false       | String | 子网的 Id      |
| VpcId    | false       | String | 私有网络 的 Id |


##### Layers

| 参数名称 | 是否必选 |  类型  | 描述     |
| -------- | :------: | :----: | :------- |
| Name     |    true    | String | 层名称   |
| Version  |    true    | Number | 层版本号 |

##### DeadLetter

| 名称       | 是否必选 | 类型   | 描述                       |
| :--------- | -------- | :----- | :------------------------- |
| Type       | true       | String | 死信队列模式               |
| Name       | true       | String | 死信队列名称               |
| FilterType | false       | String | 死信队列主题模式的标签形式 |


##### Cls

| 参数名称 | 是否必选 |  类型  | 描述                          |
| -------- | :------: | :----: | :---------------------------- |
| LogsetId |    false    | String | 函数日志投递到的 CLS LogsetID |
| TopicId  |    false    | String | 函数日志投递到的 CLS TopicID  |


##### Tags

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| Key | false | String |  标签名 |
| Value | false | String | 标签值 |

##### Cfs

| 参数名称       | 是否必选 |  类型  | 描述              |
| -------------- | :------: | :----: | :---------------- |
| CfsId          |    true    | String | 文件系统实例 id   |
| MountInsId     |    true    | String | 文件系统挂载点 id |
| LocalMountDir  |    true    | String | 本地挂载点        |
| RemoteMountDir |    true    | String | 远程挂载点        |

##### Triggers

| 参数名称       | 是否必选 |  类型  | 描述              |
| -------------- | :------: | :----: | :---------------- |
| Name          |    true    | String |  触发器名好吃呢个   |
| Type     |    true    | String | 触发器类型 |
| Parameters     |    true    | Struct | 触发器配置 |


参考： https://cloud.tencent.com/document/product/583/39901

触发器配置为数组，按照配置的 name 和 param 创建触发器。对于 apigw 触发器，如果没有配置 apigw 服务 ID，则自动创建一个 apigw 服务，对于其他触发器仅执行配置触发器，不涉及服务资源创建。

支持以下触发器：timer（定时触发器）、apigw（网关触发器）、cos（COS 触发器）、cmq（CMQ Topic 触发器）、ckafka（CKafka 触发器）。

###### timer 触发器参数

参考： https://cloud.tencent.com/document/product/583/9708

| 参数名称       | 是否必选 |  类型   | 默认值 | 描述                                             |
| -------------- | :------: | :-----: | :----: | :----------------------------------------------- |
| CronExpression |    是    | Number  |        | 触发时间，为定时触发器-cron表达式 |
| Enable         |    否    | Boolean | `true` | 触发器是否启用。默认启用                         |
| Argument       |    否    | Struct  |        | 入参参数。                                       |

###### cos 触发器参数

参考： https://cloud.tencent.com/document/product/583/9707

| 参数名称 | 是否必选 |           类型           | 默认值 | 描述                                               |
| -------- | :------: | :----------------------: | :----: | :------------------------------------------------- |
| Bucket   |    是    |          String          |        | 配置的 COS Bucket，仅支持选择同地域下的 COS 存储桶 |
| Enable   |    否    |         Boolean          | `true` | 触发器是否启用。默认启用                           |
| Filter   |    是    |  Struct |        | COS 文件名的过滤规则                               |
| Events   |    是    |          String          |        | COS 的事件类型                |

其中Filter：

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| Prefix | true | String | 前缀 |
| Suffix | true | String | 后缀 |


###### cmq 触发器参数

| 参数名称   | 是否必选 | 类型     | 默认值 | 描述                                                                         |
| ---------- | -------- | -------- | ------ | :--------------------------------------------------------------------------- |
| Name       | 是       | String   |        | CMQ Topic 主题队列名称                                                       |
| Enable     | 否       | Boolean  | `true` | 触发器是否启用。默认启用                                                     |
| FilterType | 否       | Number   |        | 消息过滤类型，1 为标签类型，2 为路由匹配类型                                 |
| FilterKey  | 否       | <String>List |        | 当 filterType 为 1 时表示消息过滤标签，当 filterType 为 2 时表示 Binding Key |

###### ckafka 触发器参数

| 参数名称  | 是否必选 | 类型    | 默认值 | 描述                                                       |
| --------- | -------- | ------- | ------ | :--------------------------------------------------------- |
| Name      | 是       | String  |        | 配置连接的 CKafka 实例，仅支持选择同地域下的实例。         |
| Topic     | 是       | String  |        | 支持在 CKafka 实例中已经创建的 Topic。                     |
| MaxMsgNum | 是       | Number  |        | 5 秒内每汇聚 maxMsgNum 条 Ckafka 消息，则触发一次函数调用  |
| Offset    | 是       | String  |        | offset 为开始消费 Ckafka 消息的位置，目前只能填写 `latest` |
| Enable    | 否       | Boolean | `true` | 触发器是否启用。默认启用                                   |

###### apigw 触发器参数

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| Id    |   false    |  String  |  服务的全局唯一 ID，由系统生成                                                          |
| Protocols    |   true    | <String>List |  服务的前端请求类型，例如 HTTP，HTTPS，HTTP 和 HTTPS。 （http / https）                 |
| NetTypes     |   false    | <String>List |网络类型列表，用于指定支持的访问类型，INNER 为内网访问，OUTER 为外网访问。             |
| Description  |   false    |  String  |  用户自定义的服务描述说明                                                               |
| Environment  |   false    |  String                | 服务要发布的环境的名称，支持三种环境: test（测试）、prepub（预发布）、 release（发布） |
| Domains |   false    | <Struct>List |    自定义 API 域名，配置参数参考customDomain 参数说明  |
| API | false | Struct | API详细信息 |

Domains：

| 参数             | 必填/可选 | 参数类型 | 默认值 | 描述                                                                                                                     |
| ---------------- | :-------: | :----: | :----: | :----------------------------------------------------------------------------------------------------------------------- |
| Domain           |   true    | String |        | 需要绑定的自定义域名                                                                                                     |
| CertificateId    |   false    | String |        | 自定义域名的证书，如果设置为 https，则为必需。                                                                           |
| IsDefaultMapping |   false    | Boolean | `true` | 是否使用默认路径映射。 如果要自定义路径映射，请设为`false`                                                               |
| PathMappingSet   |   false    | Struct | `[]`  | 自定义路径映射, 当 `isDefaultMapping` 为 `false` 时必填，配置参数参考pathMappingSet 参数说明 |
| Protocols        |   false    | <String>List |      | 绑定自定义域协议类型，例如 HTTP，HTTPS，HTTP 和 HTTPS，默认与前端协议相同                                                |

PathMappingSet：

| 参数名 |  必填|  类型|  参数描述 | 
| --- |  --- |  --- |  --- | 
| path | false | String | 自定义映射路径 |
| environment | false | String | 自定义映射环境 |


其中API：


| 参数                     | 必填/可选 | 类型 | 默认值  | 描述                                                                                 |
| ------------------------ | :-------: | :-------: | :-----: | :----------------------------------------------------------------------------------- |
| Id                    |   false    | String |         | API 的唯一 ID                                                                        |
| Protocol                 |   false   | <String>List | `HTTP`  | 指定的前端 API 类型， 默认为`HTTP`，如要创建 websocket 类型的 API，请设为`WEBSOCKET` |
| Path                     |   true    | String |         | API 路径                                                                             |
| Method                   |   true    |  String|        | 请求方法                                                                             |
| ServiceType              |   false    | String | `SCF`  | 指定的后端类型，默认为 `SCF`，如要创建 mock 或 http 的类型，可设为 `MOCK`或`HTTP`    |
| Description              |   false    |  String |       | API 描述                                                                             |
| EnableCORS               |   false    | Boolean | `false` | 是否启用跨域访问。 true：启用， false：不启用                                        |
| Function                 |   必填    |  Struct |       | 对应的 Serverless 云函数，配置参数参考function 参数说明        |
| UsagePlan                |   false    |  Struct |        | 基于 API 维度的使用计划，配置参数参考usagePlan 参数说明     |
| Auth                     |   false    |  Struct  |     | API 鉴权设置，配置参数参考auth 参数说明                  |
| ServiceTimeout           |   false    |  Number |       | API 的后端服务超时时间，单位为秒                                                     |
| ResponseType             |   false    |   String      | 返回类型: HTML、JSON、TEST、BINARY、XML                                              |
| Parameters                    |   false    |  <Struct>List |       | 前端请求参数，配置参数参考param 参数说明                    |
| ServiceConfig            |   false    |   Struct |      | API 的后端服务配置，配置参数参考serviceConfig 参数说明    |
| ServiceMockReturnMessage |   false    |    String |     | Mock 接口类型返回结果，如果 `serviceType` 设置为 `MOCK`，此参数必填                  |


##### ServiceConfig

| 参数   | 描述                   |
| ------ | :--------------------- |
| Url    | API 的后端服务 url     |
| Path   | API 的后端服务路径     |
| Method | API 的后端服务请求方法 |


##### UsagePlan

| 参数          | 描述                                                                                       |
| ------------- | :----------------------------------------------------------------------------------------- |
| UsagePlanId   | 用户自定义的基于 API 的使用计划 ID                                                         |
| UsagePlanName | 用户自定义的基于 API 的使用计划名称                                                        |
| UsagePlanDesc | 用户自定义的基于 API 的使用计划描述                                                        |
| MaxRequestNum | 允许的请求总数。不传该参数时默认为 1000 次，若其保留为空，则默认情况下将使用-1，表示已禁用 |

##### Auth

| 参数       | 描述                                                                                  |
| ---------- | :------------------------------------------------------------------------------------ |
| SecretName | 用户自定义的密钥名称                                                                  |
| SecretIds  | 用户自定义的 secretID。当类型为手动时需要。 它可以包含 5 到 50 个字母，数字和下划线。 |



##### Parameters

| 参数         | 描述                                          |
| ------------ | :-------------------------------------------- |
| Name         | 请求参数名称                                  |
| Position     | 参数位置，仅支持`PATH`，`QUERY`和`HEADER`类型 |
| Type         | 参数类型，如 String 和 int.                   |
| DefaultValue | 参数默认值                                    |
| Required     | 参数是否必填， true: 必填; false: 可选        |
| Description         | 参数备注/描述                                 |
