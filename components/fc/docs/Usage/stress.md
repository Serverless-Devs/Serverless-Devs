# 函数压测操作：Stress

- [简介与原理](#简介与原理)

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
    - [开始压测](#开始压测)
    - [清理工作](#清理工作)

-------

阿里云函数计算（FC）组件为使用者提供了对 event 函数以及匿名 http 函数发起压测的能力。可以通过`stress`指令，快速进行压测操作。

您可以通过`s cli stress -h`指令，唤起帮助信息：

```
Stress

  Stress test for the serverless application 

Usage

  s stress <sub-command>  
                          

SubCommand List

  start   Start stress test, you can get help through [s stress start -h]             
  clean   Clean the relevant resources , you can get help through [s stress clean -h]
```

Stress 命令为我们提供了两个子命令：
- start: 开始压测流程，可以通过`s cli stress start -h`获取帮助文档:
  ```
  Stress start
  
    Start stress test 
  
  Usage
  
    s stress start <options>  
                             
  
  Options
  
    --function-name string   Specify the alicloud fc function name                                         
    --function-type string   Type of the target function, including event and http                         
    --method string          Target method, only for --function-type http                                  
    --num-user number        Number of the simulated users                                                 
    --payload string         For --function-type event, represents the event passed to the function;       
                             For --function-type http, represents the request body passed to the function  
    --payload-file string    For --function-type event, contains the event passed to the function;         
                             For --function-type http, contains the request body passed to the function    
    -q, --qualifier string   Qualifier of the target function, only for --function-type event              
    --region string          Specify the region of alicloud                                                
    --run-time number        Intervals for stress                                                          
    --service-name string    Specify the alicloud fc service name                                          
    --spawn-rate number      Increasing number of users per second                                         
    -u, --url string         Target url, only for --function-type http                                     
  
  Global Options
  
    -a, --access string   Specify key alias         
    --debug string        Output debug informations 
    -h, --help string     Help for command.         
  
  Examples with Yaml
  
    $ s stress start --payload-file ./payload.file                                
    $ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl       
    --method POST --payload "hello world"                                         
  
  Examples with CLI
  
    $ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30            
    --function-type event --service-name myService --function-name myFunction     
    --qualifier myQualifier --payload "hello world" --region myRegion --access    
    myAccess                                                                      
    $ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30            
    --function-type http --url myUrl --method POST --payload "hello world"        
    --region myRegion --access myAccess
  ```

- clean: 清理压测的辅助资源和本地缓存文件，可以通过`s cli stress clean -h`获取帮助文档:
  ```
  Stress clean

    Clean the relevant resources 
  
  Usage
  
  s stress clean <options>
  
  
  Options
  
  -y, --assume-yes boolean   Assume that the answer to any question which would be asked is yes  
  --region string            Specify the region of alicloud
  
  Global Options
  
  -a, --access string   Specify key alias         
  --debug string        Output debug informations
  -h, --help string     Help for command.
  
  Examples with Yaml
  
  $ s stress clean -y
  
  Examples with CLI
  
  $ s cli fc stress clean --region myRegion --access myAccess -y
  ```

# 简介与原理

![](https://img.alicdn.com/imgextra/i1/O1CN017QO1In1lNearCqdo1_!!6000000004807-2-tps-669-460.png)

如上图所示，`stress start` 指令会根据 s.yml 文件配置，创建一个辅助函数，这个辅助函数的名称为 `_DEFAULT_FC_STRESS_COMPONENT_SERVICE`。

辅助函数创建完成后，会继续调用该函数，压测参数放置在调用负载中。

辅助函数被调用后就会基于 [Python Locust](https://docs.locust.io/en/stable/) 对目标函数发起压测试，并将压测结果返回给本地，本地收到结果后，会保存到 html 文件中用于可视化查看。

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行函数的压力测试。

## 简单使用

### 开始压测

压测指令是支持 [cli 模式](http://www.serverless-devs.com/docs/command#cli%E6%8C%87%E4%BB%A4) 使用的，该模式不依赖 s.yaml 也可以执行，针对 event 函数和匿名 http 函数的压测指令参考如下指令：

```
# event 函数
$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name myService --function-name myFunction --qualifier myQualifier --payload "hello world" --region myRegion --access myAccess

# http 函数
$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type http --url myUrl --method POST --payload "hello world" --region myRegion --access myAccess
```

以匿名 http 函数为例，执行压测指令后的输出如下所示：

```
$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type http --method GET  --url https://xxx.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/qianfeng-demo/http/ --region cn-shanghai --access quanxi
[2021-09-10T17:24:50.109] [INFO ] [FC-STRESS] - Reading payload content...
[2021-09-10T17:24:50.112] [INFO ] [FC-STRESS] - Using stress options: 
numUser: 6
spawnRate: 10
runningTime: 10
functionType: http

[2021-09-10T17:24:50.112] [INFO ] [FC-STRESS] - Preparing helper reource for stress test.
[2021-09-10T17:24:50.248] [INFO ] [RAM] - Checking Role DEFAULT-FC-STRESS-COMPONENT-ROLE exists
[2021-09-10T17:24:50.392] [INFO ] [RAM] - Updating role: DEFAULT-FC-STRESS-COMPONENT-ROLE
[2021-09-10T17:24:50.468] [INFO ] [RAM] - Checking Plicy AliyunFCInvocationAccess exists
✔ Stress test complete.
[2021-09-10T17:25:15.827] [INFO ] [FC-STRESS] - Displaying the result of stress test.
Html report flie: /Users/zqf/.s/cache/fc-stress/html/url#2021-09-10T17-25-15.html
Execute 'open /Users/zqf/.s/cache/fc-stress/html/url#2021-09-10T17-25-15.html' on macos for html report with browser.
Average: 17
Fails: 0
Failures/s: 0
Max: 154
Method: GET
Min: 6
Name: /2016-08-15/proxy/qianfeng-demo/http/
RPS: 330.9
Requests: 3306
p50: 15
p60: 16
p70: 18
p90: 23
p95: 29
p99: 82
```

返回的压测结果参数意义如下：

```
Average: 平均值，单位毫秒，所有请求的平均响应时间
Fails: 当前请求失败的数量
Failures/s: 每秒失败的请求数
Max: 请求最大服务响应时间，单位毫秒
Min: 请求最小服务响应时间，单位毫秒
Method: 请求类型
Name: 请求路径
RPS: 每秒请求数
Requests: 总的请求数量
p50: 50% 请求的响应时间小于 15 秒
```

上述指令生成的 html 文件路径为 `/Users/zqf/.s/cache/fc-stress/html/url#2021-09-10T17-25-15.html`，文件名中包含发起压测的时间，例如该文件表示时间为 2021/9/10 17:25:15，用浏览器打开这个文件后的显示内容如下所示：

![](https://img.alicdn.com/imgextra/i3/O1CN01o21rhP1EwZTAu96N2_!!6000000000416-2-tps-3909-4325.png)

### 清理工作[可选]

清理工作的主要是删除辅助函数以及本地 html 报告文件，其执行结果如下所示:

```
$ s cli fc stress clean --region cn-shanghai --access quanxi
[2021-09-10T18:02:10.157] [INFO ] [FC-STRESS] - Cleaning helper resource and local html report files...
? Are you sure to remove all the history html report files under /Users/zqf/.s/cache/fc-stress/html? Yes
End of method: stress
```

清理本地 html 报告文件时会有个交互，可以通过参数 `-y` 来屏蔽该交互。
