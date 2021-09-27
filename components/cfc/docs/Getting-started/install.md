# 安装教程

若使用阿里云函数计算（FC）组件快速部署项目到阿里云Serverless平台，您需要先安装Serverless Devs等开发者工具。


## 安装 Serverless Devs

> Serverless Devs 工具的安装教程可参考 [工具安装](http://www.serverless-devs.com/docs/install) 。

通过 [npm](https://www.npmjs.com/) 包管理安装：适用于已经预装了 npm 的 Windows、Mac、Linux 平台。在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。

```shell script
$ npm install @serverless-devs/s -g
```
或者 通过 [yarn](https://yarnpkg.com/) 进行安装

```shell script
$ yarn global add @serverless-devs/s
```

> **说明**:   
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 `未找到命令`，请执行命令 `ln -s serverless-devs安装位置 /usr/bin`，serverless-devs安装位置可以通过`find / -name s` 查找
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 Error: EACCES: permission denied，请执行命令 sudo npm install @serverless-devs/s -g。   
> - 如果安装过程较慢，可以考虑使用淘宝 npm 源，安装命令为 npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g。

## 通过脚本安装

针对 Mac/Linux 用户

```shell script
$ curl -o- -L http://cli.so/install.sh | bash
```


## 安装 Docker（可选）

如果你需要通过阿里云函数计算（FC）组件进行函数构建、本地运行调试，涉及到 `build`/`local` 等命令的功能，那需要在您的开发环境下有 docker。

### Windows 平台

可以参考官方[教程](https://store.docker.com/editions/community/docker-ce-desktop-windows) 。如果遇到网络问题，可以下载阿里云提供的 [Docker For Windows](http://mirrors.aliyun.com/docker-toolbox/windows/docker-for-windows/beta/) 。

### MacOS 平台

可以参考官方[教程](https://store.docker.com/editions/community/docker-ce-desktop-mac?tab=description) 。如果遇到网络问题，可以下载阿里云提供的 [Docker For Mac](http://mirrors.aliyun.com/docker-toolbox/mac/docker-for-mac/stable/) 。

### Linux 平台

可以参考官方[教程](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository) 。如果遇到网络问题，可以通过阿里云 Docker CE 镜像源站[下载](https://yq.aliyun.com/articles/110806) 。

### [更多平台参考](https://hub.docker.com/search/?type=edition&offering=community)

### 配置 docker 镜像加速器

安装好 docker 之后，就可以使用 docker 下载镜像了。如果遇到网络问题，推荐配置 aliyun [镜像加速器](https://yq.aliyun.com/articles/29941) 。