---
title: 描述文件（Yaml）规范
description: 'Serverless Devs描述文件（Yaml）规范'
position: 3
category: '概述'
---

# 描述文件（Yaml）规范

> 当前文档遵循 [Serverless User Model](../../spec/zh/0.0.2/serverless_user_model/readme.md) 和相关规范。

- [描述文件简介](#描述文件简介)
- [描述文件格式/规范](#描述文件格式规范)
    - [元数据](#元数据)
    - [变量赋值](#变量赋值)
    - [特殊变量](#特殊变量)
    - [服务顺序](#服务顺序)
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
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: applicationName   #  应用名称
access: xxx-account1    #  秘钥别名

vars: # [全局变量，提供给各个服务使用]
  Key: Value

Service: # 可以包括多个服务
  ServiceName: # 服务名称
    access: xxx-account1      #  秘钥别名，如果和项目的access相同，可省略
    component: componentName  #  组件名称
    props: serviceProp        #  组件的属性值
    actions: serviceActions   #  自定义执行逻辑
```

例如，一个相对完整的 Yaml 案例可以是：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1  #  秘钥别名

vars: # [全局变量，提供给各个服务使用]
  logo: https://image.aliyun.com/xxxx.png

services:
  nextjs-portal: #  服务名称
    access: xxx-account1  #  秘钥别名，如果和项目的access相同，可省略
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
    actions: # 自定义执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: s exec -- publish  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
        - run: s build  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
      post-deploy: # 在deploy之后运行
        - run: s clean
          path: ./frontend_src

  assets:
    component: static
    props:
      cache-control: "public, max-age=604800, immutable"
      www: "./public"

  express-blog:
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
          value: ${assets.output.url}
        - route: /
          value: ${nextjs-portal.output.url}
          index: index.html
        - route: /~portal
          value: ${nextjs-portal.output.url}
          inex: index.html
        - route: /~blog
          value: ${express-blog.output.url}
```

### 元数据

在该格式中：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| edition  | 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范 | 
| name  | 应用名称 | 
| access  | 秘钥别名，可以使用通过[config命令](./command/config.md#config-add-命令)配置的密钥信息，以及[配置到环境变量的密钥信息](./command/config.md#通过环境变量配置密钥信息) |
| vars  | 全局变量，提供给各个服务使用，是一个Key-Value的形式 |
| Service  | 应用所包含的服务，是一个Key-Value的形式 |

关于Service参数：

| 参数名 |  代表含义   | 
|  ----  | ----  | 
| access  | 秘钥别名，如果和项目的access相同，可省略 | 
| component  | 组件名称 | 
| actions  | 自定义执行逻辑 |
| props  | 组件的属性值 |

### 变量赋值

Serverless Application模型对应的Yaml文件支持多种变量格式：

- 获取当前机器中的环境变量：${env(环境变量)}，例如${env(secretId)}
- 获取外部文档的变量：${file(路径)}，例如${file(./path)}
- 获取全局变量：${vars.*}
- 获取其他项目的变量：${projectName.props.*}
- 获取Yaml中其他项目的结果变量：${projectName.output.*}
- 获取当前配置的config变量：${config(AccountID)}
  本质是获取 `s config get`中变量值
- 获取当前模块的信息：${this.xx}
  以下面的Yaml为例：
  ```
  edition: 1.0.0
  name: NextProject
  access: default-access

  services:
    nextjs-portal:
      component: fc
      actions:
        pre-deploy:
          - run: s invoke ${this.props.url}
            path: ./backend_src
      props:
        codeUri: ./frontend_src
        url: url
  ```
  在`nextjs-portal`中:
    - 使用`${this.name}`表示`nextjs-portal`
    - 使用`${this.props.codeUri}`表示 `./frontend_src`
    - 使用`${this.access}`表示`default-access`



### 特殊变量
在Serverless-Devs中有些特殊变量有特定的用途，开发者没有特殊的需求，避免使用特殊变量
- `${aliyun-cli}`
 作用在`access`的值中，从获取[aliyun cli](https://github.com/aliyun/aliyun-cli)的默认的`profile`，并且生效。

 > 执行`aliyun configure list`可以查看当前生效的`profile`

### 服务顺序

如果一个Serverless Application模型对应的Yaml文件中有过多的服务，系统会默认分析部署顺序，该部署顺序分为两个步骤：

1. 分析项目中的依赖关系
2. 有依赖关系的按照依赖关系从前到后部署，无依赖关系的按Yaml配置的从上到下部署

### 行为描述

在Serverless Application模型对应的Yaml文件中，可以针对服务，提供对应的行为操作，其基本格式是：

```yaml
actions: # 自定义执行逻辑
  pre-命令: # 在命令之前运行
    - run: command  # 要运行的操作
      path: ./path # 运行操作的路径
    - component: pgo  # 要执行的组件，格式为：组件名 命令 参数
    - plugin: website-fc  # 要使用的插件
      args: # 插件的参数
        key: value 
  post-命令: # 在命令之后运行
    - run: command  # 要运行的操作
      path: ./path # 运行操作的路径
    - component: pgo  # 要执行的组件，格式为：组件名 命令 参数
    - plugin: website-fc  # 要使用的插件
      args: # 插件的参数
        key: value 
```

例如：

```yaml
actions: # 自定义执行逻辑
  pre-deploy: # 在deploy之前运行
    - run: npm install  # 要运行的命令行
      path: ./backend_src # 命令行运行的路径
    - component: fc build --use-docker  # 要运行的命令行
  post-deploy: # 在deploy之后运行
    - plugin: fc-warm
      args:
        corn: '********'
```

当Serverless Devs开发者工具执行到该服务时，会在进行相关的命令之行之前，优先按照顺序执行`pre-命令`的操作，所有内容完成执行之后，再执行`post-命令`的操作。

以下面的Yaml为例：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称

services:
  nextjs-portal: #  服务名称
    access: xxx-account1  #  秘钥别名，如果和项目的access相同，可省略
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src
      url: url
    actions: # 自定义执行逻辑
      pre-deploy: # 在deploy之前运行
        - run: npm install  # 要运行的命令行
          path: ./backend_src # 命令行运行的路径
        - component: fc build --use-docker  # 要运行的命令行
      post-deploy: # 在deploy之后运行
        - plugin: fc-warm
          args:
           
```

当开发者在当前应用下执行了`deploy`命令，系统将会按照以下顺序进行操作：
1. 在`./backend_src`目录下执行`npm install`
2. 在对项目`nextjs-portal`，使用`fc`组件的`build`方法，入参为`--use-docker`(即在`docker`环境下，对项目`nextjs-portal`进行构建)
3. 调用组件`vue-component`的`deploy`方法，并将`props`和项目的基本信息传入到组件`vue-component`的`deploy`方法中
4. 将部署的输出结果等信息，传递给插件`fc-warm`，并将`{"corn": "********"}`作为参数传入

以上顺序仅适用于整个流程没有出错的前提下，如果流程出现错误，系统将会进行报错，并终止后续流程的执行。

关于`actions`中的`run`，`component`，`plugin`的定位和区别：
- `run`，需要指定执行目录，仅仅是一个`hook`的能力，可以认为就是单纯的执行命令（即调用系统的命令）；
- `component`，使用格式是`组件名 命令 参数`，将会把当前项目所使用的密钥信息、属性信息等一并传给指定的组件方法；
- `plugin`，是一种轻量化的插件，每个插件通常情况下只会支持一个能力，与`component`最大的不同是，他可以修改属性。例如用户配置了`props`中的某个`k-v`为：`codeUri: ./code`：
    - 在使用`component`之后，当前信息（`codeUri: ./code`），会继续成为项目执行的参数，不会变更；
    - 在使用`plugin`之后，当前信息（`codeUri: ./code`），可能会发生变更，并将变更后的内容作为项目执行的参数；      

关于三者的具体的例子：
- 如果Yaml是：
    ```yaml
    edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    services:
      nextjs-portal: #  服务名称
        component: test-component  # 组件名称
        props: #  组件的属性值
          src: ./frontend_src
          url: url 
    ```
    用户在执行`s deploy -a mytest`后，系统会将密钥`mytest`，以及`props`的参数（`{"src": "./frontend_src", "url": "url"}`）传递给组件`test-component`的`deploy`方法；

- 如果Yaml是：
    ```yaml
    edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    services:
      nextjs-portal: #  服务名称
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
    edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    services:
      nextjs-portal: #  服务名称
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
    edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
    name: FullStack       #  项目名称
    
    services:
      nextjs-portal: #  服务名称
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

> 在一个应用下，如何一键部署整个应用？又或者如何只部署应用中的某个Service？可以参考[自定义命令使用指南](./command/custom.md)
