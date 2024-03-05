---
title: Verify 命令
description: 'Verify 命令'
position: 13
category: '命令'
---

# Verify 命令

`verify`命令可以验证 Serverless Devs Yaml 文件内容（格式和数值）是否合法。

- [命令解析](#命令解析)
    - [功能原理](#功能原理)
    - [操作案例](#操作案例)
        - [无组件支持](#无组件支持)
        - [有组件支持](#有组件支持)

## 命令解析

执行`s verify -h`之后，可以进行相关帮助信息的查看：

```shell script
Usage: s verify [commands] [options]

Verify Yaml format and values.

📖  Document: https://serverless.help/t/s/verify

Options:
  -h, --help                      Display help for command
```

### 功能原理

`verify`命令的功能实现包含两个部分：

1. Serverless Devs 工具侧：对 Yaml 文件的格式，魔法变量，版本等进行基本校验。这部分功能与`preview`命令的功能雷同。
2. 组件侧：通过组件按照一定约定提供的方法，对 Yaml 文件中所有资源的属性值进行更加细致的真值校验，例如类型是否正确，取值是否存在于枚举项中等。

组件侧的约定方法和开发案例可见：[Serverless Devs 组件开发规范](https://manual.serverless-devs.com/dev-guide/component/)。

### 操作案例

#### 无组件支持

当 Yaml 文件中的组件不提供约定方法时，Serverless Devs 只会直接对 Yaml 文件（默认为当前目录下`s.yaml`文件，也可以通过`-t`指定其他文件和`--env`指定环境）进行基本校验，并提示 Yaml 文件中存在的错误。若没有错误，则提示如下：

```shell script
$ s verify
Verify [s.yaml] success!
```

若存在错误，则会报错。以下是一个魔法变量解析失败的例子：

```shell script
$ s verify -t s.yaml
 
Error Message:
anonymous:1:1
 >> 1| ${vars.region}

RuntimeError: ${vars.region} not found
```

#### 有组件支持

当 Yaml 文件中的组件提供约定方法时，Serverless Devs 不仅会做基本校验，还会对 Yaml 文件中的所有资源进行真值校验，并提示存在的错误。以下是一个使用[fc3](https://github.com/devsapp/fc3)组件提供的方法，进行资源属性检验，并且值类型错误的例子：

`s.yaml`部分内容如下：

```yaml
...
resources:
  demo:
    component: fc3
    props: # 组件的属性值
      ...
      memorySize: 128
      timeout: this is a string
...
```

其中可以看到，`timeout`属性的值为`this is a string`，但该属性的类型为`integer`，因此会报错。执行`s verify`命令，会提示如下：

```shell script
$ s verify
 
Error Message:
demo/props/timeout must be integer
```

除此之外，还可以检测枚举项。假如`s.yaml`为如下内容：

```yaml
...
resources:
  demo:
    component: fc3
    props: # 组件的属性值
      ...
      runtime: "nodejs4"
      ...
```

其中`runtime`属性的值为`nodejs4`，但该属性的枚举项并不包含该值，因此会报错并提示所有的枚举项。执行`s verify`命令，会提示如下：

```shell script
$ s verify
 
Error Message:
demo/props/runtime must be equal to one of the allowed values: custom, custom-container, custom.debian10, dotnetcore2.1, dotnetcore3.1, go1, java11, java8, nodejs10, nodejs12, nodejs14, nodejs16, php7.2, python2.7, python3, python3.10, python3.9
```