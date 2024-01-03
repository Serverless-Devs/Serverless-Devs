---
title: Preview 命令
description: 'Preview 命令'
position: 9
category: '命令'
---
# Preview 命令

`preview`命令可以预览 Serverless Devs Yaml 文件的渲染结果。

- [命令解析](#命令解析)
    - [参数解析](#参数解析)
    - [操作案例](#操作案例)

## 命令解析

执行`s preview -h`之后，可以进行相关帮助信息的查看：

```shell script
Usage: s preview [options]

Application preview.
  
  Example:
    $ s preview
    
📖  Document: https://serverless.help/t/s/preview

Options:
  --env <envName>                 Specify the environment name
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| env | - | 选填 | 指定执行环境 |

### 操作案例

通过执行`s preview`命令，可以查看资源描述 Yaml 文件的渲染结果。例如，若`s.yaml`的原文如下：

```yaml
edition: 3.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: framework #  项目名称
access: "default"

vars:
  region: cn-huhehaote

resources:
  next_demo:
    component: fc3
    props: # 组件的属性值
      region: ${vars.region}
      function:
        functionName: "next-start-hello"
        runtime: "nodejs16"
        code: ./code
        environmentVariables:
          name: ${this.name}
          code: ${this.props.function.code}
  demo:
    component: fc3
    props: # 组件的属性值
      region: ${vars.region}
      function:
        functionName: "start-hello"
        runtime: "nodejs16"
        code: ./code
```

则执行`s preview`的结果如下：

```yaml
edition:   3.0.0
name:      framework
access:    default
vars: 
  region: cn-huhehaote
resources: 
  next_demo: 
    component: fc3
    props: 
      region:   cn-huhehaote
      function: 
        functionName:         next-start-hello
        runtime:              nodejs16
        code:                 ./code
        environmentVariables: 
          name:      next_demo
          code:      ./code
  demo: 
    component: fc3
    props: 
      region:   cn-huhehaote
      function: 
        functionName: start-hello
        runtime:      nodejs16
        code:         ./code
```
