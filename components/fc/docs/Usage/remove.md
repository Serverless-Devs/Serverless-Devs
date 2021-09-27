# 移除操作：Remove

- [快速使用](#快速使用)
    - s remove [交互设计](#交互设计)
    - [简单使用](#简单使用)
    - [高级使用](#高级使用)
- [其他替代方法](#其他替代方法)
- [操作所需权限](../Others/authority/command.md#deployremove-指令)

--------

阿里云函数计算（FC）组件为使用者提供了FC相关资源的移除能力。可以通过`remove`指令，快速进行移除操作。

您可以通过`remove -h`/`remove --help`参数，唤起帮助信息。例如执行`s remove -h`后，可以看到：

```
Remove

  The ability to delete resources.                                              
  If executing s remove is equivalent to s remove service                       

Usage

  $ s remove <sub-command> 

SubCommand List

  service     Ability to delete services, you can get help through [s remove service -h]    
  function    Ability to delete function, you can get help through [s remove function -h]   
  trigger     Ability to delete trigger, you can get help through [s remove trigger -h]     
  domain      Ability to delete domain, you can get help through [s remove domain -h]       
  version     Ability to delete version, you can get help through [s remove version -h]     
  alias       Ability to delete alias, you can get help through [s remove alias -h]         
  provision   Ability to delete provision, you can get help through [s remove provision -h] 
  onDemand    Ability to delete onDemand, you can get help through [s remove onDemand -h]   
  layer       Ability to delete layer, you can get help through [s remove layer -h]   
```

# 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行资源的移除。


## 交互设计

执行`s remove`等同于依次执行 s remove onDemand、s remove provision、s remove alias、s remove version、s remove trigger、s remove function 如果查询到相关资源则提示是否删除删除这些资源，然后尝试删除服务资源

如果传入参数 --use-local，那么仅删除传入的触发器、函数、服务配置；如果-y/--assume-yes那么就会**强制删除**服务下**所有的资源**，请谨慎使用此参数。

案例：假如在上海地区又一个服务，服务下有两个函数，yaml 中仅配置了服务和其中一个函数
- 如果执行了 s remove，则会提示此服务下两个函数，是否删除所有的函数
- 如果执行 s remove --use-local，那么仅仅会删除传入的函数和服务，不会list function
- 如果执行 s remove -y，会强制删除两个函数和服务

## 简单使用

**值得注意的是，资源一旦移除可能无法恢复，所以在使用移除功能时，请您慎重操作**

移除资源的前提是，您需要在本地有一个Serverless Devs的项目，即包括符合Serverless Devs规范的资源描述文档（例如`s.yaml`），同时该资源是已经部署在线上的。此时可以执行：

```
s remove service
```

- 重点1：如果当前的yaml中有多个project，在执行`s remove service`时，将会将这些资源全部删除；
- 重点2：如果当前的yaml中有多个project，您只想移除一个，您可以执行`s projectName remove service`

例如，当我们本地的yaml内容为：

```
# s.yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDeployApp       #  项目名称

vars:
  region: cn-hangzhou
  service: 
    name: fc-deploy-service
    description: 'demo for fc-deploy component'
    internetAccess: true

services:
  fc-deploy-test-function-a:
    component: devsapp/fc  # 组件名称
    props: #  组件的属性值
      region: ${vars.region}
      service: ${vars.service}
      function:
        name: http-trigger-function-a
        description: this is a test
        runtime: nodejs10
        codeUri: ./a
        handler: index.handler
        memorySize: 128
        timeout: 60
  fc-deploy-test-function-b:
      component: devsapp/fc  # 组件名称
      props: #  组件的属性值
      region: ${vars.region}
      service: ${vars.service}
        function:
          name: http-trigger-function-b
          description: this is a test
          runtime: nodejs10
          codeUri: ./b
          handler: index.handler
          memorySize: 128
          timeout: 60
```

此时，我要移除`http-trigger-function-b`，我可以执行：

```
s fc-deploy-test-function-b remove service
```

如果我执行

```
s remove service
```

则`http-trigger-function-a`和`http-trigger-function-b`均会被删除。

## 高级使用

在移除资源的时候，我们可以通过指定资源类型，进行部分指定类型资源的移除。

例如，移除domain，且名字为myDomian的资源，可以执行：

```
s remove domain --name myDomain
```

除此之外，还可以分别移除`trigger`、`function`、`service`等资源

# 其他替代方法

在使用过程中，虽然我们相信`remove`指令已经可以做很多事情了，但是我们仍然会给您备用的替代方案。您可以使用[fc-api](https://github.com/devsapp/fc-api) 中关于delete的方法进行更多原子能力的移除。

例如:
- deleteAlias ： 删除别名
- deleteCustomDomain ： 删除自定义域名
- deleteFunction ： 删除函数
- deleteFunctionAsyncConfig ： 删除函数异步配置
- deleteService ： 删除服务
- deleteTrigger ： 删除触发器
- deleteVersion ： 删除版本

具体方法可以使用`-h/--help`获取，例如获取`deleteTrigger`的帮助文档，可以执行`s cli fc-api deleteTrigger -h`:

```

Usage

  s cli fc-api deleteTrigger                                                    
  API Document: https://help.aliyun.com/document_detail/191157.html             

Options

  --region string         The region of fc endpoint. 
  --access string         Specify the key name.      
  --props string          The json string of props.  
  --serviceName string    The name of the service.   
  --functionName string   The name of the function.  
  --triggerName string    The name of the trigger.  
```

例如，我要删除`cn-hongkong`地区下的`MyService`服务下的`MyFunction`函数下的`MyTrigger`触发器：

```
 s cli fc-api deleteTrigger --region cn-hongkong --serviceName MyService --functionName MyFunction --triggerName MyTrigger
```

