# Config 指令帮助文档


## 前言

`config`指令是密钥信息相关的指令，包括密钥的配置、密钥的查看以及密钥的修改、删除等。

当执行`s config -h`之后，可以进行相关帮助信息的查看：

```shell script
Usage: s config [commands] [options]

Configure venders account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

Options:
  -h, --help  Display help for command

Commands:
  add         ➕ Add an account
  get         ✔️ Get accounts
  delete      ✖️ Delete an account
```

## config add 指令

通过`config add`指令，可以进行密钥的配置，使用者可以通过不同厂商的默认密钥模板进行密钥配置，也可以通过`Custom`选项进行自定义密钥配置。

通过`-h/--help`可以查看到配置帮助：

```shell script
Usage: s config add [commands] [name]

You can add an account

    Example:
        $ s config add
        $ s config add --AccessKey ****** --SecretKey ******
        $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --SecurityToken ******
        $ s config add --keyList key1,key2,key3 --valueList value1,value2,value3

    Configuration parameters template for vendors:
        alibaba: AccountID, AccessKeyID, AccessKeySecret
        aws: AccessKeyID, SecretAccessKey
        baidu: AccessKeyID, SecretAccessKey
        huawei: AccessKey, SecretKey
        google: PrivateKeyData
        tencent: AccountID, SecretID, SecretKey

🧭 How to get the key: https://github.com/Serverless-Devs/docs/tree/master/zh/others/provider-config

Options:
  --AccountID [AccountID]              AccountID of key information
  --AccessKeyID [AccessKeyID]          AccessKeyID of key information
  --AccessKeySecret [AccessKeySecret]  AccessKeySecret of key information
  --SecurityToken [SecurityToken]      SecurityToken of key information
  --SecretAccessKey [SecretAccessKey]  SecretAccessKey of key information
  --AccessKey [AccessKey]              AccessKey of key information
  --SecretKey [SecretKey]              SecretKey of key information
  --SecretID [SecretID]                SecretID of key information
  --PrivateKeyData [PrivateKeyData]    PrivateKeyData of key information
  -kl , --keyList [keyList]            Keys of key information, like: -kl key1,key2,key3
  -il , --infoList [infoList]          Values of key information, like: -il info1,info2,info3
  -a , --aliasName [name]              Key pair alias, if the alias is not set, use default instead
  -f                                   Mandatory overwrite key information
  -h, --help                           Display help for command
```



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
  Custom (others) 
```

当使用者选择某个选项之后，系统会进行交互式引导：

```shell script
s config add 

? Please select a provider: Alibaba Cloud (alibaba)
? AccountID **********
? AccessKeyID **********
? AccessKeySecret **********
? Please create alias for key pair. If not, please enter to skip default
```

也可以通过指令式直接进行密钥的添加：
```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ******
```

或者添加自定义内容：
```shell script
$ s config add --AccessKeyID ****** -kl key1,key2,key3 -il info1,info2,info3
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

- 通过环境变量获取密钥方法： 这一部分可能会根据不同的文档有不同的可能性，所以需要参考对应的文档进行环境变量对应的`Key-Value`确定。

- 常见云厂商密钥获取地址：
    - [阿里云](./others/provider-config/alibabacloud.md)
    - [百度云](./others/provider-config/baiducloud.md)
    - [AWS](./others/provider-config/aws.md)
    - [Azure](./others/provider-config/azure.md)
    - [Google Cloud](./others/provider-config/gcp.md)
    - [华为云](./others/provider-config/huaweicloud.md)
    - [腾讯云](./others/provider-config/tencentcloud.md)


### config get 指令

通过`config get`指令，您可以获得配置过的账号信息。

通过`-h/--help`可以查看到配置帮助：

```shell script
$ s config get -h

Usage: s config get [options] [name]

You can get accounts.
 
     Example:
        $ s config get -l
        $ s config get -a demo
 

Options:
  -a, --alias-name [name]  Key pair alia, if the alias is not set, use default instead
  -l, --list               Show user configuration list
  -h, --help               Display help for command
```

### config delete 指令

通过`config delete`指令，您可以删除配置过的账号信息。

通过`-h/--help`可以查看到配置帮助：

```shell script
$ s config delete -h

Usage: s config delete [options] [name]

You can delete an account.

     Example:
        $ s config delete -a demo


Options:
  -a , --alias-name [name]  Key pair alia, if the alias is not set, use default instead
  -h,--help                 Display help for command
```

