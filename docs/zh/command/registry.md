---
title: Registry 命令
description: 'Registry 命令'
position: 10
category: '命令'
---

# Registry 命令

`registry`命令是将案例模板发到 [Serverless Registry](https://registry.serverless-devs.com) 并对相关内容进行管理的命令。

- [命令解析](#命令解析)
- [login 命令](#registry-login-命令)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [publish 命令](#registry-publish-命令)
  - [操作案例](#操作案例-1)
- [list 命令](#registry-list-命令)
  - [参数解析](#参数解析-1)
  - [操作案例](#操作案例-2)
- [detail 命令](#registry-detail-命令)
  - [参数解析](#参数解析-2)
  - [操作案例](#操作案例-3)
- [delete 命令](#registry-delete-命令)
  - [参数解析](#参数解析-3)
  - [操作案例](#操作案例-4)

## 命令解析

通过执行`s registry -h`，可以进行相关帮助信息的查看：

```shell script
Usage: s registry [commands] [options]

You can manage Serverless Packages on Serverless Registry.

📖  Document: https://serverless.help/t/s/registry

Options:
  -h, --help                      Display help for command

Commands:
  login [options]                 😃  Login Serverless Registry
  publish                         ✅  Public Serverless Package to Serverless Registry
  list [options]                  🐵  List the packages you have published
  detail [options]                🌱  View specific package details
  delete [options]                ❌  Delete specific package
  help [command]                  display help for command
```

在该命令中，包括了五个子命令

- [login：登录 Serverless Registry](#registry-login-命令)
- [publish：发布 Serverless Package](#registry-publish-命令)
- [list：查看已发布的 Serverless Package](#registry-list-命令)
- [detail：查看指定 Serverless Package 的详情](#registry-detail-命令)
- [delete：删除已发布的 Serverless Package](#registry-delete-命令)

## registry login 命令

通过该命令，可以登陆 [Serverless Registry](https://registry.serverless-devs.com)。

执行`s registry login -h`命令，可以看到帮助文档：

```shell script
Usage: s registry login [options]

Login Serverless Registry.

Example:
  $ s registry login
  $ s registry login --token xxxxxxxxxxxxxxx
  $ s registry login --retoken
   
📖  Document: https://serverless.help/t/s/registry-login

Options:
  --token <token>                 Login by token
  --retoken                       Reset login token
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| token | - | 选填 | 通过指定的token登陆 |
| retoken | - | 选填 | 重置登陆token |

### 操作案例

登陆有两种模式：
- 模式1：已经拥有了登陆后的token信息，此时可以使用`s registry login --token <token>`直接进行token的配置；
- 模式2：没有登陆后的token信息，或者还没有注册过 Serverless Registry，此时可以通过`s registry login`直接打开浏览器，按照操作提示进行登录授权。

如果因为某些情况，导致 Serverless Registry 的 Token 信息泄漏，此时可以通过`s registry login --retoken`重置token。

## registry publish 命令

通过该命令，可以将符合 Serverless Package 规范的项目进行发布。

执行`s registry publish -h`命令，可以看到帮助文档：

```shell script
Usage: s registry publish [options]

Publish Serverless Registry.

Example:
  $ s registry publish
   
📖  Document: https://serverless.help/t/s/registry-publish

Options:
  -h, --help                      Display help for command
```

### 操作案例

配置正确的情况下，在该组件根目录下执行`s registry publish`之后可以看到结果:

```shell script
$ s registry publish
Publish package XXXX@x.x.x success.
```

## registry list 命令

通过该命令，可以查看当前登陆到 [Serverless Registry](https://registry.serverless-devs.com) 账号所发布的组件。

执行`s registry list -h`命令，可以看到帮助文档：

```shell script
Usage: s registry list [options]

View the components published by the current login to the Serverless Registry account.

Example:
  $ s registry list
   
📖  Document: https://serverless.help/t/s/registry-list

Options:
  --category <category>           category ID
  --tag <tag>                     Tag ID
  --search <search>               Search keyword
  --page <number>                 Page number (default: "1")
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| category | - | 选填 | 通过category ID进行筛选 |
| tag | - | 选填 | 通过tag ID进行筛选 |
| search | - | 选填 | 通过搜索关键词进行筛选 |
| page | - | 选填 | 指定查看的页码 |

### 操作案例

可以通过`s registry list`指令查看当前登陆到 [Serverless Registry](https://registry.serverless-devs.com) 账号所发布的组件。例如：

```shell script
$ s registry list
- 
  type:        Project
  name:        start-qwen-api-messages
  description: 使用函数计算 FC 快速体验通义千问 API，通过 messages 以文本指令对话
  category:    人工智能
  tags: 
    - Web框架
    - Flask
    - 人工智能
    - 通义千问
...
```

`list`指令会输出所有组件。在组件过多的情况下，可以通过`category`, `tag`和`page`参数进行筛选，还可以通过`search`参数搜索特定的组件。

## registry detail 命令

通过该命令，可以查看指定 Package 的信息。

执行`s registry detail -h`命令，可以看到帮助文档：

```shell script
Usage: s registry detail [options]

View application details.

Example:
  $ s registry detail --package-name fc3
   
📖  Document: https://serverless.help/t/s/registry-detail

Options:
  --package-name <name>           Serverless Package name
  --page <number>                 Page number (default: "1")
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| package-name | - | 必填 | 指定要查看的 Package |
| page | - | 选填 | 指定查看的页码 |

### 操作案例

如果想要查看某个 Package 的详细信息，可以通过`s registry detail --package-name <package-name>`进行查看。例如：
```shell script
$ s registry detail --package-name fc3
- 
  tag_name:    0.0.8
  created_at:  ******
  zipball_url: ******
- 
  tag_name:    dev.0.56
  created_at:  ******
  zipball_url: ******
- 
...
```

若输出结果过多，可以使用`page`参数进行分页查看。例如：

```shell script
$ s registry detail --package-name fc3 --page 2
- 
  tag_name:    dev.0.41
  created_at:  ******
  zipball_url: ******
- 
...
```

## registry delete 命令

通过该命令，可以删除已发布的 Serverless Package。

执行`s registry delete -h`命令，可以看到帮助文档：

```shell script
Usage: s registry delete [options]

Delete application version.

Example:
  $ s registry delete --name fc --version-id 1.0.1
   
📖  Document: https://serverless.help/t/s/registry-delete

Options:
  --name <name>                   Serverless Package name
  --version-id <version-id>       Serverless Package version
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| name | - | 必填 | 指定要删除的 Package 名字 |
| version-id | - | 必填 | 指定要删除的 Package 版本 |

### 操作案例

通过`s registry delete --name <name> --version-id <version-id>`可以删除特定包的特定版本。若包不存在或版本错误，会提示：

```shell script
$ s registry delete --name fc --version-id 1.0.1
 
Error Message:
未找到指定资源
```

若成功，则会提示删除的包名和版本号：

```shell script
$ s registry delete --name showcase-test --version-id 0.0.8
Delete package showcase-test@0.0.8 success.
```
