# Yaml规范说明

本文介绍了Yaml配置的相关字段含义

## Yaml完整配置

`s.yaml`完整文档如下

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test   #  项目名称
alias: default
services:
  component-test: #  服务名称
    component: ../../lib  # 这里引入的是相对路径，正式配置替换成你自己的component名称即可 
    props:
      code:
        codeUri: ./												# 代码相对路径
        publish: false										# 是否发布
        dryRun: true
      functionName: test									# 函数名
      description: 测试函数								 # 函数描述
      handler: index.handler							# 函数句柄 
      endpoint: cfc.bj.baidubce.com				# 选择区域 见：https://cloud.baidu.com/doc/CFC/s/rjwvz4chn
      protocol: https											#	协议类型
      runtime: nodejs12										# 函数运行环境
      timeout: 3													# 超时时间
      memorySize: 128											# 内存大小
      logType: bos												# 日志类型
      logBosDir: bucket-name/path					# 日志存储的 Bucket 路径。
      vpcConifg: 													# 函数绑定的vpc配置
      	vpcId: xxxx												# 绑定的vpcId
      	subnetIds: 												# 绑定的子网列表						
      		- xxx
      		- xxx
      	securityGroupIds:									# 安全组列表
      		- xxx
      		- xxx
      trigger:														# 触发器配置
        source: cfc-http-trigger/v1/CFCAPI # 触发源（当前是http触发源）
        data:															# 触发器参数
          Enable: Enabled									# 是否弃用
          ResourcePath: /test							# 资源路径
          Method: GET											# 支持方法
          AuthType: anonymous							# 验证方法
      environment:												# 环境变量
        additionalProp1: 环境变量1
        additionalProp2: 环境变量2
        additionalProp3: 环境变量3
```

## 触发器

### 1. dueros触发器

```yaml
trigger:
	source: dueros
```

### 2. bos触发器

```yaml
trigger:
	source: bos
	bucket: xxx	# 必填，bucket名称
	data:
		Resource: xxx # 必填，订阅的资源
		Status: enabled/disabled # 必填，是否弃用
		Name: xxx								 # 必填，触发器名称
		EventType:  						 # 必填，事件类型列表
```

| EventType可选值         | 描述                        |
| ----------------------- | --------------------------- |
| PutObject               | 创建/覆盖文件：简单上传     |
| PostObject              | 创建/覆盖文件：表单上传     |
| AppendObject            | 创建/覆盖文件：追加上传     |
| CopyObject              | 创建/覆盖文件：拷贝上传     |
| CompleteMultipartObject | 创建/覆盖文件：完成分片上传 |

### 3. HTTP触发器

```yaml
trigger:
	source: cfc-http-trigger/v1/CFCAPI
	data:
		Resource:
		Method:
		AuthType:
```

| 参数名称     | 类型   | 是否必须 | 描述                                     |
| ------------ | ------ | -------- | ---------------------------------------- |
| ResourcePath | string | 是       | URL路径                                  |
| Method       | string | 是       | HTTP方法，如"GET,HEAD"                   |
| AuthType     | string | 是       | 身份验证类型，可选值为"anonymous"或"iam" |

### 4. CDN触发器

```yaml
trigger:
	source: cdn
	data:
		EventType:
		Domains:
			- xxx 
			- xxx
		Remark:
		Status:
```

| 参数名称  | 类型           | 是否必须 | 描述                                          |
| --------- | -------------- | -------- | --------------------------------------------- |
| EventType | string         | 是       | CDN事件类型                                   |
| Domains   | list of string | 否       | 域名列表，事件类型为域名粒度时可添加此参数    |
| Remark    | string         | 否       | 备注信息                                      |
| Status    | string         | 是       | 是否启用触发器，可选值为”enabled”或”disabled” |

