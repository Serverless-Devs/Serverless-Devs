# Serverless Devs Model (SDM)

<p align="center">
  <span><b><a href="./readme.md">中文</a> ｜ <a href="./readme_en.md">English</a></b></span><br>
</p>


The official document of the Serverless Devs Model (SDM, hereinafter referred to as SDM), which is mainly used to introduce the model details and related specifications of SDM.

Serverless Devs Model (SDM) is a serverless architecture toolchain model independent of the vendor's FaaS platform. It is used to define common serverless architecture tool usage standards, allowing developers to focus more on business logic and improving serverless application development, deployment, and operation and maintenance. Efficiency, through this model, developers can use different cloud vendors and open source serverless products in a more flexible and general way, and then implement serverless application management more efficiently, concisely, and conveniently.

## introduce

"Developers of serverless applications should pay more attention to business code, and do not need more energy to adapt to different serverless platforms (including the learning of developer tools from different manufacturers, the use of different functions, etc.)."

![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631771269638_20210916054752754202.png)

### Why do you need a tool model

From the current point of view, serverless architecture vendors are heavily locked in. Different vendors have different tools and different ways of using them. This makes developers face many difficulties in the process of application development, as well as in the process of hybrid cloud deployment and operation and maintenance:

- **Learning is difficult**: Developers need to learn different tool usage methods for different cloud vendors, and accept the usage methods of different serverless platforms, including but not limited to many processes such as release deployment, operation and maintenance, and construction;
- **Poor tool expansion**: The developer tools provided by many serverless platforms are often provided by the development team with corresponding functions, and users only have the functions to use. difficult to expand;
- **High cost of adaptation**: Multi-cloud deployment and business migration are common behaviors in the production process. Due to the serious lock-in of serverless architecture vendors, multi-cloud deployment, learning costs and conversion costs during business migration are very high;

In the Serverless Devs Model (SDM), we propose an application-centric, component-based approach:

- **Application concept first**: This model will carry out project management based on application latitude, instead of project management only in the form of resources, which will have a clearer definition of application development and definition;
- **Componentized function exposure**: This model will not provide any functions related to the Serverless platform. All these functions will be exposed to developers in a pluggable form through components. Serverless Developers can use multiple components at the same time in an application to realize a complete application deployment, and even realize hybrid cloud deployment at the same time;
- **Abstract of common functions**: This model will promote the abstraction of common functions of the Serverless architecture under different platforms, such as application construction and debugging functions, which can be further abstracted in the form of components for more Serverless developers. development support;

:trophy: Our goals are:

- Developers can use the products/functions of different serverless platforms more simply, conveniently and quickly through a set of tools, including but not limited to different processes or stages such as construction, debugging, deployment, and operation and maintenance;
- Developers can see serverless applications from the perspective of applications, and even deploy serverless applications to different serverless platforms with one line of commands;
- Developers can carry out the Onboarding process very simply, and can experience consistent abstraction that cannot be applied to upper-layer capabilities;

## Model learning

The model itself is driven by the Serverless Devs project and maintained as a set of versioned API documentation as follows:

- [v0.0.2 (Serverless Devs v2.1.x)](en/0.0.2/readme.md)
- [v0.0.1 (Serverless Devs v2.0.x)](../spec/zh/0.0.1/readme.md)

## Community

### contribute

> See the [Contribution Guidelines](../CONTRIBUTING.md) for details.

Contributions to spec can also refer to the following:
- Fork the Serverless Devs repository to your own account/organization;
- Modify, update and improve the spec content;
- Update `readme.md` under the corresponding version and add yourself to `author`->`contributor`;
- Add `Pull requests` to the `docs` branch of the repository `Serverless-Devs/Serverless-Devs`; and add [Anycodes](https://github.com/anycodes), [hanxie](https://github.com/hanxie-crypto) as Reviewers, and fill in the update reason in Comment;

### meeting time

- Waiting for community feedback

## Protocol

Serverless Devs is an open source project under the [Apache 2.0](../LICENSE) license.

The node_modules and other third-party dependent libraries used by Serverless Devs may have their own agreements. We recommend that you read and understand these agreements, because the terms may not be exactly the same as those in the Apache 2.0 agreement.
