# 别名操作：Alias

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
- [操作所需权限](../Others/authority/command.md#alias-指令)

------


阿里云函数计算（FC）组件为使用者提供了FC别名的操作能力。可以通过`alias`指令，进行操作。

您可以通过`alias -h`/`alias --help`参数，唤起帮助信息。例如执行`s alias -h`后，可以看到：

```
Alias

  service alias operation 

Usage

  $ s alias <sub-command> 

SubCommand

  get       Get alias details, you can get help through [s alias get -h]               
  list      View the list of service alias, you can get help through [s alias list -h] 
  publish   Publish service alias, you can get help through [s alias publish -h]
```

Alias命令为我们提供了一些子命令：

- list: 查看按量资源列表，可以通过`s alias list -h`获取帮助文档
    ```
    alias list

      View the list of service alias 

    Usage

      $ s alias list 

    Command List

      --region string         Specify the region parameter       
      --service-name string   Specify the service name parameter 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 
      --table         Table format output      

    Examples with Yaml

      $ s alias list         
      $ s exec -- alias list 

    Examples with CLI

      $ s cli fc alias list --region cn-hangzhou --service-name name 
    ```

- publish: 配置按量资源，可以通过`s alias publish -h`获取帮助文档
    ```
    alias publish

      Publish service alias 

    Usage

      $ s alias publish 

    Command List

      --region string             Specify the region parameter               
      --service-name string       Specify the service name parameter         
      --alias-name string         Specify the alias name parameter           
      --id,--version-id string            Specify the version id parameter           
      --description string        Specify the description parameter          
      --gversion string           Specify the grayscale version id parameter 
      --weight string             Specify the weight parameter               

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s alias publish --alias-name pre --version-id 2                             
      $ s exec -- alias publish --description xxx --alias-name pre --version-id 2 --gversion 3 --weight 20                                                      

    Examples with CLI

      $ s cli fc alias publish --region cn-hangzhou --service-name name --alias-name pre --version-id 2 
    ```
  
- get: 查看按量资源，可以通过`s alias get -h`获取帮助文档
    ```
    alias get

      Get alias details 

    Usage

      $ s alias get 

    Command List

      --region string         Specify the region parameter       
      --service-name string   Specify the service name parameter 
      --alias-name string     Specify the alias name parameter   

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s alias get --alias-name pre         
      $ s exec -- alias get --alias-name pre 

    Examples with CLI

      $ s cli fc alias get --region cn-hangzhou --service-name name --alias-name pre 
    ```


# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。

## 简单使用

查看别名列表
```
s alias list
```

- region、serviceName 必填
- table 参数选填，如果指定了 --table，那么则会以表格形式输出列表，但是组件最终返回为空；如果不指定 --table，那么组件将返回所有数据


发布或者修改别名
```
s alias publish --alias-name pre --version-id 2
```

- region、serviceName、aliasName、version 必填
- 灰度发布需要同时指定--gversion【灰度版本】和--weight【灰度权重】

查看别名配置
```
s alias get --alias-name pre
```

- region、serviceName、aliasName 必填

删除别名
> 更多参数可以执行 s remove alias -h 查看
```
s remove alias
```
- region、serviceName 必填
- 如果指定 --alias-name 则删除指定的别名，如果没有指定则删除服务下所有的别名