# 移除操作：Remove

通过`remove`指令，可以移除相关函数或触发器资源。

**注意⚠️：资源一旦删除可能无法恢复，所以使用移除功能时，请谨慎操作**

## `s remove -h`/`s remove help`

```
Remove

  The ability to remove resources                                               
  If executing s remove is equivalent to s remove all                           

Usage

  $ s remove <sub-command> 

SubCommand List

  all        Remove all resources, you can get help through [s remove all -h]                
  function   Only remove function resources, you can get help through [s remove function -h] 
  trigger    Only remove trigger resources, you can get help through [s remove trigger -h]   
```

## `s remove`和`s remove all`

二者等同

移除资源前需要配置好`s.yaml`，同时对应资源已经在线上部署，执行

```shell
$ s remove
```

例如本地的`s.yaml`内容是：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test   #  项目名称

services:
  component-test: #  服务名称
    component: ../../lib  # 组件存放地址，可以换成对应组件名称
    # actions: # 自定义执行逻辑
    #   pre-deploy: # 在deploy之前运行
    #     - run: npm run doc  # 要运行的命令行
    #       path: ../ # 命令行运行的路径
    props:
      code:																	
        codeUri: ./
        publish: false											
        dryRun: false
      functionName: test										# 函数名，必须提供
      description: 测试函数									
      handler: index.handler 								
      endpoint: cfc.bj.baidubce.com				
      protocol: https												
      runtime: nodejs12											
      timeout: 30														
      memorySize: 128												
      environment:													
        additionalProp1: 环境变量1
        additionalProp2: 环境变量2
        additionalProp3: 环境变量3
      trigger:															# 触发器信息
        source: cfc-http-trigger/v1/CFCAPI	# 触发源类型，必须
        data:																# 触发器配置，不同触发器参数不同
          Enable: Enabled										# 是否启用，Enabled/Disabled
          ResourcePath: /test   						# 触发路径
          Method: GET												# 支持method
          AuthType: anonymous								# 身份验证类型，可选值为"anonymous"或"iam"
```

执行`s remove`后会删除函数名`test`对应函数，

> 需要注意的是，删除函数时函数对应的所有触发器均会被删除，如果想单独删除触发器，请执行`s remove trigger`

## `s remove function`和`s remove trigger `

分别表示删除函数和删除触发器，

**注意⚠️：删除函数同时会删除该函数下的所有触发器**