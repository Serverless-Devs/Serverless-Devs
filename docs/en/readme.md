---
title: Intro
description: 'Serverless Devs is an open source serverless developer platform dedicated to providing developers with a powerful toolchain system. Through this platform, developers can not only experience multi-cloud serverless products with one click, deploy serverless projects at an extreme speed, but also manage projects in the entire life cycle of serverless applications, and combine Serverless Devs with other tools/platforms very simply and quickly to further Improve R&D, operation and maintenance efficiency'
position: 1
category: 'Overview'
---

# Serverless Devs introduction

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635390357469_20211028030558116850.png)

<p align="center">
<a href="./quick_start.md">Installation documentation</a> |  <a href="./command/readme.md">CLI operations</a> | <a href="./yaml.md">YAML specification</a> | <a href="./cicd.md">CI/CD platform integration</a> | <a href="./package_dev.md">Package development documentation</a>
</p>

**Serverless Devs** is an open source serverless platform that provides a robust toolchain for developers. With Serverless Devs, developers can experience multi-cloud Serverless products with a few clicks, and quickly deploy Serverless projects. Developers can also manage projects throughout the lifecycle of Serverless applications, and fast integrate Serverless Devs with other tools and platforms with ease to further improve R&D and O&M efficiency. 

- [Benefits](#Six-Benefits)
- [Design principles](#Design-principles)
- [Growth history](#Growth-history)
- [Next up](#Next-up)
- [Communication community](#Communication-community)

## Six Benefits

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

- **Easy deployment**: The pluggable features of Serverless Devs allows you to easily deploy projects of different vendors, or allows you to deploy the projects on different cloud platforms with a few clicks. Serverless Devs supports multi-cloud products based on Function-as-a-Service (FaaS). The multi-cloud products include [Alibaba Cloud Function Compute](https://github.com/devsapp/fc), [AWS Lambda](https://github.com/devscomp/lambda), [Baidu Cloud Function Compute (CFC)](https://github.com/xinwuyun/cfc), [HUAWEI CLOUD FunctionGraph](https://github.com/zy-linn/fgs-component), and [Tencent Cloud Serverless Cloud Function (SFC)](https://github.com/devscomp/scf).
- **Open source development**: Developers develop projects by using open source code in an open ecosystem. Developers can view and participate in the contributions to Serverless Devs developer tools, and can also make contributions to related components and applications anytime and anywhere. In addition to the open source development, some enterprise grade teams are encouraged to build registry by using [Serverless Registry Mode](../../spec/en/0.0.2/serverless_registry_model/readme.md) to customize components that are inconvenient to disclose to the public.
- **Pluggable features**: The capabilities of Serverless Devs are implemented by using components, and the components are pluggable. Developers can customize relevant commands and features for the components. Developers can select different components in an application to meet the requirements of different modules.
- **Hands-on tutorials**: Based on models and specification of open Serverless Registry, multiple [hands-on cases that are in different forms](awesome.md) and can be applied to scenarios in diverse industries. Beginners are provided with the hands-on cases that help them quickly understand, learn, and get started with projects in the Serverless architecture. Various projects are described in the tutorials, such as [**Serverless: Hello World**](quick_start.md#ServerlessHello-World) in [Hands-on guide](quick_start.md), [**Artificial intelligence: object detection**](quick_start.md#AITarget-Detection), and [**Traditional framework: Django-based blog projects**](quick_start.md#Traditional-framework-based-on-django-blog-project).
- **Full lifecycle management**: With the support of components, Serverless Devs can unleash its power to manage applications in a project during the full lifecycle. For example, developers can use[ the FC component of Alibaba Cloud Function Compute](https://github.com/devsapp/fc) to create applications in a project and manage the applications during the full lifecycle, in which the developers can develop, debug, and observe the project.
- **Excellent integration**: Projects on Serverless Devs can be well integrated. With the support of components, the projects can be easily integrated into the traditional ecosystems. The Serverless Devs developer tools can also be integrated into mass automated processes. For example, cases, such as the [**integration with GitHub Action**](cicd.md#Integration-with-GitHub-Actions), [**integration with Gitee Go**](cicd.md#Integration-with-Gitee-Go), and [**integration with Jenkins**](cicd.md#Integration-with-Jenkins), are described in [CI/CD documentations](cicd.md).

## Design principles

Serverless Devs is an open source toolchain project in the Serverless field. To a certain extent, Serverless Devs is not only a CLI tool, but also a complete toolchain system. 

![](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/01.png)

In Serverless Devs, developers can be:

- **Open source contributors**: develop [components or applications](package_dev.md) by following the [Serverless Package Model](../../spec/en/0.0.2/serverless_pacakge_model/readme.md) specification, and share their development results to Serverless Hub with anyone inside or outside the communities.

- **Serverless developers**: [initialize applications](quick_start.md) and use the components [with developer tools](quick_start.md), including CLI tools and the tools on desktops, to deploy services online as expected.

In Serverless Devs infrastructure, you may find that Serverless Devs have similar names and modules as other development modes or ecosystems.

- **Serverless Hub**: provides resources, such as components, applications, and cases. It is similar to Docker Hub.
- **Serverless Registry**: manages components or applications, or provides specification models. It is similar to Pypi in the Python ecosystem or NPM in the Node.js ecosystem.

Serverless Hub provides two forms of packages, including components and applications.

As you can find in the preceding figure, the two words component and application appear frequently. 
- **Component**: refers to a block of code that follows the Serverless Package Model specification that is developed and published by Package developers. The code block is referenced in an application, loaded in Serverless Devs tools, and executed to perform specified operations based on the predefined rules. For example, you can deploy your code on Serverless Devs, build and package Serverless applications, and debug Serverless applications. 
- **Application**: refers to an application that is shared and published to Serverless Registry by Package developers for more people to learn and use. For example, a contributor has contributed an application that is used to recognize cats and dogs, or an individual developer has developed a facial recognition application. An application can use one or more components, and the application is deployed on Serverless Devs by using Serverless Devs developer tools. For example, you have developed an application that is used to recognize cats and dogs. In the application, you use the Lambda component to deploy service logics to FaaS and the Website component to deploy frontend code to Object Storage Service (OSS).

The design principles of Serverless Devs models are to help developers to focus more on business logics and improve the efficiency in developing, deploying, and maintaining Serverless applications by using a simpler, more scientific, and more standardized Serverless toolchain system. Developers can use Serverless products of different cloud vendors and from open source communities in a more flexible and convenient way. This helps you manage Serverless applications in a more efficient, concise, and convenient manner. 



## Growth history

![](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/02.png)


Serverless improves the development efficiency of traditional applications, and the Serverless Devs developer tools improve the performance of Serverless application development. Serverless Devs is developed from version 1.0 to version 2.0, of which has leap from simple efficiency improvement to a more standardized and scientific efficiency improvement. We hope that the Serverless Devs toolchain mode and ideas can provide great convenience and manage application development and traditional projects on the Serverless architecture in a more scientific manner. 

- On October 23, 2020, Serverless Devs, a Serverless developer platform, was officially open-sourced.
- In November, 2020, Serverless Devs was included by Cloud Native Computing Foundation (CNCF) Landscope, which is the first included serverless tool in China.
- In November, 2020, the Serverless Developer Meetup was first held and became a new channel for Serverless technical communications with developers.
- In November, 2020, Serverless Devs was shortlisted for InfoQ and was nominated one of the Top 10 new open source projects in 2020.
- In December, 2020, the number of Serverless Devs downloads exceeded 5,000, and the cumulative usage of components and applications exceeded 10,000.
- In April, 2021, Serverless Developer Meetup was held in Shanghai, China and the Serverless Devs 2.0 was officially released.
- In June, 2021, the number of Serverless Devs downloads exceeded 10,000.
- In July, 2021, Serverless Developer Meetup was held in Hangzhou, China. In the conference, the Alibaba Cloud Function Compute team officially released the features of Serverless Devs, including cloud-terminal joint debugging and the Serverless desktop client.
- In August, 2021, the number of Serverless Devs downloads exceeded 20,000.
- In October, 2021, a keynote speech of Serverless Devs is delivered, whose topic focuses on how to build a toolchain in the full lifecycle of serverless at 2021 OpenInfra Days China.
- In December, 2021, Serverless Developer Meetup was held in Shanghai, China, and Serverless Devs Model was introduced to the public.



## Next up

In the future, Serverless Devs will: - Support more cloud vendors and cloud products. - Develop and launch Serverless Devs IDE Plugin. - Continuously promote the development of Serverless ecosystem, especially the development of Serverless tool chain ecosystem.

For more information about our roadmaps, see [GitHub Projects](https://github.com/Serverless-Devs/Serverless-Devs/projects). 

## Communication community

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="200px" > |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <center>WeChat official account：`serverless`</center>       | <center>WeChat friend：`xiaojiangwh`</center>                | <center>DingTalk Froup：`33947367`</center>                  |

</p>

