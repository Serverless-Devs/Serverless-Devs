---
title: 命令操作文档
description: 'Serverless Devs 命令操作文档'
position: 1
category: '命令'
---

# 命令操作文档

- [前言](#前言)
- [全局参数](#全局参数)
- [命令详情](#命令详情)
    - [config: 密钥配置](./config.md)
    - [init: 项目初始化](./init.md)
    - [cli: 纯命令行模式](./cli.md)
    - [verify: 应用校验](./verify.md)
    - [edit: 应用编辑](./edit.md)
    - [clean: 工具清理](./clean.md)
    - [component: 组件信息](./component.md)
    - [set: 工具配置](./set.md)
    - [custom: 自定义命令](./custom.md)


## 前言

Serverless Devs 可以通过`-h`唤起对应命令的帮助文档，例如查看 `s` 命令的帮助信息可以是：`s -h`

```shell script
$ s -h
🚀  Welcome to the Serverless Devs.

Options
  --debug                     Open debug model.              
  --skip-actions              Skip the extends section.      
  -t, --template <path>       Specify the template file.     
  -a, --access <aliasName>    Specify the access alias name. 
  -v, --version               Output the version number.     
  -h, --help                  Display help for command.      

Commands
  config                      👤  Configure venders account.                
  init                        💞  Initializing a serverless project.        
  cli                         🐚  Command line operation without yaml mode. 
  verify                      🔎  Verify the application.                   
  set                         🔧  Settings for the tool.                    
  clean                       💥  Clean up the environment.                 
  component                   🔌  Installed component information.          


Examples
  init                        Perform [s init] fast experience Serverless Devs. 

🧭  More information: https://github.com/Serverless-Devs/Serverless-Devs
🚀  More applications: https://registry.serverless-devs.com
```

## 全局参数

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 | 备注 |
|-----|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | 指定资源描述文件 |  | 
| access | a | `yaml`中所指定的`access`信息/`default` | 指定本次部署时的密钥信息 | 可以使用通过[config命令](./command/config.md#config-add-命令)配置的密钥信息，以及[配置到环境变量的密钥信息](./command/config.md#通过环境变量配置密钥信息) | 
| skip-actions | - | - | 跳过`yaml`所设置的`actions`模块 | - | 
| debug | - | - | 开启`Debug`模式 | 开启`Debug`模式后可以查看到更多的工具执行过程信息 | 
| version | v | - | 查看版本信息 | - | 
| help | h | - | 查看帮助信息 | - | 

## 命令详情

- [config: 密钥配置](./config.md)
- [init: 项目初始化](./init.md)
- [cli: 纯命令行模式](./cli.md)
- [verify: 应用校验](./verify.md)
- [edit: 应用编辑](./edit.md)
- [clean: 工具清理](./clean.md)
- [set: 工具配置](./set.md)
- [component: 组件信息](./component.md)
- [custom: 自定义命令](./custom.md)