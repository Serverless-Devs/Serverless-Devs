---
title: 内置环境变量
description: 'Serverless Devs 内置环境变量'
position: 11
category: '概述'
---

## 通过环境变量设置密钥
通过指定环境变量的名字进行配置：例如当前有阿里云密钥对：

   - AccountID: temp_accountid
   - AccessKeyID: temp_accesskeyid
   - AccessKeySecret: temp_accesskeysecret  
     此时可以在环境变量中可以命名 key 为`*********_serverless_devs_access`，例如`default_serverless_devs_access`，value 为 JSON 字符串，例如：
   - Key：`default_serverless_devs_access`
   - Value：`{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`  
     此时，可以在配置密钥的时候指定密钥`default_serverless_devs_access`，例如`${env(default_serverless_devs_access)}`

   在`s.yaml`配置如下:

   ```
   edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
   name: fcDeployApp       #  项目名称
   access: default_serverless_devs_access  #  秘钥别名

   services:
     fc-deploy-test:
       component: fc-deploy  # 组件名称
       props: #  组件的属性值
         region: cn-shenzhen
         service:
           name: fc-deploy-service
   ```

## 通过环境变量设置输出
默认情况下执行例如 `s deploy`在终端会进行输出。通过环境变量 `default_serverless_devs_auto_log`可以控制这个默认行为
```
export default_serverless_devs_auto_log = false
```

## 通过环境变量加载特定版本的组件
默认情况下Serverless-Devs会加载最新版本的组件，可以通过`core_load_serverless_devs_component`进行控制
```
export core_load_serverless_devs_component="devsapp/fc@dev,devsapp/fc-plan@dev"
```