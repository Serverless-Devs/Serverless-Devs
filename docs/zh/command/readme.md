---
title: 命令操作文档
description: 'Serverless Devs 命令操作文档'
position: 2
category: '命令'
---

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
    - [registry: 模板管理](./registry.md)
    - [preview: 预览渲染结果](./preview.md)


## 前言

Serverless Devs 可以通过`-h`唤起对应命令的帮助文档，例如查看 `s` 命令的帮助信息可以是：`s -h`

```shell script
$ s -h
😃  Welcome to the Serverless Devs

Usage: s [options] [command]

Options:
  --debug                         Open debug model
  --skip-actions                  Skip the extends section
  -t, --template <path>           Specify the template file
  -a, --access <aliasName>        Specify the access alias name
  -o, --output <outputFormat>     Specify the output format (choices: "default", "json", "yaml", "raw")
  --output-file <outputFilePath>  Specify the output file path
  --env <envName>                 Specify the env name
  --no-verify                     Do not verify yaml
  --silent                        Silent mode
  -v, --version                   Output the version number
  -h, --help                      Display help for command

Commands:
  config                          👤  Configure vendors account
  env                             🌱  Environment operation
  set                             🔧  Settings for the tool
  registry                        🚢  Serverless registry platform
  preview [options]               👀  Preview Yaml render results
  component                       🔌  Installed component information
  clean [options]                 💥  Clean up the environment
  init [options]                  💞  Initializing a serverless project
  <custom>                        🧭  Custom Commands


🙌   Quick Start:      https://docs.serverless-devs.com/quick-start
🌟   Github Repo:      https://github.com/Serverless-Devs/Serverless-Devs
💡   Documentation:    https://docs.serverless-devs.com
🚀   Example Projects: https://registry.serverless-devs.com
📝   Feedback:         https://github.com/Serverless-Devs/Serverless-Devs/issues
```

## 全局参数

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 | 备注 |
|-----|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | 指定资源描述文件 |  | 
| access | a | `yaml`中所指定的`access`信息/`default` | 指定本次部署时的密钥信息 | 可以使用通过[config命令](./command/config.md#config-add-命令)配置的密钥信息，以及[配置到环境变量的密钥信息](./command/config.md#通过环境变量配置密钥信息) | 
| skip-actions | - | - | 跳过`yaml`所设置的`actions`模块 | - | 
| debug | - | - | 开启`Debug`模式 | 开启`Debug`模式后可以查看到更多的工具执行过程信息 | 
| output | o | `default` | 指定数据的输出格式 | 支持`default`, `json`, `yaml`, `raw`格式 | 
| version | v | - | 查看版本信息 | - | 
| help | h | - | 查看帮助信息 | - | 
| silent | - | - | 静默模式 | 将只输出组件运行结果 | 
| env | - | - | 指定环境 | 在多环境下使用 | 
| output-file | - | - | 指定输出文件路径 | - | 
| no-verify | - | - | 不校验`yaml`文件 | - | 

## 命令详情

- [config: 密钥配置](./config.md)
- [init: 项目初始化](./init.md)
- [cli: 纯命令行模式](./cli.md)
- [clean: 工具清理](./clean.md)
- [set: 工具配置](./set.md)
- [component: 组件信息](./component.md)
- [custom: 自定义命令](./custom.md)
- [registry: 模板管理](./registry.md)
- [preview: 预览渲染结果](./preview.md)