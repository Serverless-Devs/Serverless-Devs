# 命令行使用


## config指令




## cli指令

`cli`指令是去Yaml化的命令行模式，即可以通过命令行直接使用Serverless Devs的组件，而不需要依赖Yaml文件。

当我们执行`s cli -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s cli -h

Usage: s cli [component] [command] [options]

Directly use serverless devs to use components, develop and manage applications without yaml configuration

    Example:
        $ s cli fc list-service
        $ s cli fc list-function --service-name my-service
        $ s cli fc deploy -p "{/"function/": /"function-name/"}" --service-name my-service

Options:
  -p, --param [component-config]     Component props which in Yaml file
  -h, --help                         Display help for command
```

## exec指令

`exec`是执行组件的子命令的指令。

当我们执行`s exec -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s exec -h

Usage: s exec [service-name] [options] -- [component-sub-command] [options]

Run a component sub command on an app

    Example:
        $ s exec fc -t test.yaml -- log --tail
        $ s exec fc -- deploy

Options:
  -h, --help                         Display help for command
```

一般情况下该指令可以进行有效的简化，例如：`s exec fc -- deploy`可以简化为`s fc deploy`，但是当存在Serverless Devs开发者工具和组件某些参数冲突时则不能简化，例如`s exec fun -t test.yaml -- -t template.yaml`

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


