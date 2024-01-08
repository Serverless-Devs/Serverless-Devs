---
title: Config Command
description: 'Config Command'
position: 6
category: 'Commands'
---
# Config Command
The `config` command is related to key information management, including the configuration, viewing, modification, and deletion of keys.
- [Command Explanation](#command-explanation)
- [config add Command](#config-add-command)
    - [Parameter Analysis](#parameter-analysis)
    - [Operational Examples](#operational-examples)
- [config get Command](#config-get-command)
    - [Parameter Analysis](#parameter-analysis-1)
    - [Operational Examples](#operational-examples-1)
- [config delete Command](#config-delete-command)
    - [Parameter Analysis](#parameter-analysis-2)
    - [Operational Examples](#operational-examples-2)
- [config rename Command](#config-rename-command)
    - [Parameter Analysis](#parameter-analysis-3)
    - [Operational Examples](#operational-examples-3)
- [config default Command](#config-default-command)
    - [Parameter Analysis](#parameter-analysis-4)
    - [Operational Examples](#operational-examples-4)
- [Notes](#notes)
  - [Setting Keys via Environment Variables](#setting-keys-via-environment-variables)
  - [About the Order of Using Configured Keys](#about-the-order-of-using-configured-keys)
## Command Explanation
Upon executing `s config -h`, you can view the corresponding help information:
```shell script
Usage: s config [commands] [options]
Configure vendors account, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.
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
This command includes four sub-commands:
- [add: Add key configuration](#config-add-command)
- [get: View key configuration](#config-get-command)
- [delete: Delete key configuration](#config-delete-command)
- [rename: Rename key configuration](#config-rename-command)
- [default: Set default key configuration](#config-default-command)
## config add Command
The `config add` command allows for the configuration of keys. Users can configure keys using default key templates provided by various vendors or opt for custom key configuration through the `Custom` option.
Configuration help can be viewed via `-h/--help`:
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
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| AccountID | - | Optional | Default field required for key configuration by some cloud vendors |
| AccessKeyID | - | Optional | Default field required for key configuration by some cloud vendors |
| AccessKeySecret | - | Optional | Default field required for key configuration by some cloud vendors |
| SecurityToken | - | Optional | Default field required for key configuration by some cloud vendors |
| SecretAccessKey | - | Optional | Default field required for key configuration by some cloud vendors |
| AccessKey | - | Optional | Default field required for key configuration by some cloud vendors |
| SecretKey | - | Optional | Default field required for key configuration by some cloud vendors |
| SecretID | - | Optional | Default field required for key configuration by some cloud vendors |
| PrivateKeyData | - | Optional | Default field required for key configuration by some cloud vendors |
| keyList | kl | Optional | For custom configuration in batches when default fields do not meet the requirements |
| infoList | il | Optional | For custom configuration in batches when default fields do not meet the requirements |
| access | a | Optional | Alias for the key |
| force | f | Optional | Force modification/overwrite of already configured key information |
### Operational Examples
Key addition can be performed directly via `config add`:
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
After selecting an option, the system will provide interactive guidance:
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
Keys can also be added directly via the command line:
```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** 
```
Or add custom content:
```shell script
$ s config add -kl key1,key2,key3 -il info1,info2,info3
```
- Common cloud vendor key configuration content
```
alibaba:    AccountID, AccessKeyID, AccessKeySecret,
aws:        AccessKeyID, SecretAccessKey,
baidu:      AccessKeyID, SecretAccessKey,
huawei:     AccessKeyID, SecretAccessKey,
azure:      KeyVaultName, TenantID, ClientID, ClientSecret,
tencent:    AccountID, SecretID, SecretKey,
google:     PrivateKeyData
```
> - Method of acquiring keys via environment variables: This part may vary according to different documents, so refer to the corresponding document for the `Key-Value` pair of the environment variable.
> - Common cloud vendor key acquisition addresses:
>     - [Alibaba Cloud](./../default_provider_config/alibabacloud.md)
>     - [Baidu Cloud](./../default_provider_config/baiducloud.md)
>     - [AWS](./../default_provider_config/aws.md)
>     - [Azure](./../default_provider_config/azure.md)
>     - [Google Cloud](./../default_provider_config/gcp.md)
>     - [Huawei Cloud](./../default_provider_config/huaweicloud.md)
>     - [Tencent Cloud](./../default_provider_config/tencentcloud.md)
## config get Command
The `config get` command allows you to obtain information about configured accounts.
Configuration help can be viewed via `-h/--help`:
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
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| access | a | Optional | Alias for the key |
### Operational Examples
To retrieve details of a configured key, you can use `config get`. For example, to get information for the key with the alias `test`, execute:
```shell script
$ s config get -a test
test:
  AccountID: 146**********468
  AccessKeyID: LTA******************f5Q
  AccessKeySecret: qDN************************Xp7
```
To obtain all configured key information, you can use `config get` without any parameters:
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
## config delete Command
The `config delete` command allows you to delete information about configured accounts.
Configuration help can be viewed via `-h/--help`:
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
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| access | a | Mandatory | Alias for the key |
### Operational Examples
To delete a configured key, you can use `config delete`. For example, to delete the key with the alias `test`, execute:
```shell script
$ s config delete -a test
Access [test] has been successfully deleted.
```
## config rename Command
The `config rename` command allows you to change the name of a configured key.
Configuration help can be viewed via `-h/--help`:
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
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning       |
|-----|------|-----|--------------|
| source | - | Mandatory | Original alias of the key |
| target | - | Mandatory | New alias of the key |
### Operational Examples
To change the alias of a configured key, use `config rename`. For example, to change the alias of the key from `test` to `test2`, execute:
```shell script
$ s config rename --source test --target test2  
Alias:      test2  
credential: 
  AccessKeyID:     ******************
  AccessKeySecret: ******************
  AccountID:       ******************
```
You can also change the alias interactively by not providing arguments:
```shell script
$ s config rename
? Please select need rename alias name: (Use arrow keys)
❯ test
```
After selecting the alias to be changed, enter the new target alias:
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
## config default Command
The `config default` command allows you to configure the default key.
Configuration help can be viewed via `-h/--help`:
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
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning       |
|-----|------|-----|--------------|
| access | a | Optional | Alias for the key |
### Operational Examples
You can set the default key information with the `s config default` command. For example, to set the current default key to `demo`, execute:
```shell script
$ s config default
You can choose an access to set as the default.
? Please select an access: (Use arrow keys)
❯ demo
  demo1
  demo2
(Move up and down to reveal more choices)
```
After selection, you will be prompted:
```shell script
Access [demo] has been set as default.
```
This is an interactive setting, but you can also directly input `s config default -a demo` to set it.
```shell script
$ s config default -a demo
Access [demo] has been set as default.
```
## Notes
### Setting Keys via Environment Variables
For details, refer to: [Developer Tools Design Document](../tool.md) in the [Setting Keys via Environment Variables](../tool.md#setting-keys-via-environment-variables) section.
### About the Order of Using Configured Keys
For details, refer to: [Developer Tools Design Document](../tool.md) in the [Order and Standards of Key Use](../tool.md#order-and-standards-of-key-use) section.
