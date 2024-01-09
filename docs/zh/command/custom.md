---
title: 自定义命令
description: '自定义命令使用指南'
position: 14
category: '命令'
---

# 自定义命令使用指南

- [应用级操作](#应用级操作)
- [服务级操作](#服务级操作)
- [注意事项](#注意事项)

所谓的自定义命令指的是由组件决定的命令。由于 Serverless Devs 开发者工具，本身并不具备任何业务相关的能力（值得包括不限于函数的部署、应用的构建、项目的测试等），所以，这些能力都将会由组件提供，通过 Serverless Devs 开发者工具进行透出。

例如，某应用的资源/行为描述文件如下：

```yaml
edition: 3.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1

resources:
  backend: #  服务名称
    component: django-component  # 组件名称
    props: #  组件的属性值
      src: ./backend_src
      url: url
  user—frontend: #  服务名称
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src_user
      url: url
  admin-frontend: #  服务名称
    component: vue-component  # 组件名称
    props: #  组件的属性值
      src: ./frontend_src_admin
      url: url
```

通过该 Yaml 文件可以看出以下信息：
1. 该应用的名字是`FullStack`，将会使用密钥`xxx-account1`;
2. 该应用拥有三个服务：
    - `backend`服务：使用了`django-component`组件
    - `user—frontend`服务：使用了`vue-component`组件
    - `admin-frontend`服务：使用了`vue-component`组件
    
如果此时`django-component`组件和`vue-component`组件支持的自定义命令为：

| | `django-component` | `vue-component` |
| --- | --- | --- |
| `deploy` | 支持 | 支持 |
| `remove` | 支持 | 支持  |
| `test` | 支持 | 不支持 |

则可以通过自定义命令实现[应用级操作](#应用级操作)和[服务级操作](#服务级操作)。

## 应用级操作

在当前项目下，可以执行`s [自定义命令]`实现应用纬度的操作。

- 执行`s deploy`或者`s remove`时，由于`backend`、`user—frontend`、`admin-frontend`三个服务对应的组件，均支持`deploy`和`remove`方法，所以此时系统会按照[Serverless User Model所定义的服务顺序](../../../spec/zh/0.0.2/serverless_user_model/3.user_model.md#服务顺序)，进行三个服务分别对应的组件的`deploy`或`remove`操作；**此时，系统的`exit code`为0；**
- 执行`s test`时，由于`user—frontend`、`admin-frontend`两个服务对应的组件并不支持`test`方法，所以此时系统会执行`backend`对应组件（`django-component`）的`test`操作；**此时，系统会对`user—frontend`、`admin-frontend`两个服务进行警告，但是并不会报错，最终的`exit code`为0；**
- 如果在执行相关的命令时，`backend`、`user—frontend`、`admin-frontend`三个服务任何一个服务在执行过程中出现了错误，系统则会报错，并终止下一步的操作，**此时，系统的`exit code`为101；**

> 关于Serverless Devs开发者工具，涉及到的 Exit Code，可以参考[开发者工具设计文档](../tool.md)

## 服务级操作

在当前项目下，可以执行`s [服务名] [自定义命令]`实现服务级操作。

- 执行`s backend deploy`等，可以针对服务`backend`进行`deploy`相关的操作，**如果顺利完成与其操作，系统的`exit code`为0；否则，出现错误，系统的`exit code`为101**；
- 执行`s admin-frontend test`是，由于服务`admin-frontend`对应的`test`方法是不存在的，**此时系统将会认为是未找到组件方法，系统的`exit code`为100**；

## 注意事项

在上面[应用级操作](#应用级操作)和[服务级操作](#服务级操作)中，我们不难发现，同样是某些组件不包括对应方法，但是在[应用级操作](#应用级操作)和[服务级操作](#服务级操作)中的表现形式却不同，这里的设计思路主要是为了保证[应用级操作](#应用级操作)的流畅性。所以其规律通常如下：

1. [应用级操作](#应用级操作)更多是一种批量操作，会按照[Serverless User Model所定义的服务顺序](../../../spec/zh/0.0.2/serverless_user_model/3.user_model.md#服务顺序)对应用下的所有服务进行分别操作；所以，此时如果出现某个服务对应的组件不包括当前方法，会以"批量操作"作为理由，跳过该服务，进行警告后继续执行，**此时，系统的`exit code`为0；**
2. [服务级操作](#服务级操作)更多是一种针对某个应用下的某个服务的特定操作，此时如果找不到对应的方法，则意味着本次操作没有意义，将会惊醒错误报告，**此时，系统的`exit code`为100；**