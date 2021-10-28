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



> 额外需要说明的是，虽然社区目前拥有Github Resitry， Gitee Registry， Serverless Registry等三个源，但是实际上这三个源也有着一定的逻辑关系：
> - Github Resitry：终极默认源，即无论用户配置了其他任何一个源，如果没有找到对应的内容，都会默认到该源进行查找；
> - Gitee Registry：针对中国用户，与Gitee合作的国内源；
> - Serverless Registry：Serverless Devs社区的默认源，也将作为被默认配置的源；
> 在Serverless Devs的开发者工具中，默认的加载逻辑：   
> ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635132866484_20211025033426634967.png)