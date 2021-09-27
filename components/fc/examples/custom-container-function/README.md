## 克隆仓库

若不想使用当前目录下的代码示例，可在 setup.sh 文件中，增加 `git clone` 以及 `cd ${Repo}` 的指令，使用自己的代码仓库。

`注: custom-container 场景下，s.yml 中的 codeUri 字段需要指向 Dockerfile 所在的目录`

## 环境变量

新建 .env 文件，文件内容如下：

```
export AccessKeyID=xxx
export AccessKeySecret=xxx
export AccountID=xxx
export aliasName=myAlias    # 需要与 s.yml 中的 access 字段保持一致
export image=xxx  # 格式： ${registry}/${repository}/${imageName}:${imageTag}
```
## 启动

运行 ``sh setup.sh`` 执行构建镜像、推送镜像以及部署镜像的操作。

