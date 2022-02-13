---
title: Verify 命令
description: 'Verify 命令'
position: 4
category: '命令'
---
# Verify 命令

`verify`命令可以对Serverless应用格式进行校验。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)

## 命令解析

当执行`s verify -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s verify -h
Usage: s verify

Application verification.

    Example:
        $ s verify
        
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/verify.md

Options:
  -t, --template [templatePath]  Specify the template file
  -h, --help                     Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 |
|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | 指定资源描述文件 |  | 

### 操作案例

可以通过`s verify`直接应用格式的校验：

```shell script
# 正确结果： 

 ✅  Format verification passed.

# 错误结果： 
 ❌ Format verification failed.
      key               Your Value Type                 Target Type             Description
     CodeUri               String                        Struct                    参数描述

# 输出魔法变量存在
 ✴️ Format validation unknown: 
     key               Your Value Type               Target Type           Description
     CodeUri             Unknown                       Struct                 参数描述

 ❓There may be dependencies between components, and you need to deploy them before you can determine the format.
```