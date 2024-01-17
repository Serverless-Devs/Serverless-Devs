---
title: Quick start
description: 'Serverless Devs quick start'
position: 2
category: 'Overview'
---
# Quick Start

This quick start case takes [Alibaba Cloud Function Computing](https://github.com/devsapp/fc) as an example to quickly start with Serverless Devs(Of course, Serverless Devs also supports [AWS Lambda](https://github.com/devscomp/lambda), [Baidu Cloud Function Computing](https://github.com/xinwuyun/cfc), [Huawei Cloud Function Workflow](https://github.com/zy-linn/fgs-component) , [Tencent Cloud Function](https://github.com/devscomp/scf) and many other cloud vendors’ FaaS platforms. For details):
- [Tool installation](#Tool-installation)
    - [Install via command line tool](#Install-via-command-line-tool)
    - [Install by downloading the binary](#Install by downloading the binary) --- Suitable for all platforms (Windows/Mac/Linux)
    - [Install via script](#Install-via-script)
    - [Tool upgrade](#Tool-upgrade)
- [Key Configuration](#Key-Configuration)
- [Get started experience](#Get-started-experience)
    - [Serverless: Hello World](#ServerlessHello-World)
    - [AI: Target Detection](#AITarget-Detection)
    - [Traditional framework: Django-based blog project](#Traditional-framework-based-on-django-blog-project)

## Tool installation
### Install via command line tool

Install via [npm](https://www.npmjs.com/) package management: applicable to Windows, Mac, and Linux platforms that have been pre-installed with npm. Execute the following commands on Windows, Mac, and Linux platforms to install Serverless Devs Tool.

```shell script
$ npm install @serverless-devs/s -g
```
Or install via [yarn](https://yarnpkg.com/)

```shell script
$ yarn global add @serverless-devs/s
```

> **illustrate**:
> - If you execute the command under Linux or macOS and report an error and the error message is `Command not found`, please execute the command `ln -s serverless-devs installation location /usr/bin`, serverless-devs installation location can be found by `find / -name s`.
> - If an error is reported when executing this command under Linux and the error message is `Error: EACCES: permission denied`, please execute the command `sudo npm install @serverless-devs/s -g`.
> - If you have a slow installation process in mainland, you can consider using Taobao npm source. The installation command is `npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g`.

### Install by downloading the binary
Open the [releases](https://github.com/Serverless-Devs/Serverless-Devs/releases) page, select a release compressed package link corresponding to the platform in the latest version, and click to download directly.

After downloading locally, unzip it and use it directly.

#### Windows Platform

1. Find a latest release version (Release) and download the `s-*-win.exe.zip` file (where * represents the version number, such as v3.0.0).
2. Unzip the file `s-*-win.exe.zip` to get `s-*.win.exe` file, rename it to `s.exe`.
3. Just copy the s.exe file to the system PATH directory, for example: `C:\WINDOWS\System32`
4. Open the command terminal, execute `s.exe --version`, and check the returned version number to verify whether the installation is successful.


#### Linux platform
1. Find a latest release version (Release) and download the `s-*-linux.zip` file (where * represents the version number, such as v3.0.0).
2. Extract the zip file
```
$ unzip s-linux.zip
Archive: s-v3.0.0-linux.zip
  inflating: s-v3.0.0-linux
```
3. Move to PATH directory
```
$ mv s-*-linux /usr/local/bin/s
```

4. Verify version
```
$ s -v
@serverless-devs/s: 3.0.0
```


#### MacOS platform
1. Find the latest release version (Release) and download the `s-*-macos.zip` file (where * represents the version number, such as v3.0.0).
2. Extract the zip file
```
$ unzip s-macos.zip
Archive: s-v3.0.0-macos.zip
  inflating: s-v3.0.0-macos
```

3. Move to PATH directory
```
$ mv s-*-macos /usr/local/bin/s
```

4. Verify version
```
$ s -v
@serverless-devs/s: 3.0.0
```

### Install via script

For Mac/Linux users

```shell script
$ curl -o- -L http://cli.so/install.sh | bash
```

## Tool upgrade

Serverless Devs developer tools will be updated and upgraded from time to time. When developers use Serverless Devs developer tools, they can be aware of the latest version according to system reminders.

After the client perceives the system upgrade, the developer can use the command `npm i -g @serverless-devs/s` to update, or use [Release](https://github.com/Serverless-Devs/Serverless-Devs/releases) View the specific content of the upgrade to determine whether to perform this upgrade.

> For example: My current Serverless Devs version is `2.0.89`. After the system is upgraded, I will use the Serverless Devs developer tool, and the tool will give a corresponding reminder:
> ```shell script
>    ╭───────────────────────────────────────────────╮
>    │                                               │
>    │       Update available 2.0.89 → 2.0.90        │
>    │   Run npm i -g @serverless-devs/s to update   │
>    │                                               │
>    ╰───────────────────────────────────────────────╯
> ```
> At this point, just follow the reminder to update the tool.

## Key Configuration

> Since this quick start document will take [Alibaba Cloud Function Computing](https://www.aliyun.com/product/fc) as an example, the password configuration here is also based on Alibaba Cloud password configuration:
> - Get key: https://usercenter.console.aliyun.com/#/manage/ak

- Open [Get Key Page](https://usercenter.console.aliyun.com/#/manage/ak) to obtain key:
  ![Get Key Page](https://images.devsapp.cn/access/aliyun-access.jpg)
 
- Execute `s config add` and select `Alibaba Cloud (alibaba)`:
    ```shell script
    $ s config add 
    ? Please select a provider: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccessKeyID: 
    ```
- At this point, you can follow the instructions to configure the key:
    ```shell script
    ? Please select a template: Alibaba Cloud (alibaba)
    🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba
    ? AccessKeyID Fill in AccessKeyID here
    ? AccessKeySecret Fill in AccessKeySecret here
    ? Please create alias for key pair. If not, please enter to skip alibaba-access
    
        Alias: alibaba-access
        AccountID: Get AccountID automatically
        AccessKeyID: Fill in AccessKeyID here
        AccessKeySecret: Fill in AccessKeySecret here
    
    ✔ Configuration successful
    ```
- In order to verify whether the password is correctly configured, you can view the specified password through `s config get -a alibaba-access`:
    ```shell script
    $ s config get -a alibaba-access
    alibaba-access:
      AccountID: *******ID
      AccessKeyID: *********ID
      AccessKeySecret: *************key
    ```
  
  
> AccessKey is the key for your cloud account to access the Alibaba Cloud API. It has full permissions for the account. Please keep it safe! Do not share AccessKey to external channels in any way (eg Github) to avoid being used by others to cause [security threat](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR ).  
> Strongly recommended that you follow the [Alibaba Cloud Security Best Practices](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) and use the RAM sub-user AccessKey to make API calls.


## Get started experience

### Serverless：Hello World

- Execute the `s` command:
    ```shell script
    $ s
    ? No Serverless-Devs project is currently detected. Do you want to create a new project? (Y/n)  
    ```  
- Fill in `y` and press Enter to enter the creation guide section:
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

- At the same time, you only need to select the corresponding option and follow the instructions. For example, if you select `Alibaba Cloud Serverless`, you can see the classification of application templates under Alibaba Cloud Serverless products:

    ```shell script
     ? Hello, serverlesser. Which template do you like? (Use arrow keys or type to search)
     ❯ Quick start [Deploy a Hello World function to FaaS]
       Container example [Deploy function to FaaS with custom-container]
       Web Framework [Deploy a web framework to FaaS]
       Static website [Deploy a static website]
       Best practice [Experience serverless project]
    ```

- At this time, you can continue to select specific applications under a certain category for initialization. For example, after selecting `fc-runtime-starter`, you can see the specific template applications under that category:

    ```shell script
    ? Which template do you like? (Use arrow keys or type to search)
    ❯ [HTTP] Node.js 14  - Quickly deploy a nodejs14 http function
      [HTTP] Python3     - Quickly deploy a  python3 http function 
      [HTTP] Java8       - Quickly deploy a  java8 http function 
      [HTTP] PHP7        - Quickly deploy a  php7 http function 
      [HTTP] C++ (custom)- Quickly deploy a  C++ http function 
      [Event] Node.js 14 - Quickly deploy a  nodejs14 event function
      [Event] Python3    - Quickly deploy a  python3 event function
      ... ...
    ```

   Select `[HTTP] Node.js 14` to complete the creation. During the boot process, the process of filling in the project name and selecting the key may appear:
    - The project name can be: `start-fc-http-nodejs14`
    - The region name can be: `cn-hangzhou`
    - The service name can be： `hello-world-service`
    - The function name can be： `start-fc-http-nodejs14`
    - The key can be the one we created above: `alibaba-access`

   E.g:
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
- The system has a reminder at the end whether you want to deploy the project. At this time, you can enter `y` to directly deploy the project. After a while, you can see the deployment result:
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
    At this point, you can open the domain name returned to us by `domain` for testing.

### AI：Target Detection

- Execute the command `s init devsapp/image-prediction-app` to initialize an existing artificial intelligence target detection project. During this process, the process of filling in the project name and selecting the key may appear:
    - The project name can be: `image-prediction-app`
    - The key can be the one we created above: `alibaba-access`
    
    E.g: 
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
- Enter the project directory: `cd image-prediction-app`
- Execute the `deploy` command to deploy the project:
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
- At this point, you can open the test domain name assigned by the system and upload a picture for testing:
    ![Pic.alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635390067198_20211028030108110359.png)

### Traditional framework based on django blog project

- Execute the `s init django-blog` command to initialize an existing Django-based blog project. During the initialization process, the process of filling in the project name and selecting the key may appear:
    - The project name can be: `django-blog`
    - The key can be the one we created above: `alibaba-access`
    
    E.g: 
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
- Enter the project directory: `cd django-blog`
- Execute the `deploy` command to deploy the project:
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
- At this point, you can open the test domain name assigned by the system and upload a picture for testing:
    ![Pic.alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635390266827_20211028030427642356.png)
