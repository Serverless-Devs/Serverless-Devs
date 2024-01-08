---
title: Component 命令
description: 'Component 命令'
position: 5
category: '命令'
---

# Component 命令

`component`命令是获取已经安装的组件详情信息。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)

## 命令解析

当我们执行`s component -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s component -h
Usage: s component [options]

Get details of installed components.
  
  Example:
    $ s component
    
📖  Document: https://serverless.help/t/s/component

Options:
  -h, --help                      Display help for command.
```

### 操作案例

可以执行`s component`获取所有已经安装的组件信息，例如：

```shell script
$ s component 

🔎 serverless registry [https://registry.serverless-devs.com] 
Component     Version           Size        Description 
fc            0.1.27            100 MB      阿里云函数计算基础组件 
devsapp/fc    0.1.27            100 MB      阿里云函数计算基础组件
fc api        0.0.44            100 MB      函数计算api操作组件
```
