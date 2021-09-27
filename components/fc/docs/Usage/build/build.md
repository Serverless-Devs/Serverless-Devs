# 构建操作：Build

- [快速使用](#快速使用)
- [原理](#原理)
-------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的构建/安装依赖的能力。可以通过`build`指令，快速进行构建/安装依赖操作。

您可以通过`build -h`/`build --help`参数，唤起帮助信息。例如执行`s build -h`后，可以看到：

```

Build 

  Build the dependencies.

Usage

  $ s build <options> 

Options

  -f, --dockerfile string   Specify the dockerfile path
  -d, --use-docker string   Use docker container to build functions

Global Options

  -h, --help Build help for command.                                           

Examples with Yaml

  $ s build
  $ s <ProjectName> build
  $ s build --use-docker 
  $ s exec -- build --use-docker 

Examples with CLI

  $ s cli fc build --use-docker 

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的快速构建。

除了Python语言之外，Java语言、Nodejs语言、Php语言，以及容器镜像等都可以支持。以下例举可以识别的依赖文件名（即通过识别该文件，进行相关依赖下载，或者资源构建）：

- Python: requirements.txt
- Nodejs: package.json
- Php: composer.json
- Java: pom.xml
- Container: dockerfile

## python

以 python 目录中的例子为例：

```bash
$ s build --use-docker
$ s deploy -y
```

![](https://img.alicdn.com/imgextra/i3/O1CN016yUmJP1aKU4boPjWo_!!6000000003311-2-tps-1667-978.png)

如上图所示：

1. 开发编辑源代码

2. s build --use-docker之后， 自动根据 requirements.txt 下载对应的依赖到本地， 并且和源码一起组成交付物

3. s deploy 将整个交付物 zip 打包， 创建函数， 同时设置好依赖包的环境变量， 让函数可以直接 import 对应的代码依赖包

## nodejs

和 python 同理,  对应例子在 nodejs 目录

![](https://img.alicdn.com/imgextra/i3/O1CN018en3Mt1DY0bi8ZzeT_!!6000000000227-2-tps-1752-936.png)

如上图所示：

1. 开发编辑源代码

2. s build --use-docker 之后， 自动根据 package.json 下载对应的依赖到本地， 并且和源码一起组成交付物

3. s deploy 将整个交付物 zip 打包， 创建函数， 同时设置好依赖包的环境变量， 让函数可以直接 require 对应的代码依赖包

## java

![](https://img.alicdn.com/imgextra/i4/O1CN014gwk4d1PZdOnL9gWC_!!6000000001855-2-tps-1304-622.png)

如上图所示：

1. 开发编辑源代码

2. s build --use-docker 之后，编译 java 工程

3. s deploy 将整个交付物 jar 打包， 创建函数

## php

和 python 同理, 对应例子在 php 目录
![](https://img.alicdn.com/imgextra/i1/O1CN01b9bH2A1ciQ08IlEJc_!!6000000003634-2-tps-1778-928.png)

如上图所示：

1. 开发编辑源代码

2. s build --use-docker 之后， 自动根据 composer.json 下载对应的依赖到本地， 并且和源码一起组成交付物

3. s deploy 将整个交付物 zip 打包， 创建函数，让函数可以直接 require 对应的代码依赖包


## custom-container

```bash
# 先将 s.yaml 中的 image 修改成自己的 acr 镜像地址
$ s build --use-docker --dockerfile ./Dockerfile
# todo, 下一个版本不需要加 --push-registry acr-internet 这个参数
$ s deploy --push-registry acr-internet -y
```


# 高阶

在代码包的场景中， 除了各自语言的库以外， 其实还有一种更加复杂的情况， 比如说， 在函数计算的 nodejs runtime 部署 puppeteer 应用， puppeteer 库还需要安装底层的 so 库， 比如 [apt-get.list](https://github.com/devsapp/start-puppeteer/blob/master/src/nodejs12/src/apt-get.list),  具体如下图所示：

![](https://img.alicdn.com/imgextra/i2/O1CN01IOxwXQ1EiNBT7jFtJ_!!6000000000385-2-tps-1684-964.png)

感兴趣的可以参考 [fc-start-puppeteer](https://github.com/devsapp/start-puppeteer/tree/master/src)  中 Deploy using Nodejs 12 with NAS 章节



