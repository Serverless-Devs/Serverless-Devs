---
title: Set 命令
description: 'Set 命令'
position: 11
category: '命令'
---
# Set 命令

`set`命令是对工具进行相关配置的命令。

- [命令解析](#命令解析)
- [set proxy 命令](#set-proxy-命令)
- [set analysis 命令](#set-analysis-命令)
- [set log 命令](#set-log-命令)

## 命令解析

当执行`s set -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s set -h
Usage: s set [commands] [options]

You can make some default settings for the tool here.

📖  Document: https://serverless.help/t/s/set

Options:
  -h, --help                      Display help for command

Commands:
  proxy [options]                 🔧  Set proxy information
  analysis                        👉  Set to enable or disable analysis
  log                             🔊  Set to enable or disable log
```

在该命令中，包括了三个子命令：
- [proxy：配置 Serverless Devs 的全局代理](#set-proxy-命令)
- [analysis：配置 Serverless Devs 所进行的数据分析行为](#set-analysis-命令)
- [log：配置 Serverless Devs 记录日志的行为](#set-log-命令)

## set proxy 命令

通过该命令，可以对 http 请求设置全局代理。

执行`s set proxy -h`命令，可以看到帮助文档

```shell script
$ s set proxy -h

Usage: s set proxy [options]

Set proxy information.

Example:
   $ s set proxy
   $ s set proxy --http_proxy xxxx:xxx --https_proxy xxxx:xxx
   $ s set proxy --enable
   
📖  Document: https://serverless.help/t/s/set

Options:
  --enable                           whether to enable proxy
  --no-enable                        whether to disable proxy
  --http_proxy <http_proxy_value>    Specify the http_proxy.
  --https_proxy <https_proxy_value>  Specify the https_proxy.
  -h, --help                         Display help for command
```

设置 proxy 的方法有两种：

1. 直接进行配置，例如：`s set proxy --http_proxy xxxx:xxx --https_proxy xxxx:xxx --enable`
2. 通过交互式方法，进行配置：

   ```shell script
   $ s set proxy
   ? Please enter http_proxy:  xxxx:xxx
   ? Please enter https_proxy:  xxxx:xxx
   ? Do you want to enable proxy Yes
   ```
## set analysis 命令

通过该命令，可以对 Serverless Devs 开发者工具的数据分析能力进行配置。  

执行`s set analysis -h`命令，可以看到帮助文档

```shell script
$ s set analysis -h

Usage: s set analysis [options]

Set analysis action.

    Example:
        $ s set analysis
        $ s set analysis disable
        
📖  Document: https://serverless.help/t/s/set

Options:
  -h, --help  Display help for command
```

设置 analysis 的方法有两种：
1. 直接进行配置，例如：`s set analysis disable`
2. 通过交互式方法，进行配置：
    ```shell script
    $ s set analysis
    
    📝 Current analysis action: enable
    
    ? Choose a action? (Use arrow keys)
    ❯ enable
      disable
    ```
    此时，只需要选择对应的选项，就可以引导式的进行操作。

> 🙊 注：系统默认的 analysis 是：`enable`

## set log 命令

通过该命令，可以对 Serverless Devs 开发者工具的写入日志能力进行配置。  

执行`s set log -h`命令，可以看到帮助文档

```shell script
$ s set log -h

Usage: s set log [options]

Set log action.

  Example:
    $ s set log
    $ s set log enable
    $ s set log disable
        
📖  Document: https://serverless.help/t/s/set

Options:
  -h, --help  Display help for command
```

设置 log 的方法有两种：
1. 直接进行配置，例如：`s set log disable`
2. 通过交互式方法，进行配置：
    ```shell script
    $ s set log
    
    📝 Current log action: enable
    
    ? Choose a action? (Use arrow keys)
    ❯ enable
      disable
    ```
    此时，只需要选择对应的选项，就可以引导式的进行操作。

> 🙊 注：系统默认的 log 是：`enable`
