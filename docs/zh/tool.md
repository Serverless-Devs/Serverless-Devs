# 开发者工具设计文档

- [Exit Code 定义](#exit-code-定义)
- [命令行设计规范](#命令行设计规范)
- [优先级定义](#优先级定义)
    - [Yaml 文件优先级规范](#yaml-文件优先级规范)
    - [应用内服务部署顺序](#应用内服务部署顺序)
    - [密钥使用顺序与规范](#密钥使用顺序与规范)

## Exit Code 定义

| code | 含义 |
| --- | --- |
| 0 | 正常退出 |
| 100 | Serverless Devs 工具本身错误退出 |
| 101 | Serverless Devs 工具组件执行时，组件错误引起的退出 |

## 命令行设计规范

Serverless Devs 作为 Serverless 领域的开发者工具，其输出的标准化和规范化会在一定程度上对用户体验有比较明显的影响。

关于 Serverless Devs 命令行设计规范，可以参考 [cli_design.md](./cli_design.md) 

## 优先级定义

在使用 Serverless Devs 开发者工具时，会遇到一些带有默认值的参数/变量，这一部分将会针对这些参数/变量，进行优先级划分，在每个类别下面的列表中，上面的情况优先级高于下面的情况，例如`Yaml 文件优先级规范`为案例，描述为：

- 通过`-t/--template`参数指定的 Yaml 文件
- 默认的 Yaml 文件（`s.yaml`/`s.yml`，且`s.yaml`的优先级大于`s.yml`）

则 Serverless Devs 开发者工具在进行资源描述文件使用时，会优先选择`通过 -t/--template 参数指定的 Yaml 文件`，其次才会采用`默认的 Yaml 文件（ s.yaml/s.yml，且 s.yaml 的优先级大于 s.yml ）`


### Yaml 文件优先级规范

- 通过`-t/--template`参数指定的 Yaml 文件
- 默认的 Yaml 文件（`s.yaml`/`s.yml`，且`s.yaml`的优先级大于`s.yml`）

### 应用内服务部署顺序

- 被依赖的 `service` 优先部署；
- 从上到下的顺序，按顺序进行部署；

> 例如，某资源描述 Yaml 可以缩写成：
> ```yaml
> edition: 1.0.0        #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
> name: FullStack       #  项目名称
> access: xxx-account1  #  秘钥别名
> 
> services:
>   nextjs-portal: #  服务名称
>     component: vue-component  # 组件名称
>     props: #  组件的属性值
>       src: ./frontend_src
>       url: url
> 
>   assets:
>     component: static
>     props:
>       www: "./public"
> 
>   gateway:
>     component: serverless-gateway # 路由组件：HTTP URL和服务之间的映射规则
>     props:
>       routes:
>         - url: ${assets.output.url}
> ```
> 此时，可先进性依赖关系分析，服务`nextjs-portal`、`assets`没有额外依赖，服务`gateway`通过魔法变量`${assets.output.url}`依赖了`assets`服务；此时部署顺序则为：`gateway`优先部署，然后`nextjs-portal`、`assets`按照上下顺序部署，即：`gateway`->`nextjs-portal`->`assets`


### 密钥使用顺序与规范

- 通过`-a/--access`参数指定的密钥信息
- 默认使用`default`密钥信息
- 不实用密钥信息 / 进入密钥信息配置引导

具体的流程图为：

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635841483040_20211102082444588067.png)

