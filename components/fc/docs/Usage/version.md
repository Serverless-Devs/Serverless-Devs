# 版本操作：Version

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
- [操作所需权限](../Others/authority/command.md#version-指令)



------


阿里云函数计算（FC）组件为使用者提供了FC版本的操作能力。可以通过`version`指令，进行操作。

您可以通过`version -h`/`version --help`参数，唤起帮助信息。例如执行`s version -h`后，可以看到：

```
Version

  service version operation 

Usage

  $ s version <sub-command> 

SubCommand

  list      View the list of service versions, you can get help through [s version list -h] 
  publish   Publish service version, you can get help through [s version publish -h]
```
Version命令为我们提供了一些子命令：
- list: 查看按量资源列表，可以通过`s version list -h`获取帮助文档
    ```
    version list

      View the list of service versions 

    Usage

      $ s version list 

    Command List

      --region string         Specify the region parameter       
      --service-name string   Specify the service name parameter 

    Global Options

      -a, --access    Specify key version        
      -h, --help      Display help for command 
      --table         Table format output      

    Examples with Yaml

      $ s version list         
      $ s exec -- version list 

    Examples with CLI

      $ s cli fc version list --region cn-hangzhou --service-name name 
    ```
- publish: 配置按量资源，可以通过`s version publish -h`获取帮助文档
    ```
    version publish

      Publish service version 

    Usage

      $ s version publish 

    Command List

      --region string         Specify the region parameter       
      --service-name string   Specify the service name parameter 
      --description string    Specify the description parameter  

    Global Options

      -a, --access    Specify key version        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s version publish --description xxx         
      $ s exec -- version publish --description xxx 

    Examples with CLI

      $ s cli fc version publish --region cn-hangzhou --service-name name --description xxx 
    ```
# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。


## 简单使用

查看版本列表
```
s version list
```

- region、serviceName 必填
- table 参数选填，如果指定了 --table，那么则会以表格形式输出列表，但是组件最终返回为空；如果不指定 --table，那么组件将返回所有数据


发布版本
```
s version publish
```

- region、serviceName 必填，description 选填

删除版本
> 更多参数可以执行 s remove version -h 查看
```
s remove version
```
- region、serviceName 必填
- version 选填，如果指定 --version-id 删除当前服务指定的版本，如果没有指定则删除当前服务所有的版本
