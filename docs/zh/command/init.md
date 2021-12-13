# Init 命令

`init`命令是初始化Serverless项目的脚手架。

- [前言](#前言)
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
Usage: s init [options] [name | url]

Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

    Example:
        $ s init
        $ s init project
        $ s init project -d my_dir
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git
        
🚀 More Application: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/awesome.md

Options:
  -d, --dir [dir]       Where to output the initialized app into (default: ./<ProjectName> )
  -r, --registry [url]  Use specify registry
  -h, --help            Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 |
|-----|-----|-----|-----|
| dir | d | `./<ProjectName>` | 项目初始化的路径/目录 | 
| registry | -r | http://registry.devsapp.cn/simple | 源配置地址，类似于Python中指定pip源，或者Node.js中指定NPM源 | 

### 初始化项目

#### 引导式初始化

通过`s init`可以直接进入项目初始化的引导模块：

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

此时只需要选择对应的选项，按照引导进行操作，即可。例如选择`Alibaba Cloud Serverless`，就可以看到阿里云Serverless产品下的应用模板分类:

```shell script
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Quick start [Deploy a Hello World function to FaaS] 
  Container example [Deploy function to FaaS with custom-container] 
  Web Framework [Deploy a web framework to FaaS] 
  Static website [Deploy a static website] 
  Best practice [Experience serverless project] 
```

此时可以继续选择某分类下的具体应用进行初始化，例如选择`fc-runtime-starter`之后，可以看到该分类下的具体模板应用：

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

选择`fc-http-nodejs`即可完成创建：

```shell script
$ s init                                         

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Alibaba Cloud Serverless
? Please select an Serverless-Devs Application fc-runtime-starter - 快速部署一个 FC 函数
? Please select an templete fc-http-nodejs - 快速部署一个 nodejs12 http函数

......

💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
```

更多关于默认源对应的应用信息，可以参考[Package Awesome](https://github.com/Serverless-Devs/package-awesome)

#### 直接初始化

通过`s init [name | url]`，可以从配置的`Registry`或者指定的仓库`Url`获取模板项目。

##### 初始化Registry应用

以默认的`Registry`为例，可以初始化相对应的案例项目：`start-fc-http-nodejs12`，可以通过`s init start-fc-http-nodejs12`命令来进行：

```shell script
$ s init start-fc-http-nodejs12

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Please input your project name (init dir) start-fc-http-nodejs12
✔ file decompression completed

......

💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
```

##### 初始化仓库应用

以Github仓库 `https://github.com/devsapp/puppeteer-app` 为例，可以通过`s init git@github.com:devsapp/puppeteer-app.git`命令初始化该案例项目：

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



