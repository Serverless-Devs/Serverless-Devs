---
title: 描述文件（Yaml）规范
description: 'Serverless Devs描述文件（Yaml）规范'
position: 1
category: '使用文档'
---

# 描述文件（Yaml）规范

> 当前文档遵循 [Serverless User Model](../../spec/zh/0.0.2/serverless_user_model/readme.md) 和相关规范。

- [描述文件简介](#描述文件简介)
- [描述文件格式/规范](#描述文件格式规范)
- [元数据](#元数据)
- [变量赋值](#变量赋值)
- [特殊变量](#特殊变量)
- [服务顺序](#执行顺序)
- [行为描述](#行为描述)

## 描述文件简介

在非`cli`模式下，进行应用的操作、组件的使用，需要按照 Serverless Devs 的规范，提供相对应的资源/行为描述文件，且该文件还需要符合以下条件：

- 拓展名可以是`.yaml`或`.yml`
- 格式必须符合[Yaml规范](https://yaml.org/spec/1.2.2/)

> 👉 对于需要通过描述文件进行环境隔离的项目，建议将文件命名为 `s-${ENV}.yaml` 或 `s-${ENV}.yml` 格式。 例如：`s-prod.yaml`。

在默认情况下，Serverless Devs 开发者工具会默认该描述文件的名称为`s.yaml`或`s.yml`，且`s.yaml`的优先级大于`s.yml`， 即在一个 Serverless 应用下，同时出现`s.yaml`与`s.yml`时，系统会优先识别和使用`s.yaml`。

当然，开发者也可以通过`-t, --template  [templatePath]`进行指定，例如，在某应用在生产环境下的描述文件名为`s-prod.yml`，则可以在执行相关命令时，增加参数`-t s-prod.yml`或者`--template s-prod.yml`。

## 描述文件格式/规范

关于 Serverless Devs 所支持的资源/行为描述文件基本格式为：

```yaml
edition: 3.0.0 # 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: hello-world-app # 项目名称
access: default # 秘钥别名

vars: # [全局变量，提供给各个项目使用]
  Key: Value

actions: globalActions # 自定义全局的执行逻辑

resources: # 可以包括多个业务模块
  ProjectName: # 业务模块
    actions: projectActions # 自定义执行逻辑
    component: componentName # 组件名称
    props: componentProps # 组件的属性值
```

例如，一个相对完整的 Yaml 案例可以是：

```yaml
edition: 3.0.0 # 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: hello-world-app # 项目名称
access: default # 秘钥别名

vars: # [全局变量，提供给各个业务模块使用]
  logo: https://image.aliyun.com/xxxx.png

actions: # 自定义全局的执行逻辑
  pre-deploy: # 项目deploy执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-deploy: # 项目deploy执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      allow_failure: true # true/false 允许失败条件
      args: # 插件的参数
        key: value 
  fail-deploy: # 项目deploy执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      allow_failure: # 允许失败条件
        command: # 允许失败的执行command
          - deploy
        exit_code: # 允许失败的退出码
          - 100
          - 101
      args: # 插件的参数
        key: value 
  complete-deploy: # 项目deploy执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 

resources:
  nextjs_portal: #  项目名称
    component: fc3  # 组件名称
    actions: # 自定义执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: npm install  # 要运行的命令行
          path: ./nextjs_portal # 命令行运行的路径
      success-deploy: # 在deploy之后运行
        - component: fc3 invoke  # 要运行的组件，格式为【component: 组件名 命令 参数】
          allow_failure: true # true/false 允许失败条件
    props: #  组件的属性值
      region: ${vars.region}
      functionName: nextjs_portal
      runtime: nodejs14
      code: ./nextjs_portal
      handler: index.handler
      memorySize: 128
      timeout: 30

  assets:
    component: static
    props:
      cache-control: "public, max-age=604800, immutable"
      www: "./public"

  express_blog:
    component: express
    props:
      app: ./express-blog
      url: ${vars.domain}
    actions:
      pre-deploy:
        - run: npm run build
          path: ./express-blog

  gateway:
    component: serverless-gateway # 路由组件：HTTP URL和服务之间的映射规则
    props:
      routes:
        - route: /~assets
          value: ${resources.assets.output.url}
        - route: /
          value: ${resources.nextjs_portal.output.url}
          index: index.html
        - route: /~portal
          value: ${resources.nextjs_portal.output.url}
          inex: index.html
        - route: /~blog
          value: ${resources.express_blog.output.url}
```

## 元数据

在该格式中：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| edition  | 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范 | 
| name  | 项目名称 | 
| access  | 秘钥别名，可以使用通过[config命令](./command/config.md#config-add-命令)配置的密钥信息，以及[配置到环境变量的密钥信息](./command/config.md#通过环境变量配置密钥信息) |
| extend  | 所继承的模板 |
| template  | 可被继承的模板 |
| [flow](./flow.md)  | 操作顺序 |
| vars  | 全局变量，提供给各个业务模块使用，是一个Key-Value的形式 |
| actions  | 自定义全局的执行逻辑 |
| resources  | 项目所包含的业务模块，是一个Key-Value的形式 |

### template
关于 template 参数：
可被继承的模板，主要为key-object形式，例如；
```yaml
template: 
  template1: 
    region: cn-hangzhou
    runtime: python3
    vpcConfig: vpc-1
  template2: 
    region: cn-beijing
    runtime: nodejs14
    vpcConfig: vpc-2
```

此时在 resource 中即成当前模板，可以进行重写操作，例如：
```yaml
resources:
  resource1:
    component: fc       # 组件名称
    extend: 
      name: template1   # 继承template中的指定key对应的结构，与props内容进行合并
      ignore:           # 忽略的属性
         - vpcConfig
    props:
      region: cn-shanghai
      vcpu: 1
      memorySize: 128
  resource2:
    component: fc        # 组件名称
    extend: 
      name: template1    # 继承template中的指定key对应的结构，与props内容进行合并
    props:
      region: cn-hongkong
      vcpu: 1
      memorySize: 128
  resource3:
    component: fc        # 组件名称
    extend: 
       name: template2   # 继承template中的指定key对应的结构，与props内容进行合并
  resource4:
    component: fc        # 组件名称
    props:
      region: cn-hongkong
      vcpu: 1
      memorySize: 128
```
完成渲染后，该部分的结果：
- resource1：继承了template1，同时删除了vpcConfig参数，在template1基础上配置了region、vcpu以及memorySize；
- resource2：继承了template1，在template1基础上配置了region、vcpu以及memorySize；
- resource3：继承了template2；
- Resource4：没有做任何继承，配置了region、vcpu以及memorySize；

渲染结果：
```yaml
resources:
  resource1:
    component: fc # 组件名称
    props:
      region: cn-shanghai
      runtime: python3
      vcpu: 1
      memorySize: 128
  resource2:
    component: fc # 组件名称
    props:
      region: cn-hongkong
      runtime: python3
      vpcConfig: vpc-1
      vcpu: 1
      memorySize: 128
  resource3:
    component: fc # 组件名称
    props:
      region: cn-hongkong
      vcpu: 1
      memorySize: 128
  resource4:
    component: fc # 组件名称
    props:
      region: cn-hongkong
      vcpu: 1
      memorySize: 128
```
### resources
关于resources中Value参数：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| component  | 组件名称 | 
| extend  | 所继承的模板 | 
| actions  | 自定义执行逻辑 |
| props  | 组件的属性值 |

## 变量赋值

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

详细信息可查看[Yaml 变量赋值](./variables.md)


## 特殊变量
在Serverless-Devs中有些特殊变量有特定的用途，开发者没有特殊的需求，避免使用特殊变量
- `${aliyun-cli}`
 作用在`access`的值中，从获取[aliyun cli](https://github.com/aliyun/aliyun-cli)的默认的`profile`，并且生效。

 > 执行`aliyun configure list`可以查看当前生效的`profile`

## 执行顺序

如果一个Serverless Project 模型对应的 Yaml 文件中有过多的服务，系统会默认分析部署顺序，该部署顺序分为两个方面：
- 是否已经制定flow流程
  - 按照指定的流程进行部署，没在流程中的不进行额外的操作·
- 没有指定flow流程
  - 分析项目中的依赖关系
  - 有依赖关系的按照依赖关系从前到后部署，无依赖关系的按Yaml配置的从上到下部署

## 行为描述

### 全局Action

全局Action的基本格式是：

```yaml
actions: # 自定义全局的执行逻辑
  pre-命令: # 项目在命令执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-命令: # 项目在命令执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  fail-命令: # 项目在命令执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-命令: # 项目在命令执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
```

例如：

```yaml
actions: # 自定义全局的执行逻辑
  pre-deploy: # 项目deploy执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-deploy: # 项目deploy执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  fail-deploy: # 项目deploy执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-deploy: # 项目deploy执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
```

当Serverless Devs开发者工具执行相关的命令时，项目执行相关的命令之前，会执行全局的`pre-命令`操作，项目执行成功之后，会执行全局的`success-命令`操作，项目执行失败之后，会执行全局的`fail-命令`操作, 项目执行完成之后，会执行全局的`complete-命令`操作。

以下面的Yaml为例：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: default       #  秘钥别名

actions: # 自定义全局的执行逻辑
  pre-deploy: # 项目deploy执行之前执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
  success-deploy: # 项目deploy执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  fail-deploy: # 项目deploy执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-deploy: # 项目deploy执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 

resources:
  nextjs_portal: #  业务模块
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
```

当开发者在当前应用下执行了`deploy`命令，系统将会按照以下顺序进行操作：
1. 执行全局的`pre-deploy`命令：在`./src`目录下执行`npm install`
2. 调用组件`vue-component`的`deploy`方法，并将`props`和项目的基本信息传入到组件`vue-component`的`deploy`方法中
3. 如果第`2`步骤执行成功则执行全局的`success-deploy`操作，执行失败则执行全局的`fail-deploy`操作，不管成功还是失败，只要执行完成后一定执行全局的`complete-deploy`操作。


关于`actions`中的`run`，`plugin`的定位和区别：
- `run`，需要指定执行目录，仅仅是一个`hook`的能力，可以认为就是单纯的执行命令（即调用系统的命令）；
- `plugin`，是一种轻量化的插件，每个插件通常情况下只会支持一个能力；

> 注意：全局Action中仅支持`run`和`plugin`。

#### 局部Action

在Serverless Application模型对应的Yaml文件中，可以针对业务模块提供对应的行为操作，其基本格式是：

```yaml
actions: # 自定义执行逻辑
  pre-命令: # 在命令之前运行
    - run: command  # 要运行的操作
      path: ./path # 运行操作的路径
    - component: pgo  # 要运行的组件，格式为【component: 组件名 命令 参数】
    - plugin: website-fc  # 要使用的插件
      args: # 插件的参数
        key: value 
  success-命令: # 在命令执行成功之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
    - component: pgo  # 要运行的组件，格式为【component: 组件名 命令 参数】
  fail-deploy: # 在命令执行失败之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
  complete-deploy: # 在命令执行完成之后执行
    - plugin: dingding-robot # 要使用的插件
      args: # 插件的参数
        key: value 
```

例如：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: default       #  秘钥别名
resources:
  nextjs_portal: #  业务模块
    actions: # 自定义全局的执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: npm install  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
        - component: fc build --use-docker  # 要运行的命令行
      success-deploy: # 在deploy成功之后运行
        - plugin: fc-warm
          args:
            corn: '********'
      fail-deploy: # 在deploy执行失败之后执行
        - plugin: dingding-robot # 要使用的插件
          args: # 插件的参数
            key: value 
      complete-deploy: # 在deploy执行完成之后执行
        - plugin: dingding-robot # 要使用的插件
          args: # 插件的参数
            key: value 
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
```

当开发者在当前应用下执行了`deploy`命令，系统将会按照以下顺序进行操作：
1. 在`./backend_src`目录下执行`npm install`
2. 在对项目`nextjs_portal`，使用`fc`组件的`build`方法，入参为`--use-docker`(即在`docker`环境下，对项目`nextjs_portal`进行构建)
3. 调用组件`vue-component`的`deploy`方法，并将`props`和项目的基本信息传入到组件`vue-component`的`deploy`方法中
4. 如果第`3`步骤执行成功则执行`success-deploy`操作，将部署的输出结果等信息，传递给插件`fc-warm`，并将`{"corn": "********"}`作为参数传入，执行失败则执行`fail-deploy`操作，不管成功还是失败，只要执行完成后一定执行`complete-deploy`操作。

关于`actions`中的`run`，`component`，`plugin`的定位和区别：
- `run`，需要指定执行目录，仅仅是一个`hook`的能力，可以认为就是单纯的执行命令（即调用系统的命令）；
- `component`，使用格式是`组件名 命令 参数`，将会把当前项目所使用的密钥信息、属性信息等一并传给指定的组件方法；
- `plugin`，是一种轻量化的插件，每个插件通常情况下只会支持一个能力，与`component`最大的不同是，他可以修改属性。例如用户配置了`props`中的某个`k-v`为：`codeUri: ./code`：
    - 在使用`component`之后，当前信息（`codeUri: ./code`），会继续成为项目执行的参数，不会变更；
    - 在使用`plugin`之后，当前信息（`codeUri: ./code`），可能会发生变更，并将变更后的内容作为项目执行的参数；      

关于三者的具体的例子：
- 如果Yaml是：
    ```yaml
    edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    resources:
      nextjs_portal: #  业务模块
        component: test-component  # 组件名称
        props: #  组件的属性值
          src: ./frontend_src
          url: url 
    ```
    用户在执行`s deploy -a mytest`后，系统会将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法；

- 如果Yaml是：
    ```yaml
    edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    resources:
      nextjs_portal: #  业务模块
        component: test-component  # 组件名称
        actions: # 自定义执行逻辑
          pre-deploy: # 在deploy之前运行
            - run: s build
              path: ./
        props: #  组件的属性值
          src: ./frontend_src
          url: url 
    ```
    用户在执行`s deploy -a mytest`后，系统会：
    - 在`./`目录下执行`s build`，此时`-a mytest`参数并不会直接传递给`s build`方法，可以认为纯粹的执行某个命令，无相关状态的继承和关联；
    - 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法；

- 如果Yaml是：
    ```yaml
    edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    resources:
      nextjs_portal: #  业务模块
        component: test-component  # 组件名称
        actions: # 自定义执行逻辑
          pre-deploy: # 在deploy之前运行
            - component: fc build
        props: #  组件的属性值
          src: ./frontend_src
          url: url 
    ```
    用户在执行`s deploy -a mytest`后，系统会：
    - 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`fc`的`build`方法；
    - 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法

- 如果Yaml是：
   ```yaml
    edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    resources:
      nextjs_portal: #  业务模块
        component: test-component  # 组件名称
        actions: # 自定义执行逻辑
          pre-deploy: # 在deploy之前运行
            - plugin: qbuild
              args:
                key: value
        props: #  组件的属性值
          src: ./frontend_src
          url: url 
    ```
    用户在执行`s deploy -a mytest`后，系统会：
    - 将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`），`plugin`的参数（`{"key": "value"}`）传递给插件`qbuild`，此时插件`qbuild`进行相关的业务处理，处理完成：
        - 如果返回信息对`props`进行了修改，那么会将密钥`mytest`以及修改后的`props`的传递给组件`test-component`的`deploy`方法；
        - 如果返回信息未对`props`进行了修改，那么会将密钥`mytest`以及原始的`props`的传递给组件`test-component`的`deploy`方法；

-----------

> 在一个项目下，如何一键部署整个项目？又或者如何只部署应用中的某个业务模块？可以参考[自定义命令使用指南](./command/custom.md)

### Action通配符

工具会识别魔法变量regex里的内容来正则匹配当前的执行方法。比如全局的`pre-${regex(.)}`表示项目执行任何方法之前都会执行`pre`的动作 

> 本质上是将`regex`接收的参数value执行 `new RegExp('value').test('当前执行的指令')`， 比如:  `new RegExp('.').test('deploy')`

```yaml
actions: 
  pre-${regex('.')}: # 执行任何方法之前都会执行
    - run: npm install # 要运行的命令行
      path: ./src # 命令行运行的路径
```
