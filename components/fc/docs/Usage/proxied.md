# 端云联调操作：Proxied

- [简介与原理](#简介与原理)

- [快速使用](#快速使用)
    - [简单使用](#简单使用)
        - [准备工作](#准备工作)
        - [本地调用](#本地调用)
        - [清理工作](#清理工作)
   
    - [断点调试](#断点调试)
 
-------

阿里云函数计算（FC）组件为使用者提供了 FC 相关资源本地与云端联合调试的能力。可以通过`proxied`指令，快速进行端云联调操作。

您可以通过`proxied -h`/`proxied --help`参数，唤起帮助信息。例如执行`s proxied -h`后，可以看到：

```
Proxied

  Local invoke via proxied service. 

Detail

  Local invoke with real net traffic via proxied service. 

SubCommand List

  setup    Setup the preconditions.                     
  invoke   Invoke local function.                       
  clean    Clean the related resource and environment.. 

Usage

  s proxied <SubCommand> <options>  
                                    

Global Options

  -d, --debug string   Output debug informations. 
  -h, --help string    Display help for command.  

Example1

  Help for setup.    $ s proxied setup -h  
  Help for invoke.   $ s proxied invoke -h 
  Help for clean.    $ s proxied cleanup -h 

```

Proxied 命令为我们提供了三个子命令：
- setup: 准备端云联调的辅助资源和相关环境，可以通过`s proxied setup -h`获取帮助文档
    ```
    Setup

      Setup Operation. 

    Detail
    
      Setup for local invoke via proxied service.
    
    Usage
    
      s proxied setup <options>
    
    
    Options
    
      -c, --config string       Select which IDE to use when debugging and output related debug config tips   
      for the IDE. Options：'vscode'.                                                
      --debug-args string       Additional parameters that will be passed to the debugger.                    
      -d, --debug-port string   Specify the sandboxed container starting in debug mode, and exposing this     
      port on localhost.                                                            
      --debugger-path string    The path of the debugger on the host.                                         
      --tmp-dir string          The temp directory mounted to /tmp , default to                               
      './.s/tmp/invoke/serviceName/functionName/'
      
      Global Options
      
      -d, --debug string   Output debug informations.
      -h, --help string    Display help for command.
    
    Example
    
      Just setup.         $ s proxied setup                                   
      Setup with debug.   $ s proxied setup --config vscode --debug-port 3000

    ```
- invoke: 调用本地 FC 函数，可以通过`s proxied invoke -h`获取帮助文档
    ```
    Invoke

      Invoke local function. 
    
    Detail
    
      Invoke local function in the container.Need setup first
    
    Usage
    
      s proxied invoke <options>
    
    
    Options
    
      -e, --event string         Event data (strings) passed to the function during invocation (default:       
                                 "").Http function format refers to [https://github.com/devsapp/fc-remote-     
                                 invoke#特别说明]                                                                  
      -f, --event-file string    Event funtion: A file containing event data passed to the function during     
                                 invoke. Http function: A file containing http request options sent to https   
                                 strigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明] 
      -s, --event-stdin string   Read from standard input, to support script pipeline.Http function format     
                                 refers to [https://github.com/devsapp/fc-remote-invoke#特别说明] 
    
    Global Options
    
      -d, --debug string   Output debug informations.
      -h, --help string    Display help for command.
    
    Example
    
      Just invoke.         $ s proxied invoke                
      Invoke with event.   $ s proxied invoke --event string
    
    ```

- clean: 清理本次端云联调的辅助资源和相关环境，可以通过`s proxied cleanup -h`获取帮助文档
    ```
    Clean

      Clean the related resource and environment. 
    
    Detail
    
      Clean the helper resource and the local container.
    
    Usage
    
      s proxied cleanup <options>
    
    
    Global Options
    
      -d, --debug string   Output debug informations.
      -h, --help string    Display help for command.
    
    Example
    
      Just cleanup.   $ s proxied cleanup

    ```
    
# 简介与原理

![](https://img.alicdn.com/imgextra/i1/O1CN012jVmnP1mMZGWLZ1Wv_!!6000000004940-2-tps-1127-670.png)

如上图所示， S 工具会根据你的函数的 yml 文件配置, 创建一个辅助服务和函数，这个辅助服务和函数的配置跟您的服务和函数是相同的。

1.  调用这个辅助函数， 流量会打回到本地的调试实例， 这个时候本地实例接受到 event 和 context 是真实来自线上的
2.  本地调试的实例运行函数逻辑， 能直接利用辅助函数运行的那个容器， 可以直接访问 vpc 内网以及一些云服务的内网地址

比如我有s.yml 配置了 vpc， 同时函数代码大致如下：

```python
# -*- coding: utf-8 -*-
import logging
import os
import pymysql
import pymysql.cursors

def handler(event, context):
    print("\n***test fc internal endpoint***")
    os.system("curl --connect-timeout 3 1.cn-hangzhou-internal.fc.aliyuncs.com")

    print("\n***test oss internal endpoint***")
    os.system("curl --connect-timeout 3 oss-cn-hangzhou-internal.aliyuncs.com")

    print("\n***test db internal addr ***")
    test_mysql()

    return 'hello world'

def test_mysql():
    # rds 在 vpc 的内网地址
    connection = pymysql.connect(host='rm-xxxxxxx.mysql.rds.aliyuncs.com',
                                 user='userName',
                                 password='userPwd',
                                 db='testDB',
                                 port=3306,
                                 charset='utf8')
    try:
        with connection.cursor() as cursor:
            sql = "select * from users"
            cout = cursor.execute(sql)
            print("total： "+str(cout))

            for row in cursor.fetchall():
                print("ID: "+str(row[0])+'  Name： '+row[1])
            connection.commit()

    finally:
        connection.close()
```

在端云联调通道成功建立以后， 可以直接在本地完成对函数（无需代码修改， 比如使用rds 公网地址）调试。


# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行函数的端云联调。

## 简单使用

### 准备工作

首先，执行 `s proxied setup` 来准备端云联调所需的辅助资源以及本地环境。执行完成后会阻塞住：

```
$ s proxied setup
[2021-07-13T08:51:51.670] [INFO ] [S-CLI] - Start ...
✔ Session created, session id: S-d1564a76-9e6b-4da1-8ecc-8c1378c6a330.
[2021-07-13T08:51:53.399] [INFO ] [FC-PROXIED-INVOKE] - Deploying helper function...
[2021-07-13T08:51:54.263] [INFO ] [FC-DEPLOY] - Using region: cn-hangzhou
[2021-07-13T08:51:54.263] [INFO ] [FC-DEPLOY] - Using access alias: default
[2021-07-13T08:51:54.263] [INFO ] [FC-DEPLOY] - Using accessKeyID: ***********3743
[2021-07-13T08:51:54.263] [INFO ] [FC-DEPLOY] - Using accessKeySecret: ***********PeUX
[2021-07-13T08:51:54.565] [INFO ] [FC-DEPLOY] - Checking Service SESSION-S-d1564 exists
[2021-07-13T08:51:54.748] [INFO ] [FC-DEPLOY] - Checking Function python-event exists
[2021-07-13T08:51:54.770] [INFO ] [FC-DEPLOY] - Setting role: fcDeployDefaultRole-SESSION-S-d1564
[2021-07-13T08:51:55.254] [INFO ] [RAM] - Checking Role fcDeployDefaultRole-SESSION-S-d1564 exists
[2021-07-13T08:51:55.511] [INFO ] [RAM] - Creating role: fcDeployDefaultRole-SESSION-S-d1564
[2021-07-13T08:51:55.602] [INFO ] [RAM] - Checking Plicy AliyunContainerRegistryReadOnlyAccess exists
📎 Using fc deploy type: sdk, If you want to deploy with pulumi, you can [s cli fc-default set deploy-type pulumi] to switch.
[2021-07-13T08:51:56.868] [INFO ] [FC-DEPLOY] - Creating service: SESSION-S-d1564
[2021-07-13T08:51:56.868] [INFO ] [FC-DEPLOY] - Creating function: python-event
✔ Make service SESSION-S-d1564 success.
✔ Make function SESSION-S-d1564/python-event success.
[2021-07-13T08:51:57.340] [INFO ] [FC-DEPLOY] - Checking Service SESSION-S-d1564 exists
[2021-07-13T08:51:57.541] [INFO ] [FC-DEPLOY] - Checking Function python-event exists

There is auto config in the service: SESSION-S-d1564
✔ Helper function is set to 1 provison and 0 elasticity.
✔ Proxy container is running.
✔ Session established!
[2021-07-13T08:52:22.322] [INFO ] [FC-PROXIED-INVOKE] - Skip pulling image aliyunfc/runtime-python3.6:1.9.18...
End of method: proxied
FunctionCompute python3 runtime inited.
```

如果在当前的 yaml 中有多个项目，需要指定某个项目进行测试，例如`s <projectName> proxied setup`

### 本地调用

对于无触发器的普通事件函数或者 http 触发器函数，准备工作完成后，启动另一个新的终端，切换到该项目路径下，执行 `s proxied invoke` 来调用本地函数。

```
$ s proxied invoke
[2021-07-13T08:55:05.260] [INFO ] [S-CLI] - Start ...
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: bb720e13-e57a-4040-a920-82621e275ff1
Duration: 42.66 ms, Billed Duration: 43 ms, Memory Size: 512 MB, Max Memory Used: 40.85 MB
========= FC invoke Logs end =========

FC Invoke Result:
hello world
```

对于具有触发器的事件函数，首先需要确定事件类型，例如 oss 事件， cdn 事件等，然后去线上实际触发相应的事件，即可调用本地函数。

### 清理工作

上述调试完成后，执行 `s proxied cleanup` 清理端云联调所需的辅助资源以及本地环境。

```
$ s proxied cleanup
[2021-07-13T08:59:46.635] [INFO ] [S-CLI] - Start ...
✔ Stop container succeed.
✔ Unset helper function provision and on-demand config done.
[2021-07-13T08:59:49.599] [INFO ] [FC-DEPLOY] - Using region: cn-hangzhou
[2021-07-13T08:59:49.599] [INFO ] [FC-DEPLOY] - Using access alias: default
[2021-07-13T08:59:49.599] [INFO ] [FC-DEPLOY] - Using accessKeyID: ***********3743
[2021-07-13T08:59:49.599] [INFO ] [FC-DEPLOY] - Using accessKeySecret: ***********PeUX
[2021-07-13T08:59:49.942] [INFO ] [FC-DEPLOY] - Checking Service SESSION-S-d1564 exists
[2021-07-13T08:59:50.025] [INFO ] [FC-DEPLOY] - Service: SESSION-S-d1564 already exists online.
[2021-07-13T08:59:50.126] [INFO ] [FC-DEPLOY] - Checking Function python-event exists
[2021-07-13T08:59:50.165] [INFO ] [FC-DEPLOY] - Function: python-event already exists online.
📎 Using fc deploy type: sdk, If you want to deploy with pulumi, you can [s cli fc-default set deploy-type pulumi] to switch.
✔ Delete function SESSION-S-d1564/python-event success.
✔ Delete service SESSION-S-d1564 success.
✔ Delete done.
✔ Stop container succeed.
```

清理完成后 `s proxied setup` 阻塞住的进程也会随之退出。

## 断点调试

目前仅支持 vscode 以及 intellij 编辑器的断点调试。操作案例可以参考：

- [vscode 断点调试案例](../../examples/fc-proxied-invoke/python-event)
- [intelli 断点调试案例](../../examples/fc-proxied-invoke/java8-event)
