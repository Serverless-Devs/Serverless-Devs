---
title: 快速上手
description: 'Serverless Devs快速上手教程'
position: 2
category: '概述'
---

# 快速上手

本快速上手案例以 [阿里云函数计算](https://github.com/devsapp/fc) 为例（当然，Serverless Devs 还支持 [AWS Lambda](https://github.com/devscomp/lambda)，[百度智能云函数计算](https://github.com/xinwuyun/cfc)，[华为云函数工作流](https://github.com/zy-linn/fgs-component)，[腾讯云云函数](https://github.com/devscomp/scf)等多个云厂商的 FaaS 平台）的快速上手 Serverless Devs

- [工具安装](#工具安装)
- [密钥配置](#密钥配置)
- [上手体验：快速部署一个Node应用](#上手体验快速部署一个Node应用)

## 工具安装
- 第一步：安装 Node.js(>=12.0.0) 与 NPM 包管理工具；  
- 第二步：安装 Serverless Devs 开发者工具；   
    ```shell script
    $ npm install @serverless-devs/s3 -g
    ```
- 第三步：可以通过`s -v`判断工具是否安装成功，如果安装成功可以看到相对应的版本信息，例如：
    ```shell script
    @serverless-devs/s3: 0.0.13, s-home: /Users/xxx/.s, darwin-x64, node-v17.7.1
    ```

## 密钥配置

> 由于本快速上手文档，将会以 [阿里云函数计算](https://www.aliyun.com/product/fc) 为例，所以此处的密钥配置也是以阿里云密钥配置为例： 
> - 获取密钥页面：https://usercenter.console.aliyun.com/#/manage/ak

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)
 
- 执行`s config add`，并选择`Alibaba Cloud (alibaba)`：
    ```shell script
    $ s config add 
    ? Please select a provider: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccessKeyID:  
    ```
- 此时，可以按照引导，进行密钥的配置：
    ```shell script
    ? Please select a template: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccessKeyID 此处填写AccessKeyID
    ? AccessKeySecret 此处填写AccessKeySecret
    ? Please create alias for key pair. If not, please enter to skip alibaba-access
    
        Alias: alibaba-access
        AccountID: 自动获取AccountID
        AccessKeyID: 此处填写AccessKeyID
        AccessKeySecret: 此处填写AccessKeySecret
    
    ✔ Configuration successful
    ```
- 为了验证密钥是否正确配置，可以通过`s config get -a alibaba-access`进行指定密钥的查看：
    ```shell script
    $ s config get -a alibaba-access
    alibaba-access:
      AccountID: 此处填*******tID
      AccessKeyID: 此处填*********yID
      AccessKeySecret: 此处填*************ret
    ```
  
  
> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. Github）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) 。    
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) ，使用 RAM 子用户 AccessKey 来进行 API 调用。


## 上手体验：快速部署一个Node应用

- 执行`s`命令：
    ```shell script
    $ s
    ? No Serverless-Devs project is currently detected. Do you want to create a new project? (Y/n) 
    ```  
- 填写`y`，并按回车，可以进入到创建引导部分：
    ```shell script
    🚀  More applications: https://registry.serverless-devs.com
    ? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
    ❯ Alibaba Cloud Serverless 
      AWS Cloud Serverless 
      Tencent Cloud Serverless 
      Huawei Cloud Serverless 
      Baidu Cloud Serverless 
      Dev Template for Serverless Devs 
    ```

- 此时只需要选择对应的选项，按照引导进行操作，即可。例如选择`Alibaba Cloud Serverless`，就可以看到阿里云Serverless产品下的应用模板分类:

    ```shell script
    ? Hello, serverlesser. Which template do you like? (Use arrow keys or type to search)
    ❯ Quick start 
      Custom runtime example 
      Container example 
      Custom domain example 
    ```

- 此时可以继续选择某分类下的具体应用进行初始化，例如选择`Quick start`之后，可以看到该分类下的具体模板应用：

    ```shell script
    ? Which template do you like? (Use arrow keys or type to search)
    ❯ Node.js 
      Python3 
      Java 
      Go 
      Dotnet 
    ```

    选择`Node.js`即可完成创建，在引导的过程中，可能会出现填写项目名称以及选择密钥的过程：
    - 项目名称可以是：`start-fc-http-nodejs14`
    - 地域可以是：`cn-hangzhou`
    - 函数名可以是： `start-fc-http-nodejs14`
    - nodejs 运行时可以是：`nodejs14`
    - 密钥可以选择我们上文中创建过的：`alibaba-access`    
    
    例如：

    ```shell script 
    🚀  More applications: https://registry.serverless-devs.com
    ? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
    ❯ Alibaba Cloud Serverless 
    ? Hello Serverless for Cloud Vendors Alibaba Cloud Serverless
    ? Hello, serverlesser. Which template do you like? Quick start [Deploy a Hello World function to FaaS]
    ? Which template do you like? Node.js

    😋  Create application command: [s init start-fc3-nodejs]

    ? Please input your project name (init dir) start-fc-http-nodejs14
    Downloading[/v3/packages/start-fc3-nodejs/zipball/0.0.7]...
    Download start-fc3-nodejs successfully

      Serverless Devs Application Case
        
        Cloud services required：
        - FC : https://fc.console.aliyun.com/
        
        Tips：
        - FC Component: https://github.com/devsapp/fc3/blob/master/docs/zh/readme.md
    创建应用所在的地区
    ? 地域 cn-hangzhou
    只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-128 之间。
    ? 函数名称 start-fc-http-nodejs14
    创建应用所在的地区
    ? nodejs 运行时 nodejs14
    ? please select credential alias alibaba-access

        * Before using, please check whether the actions command in Yaml file is available
        * Carefully reading the notes in s.yaml is helpful for the use of the tool
        * If need help in the use process, please apply to join the Dingtalk Group: 33947367
        

    🏄‍  Thanks for using Serverless-Devs
    👉  You could [cd ******/start-fc-http-nodejs14] and enjoy your serverless journey!
    🧭️  If you need help for this example, you can use [s -h] after you enter folder.
    💞  Document ❤ Star: https://github.com/Serverless-Devs/Serverless-Devs
    🚀  More applications: https://registry.serverless-devs.com
    ```

- 随后进入`./start-fc-http-nodejs14`目录，使用`s deploy`进行项目部署，稍等片刻，可以看到部署结果：

    ```shell script
    🚀  Result for [deploy] of [hello-world-app]
    ====================
    hello_world: 
      region:         cn-hangzhou
      description:    hello world by serverless devs
      functionName:   start-fc-http-nodejs14
      handler:        index.handler
      internetAccess: true
      memorySize:     128
      role:           
      runtime:        nodejs14
      timeout:        30
    ```

    此时我们已经成功部署了一个应用。可以前往[函数计算控制台](https://fcnext.console.aliyun.com/overview)查看详情。
- 部署成功之后，我们可以使用`s invoke`命令对该函数应用进行调用。例如：

    ```shell script
    $ s invoke -e "{\"key\": \"val\"}"
    ⌛  Steps for [invoke] of [hello-world-app]
    ====================
    ========= FC invoke Logs begin =========
    FC Invoke Start RequestId: 1-6551e2b4-a057ee3a45ccf4f082ae5d2d
    load code for handler:index.handler
    FC Invoke End RequestId: 1-6551e2b4-a057ee3a45ccf4f082ae5d2d

    Duration: 4.14 ms, Billed Duration: 5 ms, Memory Size: 128 MB, Max Memory Used: 9.58 MB
    ========= FC invoke Logs end =========

    Invoke instanceId: c-6551e2b5-f9c5c77480384d1aa28d
    Code Checksum: 11010102639495810358
    Qualifier: LATEST
    RequestId: 1-6551e2b4-a057ee3a45ccf4f082ae5d2d

    Invoke Result:
    val
    ✔ [hello_world] completed (1.34s)
    ```
