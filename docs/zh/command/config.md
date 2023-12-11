---
title: Config 命令
description: 'Config 命令'
position: 6
category: '命令'
---

# Config 命令

`config`命令是密钥信息相关的命令，包括密钥的配置、密钥的查看以及密钥的修改、删除等。

- [命令解析](#命令解析)
- [config add 命令](#config-add-命令)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [config get 命令](#config-get-命令)
    - [参数解析](#参数解析-1)
    - [操作案例](#操作案例-1)
- [config delete 命令](#config-delete-命令)
    - [参数解析](#参数解析-2)
    - [操作案例](#操作案例-2)
- [config rename 命令](#config-rename-命令)
    - [参数解析](#参数解析-3)
    - [操作案例](#操作案例-3)
- [config default 命令](#config-default-命令)
    - [参数解析](#参数解析-4)
    - [操作案例](#操作案例-4)
- [注意事项](#注意事项)
  - [通过环境变量设置密钥](#通过环境变量设置密钥)
  - [关于配置密钥的使用顺序](#关于配置密钥的使用顺序)

## 命令解析

当执行`s config -h`之后，可以进行相关帮助信息的查看：

```shell script
Usage: s config [commands] [options]

Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command

Commands:
  add [options]                   +  Add an account
  get                             √  Get accounts
  delete                          ×  Delete an account
  rename [options]                >  Rename an account
  default   * Set default account
```

在该命令中，包括了四个子命令：
- [add：添加密钥配置](#config-add-命令)
- [get：查看密钥配置](#config-get-命令)
- [delete：删除密钥配置](#config-delete-命令)
- [rename：重命名密钥配置](#config-rename-命令)
- [default：设置默认密钥配置](#config-default-命令)


## config add 命令

通过`config add`命令，可以进行密钥的配置，使用者可以通过不同厂商的默认密钥模板进行密钥配置，也可以通过`Custom`选项进行自定义密钥配置。

通过`-h/--help`可以查看到配置帮助：

```shell script
Usage: s config add [options]

You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --infoList value1,value2,value3

    Configuration parameters template for vendors:
        alibaba: AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

🧭  How to get the key: https://serverless.help/t/s/provider_config

Options:
  --AccountID <AccountID>              AccountID of key information
  --AccessKeyID <AccessKeyID>          AccessKeyID of key information
  --AccessKeySecret <AccessKeySecret>  AccessKeySecret of key information
  --SecurityToken <SecurityToken>      SecurityToken of key information
  --SecretAccessKey <SecretAccessKey>  SecretAccessKey of key information
  --AccessKey <AccessKey>              AccessKey of key information
  --SecretKey <SecretKey>              SecretKey of key information
  --SecretID <SecretID>                SecretID of key information
  --PrivateKeyData <PrivateKeyData>    PrivateKeyData of key information
  --kl, --keyList <keyList>            Keys of key information, like: --kl key1,key2,key3
  --il, --infoList <infoList>          Values of key information, like: --il info1,info2,info3
  -f, --force                          Mandatory overwrite key information
  -h, --help                           Display help for command
```


### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| AccountID | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| AccessKeyID | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| AccessKeySecret | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| SecurityToken | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| SecretAccessKey | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| AccessKey | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| SecretKey | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| SecretID | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| PrivateKeyData | - | 选填 | 部分云厂商配置密钥所需要的默认字段 |
| keyList | kl | 选填 | 在默认字段无法满足配置诉求时，可以通过`keyList`与`infoList`进行批量自定义配置 |
| infoList | il | 选填 | 在默认字段无法满足配置诉求时，可以通过``keyList`与`infoList`进行批量自定义配置 |
| access | a | 选填 | 密钥的别名 |
| force | f | 选填 | 强制修改/覆盖已经配置的密钥信息 |

### 操作案例

可以通过`config add`直接进行密钥的添加：

```shell script
$ s config add 

? Please select a provider: (Use arrow keys)
❯ Alibaba Cloud (alibaba) 
  AWS (aws) 
  Azure (azure) 
  Baidu Cloud (baidu) 
  Google Cloud (google) 
  Huawei Cloud (huawei) 
  Tencent Cloud (tencent) 
(Move up and down to reveal more choices)
```

当使用者选择某个选项之后，系统会进行交互式引导：

```shell script
s config add 

? Please select a provider: Alibaba Cloud (alibaba)
🧭 Refer to the document for Alibaba Cloud key: https://serverless.help/t/s/alibabacloud
? AccessKeyID:  ******
? AccessKeySecret:  ******
? Please create alias for key pair. If not, please enter to skip (default-2) 
Alias:      default-2
Credential: 
  __provider:      Alibaba Cloud
  AccessKeyID:     LTA******************KNA
  AccessKeySecret: U2q************************RuI
  AccountID:       124**********881
```

也可以通过命令式直接进行密钥的添加：
```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** 
```

或者添加自定义内容：
```shell script
$ s config add -kl key1,key2,key3 -il info1,info2,info3
```

- 常见云厂商密钥配置内容

```
alibaba:    AccountID, AccessKeyID, AccessKeySecret,
aws:        AccessKeyID, SecretAccessKey,
baidu:      AccessKeyID, SecretAccessKey,
huawei:     AccessKeyID, SecretAccessKey,
azure:      KeyVaultName, TenantID, ClientID, ClientSecret,
tencent:    AccountID, SecretID, SecretKey,
google:     PrivateKeyData
```

> - 通过环境变量获取密钥方法： 这一部分可能会根据不同的文档有不同的可能性，所以需要参考对应的文档进行环境变量对应的`Key-Value`确定。
> - 常见云厂商密钥获取地址：
>     - [阿里云](./../default_provider_config/alibabacloud.md)
>     - [百度云](./../default_provider_config/baiducloud.md)
>     - [AWS](./../default_provider_config/aws.md)
>     - [Azure](./../default_provider_config/azure.md)
>     - [Google Cloud](./../default_provider_config/gcp.md)
>     - [华为云](./../default_provider_config/huaweicloud.md)
>     - [腾讯云](./../default_provider_config/tencentcloud.md)

## config get 命令

通过`config get`命令，您可以获得配置过的账号信息。

通过`-h/--help`可以查看到配置帮助：

```shell script
$ s config get -h

Usage: s config get [options]

You can get accounts.
 
  Example:
    $ s config get
    $ s config get -a demo
    
📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| access | a | 选填 | 密钥的别名 |

### 操作案例

如果想要获取某个已经配置的密钥详情，可以通过`config get`进行获取，例如，想要获取别名为`test`的密钥信息，就可以执行：

```shell script
$ s config get -a test
test:
  AccountID: 146**********468
  AccessKeyID: LTA******************f5Q
  AccessKeySecret: qDN************************Xp7
```

如果想获得全部的一配置的密钥信息，可以直接通过`config get`不加参数的形式获取：

```shell script
$ s config get
default:
  AccountID: 158**********465
  AccessKeyID: LTA******************ZCW
  AccessKeySecret: mDL************************odO
test:
  AccountID: 146**********468
  AccessKeyID: LTA******************f5Q
  AccessKeySecret: qDN************************Xp7
release:
  AccountID: 176**********635
  AccessKeyID: LTA******************Yy3
  AccessKeySecret: LhT************************VB5
```

## config delete 命令

通过`config delete`命令，您可以删除配置过的账号信息。

通过`-h/--help`可以查看到配置帮助：

```shell script
$ s config delete -h

Usage: s config delete [options]

You can delete an account.
  
  Example:
    $ s config delete -a demo
    
📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| access | a | 必填 | 密钥的别名 |

### 操作案例

如果想要删除某个已经配置的密钥，可以通过`config delete`进行删除，例如，想要删除别名为`test`的密钥信息，就可以执行：

```shell script
$ s config delete -a test
Access [test] has been successfully deleted.
```

## config rename 命令

通过`config rename`命令，您可以更改配置过的密钥信息名称。

通过`-h/--help`可以查看到配置帮助：

```shell script
$ s config rename -h

Usage: s config rename [options]

You can rename an account.
  
  Example:
    $ s config rename --source source --target target
    
📖  Document: https://serverless.help/t/s/config

Options:
  --source <source>               Source alias name
  --target <target>               Target alias name
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义     |
|-----|------|-----|----------|
| source | - | 必填 | 原始密钥的别名  |
| target | - | 必填 | 变更后密钥的别名 |

### 操作案例

如果想要变更某个已经配置的密钥的别名，可以通过`config rename`进行变更，例如，想要变更别名为`test`的密钥信息别名为`test2`，就可以执行：

```shell script
$ s config rename --source test --target test2  
Alias:      test2  
credential: 
  AccessKeyID:     ******************
  AccessKeySecret: ******************
  AccountID:       ******************
```

也可以步输入参数，通过交互更改：

```shell script
$ s config rename
? Please select need rename alias name: (Use arrow keys)
❯ test
```

选择需要更改的别名后，再输入目标别名即可：

```shell script
$ s config rename
? Please select need rename alias name: default2
? Please select need rename alias name: default
Alias:      default
credential: 
  __provider:      Alibaba Cloud
  AccessKeyID:     LTA******************TCU
  AccessKeySecret: Gwv************************GwT
  AccountID:       124**********881
  __default:       true
```

## config default 命令

通过`config default`命令，您可以配置默认密钥信息。

通过`-h/--help`可以查看到配置帮助：

```shell script
$ s config default -h

Usage: s config default [options]

Specify an access as the default.
  
  Example:
    $ s config default
    $ s config default -a demo
    
📖  Document: https://serverless.help/t/s/config

Options:
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义     |
|-----|------|-----|----------|
| access | a | 选填 | 密钥的别名  |

### 操作案例

可以通过`s config default`命令来配置默认的密钥信息。例如，想要设置当前默认的密钥为`demo`，可以执行：

```shell script
$ s config default

You can choose an access to set as the default.

? Please select an access: (Use arrow keys)
❯ demo
  demo1
  demo2
(Move up and down to reveal more choices)
```

选择之后会提示：

```shell script
Access [demo] has been set as default.
```

以上为交互式设置，也可以直接输入`s config default -a demo`进行设置。

```shell script
$ s config default -a demo
Access [demo] has been set as default.
```

## 注意事项

### 通过环境变量设置密钥

详情可以参考：[开发者工具设计文档](../tool.md) 中的 [通过环境变量设置密钥](../tool.md#通过环境变量设置密钥)

### 关于配置密钥的使用顺序

详情可以参考：[开发者工具设计文档](../tool.md) 中的 [密钥使用顺序与规范](../tool.md#密钥使用顺序与规范)
