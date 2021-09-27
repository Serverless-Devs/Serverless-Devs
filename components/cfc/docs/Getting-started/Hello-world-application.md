# 部署一个Hello World函数

在完成[工具安装](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Install-tutorial.md)以及[密钥配置](https://github.com/devsapp/fc/blob/main/docs/Getting-started/Setting-up-credentials.md)后，我们可以尝试来部署一个简单的 Serverless 应用。

```shell
# 步骤一 初始化，并进入到项目中
$ s init xinwuyun/start-cfc
# 步骤二 进入项目部署应用
$ cd node-http
$ s deploy
```

可以看到以下输出

```
Function

  Description   测试函数                                                                    
  Region        bj                                                                      
  Timeout       3                                                                       
  Handler       index.handler                                                           
  Version       $LATEST                                                                 
  CodeSize      1485                                                                    
  FunctionBrn   xxxxxxxxxxxxxxxxxxxxx
  MemorySize    128                                                                     
  More          https://console.bce.baidu.com/cfc/#/cfc/function/info~name=TestTriggers 

Trigger

  RelationId   xxxxxxxxxxxxxxxxxxxxxxx
  Source       cfc-http-trigger/v1/CFCAPI                                                                                 
  Url          https://5zr6ptrzv4a33.cfc-execute.bj.baidubce.com/test                                                     
  More         https://console.bce.baidu.com/cfc/#/cfc/function/trigger~name=test                                         

Trigger data

  AuthType       anonymous 
  IsBinary       false     
  Method         GET       
  ResourcePath   /test 
```

访问输出信息中的trigger->url：https://5zr6ptrzv4a33.cfc-execute.bj.baidubce.com/test 

可以看到输出信息：

![image-20210815141221246](https://gitee.com/xinwuyun/myimage/raw/master/img/image-20210815141221246.png)

## 
