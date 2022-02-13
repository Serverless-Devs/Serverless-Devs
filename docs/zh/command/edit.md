---
title: Edit 命令
description: 'Edit 命令'
position: 6
category: '命令'
---
# Edit 命令

`edit`命令可以对Serverless应用编辑。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [注意事项](#注意事项)

## 命令解析

当执行`s edit -h`之后，可以进行相关帮助信息的查看：

```shell script
$ s edit -h
Usage: s edit

Application editing.

    Example:
        $ s edit
        
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/edit.md

Options:
  -t, --template [templatePath]  Specify the template file
  -h, --help                     Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 默认取值 | 参数含义 |
|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | 指定资源描述文件 |  | 

### 注意事项

在使用`s edit`命令之前，当前环境需要具备以下条件：
1. 当前项目下存在符合Serverless Devs规范的Yaml文件，可以通过`-t, --template [templatePath]`进行指定，默认是`s.yaml/s.yml`;
2. 由于该功能需要确保电脑安装了相关的浏览器，因为该功能是可视化的资源编辑能力，需要浏览器的支持；
