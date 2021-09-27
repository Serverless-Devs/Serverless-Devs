# 部署一个 Hello World 函数

在完成[工具安装](./Install-tutorial.md)以及[密钥配置](./Setting-up-credentials.md)后，我们可以尝试来部署一个简单的 Serverless 应用。

首先，我们提供一系列指令来展示如何初始化一个 Hello World 函数并进行构建以及部署操作，对于每一个指令的作用，可以参考本教程的后半部分。

```shell
# 步骤一 初始化，并进入到项目中
$ s init node.js12-http -d fc-hello-world-demo
$ cd fc-hello-world-demo


# 步骤二 构建应用
# 如果无需构建，或者安装依赖，可以跳过这个步骤
$ s build

# 步骤三 本地调试（可选）
$ s local start

# 步骤四 部署应用
$ s deploy

# 步骤五 远端调用
$ s invoke

# 步骤六 删除线上应用（可选）
$ s remove service
```

## 步骤一 初始化

### 运行指令

```shell
$ s init node.js12-http -d fc-hello-world-demo
```

执行该指令后，选择不安装依赖，并选择配置好的阿里云密钥。


### 示例输出

```shell
$ s init node.js12-http -d fc-hello-world-demo
✔ File decompression completed
? Do you want to install dependencies? No
? please select credential alias default

🏄‍ Thanks for using Serverless-Devs
👉 You could [cd /Users/zqf/Documents/demo/s/hello-world/fc-hello-world-demo] and enjoy your serverless journey!
🧭 If you need help for this example, you can use [s -h] after you enter folder.
💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs
```

### 指令运行结果

该指令会在当前工作目录创建一个以 'fc-hello-world-demo' 为名称的目录，并将对应的函数模版下载到该目录中，该场景下生成的目录结构为：

```shell
.
└── fc-hello-world-demo
    ├── index.js
    ├── package.json
    └── s.yaml
```
上述文件分别有如下解释：

- s.yaml: 以 fc 组件的 YAML 规范定义了一系列函数计算资源。
- index.js: 包含实际的函数代码逻辑。
- package.json: 依赖清单文件。

## 步骤二 构建应用

### 运行指令

首先进入到步骤一生成的项目目录下，确保该目录下的 s.yaml 文件存在，然后执行如下指令

```shell
$ s build
```

### 示例输出

```shell
$ s build
[2021-06-04T15:10:12.564] [INFO ] [S-CLI] - Start ...
[2021-06-04T15:10:12.567] [INFO ] [S-CLI] - It is detected that your project has the following projects < fc-deploy-test > to be execute
[2021-06-04T15:10:12.568] [INFO ] [S-CLI] - Start executing project fc-deploy-test
✔ File decompression completed
✔ File decompression completed
[2021-06-04T15:11:12.365] [INFO ] [FC-BUILD] - Build artifact start...
builder begin to build, runtime is: nodejs10, sourceDir:  /Users/zqf/Documents/demo/s/hello-world/fc-hello-world-demo/
running task: flow NpmTaskFlow
running task: CopySource
running task: NpmInstall
npm WARN fc-deploy-test@1.0.0 No description
npm WARN fc-deploy-test@1.0.0 No repository field.
added 1 package in 0.199s
[2021-06-04T15:11:13.045] [INFO ] [FC-BUILD] - Build artifact successfully.
[2021-06-04T15:11:13.046] [INFO ] [S-CLI] - Project fc-deploy-test successfully to execute

End of method: build
```

### 指令运行结果

构建指令将在当前目录新建构建文件夹 ```.s/build```，输出的构建产物会被放在该文件夹中供后续本地调试以及部署使用。

构建产物的文件夹以 '服务名称/函数名称' 作为分割，例如，本案例生成的构建文件夹结构如下所示:

```shell
.s
└── build
    └── artifacts
        └── fc-deploy-service
            └── http-trigger-function
                ├── index.js
                ├── node_modules
                ├── package.json
                └── s.yaml
```

相较于原始项目，构建产物增加了 ```node_modules``` 文件夹，其中存放了安装的依赖文件。

