# Package开发文档


- [组件开发说明](#组件开发说明)
- [应用开发说明](#应用开发说明)

> 注意：
> - Serverless Devs的组件开发和应用开发模版都已经被默认的集成到了Serverless Devs的开发者工具中，Package开发者可以直接使用；
> - Package的开发，需要遵循[Serverless Package Model](../../spec/zh/0.0.1/serverless_registry_model/readme.md)以及相关规范，只有这样Serverless Registry和Serverless Devs开发者工具才能正确识别和使用；
> - 关于应用和组件开发的最佳实践可以参考[社区讨论 #62](https://github.com/Serverless-Devs/Serverless-Devs/discussions/62);


## 组件开发说明

> Serverless Devs 组件开发需要严格遵守 [Serverless Package Model](../../spec/zh/0.0.1/serverless_registry_model/readme.md) 中的 [组件模型规范](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#组件模型规范)。在[组件模型规范](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#组件模型规范)中有关于[组件模型元数据](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#组件模型元数据)和[组件模型代码规范](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#组件模型代码规范)的说明。

> 🐵 温馨提示，在进行 Serverless Devs 的组件开发时，可能会遇到很多相对来说更为通用的能力，包括不限于：
> - 获取用户的密钥信息
> - 进行更规范的格式化输出
> - 对用户的输入参数进行解析   
> ......   
> 这些内容都可以通过 Serverless Devs 所提供的 [Core包](https://github.com/Serverless-Devs/core) 进行提供，更多 [Core包](https://github.com/Serverless-Devs/core) 信息，可以参考 [Core包的开发文档](https://github.com/Serverless-Devs/core)

Serverless Devs的组件开发案例已经被集成到Serverless Devs命令行工具中，通过对Serverless Devs的命令行工具，可以进行空白组件项目的初始化，开发者只需要执行`s init`即可看到：

```shell script

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

此时，选择最后的`Dev Template for Serverless Devs`，并按回车：

```shell script
$ s init

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Application Scaffolding 
  Component Scaffolding 
```

此时，选择`Component Scaffolding`，并按回车，即可完成一个完整的Serverless Devs的Component项目的初始化，可以通过命令查看文件树：

```shell script
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____LICENSE
|____.signore
|____example
| |____s.yaml
|____readme.md
|____publish.yaml
|____.gitignore
|____package.json
|____tsconfig.json
|____src
| |____common
| | |____entity.ts
| | |____logger.ts
| |____index.ts
```

这其中：

| 目录 | 含义 |
| --- | --- | 
| LICENSE | 项目默认的LICENSE，默认的LICENSE是遵循MIT开源协议的（推荐） | 
| .signore | 项目发布时，可以选择的忽略文件，类似于npm发布是的`.npmignore`文件 | 
| example | 该组件对应的测试应用 | 
| publish.yaml | 项目所必须的文件，Serverless Devs Package的开发识别文档 |
| .gitignore| 推送到Github的忽略文件 | 
| package.json| Node.js的package.json，需要描述清楚组件的入口文件位置 |
| tsconfig.json| Typescript的tsconfig.json，用来对TS项目进行描述等 |
| src| 用户的代码目录 |
| readme.md| 版本的描述，例如当前版本的更新内容等 |

此时，开发者可以在src下完成业务代码的开发，由于默认的初始化项目是Typescript，所以开发完成业务代码还需要编译成Javascript（可以通过`npm run build`进行编译），在完成项目编译之后，还需要对项目进行`publish.yaml`文件的编写。完成之后，即可将项目发不到不同的源，以Github Registry为例，可以在Github创建一个`Public`的仓库，并将编译后的代码放到仓库，并发布一个版本。此时，就可以通过客户端获取到该应用。

## 应用开发说明

> Serverless Devs 应用开发需要严格遵守 [Serverless Package Model](../../spec/zh/0.0.1/serverless_registry_model/readme.md) 中的 [应用模型规范](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#应用模型规范)。在[应用模型规范](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#应用模型规范)中有关于[应用模型元数据](../../spec/zh/0.0.1/serverless_registry_model/3.registry_model.md#应用模型元数据)的说明。

Serverless Devs的组件开发案例已经被集成到Serverless Devs命令行工具中，通过对Serverless Devs的命令行工具，可以进行空白应用项目的初始化，开发者只需要执行`s init`即可看到：

```shell script

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

此时，选择最后的`Dev Template for Serverless Devs`，并按回车：

```shell script
$ s init

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Application Scaffolding 
  Component Scaffolding 
```

此时，选择`Application Scaffolding`，并按回车，即可完成一个完整的Serverless Devs的Application项目的初始化，可以通过命令查看文件树：

```shell script
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____readme.md
|____version.md
|____publish.yaml
|____src
| |____s.yaml
| |____index.js
```

这其中：

| 目录 | 含义 |
| --- | --- | 
| readme.md | 对该组件的描述，或帮助文档信息 | 
| version.md | 版本的描述，例如当前版本的更新内容等 |  
| publish.yaml | 项目所必须的文件，Serverless Devs Package的开发识别文档 |
| src | 应用所在目录，需要包括`s.yaml`和相关的应用代码等 | 


此时，开发者可以在src下完成应用的开发，并对项目进行`publish.yaml`文件的编写。完成之后，即可将项目发不到不同的源，以Github Registry为例，可以在Github创建一个`Public`的仓库，并将编译后的代码放到仓库，并发布一个版本。此时，就可以通过客户端获取到该应用。
