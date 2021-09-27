# java8-event

## Normal

### Build

本地调试之前需要进行 build 操作。

```bash
$ s build --use-docker
```

### Setup

```bash
$ s proxied setup
```
目前不支持编译型语言热更。

## Proxied Invoke

setup 执行完会阻塞住，此时打开一个新的终端，执行如下指令进行调用：

```bash
$ s proxied invoke
```

调用完成后会返回如下结果：

```bash
[2021-07-07T10:52:46.196] [INFO ] [S-CLI] - Start ...
[2021-07-07T10:52:46.802] [INFO ] [FC-PROXIED-INVOKE] - Using build codeUri: /Users/zqf/Documents/git_proj/devsapp/component/fc-proxied-invoke/example/java8-event/.s/build/artifacts/fc-deploy-service/event-function
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: 3fb10f1e-eeba-4392-9e3a-4947f22841f5
Duration: 16.23 ms, Billed Duration: 17 ms, Memory Size: 1024 MB, Max Memory Used: 59.78 MB
========= FC invoke Logs end =========

FC Invoke Result:
hello world



End of method: invoke
```

## clean

清理辅助资源、session 以及本地调试容器。

```bash
$ s proxied clean
```

## Debugging with vscode

### Build

```bash
$ s build --use-docker
```

构建完成后后续步骤可以参考 [python-event](../python-event/README.md) 中的调试步骤。

注意，使用 vscode 调试 java 时，需要安装两个插件：Language Support for Java(TM) by Red Hat、Debugger for Java 。

利用 VSCode 的插件市场安装插件请参见此 [操作介绍](https://code.visualstudio.com/docs/languages/java?spm=a2c4g.11186623.2.16.69092a26ZukfQg)

## Debugging with intellij

### Build

```bash
$ s build --use-docker
```

### Setup 

```bash
$ s proxied setup --debug-port 3000
```

此时程序会阻塞住，若直接执行下一步 `Invoke`，进行的是正常模式的本地调用流程。若要进行断点调试，需要在首次调试时进行如下配置：

- IDEA remote debug config

    1. 在菜单栏选择 Run… > Edit Configurations 。
    ![img](https://img.alicdn.com/imgextra/i4/O1CN01CffYNv1UbX74nFI0d_!!6000000002536-2-tps-734-432.png)
    2. 新建一个 Remote Debugging 。
    ![img](https://img.alicdn.com/imgextra/i2/O1CN014nVPkX1voLpEUKiS9_!!6000000006219-2-tps-2216-1514.png)
    3. 自定义调试器名称，并将端口配置为 3000 。
    ![img](https://img.alicdn.com/imgextra/i2/O1CN014xCgf21lnl9h2QGTA_!!6000000004864-2-tps-2142-1620.png)
    4. 上述配置完成后，在 IDEA 编辑器侧边栏为函数代码增加断点，点击"开始调试"按钮。
    ![img](https://img.alicdn.com/imgextra/i1/O1CN01PPR4V61RM0qRiP16r_!!6000000002096-2-tps-3528-2166.png)
       
### Invoke

```bash
$ s proxied invoke
```

上述指令执行完成后，回到 IDEA 界面，函数就开始了断点调试。

![img](https://img.alicdn.com/imgextra/i2/O1CN01gZdC9B20nxYxFvLTr_!!6000000006895-2-tps-3566-2232.png)

## clean

清理辅助资源、session 以及本地调试容器。

```bash
$ s proxied clean
```
