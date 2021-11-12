# 命令操作文档

- [前言](#前言)
- [全局参数](#全局参数)
- [命令详情](#命令详情)
    - [config: 密钥配置](./config.md)
    - [init: 项目初始化](./init.md)
    - [cli: 纯命令行模式](./cli.md)
    - [clean: 工具清理](./clean.md)
    - [component: 组件信息](./component.md)
    - [set: 工具配置](./set.md)
    - [custom: 自定义命令](./custom.md)

## 前言

Serverless Devs 可以通过`-h`唤起对应命令的帮助文档，例如查看 `s` 命令的帮助信息可以是：`s -h`

当使用者使用命令行工具时，可以通过`s`命令，查看整体帮助信息:

```shell script
$ s
Usage: s [options] [command]

  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \
/_________/\_____>__|    \_/  \_____>__|  |____/\_____>______>______>

Welcome to the Serverless Devs.

More: 
📘 Documents: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs
🙌 Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions
📦 Applications: https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/awesome.md

Quick start:
🍻 Can perform [s init] fast experience

Options:
  -t, --template [templatePath]  Specify the template file
  -a, --access [aliasName]       Specify the access alias name
  --skip-actions                 Skip the extends section
  --debug                        Open debug model
  -v, --version                  Output the version number
  -h, --help                     Display help for command

Commands:
  config                         👤 Configure venders account.
  init                           💞 Initializing a serverless project.
  cli                            🐚 Command line operation without yaml mode.
  set                            🔧 Settings for the tool.
  clean                          💥 Clean up the environment.
  component                      🔌 Installed component information.
```

## 全局参数

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 | 备注 |
|-----|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | 指定资源描述文件 | 可选`yaml`和`JSON`两种格式 | 
| access | a | `yaml`中所指定的`access`信息/`default` | 指定本次部署时的密钥信息 | 可以使用通过[config命令](./command/config.md#config-add-命令)配置的密钥信息，以及[配置到环境变量的密钥信息](./command/config.md#通过环境变量配置密钥信息) | 
| skip-actions | - | - | 跳过`yaml`所设置的`actions`模块 | - | 
| debug | - | - | 开启`Debug`模式 | 开启`Debug`模式后可以查看到更多的工具执行过程信息 | 
| version | v | - | 查看版本信息 | - | 
| help | h | - | 查看帮助信息 | - | 

## 命令详情

- [config: 密钥配置](./config.md)
- [init: 项目初始化](./init.md)
- [cli: 纯命令行模式](./cli.md)
- [clean: 工具清理](./clean.md)
- [set: 工具配置](./set.md)
- [component: 组件信息](./component.md)
- [custom: 自定义命令](./custom.md)