## 步骤三 本地调试（可选）

当您本地开发构建完成应用后，可能需要本地调试来确保功能的正确性。fc 组件提供了 ```local``` 指令来帮助开发者在本地完成调试工作，本地的运行环境模拟了函数计算线上运行环境。本地调试根据函数类型有两种用法：

1. [EVENT 函数](https://help.aliyun.com/document_detail/156876.html?spm=a2c4g.11186623.6.575.38c83aafl1tC0P): 运行 ```s local invoke``` 本地调用函数，立刻返回结果。
2. [HTTP 函数](https://help.aliyun.com/document_detail/74757.html?spm=a2c4g.11174283.6.576.20685212drZjTQ): 运行 ```s local start``` 启动 http server 端，然后去访问 server 端即可对函数发起调用。

### 运行指令

本案例的函数是 http 函数，因此运行 ```s local start``` 指令来进行本地调试。

```shell
$ s local start
```

### 示例输出

```shell
$ s local start
[2021-06-04T15:50:26.113] [INFO ] [S-CLI] - Start ...
[2021-06-04T15:50:26.116] [INFO ] [S-CLI] - It is detected that your project has the following projects < fc-deploy-test > to be execute
[2021-06-04T15:50:26.116] [INFO ] [S-CLI] - Start executing project fc-deploy-test
✔ File decompression completed
[2021-06-04T15:50:58.600] [INFO ] [FC-LOCAL-INVOKE] - Using build codeUri: /Users/zqf/Documents/demo/s/hello-world/fc-hello-world-demo/.s/build/artifacts/fc-deploy-service/http-trigger-function.
[2021-06-04T15:50:58.621] [INFO ] [FC-LOCAL-INVOKE] - Trigger for start is:
name: httpTrigger
type: http
config:
  authType: anonymous
  methods:
    - GET

[2021-06-04T15:50:58.665] [INFO ] [FC-LOCAL-INVOKE] - HttpTrigger httpTrigger of fc-deploy-service/http-trigger-function was registered
	url: http://localhost:8000/2016-08-15/proxy/fc-deploy-service/http-trigger-function/
	methods: GET
	authType: anonymous
[2021-06-04T15:50:58.682] [INFO ] [S-CLI] - Project fc-deploy-test successfully to execute

fc-deploy-test:
  status: succeed

function compute app listening on port 8000!
```

可以看到 http 函数 server 已经成功启动，并返回了 `url: http://localhost:8000/2016-08-15/proxy/fc-deploy-service/http-trigger-function/`，此时流程会阻塞住，通过在浏览器打开这个地址或者 `curl` 这个地址即可触发函数执行:

```shell
$ curl http://localhost:8000/2016-08-15/proxy/fc-deploy-service/http-trigger-function/
{
    "message": "Hello World",
    "path": "/",
    "queries": {},
    "headers": {
        "host": "localhost:8000",
        "user-agent": "curl/7.64.1",
        "accept": "*/*"
    },
    "method": "GET",
    "requestURI": "/2016-08-15/proxy/fc-deploy-service/http-trigger-function/",
    "clientIP": "::1",
    "uuid": "2f194cb9-8565-48f4-bf76-fde69b5f8f83",
    "body": ""
}%
```

触发函数执行后， `s local start` 的输出会增加如下内容:

```shell
[2021-06-04T15:55:09.241] [INFO ] [FC-LOCAL-INVOKE] - skip pulling image aliyunfc/runtime-nodejs10:1.9.17...
使用默认的default密钥信息
使用默认的default密钥信息
FC Initialize Start RequestId: c254fdb0-281d-4a67-b00f-a9a7d8af0e47
load code for handler:index.initializer
2021-06-04T07:55:11.166Z c254fdb0-281d-4a67-b00f-a9a7d8af0e47 [verbose] i am initializing
FC Initialize End RequestId: c254fdb0-281d-4a67-b00f-a9a7d8af0e47
FC Invoke Start RequestId: c254fdb0-281d-4a67-b00f-a9a7d8af0e47
load code for handler:index.handler
2021-06-04T07:55:11.272Z c254fdb0-281d-4a67-b00f-a9a7d8af0e47 [verbose] hello world
FC Invoke End RequestId: c254fdb0-281d-4a67-b00f-a9a7d8af0e47


RequestId: c254fdb0-281d-4a67-b00f-a9a7d8af0e47 	 Billed Duration: 447 ms 	 Memory Size: 2992 MB 	 Max Memory Used: 18 MB
```

使用 `Control+C` 即可结束本地调试过程。

### 指令运行结果

本地调试指令会启动一个本地容器来模拟函数计算线上运行环境，因此需要安装 docker 才能使用本地调试功能。

## 步骤四 部署应用到函数计算

### 运行指令

```shell
$ s deploy
```

> 注：默认部署模式为 sdk 模式，即底层直接依赖函数计算 SDK 进行部署，若您想切换到 pulumi 模式，则需要运行指令 `s cli fc-default set deploy-type pulumi` 进行模式切换。本教程使用默认的 sdk 模式进行部署，更多信息请参考[部署模式](../Usage/deploy.md#部署模式)。

### 示例输出

```shell
$ s deploy
[2021-06-04T16:18:32.365] [INFO ] [S-CLI] - Start ...
[2021-06-04T16:18:32.368] [INFO ] [S-CLI] - It is detected that your project has the following projects < fc-deploy-test > to be execute
[2021-06-04T16:18:32.368] [INFO ] [S-CLI] - Start executing project fc-deploy-test
✔ File decompression completed
[2021-06-04T16:19:01.962] [INFO ] [FC-DEPLOY] - Using region: cn-hangzhou
[2021-06-04T16:19:01.963] [INFO ] [FC-DEPLOY] - Using access alias: default
[2021-06-04T16:19:01.963] [INFO ] [FC-DEPLOY] - Using accountId: ***********3743
[2021-06-04T16:19:01.963] [INFO ] [FC-DEPLOY] - Using accessKeyId: ***********LEkP
[2021-06-04T16:19:08.684] [INFO ] [FC-DEPLOY] - service: fc-deploy-service dose not exist online, fc will use local config from now on.
[2021-06-04T16:19:08.688] [INFO ] [FC-DEPLOY] - Fc detects that you have run build command for function: http-trigger-function, use build codeUri: /Users/zqf/Documents/demo/s/hello-world/fc-hello-world-demo/.s/build/artifacts/fc-deploy-service/http-trigger-function instead of your codeUri: ./

  detail:
  added:
    LD_LIBRARY_PATH: >-
      /code/.s/root/usr/local/lib:/code/.s/root/usr/lib:/code/.s/root/usr/lib/x86_64-linux-gnu:/code/.s/root/usr/lib64:/code/.s/root/lib:/code/.s/root/lib/x86_64-linux-gnu:/code/.s/root/python/lib/python2.7/site-packages:/code/.s/root/python/lib/python3.6/site-packages:/code:/code/lib:/usr/local/lib
    PATH: >-
      /code/.s/root/usr/local/bin:/code/.s/root/usr/local/sbin:/code/.s/root/usr/bin:/code/.s/root/usr/sbin:/code/.s/root/sbin:/code/.s/root/bin:/code:/code/node_modules/.bin:/code/.s/python/bin:/code/.s/node_modules/.bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/sbin:/bin
    NODE_PATH: /code/node_modules:/usr/local/lib/node_modules
    PYTHONUSERBASE: /code/.s/python
  deleted: {}
  updated: {}

? Fc add/append some content to your origin environment variables for finding dependencies generated by build command.
 Are you sure to continue? yes
[2021-06-04T16:19:21.260] [INFO ] [FC-DEPLOY] - function: http-trigger-function dose not exist online, fc will use local config from now on.
[2021-06-04T16:19:21.462] [INFO ] [FC-DEPLOY] - trigger: httpTrigger dose not exist online, fc will use local config from now on.
📎 Using fc deploy type: sdk, If you want to deploy with pulumi, you can [s cli fc-default set deploy-type pulumi] to switch.
[2021-06-04T16:19:25.971] [INFO ] [FC-DEPLOY] - Waiting for service fc-deploy-service to be deployed
[2021-06-04T16:19:25.971] [INFO ] [FC-DEPLOY] - Waiting for function http-trigger-function to be deployed
[2021-06-04T16:19:25.971] [INFO ] [FC-DEPLOY] - Waiting for triggers httpTrigger to be deployed
✔ Make service fc-deploy-service success.
✔ Make function fc-deploy-service/http-trigger-function success.
✔ Make trigger fc-deploy-service/http-trigger-function/httpTrigger success.
[2021-06-04T16:19:26.414] [INFO ] [FC-DEPLOY] - Deployed:
Service: fc-deploy-service
Function: http-trigger-function
Triggers httpTrigger
[2021-06-04T16:19:26.418] [INFO ] [S-CLI] - Project fc-deploy-test successfully to execute

fc-deploy-test:
  region: cn-hangzhou
  service:
    name: fc-deploy-service
    description: demo for fc-deploy component
    internetAccess: true
  function:
    name: http-trigger-function
    description: this is a test
    handler: index.handler
    memorySize: 128
    timeout: 60
    instanceConcurrency: 1
    instanceType: e1
    runtime: nodejs10
    initializer: index.initializer
    initializationTimeout: 60
    environmentVariables:
      testEnv: true
      LD_LIBRARY_PATH: >-
        /code/.s/root/usr/local/lib:/code/.s/root/usr/lib:/code/.s/root/usr/lib/x86_64-linux-gnu:/code/.s/root/usr/lib64:/code/.s/root/lib:/code/.s/root/lib/x86_64-linux-gnu:/code/.s/root/python/lib/python2.7/site-packages:/code/.s/root/python/lib/python3.6/site-packages:/code:/code/lib:/usr/local/lib
      PATH: >-
        /code/.s/root/usr/local/bin:/code/.s/root/usr/local/sbin:/code/.s/root/usr/bin:/code/.s/root/usr/sbin:/code/.s/root/sbin:/code/.s/root/bin:/code:/code/node_modules/.bin:/code/.s/python/bin:/code/.s/node_modules/.bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/sbin:/bin
      NODE_PATH: /code/node_modules:/usr/local/lib/node_modules
      PYTHONUSERBASE: /code/.s/python
    codeUri: >-
      /Users/zqf/Documents/demo/s/hello-world/fc-hello-world-demo/.s/build/artifacts/fc-deploy-service/http-trigger-function
  systemDomain: >-
    https://xxx.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-function/
  triggers:
    - name: httpTrigger
      type: http
      config:
        authType: anonymous
        methods:
          - GET
```

### 指令运行结果

该指令将部署应用到函数计算平台，部署的内容为步骤二输出的构建物。

为了能够正确找到构建过程中安装的依赖，部署过程中会为您的服务增加一些环境变量，最终是否添加取决于用户是否同意，也可以使用 `--assume-yes` 参数来跳过询问，默认添加。

## 步骤五 远端调用

### 运行指令

```shell
$ s invoke
```

### 示例输出

```shell
[2021-06-04T16:27:32.431] [INFO ] [S-CLI] - Start ...
[2021-06-04T16:27:32.433] [INFO ] [S-CLI] - It is detected that your project has the following projects < fc-deploy-test > to be execute
[2021-06-04T16:27:32.434] [INFO ] [S-CLI] - Start executing project fc-deploy-test
✔ File decompression completed
https://xxx.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-function/

========= FC invoke Logs begin =========
FC Invoke Start RequestId: 595612e7-cba7-4a5c-a250-77186791a6af
2021-06-04T08:27:55.951Z 595612e7-cba7-4a5c-a250-77186791a6af [verbose] hello world
FC Invoke End RequestId: 595612e7-cba7-4a5c-a250-77186791a6af

Duration: 5.24 ms, Billed Duration: 6 ms, Memory Size: 128 MB, Max Memory Used: 49.67 MB
========= FC invoke Logs end =========

FC Invoke Result:
{
    "message": "Hello World",
    "path": "/",
    "queries": {},
    "headers": {
        "accept": "application/json",
        "authorization": "FC xxx:8VNp0ONqfb58OUs0PYnonoeXnBdH4hyGQzrUujGzDfg=",
        "date": "Fri, 04 Jun 2021 08:27:55 GMT",
        "host": "xxx.cn-hangzhou.fc.aliyuncs.com",
        "user-agent": "Node.js(v12.18.3) OS(darwin/x64) SDK(@alicloud/fc2@v2.2.2)",
        "x-forwarded-proto": "http"
    },
    "method": "GET",
    "requestURI": "/2016-08-15/proxy/fc-deploy-service/http-trigger-function/",
    "clientIP": "42.120.75.254",
    "uuid": "b8d5d109-9418-4fdb-9720-c92e10300213",
    "body": ""
}


[2021-06-04T16:27:55.979] [INFO ] [S-CLI] - Project fc-deploy-test successfully to execute

End of method: invoke
```

上述响应证明示例应用函数已经成功部署到函数计算。

### 指令运行结果

远端调用会触发线上函数运行并返回结果，由于本教程使用的示例函数是函数计算 HTTP 函数，因此您也可以通过 `curl` 指令来触发线上函数执行。

步骤四中 `s deploy` 的输出会包含 [HTTP 触发器](https://help.aliyun.com/document_detail/71229.html?spm=a2c4g.11186623.6.711.64ad7f8cz2HDWI) 的 URL:

```shell
systemDomain: >-
    https://xxx.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-function/
```

执行如下指令也可触发线上函数运行：

```shell
$ curl https://xxx.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/fc-deploy-service/http-trigger-function/
{
    "message": "Hello World",
    "path": "/",
    "queries": {},
    "headers": {
        "accept": "*/*",
        "host": "xxx.cn-hangzhou.fc.aliyuncs.com",
        "user-agent": "curl/7.64.1",
        "x-forwarded-proto": "https"
    },
    "method": "GET",
    "requestURI": "/2016-08-15/proxy/fc-deploy-service/http-trigger-function/",
    "clientIP": "42.120.75.254",
    "uuid": "6fd1bd7b-5f27-4d33-a74c-2c0c80519c5a",
    "body": ""
}%
```

## 步骤六 删除线上应用（可选）

### 运行指令

```shell
$ s remove service
```

### 示例输出

```shell
[2021-06-04T16:33:02.094] [INFO ] [S-CLI] - Start ...
[2021-06-04T16:33:02.096] [INFO ] [S-CLI] - It is detected that your project has the following projects < fc-deploy-test > to be execute
[2021-06-04T16:33:02.097] [INFO ] [S-CLI] - Start executing project fc-deploy-test
[2021-06-04T16:33:08.056] [INFO ] [FC-DEPLOY] - Using region: cn-hangzhou
[2021-06-04T16:33:08.056] [INFO ] [FC-DEPLOY] - Using access alias: default
[2021-06-04T16:33:08.056] [INFO ] [FC-DEPLOY] - Using accountId: ***********3743
[2021-06-04T16:33:08.056] [INFO ] [FC-DEPLOY] - Using accessKeyId: ***********LEkP
[2021-06-04T16:33:10.354] [INFO ] [FC-DEPLOY] - service: fc-deploy-service exists online.
[2021-06-04T16:33:12.314] [INFO ] [FC-DEPLOY] - function: http-trigger-function exists online.
[2021-06-04T16:33:14.468] [INFO ] [FC-DEPLOY] - trigger: httpTrigger exists online.
📎 Using fc deploy type: sdk, If you want to deploy with pulumi, you can [s cli fc-default set deploy-type pulumi] to switch.
✔ Delete trigger fc-deploy-service/http-trigger-function/httpTrigger success.
✔ Delete function fc-deploy-service/http-trigger-function success.
✔ Delete service fc-deploy-service success.
[2021-06-04T16:33:18.880] [INFO ] [S-CLI] - Project fc-deploy-test successfully to execute

End of method: remove
```

上述输出表示已经成功删除线上应用。
