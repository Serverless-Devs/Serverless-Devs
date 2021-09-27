# 命令相关权限配置

本文档给出了命令相关配置对应的权限情况，其实一部分的策略是可以参考[阿里云函数计算的权限文档](https://help.aliyun.com/document_detail/253969.html#title-0wo-zl0-c61) , 但是还有一些权限的可能在使用命令中会比较细化，所以特编写该文档。

**目录**
- [deploy 指令](#deploy-指令)
- [remove 指令](#remove-指令)
- [info、sync 指令](#infosync-指令)
- [build、local 指令](#buildlocal-指令)
- [invoke 指令](#invoke-指令)
    - [最大权限](#最大权限)
    - [最小权限](#最小权限)
- [logs 指令](#logs-指令)
    - [最大权限](#最大权限-1)
    - [最小权限](#最小权限-1)
- [metrics 指令](#metrics-指令)
- [nas 指令](#nas-指令)
- [layer 指令](#layer-指令)
    - [查看操作权限：list、versions、versionConfig](#查看操作权限listversionsversionConfig)
    - [部署版本权限：publish](#部署版本权限publish)
- [version 指令](#version-指令)
    - [查看操作权限：list](#查看操作权限list)
    - [发布版本：publish](#发布版本publish)
- [alias 指令](#alias-指令)
    - [查看操作权限：list](#查看操作权限list-1)
    - [发布版本：publish](#发布版本publish-1)
- [provision 指令](#provision-指令)
    - [查看操作权限：list get](#查看操作权限list-get)
    - [操作权限：put](#操作权限put)
- [onDemand 指令](#onDemand-指令)
    - [查看操作权限：list get](#查看操作权限list-get-1)
    - [发布/修改：put](#发布修改put)

## deploy 指令

这一部分和Yaml配置相关比较紧密，所以请[参考Yaml权限相关配置](./yaml.md)

## remove 指令
### 最大权限
系统策略：`AliyunFCFullAccess`

### s remove/s remove service
````json
{
    "Statement": [
        {
            "Action": [
                "fc:ListOnDemandConfigs",
                "fc:DeleteFunctionOnDemandConfig",
                "fc:ListProvisionConfigs",
                "fc:PutProvisionConfig",
                "fc:ListAliases",
                "fc:DeleteAlias",
                "fc:ListServiceVersions",
                "fc:DeleteServiceVersion",
                "fc:ListTriggers",
                "fc:DeleteTrigger",
                "fc:ListFunctions",
                "fc:DeleteFunction",
                "fc:DeleteService"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
````
如果执行 s remove service --use-local
````json
{
    "Statement": [
        {
            "Action": [
                "fc:DeleteTrigger",
                "fc:DeleteFunction",
                "fc:DeleteService"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
````

### s remove function
````json
{
    "Statement": [
        {
            "Action": [
                "fc:ListTriggers",
                "fc:DeleteTrigger",
                "fc:DeleteFunction"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
````

### s remove trigger
````json
{
    "Statement": [
        {
            "Action": [
                "fc:DeleteTrigger"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ],
    "Version": "1"
}
````

### s remove alias
系统策略：`AliyunFCReadOnlyAccess`
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteAlias",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/<aliasName>"
        }
    ]
}
```

### s remove version
系统策略：`AliyunFCReadOnlyAccess`
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteServiceVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions/<version-id>"
        }
    ]
}
```

### s remove provision
系统策略：`AliyunFCReadOnlyAccess`
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:PutProvisionConfig",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```

### s remove onDemand
系统策略：`AliyunFCReadOnlyAccess`
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteFunctionOnDemandConfig",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```

### s remove layer
系统策略：`AliyunFCReadOnlyAccess`
````json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:DeleteLayerVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
        }
    ]
}
````


## info、sync 指令

系统策略：`AliyunFCReadOnlyAccess`


## build、local 指令

这一部分是本地相关操作，所以无需线上权限

## invoke 指令

### 最大权限

`AliyunFCInvocationAccess` 或者 `AliyunFCFullAccess`

### 最小权限

```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:InvokeFunction",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```

## logs 指令
### 最大权限

`AliyunFCReadOnlyAccess`、`AliyunLogReadOnlyAccess`

### 最小权限

`AliyunFCReadOnlyAccess`

```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "log:GetLogStoreLogs",
            "Effect": "Allow",
            "Resource": "acs:log:<region>:<account-id>:project/<project>/logstore/<logstore>"
        }
    ]
}
```

## metrics 指令

`AliyunLogFullAccess`、`AliyunCloudMonitorReadOnlyAccess`、`AliyunFCReadOnlyAccess`


## nas 指令

参考 [nas 部署](./yaml.md#存在-NAS-配置)

## layer 指令

### 查看操作权限：list、versions、versionConfig

`AliyunFCReadOnlyAccess`


### 部署版本权限：publish

```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:CreateLayerVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:layers/<layerName>/versions/*"
        }
    ]
}
```

## version 指令
### 查看操作权限：list
`AliyunFCReadOnlyAccess`

### 发布版本：publish
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:PublishServiceVersion",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/versions"
        }
    ]
}
```

## alias 指令
### 查看操作权限：list
`AliyunFCReadOnlyAccess`

### 发布/修改：publish
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": [
            	"fc:CreateAlias",
              "fc:UpdateAlias"
            ],
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/<serviceName>/aliases/*"
        }
    ]
}
```

## provision 指令
### 查看操作权限：list get
`AliyunFCReadOnlyAccess`

### 操作权限：put
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:PutProvisionConfig",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```

## onDemand 指令
### 查看操作权限：list get
`AliyunFCReadOnlyAccess`


### 发布/修改：put
```yaml
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:PutFunctionOnDemandConfig",
            "Effect": "Allow",
            "Resource": "acs:fc:<region>:<account-id>:services/services/<serviceName>.<qualifier>/functions/<functionName>"
        }
    ]
}
```

