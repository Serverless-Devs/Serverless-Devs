# 查看日志操作：Logs

> 使用场景：在使用阿里云函数计算工具时，可能涉及到查看线上日志的操作，此时可以通过`s logs`指令，在客户端进行日志查看，而无需登录到控制台进行日志查看。（当然，如果是极其复杂的情况下，可能还需要您登录到控制台查看）

- [快速使用](#快速使用)
    - [简单使用](#简单使用)
    - [高级使用](#高级使用)
        - [持续日志输出模式](#持续日志输出模式)
        - [查询指定时间的日志](#查询指定时间的日志)
        - [查询指定RequestId的日志](#查询指定RequestId的日志)
        - [只查询错误请求的日志信息](#只查询错误请求的日志信息)
- [操作所需权限](../Others/authority/command.md#logs-指令)

-------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的日志查询能力。可以通过`logs`指令，快速进行日志查询操作。

您可以通过`logs -h`/`logs --help`参数，唤起帮助信息。例如执行`s logs -h`后，可以看到：

```

Logs

  Query the function log. You need to open SLS log service.

Usage

  $ s logs <options> 

Options
    
  -t, --tail               Continuous log output mode                              
  -s, --start-time string   Query log start time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)                                  
  -e, --end-time string     Query log end time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)                                           
  -k, --keyword string     Keyword query                                         
  -r, --request-id string   Query according to requestId within the time interval 
  --type string            Log type query, value: failed     
  --region string           Specify region in cli mode               
  --service-name string     Specify service name in cli mode     
  --function-name string    Specify function name in cli mode                                

Global Options

  -a, --access        Specify key alias.   
  -h, --help          Display help for command.                                           

Examples with Yaml

  $ s logs
  $ s <ProjectName> logs -t
  $ s logs --start-time 2021-11-11T11:11:11+00:00 --end-time 2021-11-11T11:11:12+00:00
  $ s exec -- logs -s 1611823690000 -e 1611827290000

Examples with CLI 

  $ s cli fc logs --region cn-hangzhou --service-name myService --function-name myFunction -t

```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行日志的查询。

## 简单使用

如果您想要快速查看当前函数的日志，您可以直接使用`s logs`，此时会默认给您显示当前函数在过去20分钟的日志信息。

如果您当前目录下并没有`s.yaml`等相关Serverless devs的资源描述文件，您也可以通过`cli`模式直接查询，例如，当我们想要查询香港地区（cn-hongkong）的serviceTest服务下的functionTest函数日志，我可以直接执行：

```
s cli fc logs --region cn-hongkong --service-name serviceTest --function-name functionTest
```

## 高阶查询

### 持续日志输出模式

当我们在查询时，同时也在进行线上部分函数的调试，我们往往需要日志的持续输出，此时可以在执行查询日志功能时增加`-t`或者`--tail`参数：

```
s logs -t
```

同理，在纯cli模式下，也可以直接使用该参数：

```
s cli fc logs --region cn-hongkong --service-name serviceTest --function-name functionTest -t
```

### 查询指定时间的日志

在使用日志查询功能时，涉及到指定时间段内的日志查询，此时可以使用指定开始时间和结束时间功能：

```
-s, --start-time number   Query log start time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)                                  
-e, --end-time number     Query log end time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)  
```

无论是`start-time`还是`end-time`目前只支持两种输入：
- 时间戳，例如`1611827290000`
- 时间格式化，例如2021年6月1日12时整的UTC时间可以表示为：2020-08-30T15:09:23+00:00, CST（北京）时间可以表示为：2020-08-30T15:09:23+08:00，时间格式可以参考IOS标准时间格式

具体使用方法例如：

```
s logs --start-time 2021-11-11T11:11:11+00:00 --end-time 2021-11-11T11:11:12+00:00
```

### 查询指定RequestId的日志

当我们明确某个日志的RequestId之后，我们可以通过指定RequestId的方法进行日志查询：

```
s logs -r requestId
```

但是在某些特殊情况下，该方法可能无法正确查询出日志：
- 单实例多并发
- Custom Runtime和Custom Container

### 只查询错误请求的日志信息

在某些情况下，我们为了确定错误日志信息，我们可以通过`--type`参数，只查询错误请求，例如：

```
s logs --type failed
```
