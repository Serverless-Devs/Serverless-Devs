# 远程调试操作：Remote

- [简介与原理](#简介与原理)
  - [基本原理](#基本原理)
  - [与端云联调的区别](#与端云联调的区别)
- [快速使用](#快速使用)
  - [断点调试](#断点调试)
  - [远程登陆](#远程登陆)
- [注意事项](#注意事项)

-------

阿里云函数计算（FC）组件为使用者提供了 FC 相关资源远程调试的能力。可以通过`remote`指令，快速进行远程调试操作。

您可以通过 `s remote -h`/`--help` 参数，唤起帮助信息。例如执行`s remote -h`后，可以看到：

```bash
Remote

  Remote invoke via proxied service. 

Detail

  Remote invoke with real net traffic via proxied service. 

SubCommand List

  setup     Setup the real remote service for debugging. 
  invoke    Invoke remote function.                      
  cleanup   Clean the related resource and environment.  

Usage

  s remote <SubCommand> <options>  
                                   

Global Options

  -a, --access string   Specify key alias         
  --debug string        Output debug informations 
  -h, --help string     Help for command.         

Example

  Help for setup.     $ s remote setup -h   
  Help for invoke.    $ s remote invoke -h  
  Help for cleanup.   $ s remote cleanup -h 
 
```

remote 命令为我们提供了三个子命令：

- setup: 构建远程服务以及相关资源，可以通过`s remote setup -h`获取帮助文档

    ```bash
    Setup
    
      Setup Operation. 
    
    Detail
    
      Setup for remote invoke via proxied service. 
    
    Usage
    
      s remote setup <options>  
                                
    
    Options
    
      -c, --config string       Select which IDE to use when debugging and output related debug config tips   
                                for the IDE. Options：'vscode, intellij'.                                       
      -d, --debug-port string   Specify the sandboxed container starting in debug mode, and exposing this     
                                port on localhost.                                                            
      --tmp-dir string          The temp directory mounted to /tmp , default to                               
                                './.s/tmp/invoke/serviceName/functionName/'                                   
    
    Global Options
    
      -a, --access string   Specify key alias         
      --debug string        Output debug informations 
      -h, --help string     Help for command.         
    
    Example
                               
      Setup with debug.   $ s remote setup --config vscode --debug-port 3000 
    
    ```

- invoke: 调用远程函数以启动调试，可以通过`s remote invoke -h`获取帮助文档

    ```bash
    Invoke
    
      Invoke remote function. 
    
    Detail
    
      Invoke remote function in the remote service. Need setup first 
    
    Usage
    
      s remote invoke <options>  
                                 
    
    Options
    
      -e, --event string         Event data (strings) passed to the function during invocation (default:       
                                 "").Http function format refers to [https://github.com/devsapp/fc-remote-     
                                 invoke#特别说明]                                                                  
      -f, --event-file string    Event funtion: A file containing event data passed to the function during     
                                 invoke. Http function: A file containing http request options sent to https   
                                 strigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明] 
      -s, --event-stdin string   Read from standard input, to support script pipeline.Http function format     
                                 refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]                  
    
    Global Options
    
      -a, --access string   Specify key alias         
      --debug string        Output debug informations 
      -h, --help string     Help for command.         
    
    Example
    
      Just invoke.         $ s remote invoke                
      Invoke with event.   $ s remote invoke --event string 
    
    ```

- cleanup: 清理本次远程调试的辅助资源和相关环境，可以通过`s remote cleanup -h`获取帮助文档

    ```bash
    Cleanup
    
      Clean the related resource and environment. 
    
    Detail
    
      Clean the helper resource and the tunnel container. 
    
    Usage
    
      s remote cleanup <options>  
                                  
    
    Global Options
    
      -a, --access string   Specify key alias         
      --debug string        Output debug informations 
      -h, --help string     Help for command.         
    
    Example
    
      Just cleanup.   $ s remote cleanup 
    
    ```

## 简介与原理

### 基本原理

![远程调试原理](https://img.alicdn.com/imgextra/i1/O1CN014tTtzF1K4sjIU4CoM_!!6000000001111-2-tps-1219-590.png)

与 [端云联调](https://github.com/devsapp/fc/blob/main/docs/Usage/proxied.md) 类似，远程调试致力于解决用户调试过程中**本地流量与真实线上流量不一致**的问题。

在远程调试中，用户通过 `setup` 指令搭建本地与远程的容器通道，并在远程新建一个与本地配置完全相同的函数。之后，通过通道服务，用户可以直接获取线上的 VPC 内网资源，比如 NAS，OSS 等等。用户还可以通过容器直接进入远程的函数计算环境，进行更加细致地调试。

使用远程调试组件启动单步调试，用户只需在 `remote setup` 后，启动 IDE 的调试模式（当前仅支持 vscode，intellij）。使用 `remote invoke` 启动函数，此时即可发现程序运行到断点处。

### 与端云联调的区别

- 端云联调：本地除了一个通道服务容器，仍有一个函数计算容器，用来执行本地函数，远程的辅助函数只是单纯将远程流量发送到本地。
- 远程调试：本地只有一个通道服务容器，执行过程全部依赖于线上，远程函数将执行结果返回。

## 快速使用

当我们下载好[Serverless Devs开发者工具](../Getting-started/Install-tutorial.md), 并完成[阿里云密钥配置](../Getting-started/Setting-up-credentials.md)之后，我们可以根据自身的需求进行函数的端云联调。

目前，远程调试组件支持 **断点调试** 与 **远程登录** 两个功能。

**目前，断点调试 IDE 仅支持 vscode 与 intellij, runtime 仅支持 NodeJS, Java, Python**

### 断点调试

以 vscode 为例，进行 python 代码的单步调试。

启动调试 session，组件自动产生调试配置后，终端阻塞：

```bash
s remote setup --config vscode --debug-port 3000
```

![](https://img.alicdn.com/imgextra/i4/O1CN016i1z4c24D6A6X7tEc_!!6000000007356-2-tps-1866-1080.png)

开启 vscode 下的调试模式，设立对应断点。并新建另一终端，运行以下命令启动调试：

```bash
s remote invoke
```

此时可以看到程序运行并停留在断点处。

![](https://img.alicdn.com/imgextra/i2/O1CN01M5Gwa91TqMKO9PnIM_!!6000000002433-2-tps-1866-1080.png)

最后，在调试结束后，进行远程调试资源的清除：

```bash
s remote cleanup
```

### 远程登陆

远程调试提供了登陆功能。在代理容器创建后，可以通过代理容器远程函数计算实例的登陆。

详细步骤如下：

1. 查看当前代理容器的ID，镜像为 `ts-online-local`

   ```bash
   docker ps
   ```

2. 进入代理容器

   ```bash
   docker exec -it ${CONTAINER_ID} bash
   ```

3. 登陆远程计算实例

   ```bash
   ssh root@${IP} -p ${PORT}
   ```

![通过代理容器远程登陆](https://img.alicdn.com/imgextra/i1/O1CN01oEN0F91LACx5qm70z_!!6000000001258-2-tps-1838-570.png)

## 注意事项

**1. `setup` 之后记得及时 `cleanup`，以免因远程函数预留造成不必要的计费。**

**2. 建议在配置文件中，将被调试函数的 `timeout` 属性调高（比如900），避免因函数调用超时引发调试中断。**

