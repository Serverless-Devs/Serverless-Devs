---
title: Component 命令
description: 'Component 命令'
position: 8
category: '命令'
---

# Component 命令

`component`命令是获取已经安装的组件详情信息。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)
- [注意事项](#注意事项)

## 命令解析

当我们执行`s component -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s component -h
Usage: s component [options]

Get details of installed components.
    
    Example:
        $ s component
        $ s component --component fc-api

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/component.md

Options:
  --component [componentName]     Gets the specified component information (like: fc, fc@0.0.1)
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| name |  | 选填 | 获取指定的组件信息，可以是组件名，也可以是[组件名@版本号] |

### 操作案例

如果想要获取某个组件，可以通过`--component`参数与具体的组件名进行查询，例如：

```shell script
$ s component --component fc-api
Component: fc
Reigstry: serverless registry [http://registry.devsapp.cn/simple] 
Version: 0.1.27  
Size: 100 MB
Description: 阿里云函数计算基础组件
Path: ~/.s/components/fc
Hompage: https://github.com/devsapp/fc

🙋 Delete the component, please use the command [s clean --component fc@0.1.27]
```

如果想要获取所有已经安装的组件信息，可以直接执行`s component`获取，例如：

```shell script
$ s component 

🔎 serverless registry [http://registry.devsapp.cn/simple] 
Component     Description           Size        Version 
fc            阿里云函数计算基础组件    100 MB       0.1.27
devsapp/fc    阿里云函数计算基础组件    100 MB       0.1.27
fc-api        函数计算api操作组件      100 MB       0.0.44

🔎  github registry [https://api.github.com/repos]
Component     Description           Size        Version 
fc            阿里云函数计算基础组件    100 MB       0.1.27
devsapp/fc    阿里云函数计算基础组件    100 MB       0.1.27

```


## 注意事项

在查询组件时，系统只会显示当前 Registry 与默认的 Github Reigstry 信息。如果需要查看其他 Reigstry 的信息，需要先通过`s set registry`进行 Reigstry 的切换
