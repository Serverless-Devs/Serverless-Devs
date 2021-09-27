# 预留操作：Provision

- [快速使用](#快速使用)
  - [简单使用](#简单使用)
  - [高级使用](#高级使用)
- [操作所需权限](../Others/authority/command.md#provision-指令)


------


阿里云函数计算（FC）组件为使用者提供了FC预留资源的操作能力。可以通过`provision`指令，进行操作。

您可以通过`provision -h`/`provision --help`参数，唤起帮助信息。例如执行`s provision -h`后，可以看到：

```
Provision

  Resource reservation operation 

Usage

  $ s provision <sub-command> 

SubCommand

  list   View the list of resource reservation, you can get help through [s provision list -h] 
  put    Put resource reservation, you can get help through [s provision put -h]               
  get    Get resource reservation, you can get help through [s provision get -h]
```
OnDemand命令为我们提供了一些子命令：
- list: 查看预留资源列表，可以通过`s provision list -h`获取帮助文档
    ```
    provision list

      View the list of provision 

    Usage

      $ s provision list 

    Command List

      --region string         Specify the region parameter                                    
      --service-name string   Specify the service name parameter                              
      --qualifier string      Specify the qualifier parameter. Only supports LATEST and alias 

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 
      --table         Table format output      

    Examples with Yaml

      $ s provision list         
      $ s exec -- provision list 

    Examples with CLI

      $ s cli fc provision list --region cn-hangzhou --service-name name 
    ```
- put: 配置预留资源，可以通过`s provision put -h`获取帮助文档
    ```
    provision put

      Set reserved configuration 

    Usage

      $ s provision put 

    Command List

      --region string         Specify the region parameter                                    
      --service-name string   Specify the service name parameter                              
      --qualifier string      Specify the qualifier parameter. Only supports LATEST and alias 
      --target number         Specify the provision target parameter                          
      --config string         Specify the configuration path parameter                        

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s provision put --target 1 --qualifier alias                
      $ s provision put --config ./provision.json --qualifier alias 
      $ s exec -- provision put --target 1 --qualifier alias        

    Examples with CLI

      $ s cli fc provision put --region cn-hangzhou --service-name name             
      --function-name name --qualifier alias --target 1                             
      $ s cli fc provision put --region cn-hangzhou --service-name name             
      --function-name name --qualifier alias --config ./provision.json    
    ```
- get: 查看预留资源，可以通过`s provision get -h`获取帮助文档
    ```
    provision get

      Get provision configuration 

    Usage

      $ s provision get 

    Command List

      --region string          Specify the region parameter                                    
      --service-name string    Specify the service name parameter                              
      --qualifier string       Specify the qualifier parameter. Only supports LATEST and alias 
      --function-name string   Specify the function name parameter                             

    Global Options

      -a, --access    Specify key alias        
      -h, --help      Display help for command 

    Examples with Yaml

      $ s provision get --qualifier alias         
      $ s exec -- provision get --qualifier alias 

    Examples with CLI

      $ s cli fc provision get --region cn-hangzhou --service-name name             
      --function-name name --qualifier alias
    ```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。

## 简单使用

配置预留
```
s provision put --target 1 --qualifier alias
```

- target 如果大于0，配置函数预留**预留资源会持续产生费用，如果不需要请您及时释放资源**；target 如果等于0，释放预留资源
- qualifier 仅支持服务的 LATEST 和别名

查看预留配置
```
s provision get --qualifier alias
```

查看预留列表
```
s provision list --table
```
- 如果指定了 --table，那么则会以表格形式输出列表，但是组件最终返回为空；如果不指定 --table，那么组件将返回所有数据

删除预留
> 更多参数可执行 s remove provision -h 查看
```
s remove provision
s remove provision --qualifier xxx --function-name xxx
```

## 高级使用

```
s fc provision put --qualifier alias --config ./provision.json --target 1
```

- 自动伸缩配置比较复杂，所以新增 --config 指定可以指定一个文件作为配置，文件内容示例如下【[参数参考文档](https://help.aliyun.com/document_detail/191172.html?#h2-url-4)】：

```
{
  "target": 2,
  "scheduledActions": [
    {"name":"timer","startTime":"2021-07-07T16:00:00.000Z","endTime":"2021-07-08T16:00:00.000Z","target":1,"scheduleExpression":"cron(0 0 12 * * *)"},
    {"name":"timer2","startTime":"2021-07-06T16:00:00.000Z","endTime":"2021-07-07T16:00:00.000Z","target":2,"scheduleExpression":"cron(0 0 12 * * *)"}
  ],
  "targetTrackingPolicies": [
    {"name":"zb","startTime":"2021-07-13T16:00:00.000Z","endTime":"2021-07-14T16:00:00.000Z","metricType":"ProvisionedConcurrencyUtilization","metricTarget":0.25,"minCapacity":1,"maxCapacity":3},
    {"name":"zb2","startTime":"2021-07-05T16:00:00.000Z","endTime":"2021-07-06T16:00:00.000Z","metricType":"ProvisionedConcurrencyUtilization","metricTarget":0.85,"minCapacity":4,"maxCapacity":5}
  ]
}
```
- --target参数的权重大于--config中的target，即如果config的配置文件中和参数指定同时存在target配置，优先使用参数中的target配置
