# 工具安装与升级

- [工具安装](#工具安装)
    - [通过命令行工具安装](#通过命令行工具安装)
    - [通过脚本安装](#通过脚本安装)
- [工具升级](#工具升级)


## 工具安装
### 通过命令行工具安装

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


### 通过脚本安装

针对 Mac/Linux 用户

```shell script
$ curl -o- -L http://cli.so/install.sh | bash
```

## 工具升级

Serverless Devs 开发者工具会不定期的进行更新升级。开发者在使用 Serverless Devs 开发者工具时，可以根据系统提醒进行进行最新版本的感知。

当客户端感知到系统升级之后，开发者可以通过命令`npm i -g @serverless-devs/s`进行更新操作，也可以通过 [Release](https://github.com/Serverless-Devs/Serverless-Devs/releases) 信息查看升级的具体内容，以决定是否进行本次升级。

> 例如：我当前的 Serverless Devs 的版本是`2.0.89`，当系统升级之后，我再使用Serverless Devs开发者工具，工具将会给出相对应的提醒：
> ```shell script
>    ╭───────────────────────────────────────────────╮
>    │                                               │
>    │       Update available 2.0.89 → 2.0.90        │
>    │   Run npm i -g @serverless-devs/s to update   │
>    │                                               │
>    ╰───────────────────────────────────────────────╯
> ```
> 此时，只需要按照提醒进行工具更新升级即可。