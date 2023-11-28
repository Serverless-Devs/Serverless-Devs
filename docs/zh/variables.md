---
title: Yaml 变量赋值
description: 'Serverless Devs描述文件（Yaml）中变量的使用与赋值'
position: 2
category: '使用文档'
---

# Yaml 变量赋值

- [概述](#概述)
- [使用案例](#使用案例)
  - [使用`${env('')}`获取环境变量](#使用env获取环境变量)
  - [使用`${file('')}`获取外部文档内容](#使用file获取外部文档内容)
  - [使用`${vars.*}`获取全局变量](#使用vars获取全局变量)
  - [使用`${json('')}`获取Json字符串内容](#使用json获取json字符串内容)
  - [使用`${path('')}`获取路径](#使用path获取路径)
  - [使用`${resources.project_name.props.*}`获取其他业务模块的变量](#使用resourcesproject_nameprops获取其他业务模块的变量)
  - [使用`${resources.project_name.output.*}`获取业务模块的结果变量](#使用resourcesproject_nameoutput获取业务模块的结果变量)
  - [使用`${config('')}`获取当前配置的config变量](#使用config获取当前配置的config变量)
  - [使用`${this.xx}`获取当前模块的信息](#使用thisxx获取当前模块的信息)

## 概述

Serverless Application模型对应的Yaml文件支持多种变量格式：

- 获取当前机器中的环境变量：${env('环境变量')}，例如 ${env('secretId')}, ${env('secretId', '默认值')}
- 获取外部文档的变量：${file('路径')}，例如 ${file('./path')}
- 获取全局变量：${vars.*}
- 获取Json字符串内容的变量：${json('json字符串')}，例如 ${json(file('./a.json'))}
- 获取路径的变量：${path('路径')}，例如 ${path('../')}
- 获取其他业务模块的变量：${resources.project_name.props.*}
- 获取业务模块的结果变量：${resources.project_name.output.*}
- 获取当前配置的config变量：${config('AccountID')}, 本质是获取 `s config get`中的变量值。
- 获取当前模块的信息：${this.xx}

## 使用案例

### 使用`${env('')}`获取环境变量

以下面的Yaml为例：

```yaml
resources:
  next_demo:
    component: v3test
    props: # 组件的属性值
      region: cn-hangzhou
      function:
        functionName: "next-start-hello"
        runtime: ${env('runtime', 'nodejs16')}
        code: ./code
```

在`next_demo`中，`${env('runtime')}`将尝试获取当前计算机中`runtime`环境变量的值，如果获取不到，将使用默认值`nodejs16`。

### 使用`${file('')}`获取外部文档内容

以下面的Yaml为例：

```yaml
resources:
  framework: 
    component: fc 
    actions:
      pre-deploy:
        - plugin: website-fc
    props:
      service: ${file('./file.txt')}
```

若此时`file.txt`的内容为：

```txt
this is file fun test
```

则解析后结果为：

```yaml
resources:
  framework: 
    component: fc 
    actions:
      pre-deploy:
        - plugin: website-fc
    props:
      service: this is file fun test
```

### 使用`${vars.*}`获取全局变量

以下面的Yaml为例：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 业务名称/模块名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: ${vars.region}
```

在`framework`中，`${vars.region}`将获取`vars`下的`region`参数，因此渲染结果为：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 业务名称/模块名称
    component: fc3 # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
```

### 使用`${json('')}`获取Json字符串内容

以下面的Yaml为例：

```yaml
resources:
  framework: # 业务名称/模块名称
    component: fc3test # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
      function:
        name: vuepress
        description: ${json(file("./a.json"))}
        runtime: nodejs12
```

若其中`a.json`的内容为：

```json
{
  "info": "this is a fun test"
}
```

则解析时，会将`a.json`中的内容加在`description`之下。渲染结果为：

```yaml
resources:
  framework: # 业务名称/模块名称
    component: fc3test # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
      function:
        name: vuepress
        description: 
          info: this is a fun test
        runtime: nodejs12
```

### 使用`${path('')}`获取路径

以下面的Yaml为例：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 业务名称/模块名称
    component: ${path('./fc.js')} # 组件名称
```

在`framework`中，`${path('./fc.js')}`将尝试获取`fc.js`文件的绝对路径。若路径为`/Users/XXX/XXX/fc.js`，则渲染结果为：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 业务名称/模块名称
    component: /Users/XXX/XXX/fc.js # 组件名称
```

### 使用`${resources.project_name.props.*}`获取其他业务模块的变量

以下面的Yaml为例：

```yaml
vars: # 全局变量
  service:
    name: website-wof2
    description: Serverless Devs Website Service
    internetAccess: true

resources:
  framework: # 业务名称/模块名称
    component: fc3test # 组件名称
    props: # 组件的属性值
      region: cn-hangzhou
      service: ${vars.service}
      function:
        name: vuepress
        description: Serverless Devs Website vuepress Function
        codeUri: ./code/docs/.vuepress/dist
        runtime: nodejs12
        environmentVariables:
          region: cn-hangzhou
          functionName: ${resources.next_function.props.function.name}
  next_function: 
    component: fc3test
    props:
      region: cn-hangzhou
      service: ${vars.service} # 应用整体的服务配置
      function:
        name: next-function-example
        description: Serverless Devs Website vuepress Function
        codeUri: ./next-code
        runtime: nodejs12
```

在`framework`中，`${resources.next_function.props.function.name}`会获取`next_function`中的`function`属性中的`name`值。因此，渲染结果为：

```yaml
vars: # 全局变量
  service:
    name: website-wof2
    description: Serverless Devs Website Service
    internetAccess: true

resources:
  framework: # 业务名称/模块名称
    component: fc3test # 组件名称
    props: # 组件的属性值
    ...
      functionName: next-function-example
    ...
```

### 使用`${resources.project_name.output.*}`获取业务模块的结果变量

以下面的Yaml为例：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website-wof2
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 业务名称/模块名称
    component: fc3test # 组件名称
    props: # 组件的属性值
      region: ${vars.region}
      service: ${vars.service}
      function:
        name: vuepress
        description: Serverless Devs Website vuepress Function
        codeUri: ./code/docs/.vuepress/dist
        timeout: 30
        memorySize: 512
        runtime: nodejs12
        environmentVariables:
          hello: ${resources.next_function.output.hello}
  next_function: # 第二个函数的案例，仅供参考
    component: fc3test
    props:
      region: ${vars.region}
      service: ${vars.service} # 应用整体的服务配置
      function:
        name: next-function-example
        description: Serverless Devs Website vuepress Function
```

在`framework`中，`${resources.next_function.output.hello}`会等待`next_function`运行完后，获取输出的`hello`值。若`next_function`的输出的`hello`值为`hello world`，则渲染结果为：

```yaml
vars: # 全局变量
  region: cn-hangzhou
  service:
    name: website-wof2
    description: Serverless Devs Website Service
    internetAccess: true
resources:
  framework: # 业务名称/模块名称
    component: fc3test
    props: # 组件的属性值
    ...
      hello: hello world
    ...
```

### 使用`${config('')}`获取当前配置的config变量

以下面的Yaml为例：

```yaml
props: # 组件的属性值
  region: cn-hangzhou
  function:
    ...
    environmentVariables:
      AccountID: ${config('AccountID')}
      ...
```

在`props`中，`${config('AccountID')}`将尝试获取在`s config`中配置的`AccountID`的值。若`AccountID`的值为`123456789012`，则渲染结果为：

```yaml
props: # 组件的属性值
  region: cn-hangzhou
  function:
   ...
    environmentVariables:
      AccountID: 123456789012

### 使用`${this.xx}`获取当前模块的信息

以下面的Yaml为例：

```yaml
edition: 3.0.0
name: NextProject
access: default-access

resources:
  nextjs_portal:
    component: component
    actions:
      pre-deploy:
        - run: s invoke ${this.props.url}
          path: ./backend_src
    props:
      code: ./frontend_src
      url: url
```

在`nextjs_portal`中:

- 使用`${this.name}`将解析为`nextjs_portal`
- 使用`${this.props.code}`将解析为 `./frontend_src`
- 使用`${this.access}`将解析为`default-access`
