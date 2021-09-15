# Serverless Devs开发者文档

Serverless Devs是组件化开发者工具，是一个通过社区共同建设的Serverless开发者生态，通过Serverless Devs，开发者可以通过自定义组件来完成不同的Serverless应用开发。

开发一个Package的基本流程是：

- [初始化Package](#初始化Package)
- [项目开发](#项目开发)
- [发布Package](#发布Package)


## 初始化Package

您可以通过`s init`指令，选择对应的`application`，`component`，`plugin`内容，关于这三者的区别：

-----

首先可以肯定的是，Serverless Devs Tool是一个组件+插件共存的项目，所以这里的组件和插件的区别是：

|     | 组件  | 插件  |
|  ----  | ----  |  ----  |
| 可以独立使用  | 是 |  否 |
| 是否有依赖  | 依赖项目 |  依赖组件 |

好了，这样一个简单的表格，可能很难描述清楚，那么我们就用一个实际的例子来表示：

```yaml
# 完整的是一个应用
edition: 1.0.0 
name: FullStack 
access: xxx-account1

services:
  nextjs-portal:
    component: fc # 这个fc是一个组件
    props:
      src: ./frontend_src
      url: ${backend.output.url}
    actions:
      pre-deploy:
        - plugin: plugin-name # 这是一个插件，这执行deploy之前会执行
```

在这个Yaml中，我们可以看到，这里有一个项目是`Projectname`，这个项目依赖了组件`stest`，在项目执行`deploy`方法（这个方法是`stest`组件自己定义的）之前，要执行一个叫做`stest_plugin`的组件。其组件和插件以及Yaml等关系如下：

![](https://images.devsapp.cn/s-tool/zh/component-application-plugin-2.jpg)

换一种说法就是，一个Yaml，可以部署多个项目，每个项目对应了一个组件，这个组件来完成每个项目的部署。但是有一些组件在某些情况下没办法更好地完成一个任务，所以这个时候就需要插件/Hook了。例如，当我们部署一个静态网站项目，我们可以把这个静态网站项目通过`Website`组件部署到线上，但是如果这个项目是一个Vue的项目，我们在部署之前可能要`npm build`一下，这个时候我们就可以在`Website`组件之上，增加一个插件，在部署执行，先执行这个部分。这种做法实际上在我们工程化一个项目或者CICD流程中，将会有比较有趣的作用。

那么，什么是应用呢？其实一个应用的定义就比较广泛了，你可以认为所谓的一个应用是一个Yaml，这个应用中包括Yaml所附带的代码，包括资源描述文件(Yaml文件)等。一般情况下是这样的：

![](https://images.devsapp.cn/s-tool/zh/component-application-plugin-3.jpg)

我们可以认为一个应用可以是一个`hello_world`的案例，一个音视频处理的案例，部署一个在线转码的能力，部署一个......

组件、应用和插件的概念，其实并不复杂，如果据一个身边常见的例子为例就是：

一个应用就是一个拍照的手机APP，这个APP里面会有很多组件，例如打开摄像头组件、拍照组建、以及存储照片组件，当我们在存储照片的时候需要默认将用户拍的照片进行一些特征提取，例如提取出来拍摄时间、拍摄地点，但是这些能力又不是存储照片组件所提供的，所以这个时候，我们就可以在存储照片之前，放一个提取出来拍摄时间和拍摄地点的插件。

其实组件、插件和应用之间，是有一定的区别，但是在某些极端情况下，也没有非常非常明确的区别，所以大家也不用过分纠结这些内容具体的细致的区别：好用，就可以了，能用的起来，用的方便，简单，快速，就可以了。

-----

## 项目开发

项目开发过程中，您需要严格遵守项目开发文档


### Application开发规范

#### 开发规范

以下开发规范仅是测试版的规范（但是之后的规范会兼容这套规范），规范会在后期不断完善，也期待您可以给我们更多的意见、建议。

项目目录必须遵守以下格式：

```
|- src # 目录名字不可变更
|   └── 应用目录  
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```
#### publish.yaml

这个文件是项目的描述文档。系统将会在您发布资源的时候，读取该文档并且进行相关信息的录入，请您务必认真填写。

```yaml
Type: Application
Name: 名称
Provider:
  - 云厂商名称 # Alibaba/Baidu/Huawei/AWS/Google Cloud/Azure/Vercel/Tencent
Version: 版本，例如0.0.1
Description: 
  zh: 简短的描述/介绍
  en: English
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  - Name: 服务名 # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限权限
      - 创建函数 # 所需要的权限
```

部分参数取值范围：

* 云厂商：
    ```阿里云, 百度智能云, 华为云, 腾讯云, AWS, Azure, Google Cloud, /其它```
    
* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
* 云厂商：
    ```函数计算, 容器服务, 镜像服务, 消息队列, 工作流, CDN, 对象存储, 表格存储, MNS, 日志服务, API网关, 数据库, 解析服务, 云应用, 其他```
    
* 运行时：
    ```Node.JS, Python, PHP, Java, Go, 其它```

##### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

##### version.md

这个版本升级的描述文档，可以在这个文档介绍版本升级的内容

#### 项目流程

本例子仅是一个开发样例，尽可能的为您描述清楚每个开发细节。如果有任何问题可以随时和我取得联系（Wechat：anycodes_02）

在命令行执行：`s init`，选择`Application`选项即可创建初始化项目。

### Component开发规范

#### 开发规范

以下开发规范仅是测试版的规范（但是之后的规范会兼容这套规范），规范会在后期不断完善，也期待您可以给我们更多的意见、建议。

项目目录必须遵守以下格式：

```
|- src # 目录名字可以变更
|   └── 代码目录  
|- package.json: 需要定义好main   
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```
#### publish.yaml

这个文件是项目的描述文档。系统将会在您发布资源的时候，读取该文档并且进行相关信息的录入，请您务必认真填写。

```yaml
Type: Component
Name: 名称
Provider:
  - 云厂商名称 
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
Service: # 使用的服务
  - Name: 服务名 # 函数计算/容器服务/镜像服务/消息队列/工作流/CDN/对象存储/表格存储/MNS/日志服务/API网关/数据库/解析服务/云应用/其他
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - 创建函数 # 所需要的权限
Commands: # 指令，格式为指令：指令描述，例如：
  deploy: 部署函数
  invoke: 调用函数
Properties:
  Region: # 参数
    Description: 参数描述
    Required: true # 参数必选，true/false
    Type: # 参数类型
      - String
```

部分参数取值范围：

* 云厂商：
    ```阿里云, 百度智能云, 华为云, 腾讯云, AWS, Azure, Google Cloud, 其它```
    
* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
* 云厂商：
    ```函数计算, 容器服务, 镜像服务, 消息队列, 工作流, CDN, 对象存储, 表格存储, MNS, 日志服务, API网关, 数据库, 解析服务, 云应用, 其他```
    
* 运行时：
    ```Node.JS, Python, PHP, Java, Go, 其它```

* Properties相关：   
    必须参数：   
    ```Description, Required, Type```    
    可选参数：    
    ```Example, Default```    
    Type可以是String类型，也可以是List类型，取值：    
    ```String, Number, List, Enum, Struct, Boolean, Null, Any```    
    负责类型可以是：`List<数据类型>`   
    当Type是List类型时，可以针对不同的元素做别名：`数据类型[别名]`
    
##### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

##### version.md

这个版本升级的描述文档，可以在这个文档介绍版本升级的内容

#### 项目流程

本例子仅是一个开发样例，尽可能的为您描述清楚每个开发细节。如果有任何问题可以随时和我取得联系（Wechat：anycodes_02）

在命令行执行：`s init`，选择`Application`选项即可创建初始化项目。

例如，用户的Yaml格式为：

```yaml
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1  #  秘钥别名

services:
  HexoComponent:
    component: hexo
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
```

当用户执行`s deploy mytest -a -b abc`，此时，您的`deploy`方法，收到的`inputs`参数实际上是：

```
{
    "Command": 'deploy', 
    "Project": {
        ProjectName: 'HexoComponent', 
        Component: 'hexo',
        Provider: 'alibaba',
        AccessAlias：'release'
    },
    "Credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********",
    },
    "Properties": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "Args": "mytest -a -b abc"
}
```

开发组件所需要的核心能力，可以参考：https://github.com/Serverless-Devs/s-core


### Plugin开发规范

#### 开发规范

以下开发规范仅是测试版的规范（但是之后的规范会兼容这套规范），规范会在后期不断完善，也期待您可以给我们更多的意见、建议。

项目目录必须遵守以下格式：

```
|- src # 目录名字可以变更
|   └── 插件目录  
|- package.json: 指定main
|- publish.yaml: 项目的资源描述   
|- readme.md: 项目简介  
|- version.md: 版本更新内容
```
#### publish.yaml

这个文件是项目的描述文档。系统将会在您发布资源的时候，读取该文档并且进行相关信息的录入，请您务必认真填写。

```yaml
Type: Plugin
Name: 名称
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: 分类 # 基础云服务/Web框架/Web应用/人工智能/音视频处理/图文处理/监控告警/大数据/IoT/新手入门/其他
```

部分参数取值范围：

* 分类：
    ```基础云服务, Web框架, 全栈应用, 人工智能, 音视频处理, 图文处理, 监控告警, 大数据, IoT, 新手入门, 其他```
    
##### readme.md

这个文件是项目的简介，您可以通过这部分，为您的项目写一份完整的描述文档，这样大家在使用您的项目的时候，才可以更加简单，轻松快速的用的起来。

##### version.md

这个版本升级的描述文档，可以在这个文档介绍版本升级的内容

#### 项目流程

本例子仅是一个开发样例，尽可能的为您描述清楚每个开发细节。如果有任何问题可以随时和我取得联系（Wechat：anycodes_02）

在命令行执行：`s init`，选择`Plugin`选项即可创建初始化项目。



## 发布Package

发布Package的方法是非常简单的，当您完成了项目开发，您可以将代码推动到Github，或者放入所配置的私有源即可

不发布package情况下组件的使用方法：    
您如果开发完成项目，不想直接对外开放，仅是想自己使用，您可以通过直接引入项目绝对路径的方法使用。例如：   
  
```shell script
edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: FullStack       #  项目名称
access: xxx-account1  #  秘钥别名

services:
  nextjs-portal: #  服务名称
    component: ./my-full-stack-component-path
    props: #  组件的属性值
      src: ./frontend_src
      url: ${backend.output.url}
```
