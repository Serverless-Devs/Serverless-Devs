# 本地调用操作：Local

- [快速使用](#快速使用)
    - [简单使用](#简单使用)
        - [HTTP触发器函数](#HTTP触发器函数)
        - [其他事件函数](#其他事件函数)
-------

阿里云函数计算（FC）组件为使用者提供了FC相关资源本地调用和测试能力。可以通过`local`指令，快速进行本地调用和测试操作。

您可以通过`local -h`/`local --help`参数，唤起帮助信息。例如执行`s local -h`后，可以看到：

```
Local

  Run your serverless application locally for quick development & testing.

Usage

  $ s local <sub-command> 

SubCommand:

  invoke   Local start fc event function, you can get help through [s local invoke -h]
  start    Local invoke fc http function, you can get help through [s local start -h]

```

Local命令为我们提供了两个子命令：
- invoke: 本地调试/测试事件函数，可以通过`s local invoke -h`获取帮助文档
    ```
    Local Invoke
    
      Local invoke fc event function 
    
    Usage for fc component

      $ s local invoke <options> 

    Usage for fc-local-invoke component

      $ s invoke <options>
    
    Options
    
      -e, --event <event>              Support Event data(strings) or a file containing event data passed to the     
                                       function during invocation.                                                   
      -f, --event-file <path>          A file containing event data passed to the function during invoke.            
      -s, --event-stdin                Read from standard input, to support script pipeline.                         
      -m, --mode <mode>                Invoke mode, including api, server and normal:                                
                                       - api: start api server for invokeFunction api invoking.                      
                                       - server: start server container for invoking function in the other terminal  
                                       repeatedly.                                                                   
                                       - normal: default mode, invoke event function and then close the container.   
      -c, --config ide/debugger        Select which IDE to use when debugging and output related debug config tips   
                                       for the IDE. Options：'vscode', 'pycharm'.                                     
      -d, --debug-port <port>          Specify the sandboxed container starting in debug mode, and exposing this     
                                       port on localhos.                                                             
      --debug-args <debugArgs>         Additional parameters that will be passed to the debugger                     
      --debugger-path <debuggerPath>   The path of the debugger on the host                                          
      --tmp-dir <tmpDir>               The temp directory mounted to /tmp , default to                               
                                       './.s/tmp/invoke/serviceName/functionName/'                                   
    
    Global Options
    
      -h, --help    Display help for command. 
    
    Examples with Yaml for fc component
    
      $ s local invoke [--debug-port 9000] [--config vscode]         
      $ s exec -- local invoke [--debug-port 9000] [--config vscode]

    Examples with Yaml for fc-local-invoke component

      $ s invoke [--debug-port 9000] [--config vscode]         
      $ s exec -- invoke [--debug-port 9000] [--config vscode]
    
    ```
- start: 本地调试/测试HTTP函数，可以通过`s local start -h`获取帮助文档
    ```
    Local Start
    
      Local invoke fc http function 
    
    Usage for fc component

      $ s local start <options> 

    Usage for fc-local-invoke component

      $ s start <options>
    
    Options
    
      -c, --config ide/debugger        Select which IDE to use when debugging and output related debug config tips   
                                       for the IDE. Options：'vscode', 'pycharm'.                                     
      -d, --debug-port <port>          Specify the sandboxed container starting in debug mode, and exposing this     
                                       port on localhos.                                                             
      --debug-args <debugArgs>         Additional parameters that will be passed to the debugger                     
      --debugger-path <debuggerPath>   The path of the debugger on the host                                          
      --tmp-dir <tmpDir>               The temp directory mounted to /tmp , default to                               
                                       './.s/tmp/invoke/serviceName/functionName/'                                   
    
    Global Options
    
      -h, --help    Display help for command. 
    
    Examples with Yaml for fc component

      $ s local start [--debug-port 9000] [--config vscode]         
      $ s exec -- local start [--debug-port 9000] [--config vscode] 

    Examples with Yaml for fc-local-invoke component

      $ s start [--debug-port 9000] [--config vscode]         
      $ s exec -- start [--debug-port 9000] [--config vscode]
    
    ```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行函数的本地调用。

## 简单使用

### HTTP触发器函数

如果是HTTP触发器函数，只需执行`s local start`即可进行测试：

```
[2021-06-07T18:51:46.531] [INFO ] [FC-LOCAL-INVOKE] - Trigger for start is:
name: httpTrigger
type: http
config:
  authType: anonymous
  methods:
    - GET

[2021-06-07T18:51:46.539] [INFO ] [FC-LOCAL-INVOKE] - HttpTrigger httpTrigger of fc-deploy-service/http-trigger-function was registered
	url: http://localhost:8000/2016-08-15/proxy/fc-deploy-service/http-trigger-function/
	methods: GET
	authType: anonymous
[2021-06-07T18:51:46.543] [INFO ] [S-CLI] - Project fc-deploy-test successfully to execute 
	
fc-deploy-test:
  status: succeed

function compute app listening on port 8000!
```

如果在当前的yaml中有多个项目，也可以指定某个项目进行测试，例如`s <projectName> local start`

### 其他事件函数

其他事件函数的测试，往往需要确定事件类型，例如oss的事件，cdn的事件......这些事件的格式，往往需要我们通过线上的帮助文档获取，此时我们可以通过[fc-event](https://github.com/devsapp/fc-event) 组件获取。

例如，我需要使用oss的事件，进行测试，此时我可以执行：

```
s cli fc-event oss
```

完成之后，可以看到系统会提醒我们相对应的路径等信息：

```
      OSS event template created successfully.
      
      👓 Event Template Path: event-template/oss-event.json
      
      You could user fc/fc-api component invoke method and specify the event.
      E.g: [s projectName invoke --event-file  event-template/oss-event.json]
      
      More information about OSS Trigger: 
        📝 https://help.aliyun.com/document_detail/74763.htm
```

此时，我们利用该路径的模板（可以额外进行修改），触发函数：

```
s local invoke --event-file  event-template/oss-event.json
```

