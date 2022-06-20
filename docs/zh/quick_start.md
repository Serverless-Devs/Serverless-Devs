---
title: 快速上手
description: 'Serverless Devs快速上手教程'
position: 2
category: '概述'
---

# 快速上手

本快速上手案例以 [阿里云函数计算](https://github.com/devsapp/fc) 为例（当然，Serverless Devs 还支持 [AWS Lambda](https://github.com/devscomp/lambda)，[百度智能云函数计算](https://github.com/xinwuyun/cfc)，[华为云函数工作流](https://github.com/xinwuyun/fg)，[腾讯云云函数](https://github.com/devscomp/scf)等多个云厂商的 FaaS 平台）的快速上手 Serverless Devs

- [工具安装](#工具安装)
- [密钥配置](#密钥配置)
- [上手体验](#上手体验)
    - [Serverless：Hello World](#serverlesshello-world)
    - [人工智能：目标检测](#人工智能目标检测)
    - [传统框架：基于Django的博客项目](#传统框架基于django的博客项目)

## 工具安装
- 第一步：安装 Node.js(>=10.8.0) 与 NPM 包管理工具；  
- 第二步：安装 Serverless Devs 开发者工具；   
    ```shell script
    $ npm install @serverless-devs/s -g
    ```
- 第三步：可以通过`s -v`判断工具是否安装成功，如果安装成功可以看到相对应的版本信息，例如：
    ```shell script
    @serverless-devs/s: 2.1.2, core: 0.1.41, s-home: /Users/xxx/.s, darwin-x64, node-v17.7.1
    ```

## 密钥配置

> 由于本快速上手文档，将会以 [阿里云函数计算](https://www.aliyun.com/product/fc) 为例，所以此处的密钥配置也是以阿里云密钥配置为例： 
> - AccountId获取页面：https://account.console.aliyun.com/#/secure  
> - 获取密钥页面：https://usercenter.console.aliyun.com/#/manage/ak

- 打开 [AccountId获取页面](https://account.console.aliyun.com/#/secure) 获取AccountId ：
  ![AccountId获取页面](https://images.devsapp.cn/access/aliyun-accountid.jpg)

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)
 
- 执行`s config add`，并选择`Alibaba Cloud (alibaba)`：
    ```shell script
    $ s config add 
    ? Please select a template: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccountID () 
    ```
- 此时，可以按照引导，进行密钥的配置：
    ```shell script
    ? Please select a template: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccountID 此处填写AccountID
    ? AccessKeyID 此处填写AccessKeyID
    ? AccessKeySecret 此处填写AccessKeySecret
    ? Please create alias for key pair. If not, please enter to skip alibaba-access
    
        Alias: alibaba-access
        AccountID: 此处填写AccountID
        AccessKeyID: 此处填写AccessKeyID
        AccessKeySecret: 此处填写AccessKeySecret
    
    Configuration successful
    ```
- 为了验证密钥是否正确配置，可以通过`s config get -a alibaba-access`进行指定密钥的查看：
    ```shell script
    $ s config get -a alibaba-access
    [2021-10-27T17:39:39.881] [INFO ] [S-CLI] - 
    
    alibaba-access:
      AccountID: 此处填*******tID
      AccessKeyID: 此处填*********yID
      AccessKeySecret: 此处填*************ret
    ```
  
  
> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. Github）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) 。    
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) ，使用 RAM 子用户 AccessKey 来进行 API 调用。


## 上手体验

### Serverless：Hello World

- 执行`s`命令：
    ```shell script
    $ s
    ? No Serverless-Devs project is currently detected. Do you want to create a new project? (Y/n) 
    ```  
- 填写`y`，并按回车，可以进入到创建引导部分：
    ```shell script
    🚀 More applications: https://registry.serverless-devs.com
    
    ? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
    ❯ Alibaba Cloud Serverless 
      AWS Cloud Serverless 
      Baidu Cloud Serverless 
      Huawei Cloud Serverless 
      Tencent Cloud Serverless 
      Dev Template for Serverless Devs 
    ```

- 此时只需要选择对应的选项，按照引导进行操作，即可。例如选择`Alibaba Cloud Serverless`，就可以看到阿里云Serverless产品下的应用模板分类:

    ```shell script
     ? Hello, serverlesser. Which template do you like? (Use arrow keys or type to search)
     ❯ Quick start [Deploy a Hello World function to FaaS]
       Container example [Deploy function to FaaS with custom-container]
       Web Framework [Deploy a web framework to FaaS]
       Static website [Deploy a static website]
       Best practice [Experience serverless project]
    ```

- 此时可以继续选择某分类下的具体应用进行初始化，例如选择`Quick start`之后，可以看到该分类下的具体模板应用：

    ```shell script
    ? Which template do you like? (Use arrow keys or type to search)
    ❯ [HTTP] Node.js 14  - 快速部署一个 nodejs14 http函数 
      [HTTP] Python3     - 快速部署一个 python3 http函数 
      [HTTP] Java8       - 快速部署一个 java8 http函数 
      [HTTP] PHP7        - 快速部署一个 php http函数 
      [HTTP] C++ (custom)- 快速部署一个 C++ http函数 
      [Event] Node.js 14 - 快速部署一个 nodejs14 event函数
      [Event] Python3    - 快速部署一个 python3 event函数
      ... ...
    ```
    选择`[HTTP] Node.js 14`即可完成创建，在引导的过程中，可能会出现填写项目名称以及选择密钥的过程：
    - 项目名称可以是：`start-fc-http-nodejs14`
    - 地域可以是：`cn-hangzhou`
    - 服务名可以是： `hello-world-service`
    - 函数名可以是： `start-fc-http-nodejs14`
    - 密钥可以选择我们上文中创建过的：`alibaba-access`    
    
    例如：
    ```shell script 
    🚀  More applications: https://registry.serverless-devs.com

    ? Hello Serverless for Cloud Vendors Alibaba Cloud Serverless
    ? Hello, serverlesser. Which template do you like? Quick start [Deploy a Hello World function to FaaS]
    ? Which template do you like? [HTTP] Node.js 14

   😋  Create application command: [s init devsapp/start-fc-http-nodejs14]

   ? Please input your project name (init dir) start-fc-http-nodejs14
   ✔ file decompression completed

   Serverless Devs Application Case

       Cloud services required：
       - FC : https://fc.console.aliyun.com/
    
       Tips：
       - FC Component: https://www.serverless-devs.com/fc/readme
   创建应用所在的地区
   ? 地域 cn-hangzhou
   服务名称，只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-128 之间
   ? 服务名 hello-world-service
   函数名称，只能包含字母、数字、下划线和中划线。不能以数字、中划线开头。长度在 1-64 之间
   ? 函数名 start-fc-http-nodejs14
   ? please select credential alias alibaba-access

       * Before using, please check whether the actions command in Yaml file is available
       * Carefully reading the notes in s.yaml is helpful for the use of the tool
       * If need help in the use process, please apply to join the Dingtalk Group: 33947367


   🏄‍  Thanks for using Serverless-Devs
   👉  You could [cd /Users/nanxuanli/work/demo/devs/start-fc-http-nodejs14] and enjoy your serverless journey!
   🧭️  If you need help for this example, you can use [s -h] after you enter folder.
   💞  Document ❤ Star: https://github.com/Serverless-Devs/Serverless-Devs
   🚀  More applications: https://registry.serverless-devs.com

   ? Do you want to deploy the project immediately? (Y/n)
    ```
- 可以看到，系统在最后有一个提醒，是否要部署该项目，此时可以输入`y`，直接进行项目的部署，稍等片刻，可以看到部署结果：
    ```shell script
    helloworld: 
      region:   cn-hangzhou
      service: 
        name: hello-world-service
      function: 
        name:       start-fc-http-nodejs14
        runtime:    nodejs14
        handler:    index.handler
        memorySize: 128
        timeout:    60
      url: 
        system_url:    https://start-fp-nodejs-hello-w-service-uxcvfbhdii.cn-hangzhou.fcapp.run
        custom_domain: 
          - 
            domain: http://start-fc-http-nodejs14.hello-world-service.1816647648916833.cn-hangzhou.fc.devsapp.net
      triggers: 
        - 
          type: http
          name: httpTrigger
    ```
    此时可以打开`domain`返回给我们的域名，进行测试。

### 人工智能：目标检测

- 初始化一个已有的人工智能目标检测项目：`s init devsapp/image-prediction-app`，初始化过程中可能会出现填写项目名称以及选择密钥的过程：
    - 项目名称可以是：`image-prediction-app`
    - 密钥可以选择我们上文中创建过的：`alibaba-access`    
    
    例如：
    ```shell script
    $ s init devsapp/image-prediction-app
    
    🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome
    
    ? Please input your project name (init dir) image-prediction-app
    ✔ file decompression completed
    ? please select credential alias alibaba-access
    
         ___   __   __  _______  _______  _______ 
        |   | |  |_|  ||   _   ||       ||       |
        |   | |       ||  |_|  ||    ___||    ___|
        |   | |       ||       ||   | __ |   |___ 
        |   | |       ||       ||   ||  ||    ___|
        |   | | ||_|| ||   _   ||   |_| ||   |___ 
        |___| |_|   |_||__| |__||_______||_______|
                                            
    
        Welcome to the image-prediction-app application
         This application requires to open these services: 
             FC : https://fc.console.aliyun.com/
         This application can help you quickly deploy the image-prediction-app project.
         The application uses FC component：https://github.com/devsapp/fc
         The application homepage: https://github.com/devsapp/image-prediction-app
    
    
    🏄‍ Thanks for using Serverless-Devs
    👉 You could [cd /Users/jiangyu/start-application/image-prediction-app] and enjoy your serverless journey!
    🧭️ If you need help for this example, you can use [s -h] after you enter folder.
    💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
    ```
- 进入项目目录：`cd image-prediction-app`
- 通过`deploy`命令进行项目的部署：
    ```shell script
    Tips for next step
    ======================
    * Display information of the deployed resource: s info
    * Display metrics: s metrics
    * Display logs: s logs
    * Invoke remote function: s invoke
    * Remove Service: s remove service
    * Remove Function: s remove function
    * Remove Trigger: s remove trigger
    * Remove CustomDomain: s remove domain
    
    
    
    imageAi: 
      region: cn-hangzhou
      url: 
        custom_domain: 
          - 
            domain: http://server.ai-cv-image-prediction.1583208943291465.cn-hangzhou.fc.devsapp.net
    ```
- 此时可以打开系统分配的测试域名，并上传一张图片进行测试：
    ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635390067198_20211028030108110359.png)

### 传统框架：基于Django的博客项目

- 初始化一个已有的基于Django的博客项目：`s init django-blog`，初始化过程中可能会出现填写项目名称以及选择密钥的过程：
    - 项目名称可以是：`django-blog`
    - 密钥可以选择我们上文中创建过的：`alibaba-access`    
    
    例如：
    ```shell script
    $ s init django-blog

    🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome
    
    ? Please input your project name (init dir) django-blog
    ✔ file decompression completed
    ? please select credential alias alibaba-access
    
         ______       ___  _______  __    _  _______  _______  _______  ___      _______  _______ 
        |      |     |   ||   _   ||  |  | ||       ||       ||  _    ||   |    |       ||       |
        |  _    |    |   ||  |_|  ||   |_| ||    ___||   _   || |_|   ||   |    |   _   ||    ___|
        | | |   |    |   ||       ||       ||   | __ |  | |  ||       ||   |    |  | |  ||   | __ 
        | |_|   | ___|   ||       ||  _    ||   ||  ||  |_|  ||  _   | |   |___ |  |_|  ||   ||  |
        |       ||       ||   _   || | |   ||   |_| ||       || |_|   ||       ||       ||   |_| |
        |______| |_______||__| |__||_|  |__||_______||_______||_______||_______||_______||_______|
                                            
    
        Welcome to the django-blog application
         This application requires to open these services: 
             FC : https://fc.console.aliyun.com/
         This application can help you quickly deploy the django-blog project.
         The application uses Django component：https://github.com/devsapp/django
         The application homepage: https://github.com/devsapp/django-blog
         
         * Python 3.7 is recommended;
         * If the version is greater than Python 3.7: 
            * Operation error: ImportError: cannot import name 'metadata' from 'importlib', you can refer to: https://stackoverflow.com/questions/59216175/importerror-cannot-import-name-metadata-from-importlib
         * Default information:
            * Admin：/admin
            * Default Admin Username: blog
            * Default Admin Password: myblog12345!     
         
    
    
    🏄‍ Thanks for using Serverless-Devs
    👉 You could [cd /Users/jiangyu/django-blog] and enjoy your serverless journey!
    🧭️ If you need help for this example, you can use [s -h] after you enter folder.
    💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
    ```
- 进入项目目录：`cd django-blog`
- 通过`deploy`命令进行项目的部署：
    ```shell script
    Tips for next step
    ======================
    * Invoke remote function: s invoke
    ✔ Try container acceleration
    djangoBlog: 
      region:        cn-shenzhen
      serviceName:   serverless-devs-django
      functionName:  django
      customDomains: 
        - http://django.serverless-devs-django.1583208943291465.cn-shenzhen.fc.devsapp.net
    ```
- 此时可以打开系统分配的测试域名，并上传一张图片进行测试：
    ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635390266827_20211028030427642356.png)
