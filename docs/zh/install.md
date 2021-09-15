# 工具安装

## 通过命令行工具安装

通过 [npm](https://www.npmjs.com/) 包管理安装：适用于已经预装了 npm 的 Windows、Mac、Linux 平台。在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。

```shell script
$ npm install @serverless-devs/s -g
```
或者 通过 [yarn](https://yarnpkg.com/) 进行安装

```shell script
$ yarn global add @serverless-devs/s
```



> **说明**:   
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 `未找到命令`，请执行命令 `ln -s serverless-devs安装位置 /usr/bin`，serverless-devs安装位置可以通过`find / -name s` 查找。   
> - 如果在 Linxu 下执行该命令报错且报错信息为 `Error: EACCES: permission denied`，请执行命令 `sudo npm install @serverless-devs/s -g`。   
> - 如果安装过程较慢，可以考虑使用淘宝 npm 源，安装命令为 `npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g`。


## 通过脚本安装

针对 Mac/Linux 用户

```shell script
$ curl -o- -L http://cli.so/install.sh | bash
```

