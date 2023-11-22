---
title: 内置环境变量
description: 'Serverless Devs 内置环境变量'
position: 3
category: '使用文档'
---

## 通过环境变量设置密钥
### $system_environment_access
通过指定环境变量的名字进行配置：
  例如当前有阿里云密钥对：
   - AccountID: temp_accountid
   - AccessKeyID: temp_accesskeyid
   - AccessKeySecret: temp_accesskeysecret  

如果同时存在以上三个环境变量，那个这个密钥的优先级是最高的，抛出的密钥别名为 `$system_environment_access`

### 以 `_serverless_devs_key` 结尾
在环境变量中可以命名 key 为`*********_serverless_devs_key`，例如`default_serverless_devs_key`，value 为 JSON 字符串，例如：
   - Key：`default_serverless_devs_key`
   - Value：`{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`  
  此时，可以在配置密钥的时候指定密钥`default_serverless_devs_key`;

  在`s.yaml`配置如下:

  ```yaml
  edition: 3.0.0 # 命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
  name: app # 项目名称
  access: default_serverless_devs_key # 秘钥别名

  resources:
    fc-deploy-test:
      component: fc  # 组件名称
      props: #  组件的属性值
        region: cn-shenzhen
        service:
          name: fc-deploy-service
  ```
### serverless_devs_access_cicd_alias_name
CICD 环境下配置环境变量 `serverless_devs_access_cicd_alias_name` 可指定 access 别名，会覆盖掉之前的 access

## 通过环境变量设置输出
默认情况下执行例如 `s deploy`在终端会进行输出。通过环境变量 `default_serverless_devs_auto_log`可以控制这个默认行为
```bash
export default_serverless_devs_auto_log=false
```

## 通过环境变量加载特定版本的组件
默认情况下Serverless-Devs会加载最新版本的组件，可以通过`core_load_serverless_devs_component`进行控制
```bash
export core_load_serverless_devs_component="devsapp/fc@dev;devsapp/fc-plan@dev"
```

## 通过环境变量设置工具的缓存目录

```bash
export serverless_devs_config_home=xxx
```

## 通过环境变量配置 registry token

```bash
export serverless_devs_registry_token=xxx
```

## 通过环境变量配置 traceid

```bash
export serverless_devs_traceid=xxx
```

## 通过环境变量 serverless_devs_version 获取工具当前的版本

## debug

- 可以设置环境变量`DEBUG`为`true`开启 debug日志
- 可以设置环境变量`NODE_CONSOLE_LOGGRE_LEVEL`控制日志输出级别，参考 [egg-logger](https://www.npmjs.com/package/egg-logger)
- 可以设置环境变量`serverless_devs_daemon_enable`为`false`关闭daemon进程，比如工具和组件都是通过daemon进程更新的