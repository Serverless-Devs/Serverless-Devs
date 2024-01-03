---
title: Config command
description: 'Config command'
position: 2
category: 'Commands'
---

# Config command

The `config` commands are used to perform operations on keys. For example, you can configure, modify and delete keys and obtain the information about keys. 

- [Command description](#Command-description)
- [config add command](#config-add-command)
    - [Parameter description](#Parameter-description)
    - [Example](#Example)
- [config get command](#config-get-command)
    - [Parameter description](#Parameter-description-1)
    - [Example](#Example-1)
- [config delete command](#config-delete-command)
    - [Parameter description](#Parameter-description-2)
    - [Example](#Example-2)
- [config rename command](#config-rename-command)
  - [Parameter description](#Parameter-description-3)
  - [Example](#Example-3)
- [Precautions](#Precautions)
    - [Configure keys by using environment variables](#Configure-keys-by-using-environment-variables)
    - [Configure the order in which keys are used](#Configure-the-order-in-which-keys-are-used)
    
## Command description

After you run the `s config -h` command, the following help information is returned:

```shell script
Usage: s config [commands] [options]

Configure vendors account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/config.md

Options:
  -h, --help  Display help for command

Commands:
  add         ➕ Add an account
  get         ✔️ Get accounts
  delete      ✖️ Delete an account
```

In the preceding command, the following subcommands are included: 
- [add: specifies to add configurations of keys.](#config-add-command)
- [get: specifies to view configurations of keys.](#config-get-command)
- [delete: specifies to delete configurations of keys.](#config-delete-command)
- [delete: specifies to rename configurations of keys.](#config-rename-command)


## config add command

You can run the `config add` command or use the default key template of different vendors to configure keys. You can also use the `Custom` option to customize configurations of keys. 

You can run the `-h/--help` command to obtain the following help information about configurations: 


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

🧭 How to get the key: https://github.com/Serverless-Devs/docs/tree/master/en/others/provider-config

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
  -a, --access [aliasName]             Key pair alias, if the alias is not set, use default instead
  -f                                   Mandatory overwrite key information
  -h, --help                           Display help for command
```


### Parameter description

| Parameter       | Abbreviation | Required | Description                                                  |
| --------------- | ------------ | -------- | ------------------------------------------------------------ |
| AccountID       | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| AccessKeyID     | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| AccessKeySecret | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| SecurityToken   | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| SecretAccessKey | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| AccessKey       | -            | No       | Specifies the default field that is required  by specific cloud vendors to configure keys. |
| SecretKey       | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| SecretID        | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| PrivateKeyData  | -            | No       | Specifies the default field that is  required by specific cloud vendors to configure keys. |
| keyList         | kl           | No       | If the default field cannot meet your  business requirements, run the keyList and infoList  commands to customize configurations in batches. |
| infoList        | il           | No       | If the default field cannot meet your  business requirements, run the `keyList and infoList  commands to customize configurations in batches. |
| access          | a            | No       | Specifies the alias of the key.                              |
| f               | -            | No       | Specifies the force modification/overwrite  of the configured key information. |

### Example

You can run the `config add` command to add keys：

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

When you select a provider, the following interactive commands appear：

```shell script
s config add 

? Please select a provider: Alibaba Cloud (alibaba)
? AccessKeyID **********
? AccessKeySecret **********
? Please create alias for key pair. If not, please enter to skip default
```

You can also directly add keys by running the following command：

```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** 
```

You can also customize content that you want to add to the config add command by running the following command：

```shell script
$ s config add -kl key1,key2,key3 -il info1,info2,info3
```

- Configuration information of keys for common cloud vendors：

```
alibaba:    AccountID, AccessKeyID, AccessKeySecret,
aws:        AccessKeyID, SecretAccessKey,
baidu:      AccessKeyID, SecretAccessKey,
huawei:     AccessKeyID, SecretAccessKey,
azure:      KeyVaultName, TenantID, ClientID, ClientSecret,
tencent:    AccountID, SecretID, SecretKey,
google:     PrivateKeyData
```

- If you want to obtain keys by using environment variables, you need to refer to related documents to obtain the keys in the `Key-Value` format. However, the configurations of different environment variables may vary based on actual scenarios. 
- URLs for key pairs provided by common cloud vendors:
>  - [Alibaba Cloud](./../default_provider_config/alibabacloud.md)
>  - [Baidu Cloud](./../default_provider_config/baiducloud.md)
>  - [AWS](./../default_provider_config/aws.md)
>  - [Azure](./../default_provider_config/azure.md)
>  - [Google Cloud](./../default_provider_config/gcp.md)
>  - [Huawei Cloud](./../default_provider_config/huaweicloud.md)
>  - [Tencent Cloud](./../default_provider_config/tencentcloud.md)

## config get command

You can run the `config get` command to obtain the configured account information. 

You can run the `-h/--help` command to obtain the following help information about configurations


```shell script
$ s config get -h

Usage: s config get [options] [name]

You can get accounts.
 
     Example:
        $ s config get
        $ s config get -a demo
 

Options:
  -a, --access [aliasName]  Key pair alia, if the alias is not set, use default instead
  -h, --help                Display help for command
```

### Parameter description

| Parameter | Abbreviation | Required | Description |
|-----|-----|-----|-----|
| access | a | No | The alias of the key. |


### Example

If you want to obtain the details of a configured key, run the `config get` command. For example, if you want to obtain the key whose alias is `test`, you can run the following command: 

```shell script
$ s config get -a test
test:
  AccountID: 146**********468
  AccessKeyID: LTA******************f5Q
  AccessKeySecret: qDN************************Xp7
```

If you want to obtain all the configurations of configured keys, directly run the config get command without adding other parameters.

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

## config delete command

You can run the s `config delete` command to delete the information about a configured account. 

You can run the `-h/--help` command to obtain the following help information about configurations

```shell script
$ s config delete -h

Usage: s config delete [options] [name]

You can delete an account.

     Example:
        $ s config delete -a demo


Options:
  -a, --access [aliasName]  Key pair alias, if the alias is not set, use default instead
  -h,--help                 Display help for command
```

### Parameter description

| Parameter | Abbreviation | Required | Description |
|-----|-----|-----|-----|
| access | a | Yes | The alias of the key. |


### Example

If you want to delete a configured key, run the `config delete` command. For example, if you want to delete a configured key whose alias is `test`, run the following command: 

```shell script
$ s config delete -a test
Key [test] has been successfully removed
```

## config rename command

You can run the s `config rename` command to rename the information about a configured account.

You can run the `-h/--help` command to obtain the following help information about configurations

```shell script
$ s config rename -h

Usage: s config rename <sourceAliasName> <targetAliasName>

You can rename an account.

     Example:
        $ s config rename sourceAliasName targetAliasName


Options:
  -h,--help                 Display help for command
```

### Parameter description

| Parameter | Abbreviation | Required | Description              |
|-----|--------------|-----|--------------------------|
| sourceAliasName |              | Yes | Source alias of the key. |
| targetAliasName |              | Yes | Target alias of the key. |


### Example

If you want to rename a configured key, run the `config rename` command. For example, if you want to rename a configured key whose alias is `test` to `test2`, run the following command:

```shell script
$ s config rename test test2  
Key [test] has been successfully rename to [test2].
```

## Precautions

### Configure keys by using environment variables

For more information, see [Configure keys by using environment variables](../tool.md#Configure-keys-by-using-environment-variables) in the [Developer tool design documentation](../tool.md)

### Configure the order in which keys are used

For more information, see [Configure the order in which keys are used](../tool.md#Usage-order-and-specification-of-keys) in the [Developer tool design documentation](../tool.md)
