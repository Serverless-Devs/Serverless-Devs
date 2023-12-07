---
title: Init 命令
description: 'Init 命令'
position: 8
category: '命令'
---
# Init 命令

`init`命令是初始化Serverless项目的脚手架。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [初始化项目](#初始化项目)
        - [引导式初始化](#引导式初始化)
        - [直接初始化](#直接初始化)
            - [初始化Registry应用](#初始化Registry应用)
            - [初始化仓库应用](#初始化仓库应用)

## 命令解析

当执行`s init -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s init -h
Usage: s init [options]

Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

Example:
    $ s init
    $ s init <project> 
    $ s init <project> -d my_dir
    $ s init <project> --app-name my-express
    $ s init <project> --parameters '{"serviceName":"websiteService"}'
    $ s init git@github.com:foo/bar.git
    $ s init https://github.com/foo/bar.git
    
📖  Document: https://serverless.help/t/s/init
🚀  More applications: https://registry.serverless-devs.com

Options:
  -d, --dir <dir>                 Where to output the initialized app into (default: ./<ProjectName> )
  -r, --registry <url>            Use specify registry
  --uri <uri>                     Use specify uri, Eg: remote url, local dir, local zip file
  -y                              Assume that the answer to any question which would be asked is yes
  --parameters <parameters>       Initialize with custom parameters
  --app-name <appName>            Modify default Application name
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 |
|-----|-----|-----|-----|
| dir | d | `./<ProjectName>` | 项目初始化的路径/目录 | 
| registry | -r | http://registry.devsapp.cn/simple | 源配置地址，类似于Python中指定pip源，或者Node.js中指定NPM源 | 
| uri | - | - | 远程或本地文件的地址 |
| - | y | - | 所有问题都默认选择yes | 
| parameters |  | {"serviceName":"websiteService"} | 初始化参数 | 
| appName |  | my-express | 应用/项目名称 | 

### 初始化项目

#### 引导式初始化

通过`s init`可以直接进入项目初始化的引导模块：

```shell script
$ s init

🚀  More applications: https://registry.serverless-devs.com
? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Huawei Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

此时只需要选择对应的选项，按照引导进行操作，即可。例如选择`Alibaba Cloud Serverless`，就可以看到阿里云Serverless产品下的应用模板分类:

```shell script
? Hello, serverlesser. Which template do you like? (Use arrow keys or type to search)
❯ Quick start [Deploy a Hello World function to FaaS] 
  Custom runtime example [Deploy function to FaaS with custom runtime] 
  Container example [Deploy function to FaaS with custom-container] 
  Custom domain example [Deploy function to FaaS with custom domain] 
```

此时可以继续选择某分类下的具体应用进行初始化，例如选择`Quick start`之后，可以看到该分类下的具体模板应用：

```shell script
? Which template do you like? (Use arrow keys or type to search)
❯ Node.js 
  Python3 
  Java 
  Go 
  Dotnet 
(Move up and down to reveal more choices)
```

选择`Node.js`即可完成创建：

```shell script
$ s init                                         

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

🚀  More applications: https://registry.serverless-devs.com
? Hello Serverless for Cloud Vendors Alibaba Cloud Serverless
? Hello, serverlesser. Which template do you like? Quick start [Deploy a Hello World function to FaaS]
? Which template do you like? Node.js

......

💞  Document ❤ Star: https://github.com/Serverless-Devs/Serverless-Devs
🚀  More applications: https://registry.serverless-devs.com
```

更多关于默认源对应的应用信息，可以参考[Serverless Registry](https://registry.serverless-devs.com/)

#### 直接初始化

通过`s init [name | url]`，可以从配置的`Registry`或者指定的仓库`Url`获取模板项目。

##### 初始化Registry应用

以默认的`Registry`为例，可以初始化相对应的案例项目：`start-fc-http-nodejs12`，可以通过`s init start-fc-http-nodejs12`命令来进行：

```shell script
$ s init start-fc-http-nodejs12

🚀  More applications: https://registry.serverless-devs.com
? Please input your project name (init dir) start-fc-http-nodejs12
Downloading[/simple/start-fc-http-nodejs12/zipball/1.1.23]...

......

💞  Document ❤ Star: https://github.com/Serverless-Devs/Serverless-Devs
🚀  More applications: https://registry.serverless-devs.com
```

##### 初始化仓库应用

以Github仓库 `https://github.com/devsapp/start-fc` 为例，可以通过`s init  https://github.com/devsapp/start-fc.git`命令初始化该案例项目：

```shell script
$ s init https://github.com/devsapp/start-fc.git

🚀  More applications: https://registry.serverless-devs.com
Cloning into 'start-fc'...
remote: Enumerating objects: 6403, done.
remote: Counting objects: 100% (1693/1693), done.
remote: Compressing objects: 100% (953/953), done.
remote: Total 6403 (delta 863), reused 1462 (delta 667), pack-reused 4710
Receiving objects: 100% (6403/6403), 33.25 MiB | 3.57 MiB/s, done.
```



