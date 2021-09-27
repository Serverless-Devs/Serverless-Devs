## 部署能力

````
# 部署所有
s deploy
# 部署所有配置
s deploy --type config
# 部署代码包
s deploy --type code

# 仅部署服务
s deploy service

# 仅部署函数
s deploy function
# 仅部署函数配置
s deploy function --type config
# 仅部署函数代码包
s deploy function --type code

# 仅部署触发器
s deploy trigger
# 仅部署指定的触发器
s deploy trigger --trigger-name httpTrigger

# 仅部署域名
s deploy domain
````

## 版本能力

````
# 发布版本
s version publish --description xxx
# s cli /Users/wb447188/Desktop/new-repo/fc version publish --region cn-shenzhen --service-name guide --description xxx -a default
````
构建版本场景
1. 修改或者函数的配置
2. 执行 s deploy
3. 再次发布版本
4. 多次执行上述步骤构建场景

````
# 查看版本列表
s version list
s version list --table
````

## 版本别名能力

````
# 发布
s alias publish --alias-name pre --version-id 1 --description xxx
# s cli /Users/wb447188/Desktop/new-repo/fc alias publish --alias-name pre --version-id 1 --region cn-shenzhen --service-name guide --description xxx -a default
s alias publish --alias-name stc --version-id 2 --description xxx --gversion 1 --weight 20

# 查看列表
s alias list
s alias list --table
````

## 按量资源
````
# 配置
s onDemand put --qualifier pre --maximum-instance-count 1
s onDemand put --qualifier stc --maximum-instance-count 2

# 查看列表
s onDemand list
s onDemand list --table
````

## 预留配置
````
# 配置
s provision put --qualifier pre --target 1
s provision put --qualifier stc --config ./provision.json

# 查看列表
s provision list
s provision list --table
````

## 层
````
# 发布版本
s layer publish --layer-name testName --code ./code
s layer publish --layer-name testName --code ./code
s layer publish --layer-name testName --code ./code

s layer publish --layer-name testName1 --code ./code
s layer publish --layer-name testName1 --code ./code

# 查看层列表
s layer list
s layer list --table

# 查看层版本列表
s layer versions --layer-name testName
s layer versions --layer-name testName --table
````


## 删除能力
> -y 可以不交互删除
````
# 删除域名
s remove domain

# 删除所有触发器
s remove trigger

# 删除函数 
s remove function

<!-- s remove 等同于 s remove service -->
# 仅使用本地配置进行删除
s remove service --use-local
# 删除服务
s remove service

# 删除指定版本下函数的按量资源
s remove onDemand --qualifier pre --function-name http-trigger-function
# 删除指定版本的按量资源
s remove onDemand --qualifier pre
# 删除按量资源
s remove onDemand

# 删除指定版本下函数的预留
s remove provision --qualifier pre --function-name http-trigger-function
# 删除指定版本的预留
s remove provision --qualifier pre
# 删除预留
s remove provision


# 删除指定的服务别名
s remove alias --alias-name pre
# 删除服务所有别名
s remove alias

# 删除指定的服务版本
s remove version
# 删除服务所有版本
s remove version


# 删除指定层版本的所有
s remove layer --layer-name xx --version-id xx
# 删除指定层的所有版本
s remove layer --layer-name xx
````