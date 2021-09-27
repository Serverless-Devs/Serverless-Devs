# python-event

## Normal

### Setup

```bash
$ s proxied setup
```
支持解释型语言热更。

## Proxied Invoke

setup 执行完会阻塞住，此时打开一个新的终端，执行如下指令进行调用：

```bash
$ s proxied invoke
```

调用完成后会返回如下结果：

```bash
[2021-07-07T10:08:09.468] [INFO ] [S-CLI] - Start ...
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: 279f1ced-c5e8-4efb-8350-16faa1a33c1d
Duration: 21977.58 ms, Billed Duration: 21978 ms, Memory Size: 1024 MB, Max Memory Used: 66.52 MB
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

## Debugging

### Setup

```bash
$ s proxied setup --config vscode --debug-port 3000
```

命令执行完成后会在末尾出现如下调试配置部分：

```bash
///////////////// config begin /////////////////
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: fc/python-event/python-event",
            "type": "python",
            "request": "attach",
            "connect": {
                "host": "localhost",
                "port": 3000
            },
            "pathMappings": [
                {
                    "localRoot": "/Users/zqf/Documents/git_proj/devsapp/component/fc-proxied-invoke/example/python-event",
                    "remoteRoot": "/code"
                }
            ]
        }
    ]
}
///////////////// config end /////////////////
```

此时程序会阻塞住，若直接执行下一步 `Invoke`，进行的是正常模式的本地调用流程。若要进行断点调试，需要在首次调试时进行如下配置：

- vscode debug config

    1. 创建 launch.json 文件。
    ![img](https://img.alicdn.com/imgextra/i4/O1CN01XSXosD1y6KbSg3zBa_!!6000000006529-2-tps-474-293.png)
    2. 复制上述日志中 `config begin` 和 `config end` 之间的配置到 launch.json 中，此时在 DEBUG 视图中选中配置的函数列表。
    ![img](https://img.alicdn.com/imgextra/i3/O1CN01QpCZnE1RvHLBX4qb5_!!6000000002173-2-tps-3458-1550.png)
    3. 完成上述配置后，在 vscode 编辑器侧边栏为函数代码增加断点，点击"开始调试"按钮。
    ![img](https://img.alicdn.com/imgextra/i3/O1CN01jTQLGc1lPUA9Ww5NG_!!6000000004811-2-tps-3576-2218.png)

## Proxied Invoke

打开一个新的终端，执行如下指令进行调用：

```bash
$ s proxied invoke
```

上述指令执行完成后，回到 vscode 界面，函数就开始了断点调试。

![img](https://img.alicdn.com/imgextra/i4/O1CN01biJncZ1l3V9VNWOd8_!!6000000004763-2-tps-3542-2232.png)

调试完成后返回结果。

若要在调用的时候制定传入的 event 参数，可以使用 --event，详情请执行:

```bash
$ s cli /Users/zqf/Documents/git_proj/devsapp/component/fc-alibaba-component/ proxied invoke -h
```

## clean

清理辅助资源、session 以及本地调试容器。

```bash
$ s proxied clean
```
