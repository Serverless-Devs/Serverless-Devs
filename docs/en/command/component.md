---
title: Component command
description: 'Component command'
position: 8
category: 'Commands'
---

# Component command

The `component` command is used to obtain the details of components that are installed.

- [Command description](#Command-description)
    - [Parameter description](#Parameter-description)
    - [Example](#Example)
- [Precautions](#Precautions)

## Command description

After you run the `s component -h` command, the following help information is returned：

```shell script
$ s component -h
Usage: s component [options]

Get details of installed components.
    
    Example:
        $ s component
        $ s component --component fc-api

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/component.md

Options:
  --component <componentName>     Gets the specified component information (like: fc, fc@0.0.1)
  -h, --help                      Display help for command
```

### Parameter description

| Parameter | Abbreviation | Required | Description | 
|-----|-----|-----|-----| 
| name | | No | You can obtain the specified component information, such as the component name or [Component name @Version number] |

### Example

If you want to obtain the information about a component, you can use the `--component` parameter. Example: 

```shell script
$ s component --component fc-api
Component: fc
Registry: serverless registry [http://registry.devsapp.cn/simple] 
Version: 0.1.27  
Size: 100 MB
Description: 阿里云函数计算基础组件
Path: ~/.s/components/fc
Hompage: https://github.com/devsapp/fc

🙋 Delete the component, please use the command [s clean --component fc@0.1.27]
```

If you want to obtain the information about all installed components, run the `s component` command. Example:
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


## Precautions
When you query a component, the system displays the information about the current registry and the default GitHub registry. If you need to view other registries, run the `s set registry` command to switch registries.
