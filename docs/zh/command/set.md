---
title: Set 命令
description: 'Set 命令'
position: 9
category: '命令'
---
# Set 命令

`set`命令是对工具进行相关配置的命令。

- [命令解析](#命令解析)
- [set registry 命令](#set-registry-命令)
- [set proxy 命令](#set-proxy-命令)
- [set analysis 命令](#set-analysis-命令)
- [set log 命令](#set-log-命令)
- [set workspace 命令](#set-workspace-命令)

## 命令解析

当执行`s set -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s set -h
Usage: s set [commands] [options]

You can make some default settings for the tool here.

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md

Options:
  -h, --help  Display help for command

Commands:
  registry    👀 Set up a custom registry
  locale      🔧 Set up current language
  analysis    👉 Set to enable or disable analysis
  log         🔊  Set to enable or disable log      
  workspace   🙊  Set workspace path
```

在该命令中，包括了三个子命令：
- [registry：配置 Serverless Devs 所使用的 registry](#set-registry-命令)
- [locale：配置 Serverless Devs 所默认的语言](#set-locale-命令)
- [analysis：配置 Serverless Devs 所进行的数据分析行为](#set-analysis-命令)
- [log：配置 Serverless Devs 记录日志的行为](#set-log-命令)
- [workspace：配置 Serverless Devs 所默认的工作空间](#set-workspace-命令)


## set registry 命令

通过该命令，可以对 Serverless Devs 开发者工具进行 Registry 配置。 

执行`s set registry -h`命令，可以看到帮助文档

```shell script
$ s set registry -h

Usage: s set registry [options]

Set registry information.

    Example:
        $ s set registry
        $ s set registry http://registry.devsapp.cn/simple

Options:
  -h, --help  Display help for command
```

切换 Registry 的方法有两种：
1. 直接提供 Registry 信息，例如：`s set registry http://registry.devsapp.cn/simple`
2. 通过交互式方法，进行 Registry 信息的切换：
    ```shell script
    $ s set registry
    
    🔎 Current registry: http://registry.devsapp.cn/simple
    
    ? Choose a registry? (Use arrow keys)
    ❯ serverless registry [http://registry.devsapp.cn/simple] 
      github registry [https://api.github.com/repos]
      gitee registry [http://gitee.registry.devsapp.cn/simple]
      custom registry 
    ```
    此时，只需要选择对应的选项，就可以引导式的进行操作。

> 额外需要说明的是，虽然社区目前拥有Github Resitry， Gitee Registry， Serverless Registry等三个源，但是实际上这三个源也有着一定的逻辑关系：
> - Github Resitry：终极默认源，即无论用户配置了其他任何一个源，如果没有找到对应的内容，都会默认到该源进行查找；
> - Gitee Registry：针对中国用户，与Gitee合作的国内源；
> - Serverless Registry：Serverless Devs社区的默认源，也将作为被默认配置的源；
> 在Serverless Devs的开发者工具中，默认的加载逻辑：   
> ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635132866484_20211025033426634967.png)

> 🙊 注：系统默认的 Registry 是：`serverless devs offical registry [http://registry.devsapp.cn/simple] `

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
   $ s set proxy --enable false

📖  Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md

Options
  --enable                           whether to enable proxy
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
        $ s set log disable

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

## set workspace 命令

通过该命令，可以对 Serverless Devs 开发者工具的默认路径进行配置。 

执行`s set workspace -h`命令，可以看到帮助文档

```shell script
$ s set workspace -h

Usage: s set workspace [options]

Set workspace path. Switching workspaces may make previously cached components and configured key information unavailable.

    Example:
        $ s set workspace
        $ s set workspace ~/.s

Options:
  -h, --help  Display help for command
```

设置 workspace 的方法有两种：
1. 直接进行配置，例如：`s set workspace ~/.s`
2. 通过交互式方法，进行配置：
    ```shell script
    $ s set workspace
    
    📝 Current workspace path: ~/.s
    
    🙊 Switching workspaces may make previously cached components and configured key information unavailable.
     
    ? Please input an absolute path: 
    ```
    此时，只需要选择对应的选项，就可以引导式的进行操作。



> 🙊 注：系统默认的 workspace 是：`~/.s`