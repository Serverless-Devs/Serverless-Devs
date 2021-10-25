# Registry模型

一个开放的 Serverless Registry Model。Package的开发者可以将自己开发的组件，或者待分享的应用发布到该平台。该平台可以使用目前 Serverless Devs 所支持的 Github Resitry， Gitee Registry， Serverless Registry，也可以按照该规范搭建私有的 Registry 以完成部分能力。

- [目的和目标](./1.purpose_and_goals.md)
- [概述和术语](./2.overview_and_terminology.md)
  - [模型概述](./2.overview_and_terminology.md#模型概述)
- [Registry 模型](./3.registry_model.md)
  - [元数据规范](./3.registry_model.md#元数据规范)
  - [Registry 规范](./3.registry_model.md#registry-规范)
- [适用范围](./4.application_scopes.md)
- [设计原则](./5.design_principles.md)

> 额外需要说明的是，虽然社区目前拥有Github Resitry， Gitee Registry， Serverless Registry等三个源，但是实际上这三个源也有着一定的逻辑关系：
> - Github Resitry：终极默认源，即无论用户配置了其他任何一个源，如果没有找到对应的内容，都会默认到该源进行查找；
> - Gitee Registry：针对中国用户，与Gitee合作的国内源；
> - Serverless Registry：Serverless Devs社区的默认源，也将作为被默认配置的源；
> 在Serverless Devs的开发者工具中，默认的加载逻辑：   
> ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635132866484_20211025033426634967.png)