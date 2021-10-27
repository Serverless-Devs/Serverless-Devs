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
