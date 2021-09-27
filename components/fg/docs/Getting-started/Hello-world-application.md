# 部署一个Hello World函数

在完成[工具安装](./installconfig.md.md)以及[密钥配置](./config.md)后，我们可以尝试来部署一个简单的 Serverless 应用。

```shell
# 步骤一 初始化，并进入到项目中
$ s init xinwuyun/start-fg
# 步骤二 进入项目部署应用
$ cd node-http
$ s deploy
```

可以看到以下输出

```
Function

  func_urn        urn:fss:cn-north-4:0bcc05efb100f2a92f53c011f262dfa0:function:default:wzr-fg-test-2021-9-27-1:latest 
  func_name       wzr-fg-test-2021-9-27-1                                                                             
  domain_id       0bbeba4f1080f3560fe8c011e1ec4960                                                                    
  namespace       0bcc05efb100f2a92f53c011f262dfa0                                                                    
  project_name    cn-north-4                                                                                          
  package         default                                                                                             
  runtime         Node.js8.10                                                                                         
  timeout         30                                                                                                  
  handler         index.handler                                                                                       
  memory_size     128                                                                                                 
  cpu             300                                                                                                 
  code_type       zip                                                                                                 
  code_filename   wzr-fg-test-2021-9-27-1.zip                                                                         
  code_size       1227                                                                                                
  version         latest                                                                                              
  More            https://console.huaweicloud.com/functiongraph/#/serverless/dashboard                                

Trigger

  TriggerId         494f61ab-2db7-4b53-a28b-8b9aa9083fd3 
  TriggerTypeCode   TIMER                                
  TriggerStatus     DISABLED                             

Trigger event data

  name            Timeer-fbb8 
  schedule        3m          
  schedule_type   Rat
```