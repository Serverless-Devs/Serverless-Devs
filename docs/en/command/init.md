---
title: Init command
description: 'Init command'
position: 3
category: 'Commands'
---

# Init command

The `init` commands are used to initialize serverless projects. 

- [Command description](#Command-description)
    - [Parameter description](#Parameter-description)
    - [Initializes a project](#Initializes-a-project)
        - [Follow instructions to initialize a project](#Follow-instructions-to-initialize-a-project)
        - [Directly initialize a project](#Directly-initialize-a-project)
            - [Initialize a repository application from Registry](#Initialize-a-repository-application-from-Regsitry)
            - [Initialize a repository application from Git](#Initialize-a-repository-application-from-Git)

## Command description

After you run the `s init -h` command, the following help information is returned:

```shell script
$ s init -h
Usage: s init [options] [name | url]

Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

    Example:
        $ s init
        $ s init project
        $ s init project -d my_dir
        $ s init project --appName my-express
        $ s init project --parameters '{"serviceName":"websiteService"}'
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
        
🚀 More Application: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/en/awesome.md

Options:
  -d, --dir <dir>            Where to output the initialized app into (default: ./<ProjectName> )
  -r, --registry <url>       Use specify registry
  -a, --access <aliasName>   Specify the access alias name.
  --parameters <parameters>  Initialize with custom parameters
  --appName <appName>        Modify default Application name
  -h, --help                 Display help for command
```

### Parameter description

| Parameter | Abbreviation | Default value | Description |
|-----|-----|-----|-----|-----|
| dir | d | `./<ProjectName>` | The path or directory in which the project that you want to initialize is stored. | 
| registry | -r | http://registry.devsapp.cn/simple | The URL that points to a repository. The repository is similar to the pip repository in Python and the npm repository in Node.js. |
| parameters |  | {"serviceName":"websiteService"} | Custom parameters | 
| appName |  | my-express | Application name | 


### Initializes a project

#### Follow instructions to initialize a project

You can initialize a project by running the `s init` command.

```shell script
$ s init

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Baidu Cloud Serverless 
  Huawei Cloud Serverless 
  Tencent Cloud Serverless 
  Dev Template for Serverless Devs 
```

Then, follow instructions to select options based on your business requirements. For example, if you select`Alibaba Cloud Serverless`, the following information about the application template categories of Alibaba Cloud serverless services is returned:

```shell script
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Quick start [Deploy a Hello World function to FaaS] 
  Container example [Deploy function to FaaS with custom-container] 
  Web Framework [Deploy a web framework to FaaS] 
  Static website [Deploy a static website] 
  Best practice [Experience serverless project] 
```

Select an application to initialize the application. For example, if you select the `fc-runtime-starter` application, the following information about the application templates is returned：

```shell script
? Which template do you like? (Use arrow keys or type to search)
❯ [HTTP] Node.js 12 
  [HTTP] Python3 
  [HTTP] Java8 
  [HTTP] PHP7 
  [HTTP] C++ (custom) 
  [Event] Node.js 12 
  [Event] Python3 
(Move up and down to reveal more choices)
```

Select the `fc-http-nodejs` application to deploy the application：

```shell script
$ s init                                         

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Alibaba Cloud Serverless
? Please select an Serverless-Devs Application fc-runtime-starter - 快速部署一个 FC 函数
? Please select an template fc-http-nodejs - 快速部署一个 nodejs12 http函数

......

💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
```

For more information about the application that corresponds to the default repository, see [Package Awesome](https://github.com/Serverless-Devs/package-awesome).

#### Directly initialize a project

You can obtain the project template from the `repository` that you configure or from the `repository URL` that you specify by running the `s init [name | url]` command. 

##### Initialize a repository application from Registry

The following sample code provide an example on how to initialize a project by running the `s init start-fc-http-nodejs12` command. In this example, the `default repository` that corresponds to the `start-fc-http-nodejs12` project is used.

```shell script
$ s init start-fc-http-nodejs12

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Please input your project name (init dir) start-fc-http-nodejs12
✔ file decompression completed

......

💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
```

##### Initialize a repository application from Git

The following information describes how to initialize a repository application by running the `s init git@github.com:devsapp/puppeteer-app.git` command. In this example, a Github repository is used. For more information, see `https://github.com/devsapp/puppeteer-app`.

```shell script
$ s init git@github.com:devsapp/puppeteer-app.git

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

Cloning into 'puppeteer-app'...
remote: Enumerating objects: 35, done.
remote: Counting objects: 100% (35/35), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 35 (delta 10), reused 30 (delta 6), pack-reused 0
Receiving objects: 100% (35/35), 6.59 KiB | 3.30 MiB/s, done.
Resolving deltas: 100% (10/10), done.
```



