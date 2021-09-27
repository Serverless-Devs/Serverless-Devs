# 按量资源操作：OnDemand

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
- [操作所需权限](../Others/authority/command.md#onDemand-指令)


------


阿里云函数计算（FC）组件为使用者提供了FC按量资源资源的操作能力。可以通过`onDemand`指令，进行操作。

您可以通过`onDemand -h`/`onDemand --help`参数，唤起帮助信息。例如执行`s onDemand -h`后，可以看到：

```
OnDemand

  Resource OnDemand operation 

Usage

  $ s onDemand <sub-command> 

SubCommand

  list     View the list of resource on-demand, you can get help through [s onDemand list -h] 
  put      Put resource on-demand, you can get help through [s onDemand get -h]               
  get      Get resource on-demand, you can get help through [s onDemand get -h]

```

OnDemand命令为我们提供了一些子命令：

- list: 查看按量资源列表，可以通过`s onDemand list -h`获取帮助文档
    ```
    onDemand list

      View the list of onDemand 

    Usage

      $ s onDemand list 

    Command List

      --region string         Specify the region parameter       
      --service-name string   Specify the service name parameter 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 
      --table         Table format output      

    Examples with Yaml

      $ s onDemand list         
      $ s exec -- onDemand list 

    Examples with CLI

      $ s cli fc onDemand list --region cn-hangzhou --service-name name 
    
    ```
- put: 配置按量资源，可以通过`s onDemand put -h`获取帮助文档
    ```
    onDemand put

      Set reserved configuration 

    Usage

      $ s onDemand put 

    Command List

      --region string                          Specify the region parameter                                    
      --service-name string                    Specify the service name parameter                              
      --qualifier string                       Specify the qualifier parameter. Only supports LATEST and alias 
      --max, --maximum-instance-count number   Specify the maximumInstanceCount parameter                      

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s onDemand put --qualifier pre --max 1                    
      $ s onDemand put --qualifier pre --maximum-instance-count 1 
      $ s exec -- onDemand put --qualifier pre --max 1            

    Examples with CLI

      $ s cli fc onDemand put --region cn-hangzhou --service-name name              
      --function-name name --qualifier pre --max 1  
    ```
- get: 查看按量资源，可以通过`s onDemand get -h`获取帮助文档
    ```
    onDemand get

      Get onDemand configuration 

    Usage

      $ s onDemand get 

    Command List

      --region string          Specify the region parameter                                    
      --service-name string    Specify the service name parameter                              
      --qualifier string       Specify the qualifier parameter. Only supports LATEST and alias 
      --function-name string   Specify the function name parameter                             

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s onDemand get --qualifier pre         
      $ s exec -- onDemand get --qualifier pre 

    Examples with CLI

      $ s cli fc onDemand get --region cn-hangzhou --service-name name --function-name name --qualifier pre 
    ```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。

## 简单使用

配置按量资源
```
s onDemand put --qualifier pre --maximum-instance-count 1 
```

- region、serviceName、functionName、qualifier、maximumInstanceCount 必填

查看按量资源配置
```
s onDemand get --qualifier pre
```
- region、serviceName、functionName、qualifier 必填

查看按量资源列表
```
s onDemand list
```

- region、serviceName 必填
- 如果指定了 --table，那么则会以表格形式输出列表，但是组件最终返回为空；如果不指定 --table，那么组件将返回所有数据

删除按量资源
> 更多参数可执行 s remove onDemand -h 查看
```
s remove onDemand
s remove onDemand --qualifier xxx --function-name xxx 
```