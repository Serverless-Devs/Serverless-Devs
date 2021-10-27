## set指令

`set`指令是对工具进行相关配置的指令。

当我们执行`s set -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s set -h
Usage: s set [commands] [options]

You can make some default settings for the tool here.

Options:
  -h, --help  Display help for command

Commands:
  registry    👀 Set up a custom registry
```


### set registry 命令

配置源，通过`-h/--help`可以看到效果：

```shell script
$ s set registry -h

Usage: s set registry [options]

Upload your usage habits to help us improve our products

    Example:
        $ s set registry default
        $ s set registry https://registry.serverlessfans.cn/

Options:
  -h, --help  Display help for command
```


