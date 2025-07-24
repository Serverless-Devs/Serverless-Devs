<div align=center> <img src="https://images.devsapp.cn/devs-github/logo.jpg" width="100%"/> </div>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/v/@serverless-devs/s" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/dy/@serverless-devs/s" alt="npm download">
  </a>
  <a href="https://bestpractices.coreinfrastructure.org/projects/6486"><img src="https://bestpractices.coreinfrastructure.org/projects/6486/badge"></a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%2014.14.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-Apache2.0-green" alt="license">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/issues">
    <img src="https://img.shields.io/github/issues/serverless-devs/serverless-devs" alt="issues">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/discussions">
    <img src="https://img.shields.io/github/discussions/serverless-devs/serverless-devs" alt="discussions">
  </a>
</p>

<p align="center">
  <span><b>Serverless application lifecycle management tool</b></span><br>
</p>

<p align="center">
  <span><b><a href="./readme.md">中文</a> ｜ <a href="./readme_en.md">English</a></b></span><br>
</p>

**Serverless Devs** is an open source and open serverless developer platform dedicated to providing developers with a powerful tool chain system. Through this platform, developers can not only experience multi cloud serverless products with one click and rapidly deploy serverless projects, but also manage projects in the whole life cycle of serverless applications, and combine serverless devs with other tools / platforms very simply and quickly to further improve the efficiency of R & D, operation and maintenance.

# Six Benefits

![picture alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

- **Easy deployment**: The pluggable features of Serverless Devs allows you to easily deploy projects of different vendors, or allows you to deploy the projects on different cloud platforms with a few clicks. Serverless Devs supports multi-cloud products based on Function-as-a-Service (FaaS). The multi-cloud products include [Alibaba Cloud Function Compute](https://github.com/devsapp/fc), [AWS Lambda](https://github.com/devscomp/lambda), [Baidu Cloud Function Compute (CFC)](https://github.com/xinwuyun/cfc), [HUAWEI CLOUD FunctionGraph](https://github.com/zy-linn/fgs-component), and [Tencent Cloud Serverless Cloud Function (SFC)](https://github.com/devscomp/scf).
- **Open source development**: Developers develop projects by using open source code in an open ecosystem. Developers can view and participate in the contributions to Serverless Devs developer tools, and can also make contributions to related components and applications anytime and anywhere. In addition to the open source development, some enterprise grade teams are encouraged to build registry by using [Serverless Registry Mode](./spec/en/0.0.2/serverless_registry_model/readme.md) to customize components that are inconvenient to disclose to the public.
- **Pluggable features**: The capabilities of Serverless Devs are implemented by using components, and the components are pluggable. Developers can customize relevant commands and features for the components. Developers can select different components in an application to meet the requirements of different modules.
- **Hands-on tutorials**: Based on models and specification of open Serverless Registry, multiple [hands-on cases that are in different forms](./docs/en/awesome.md) and can be applied to scenarios in diverse industries. Beginners are provided with the hands-on cases that help them quickly understand, learn, and get started with projects in the Serverless architecture. Various projects are described in the tutorials, such as [**Serverless: Hello World**](./docs/en/quick_start.md#ServerlessHello-World) in [Hands-on guide](./docs/en/quick_start.md), [**Artificial intelligence: object detection**](./docs/en/quick_start.md#AITarget-Detection), and [**Traditional framework: Django-based blog projects**](./docs/en/quick_start.md#Traditional-framework-based-on-django-blog-project).
- **Full lifecycle management**: With the support of components, Serverless Devs can unleash its power to manage applications in a project during the full lifecycle. For example, developers can use[ the FC component of Alibaba Cloud Function Compute](https://github.com/devsapp/fc) to create applications in a project and manage the applications during the full lifecycle, in which the developers can develop, debug, and observe the project.
- **Excellent integration**: Projects on Serverless Devs can be well integrated. With the support of components, the projects can be easily integrated into the traditional ecosystems. The Serverless Devs developer tools can also be integrated into mass automated processes. For example, cases, such as the [**integration with GitHub Action**](./docs/en/cicd.md#Integration-with-GitHub-Actions), [**integration with Gitee Go**](./docs/en/cicd.md#Integration-with-Gitee-Go), and [**integration with Jenkins**](./docs/en/cicd.md#Integration-with-Jenkins), are described in [CI/CD documentations](./docs/en/cicd.md).

# Design principles

Serverless Devs is an open source toolchain project in the Serverless field. To a certain extent, Serverless Devs is not only a CLI tool, but also a complete toolchain system.

![](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/01.png)

In Serverless Devs, developers can be:

- **Open source contributors**: develop [components or applications](./docs/en/package_dev.md) by following the [Serverless Package Model](./spec/en/0.0.2/serverless_pacakge_model/readme.md) specification, and share their development results to Serverless Hub with anyone inside or outside the communities.
- **Serverless developers**: [initialize applications](./docs/en/quick_start.md) and use the components [with developer tools](./docs/en/quick_start.md), including CLI tools and the tools on desktops, to deploy services online as expected.

In Serverless Devs infrastructure, you may find that Serverless Devs have similar names and modules as other development modes or ecosystems.

- **Serverless Hub**: provides resources, such as components, applications, and cases. It is similar to Docker Hub.
- **Serverless Registry**: manages components or applications, or provides specification models. It is similar to Pypi in the Python ecosystem or NPM in the Node.js ecosystem.

As you can find in the preceding figure, the two words component and application appear frequently.
- **Component**: refers to a block of code that follows the Serverless Package Model specification that is developed and published by Package developers. The code block is referenced in an application, loaded in Serverless Devs tools, and executed to perform specified operations based on the predefined rules. For example, you can deploy your code on Serverless Devs, build and package Serverless applications, and debug Serverless applications.
- **Application**: refers to an application that is shared and published to Serverless Registry by Package developers for more people to learn and use. For example, a contributor has contributed an application that is used to recognize cats and dogs, or an individual developer has developed a facial recognition application. An application can use one or more components, and the application is deployed on Serverless Devs by using Serverless Devs developer tools. For example, you have developed an application that is used to recognize cats and dogs. In the application, you use the Lambda component to deploy service logics to FaaS and the Website component to deploy frontend code to Object Storage Service (OSS).

The design principles of Serverless Devs models are to help developers to focus more on business logics and improve the efficiency in developing, deploying, and maintaining Serverless applications by using a simpler, more scientific, and more standardized Serverless toolchain system. Developers can use Serverless products of different cloud vendors and from open source communities in a more flexible and convenient way. This helps you manage Serverless applications in a more efficient, concise, and convenient manner.

# Growth history

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

# Get started

❶ Install Node.js(>=14.14.0) and NPM tool；   
❷ Install Serverless Devs；   
```shell script
$ npm install @serverless-devs/s -g
```
❸ Execute the command `s` on the command line and press enter to start your Serverless journey；   

> For more details, please refer to [Serverless Devs installation document](./docs/en/quick_start.md) and [Quick start guide](./docs/en/quick_start.md)

# Documentation

- [Installation documentation](./docs/en/quick_start.md)
- [Command line operation](./docs/en/command/readme.md)
- [Yaml specification](./docs/en/yaml.md)
- [Configuration inheritance/multi-environment](./docs/en/extend.md)
- [CI/CD platform integration](./docs/en/cicd.md)

> If you want to contribute package (including components and Applications) to serverless devs, you can refer to [Package development document](./docs/en/package_dev.md)   

> Serverless devs naturally supports yaml mode and cli mode. For their differences and trial scenarios, please refer to the document [**Yaml mode and CLI mode comparison**](./docs/en/yaml_and_cli.md)；About [**Exit Code Definition**](./docs/en/tool.md#exit-code-definition) , [**Yaml File Priority Specification**](./docs/en/tool.md#yaml-file-priority-specification) , [**Key usage order and specification**](./docs/en/tool.md#Key-usage-order-and-specification) , [**Setting keys through environment variables** ](./docs/en/tool.md#Set-key-through-environment-variable) For more details about project design, please refer to [**Developer tool design document**](./docs/en/tool.md )

# Related resources

FaaS platforms/products currently supported by the Serverless Devs project:

- Hosted
  - Alibaba Cloud Function Compute (FC): [Project repository](https://github.com/devsapp/fc3)
  - AWS Lambda: [Project repository](https://github.com/devscomp/lambda)
  - Baidu Intelligent Cloud Function Computing (CFC): [Project Repository](https://github.com/xinwuyun/cfc)
  - HUAWEI CLOUD Function Workflow (FG): [Project Repository](https://github.com/zy-linn/fgs-component)
  - Tencent Cloud Function (SCF): [Project repository](https://github.com/devscomp/scf)
  - Volcano Engine Function as a Service (veFaaS): [Project registry](https://registry.serverless-devs.com/details/volcano-vefaas?type=Component)
- Installable
  - OpenFunction(of): [Project repository](https://github.com/OpenFunction/serverless-devs)
  - Laf: Coming soon...


> Although the above FaaS platforms/products have been contributed or are under continuous maintenance, we still welcome everyone to contribute/maintain. In addition, other FaaS platforms/products (such as Google Cloud Platform Functions, Azure Functions, etc.) , we also very much hope that the small partners in the community can participate in the development and contribution.

> 🚀 In addition, the Serverless Devs project also has many excellent components and applications, you can refer to [Awesome](./docs/en/awesome.md)

# Project expectations

- Serverless Devs hopes to provide serverless developers with a serverless developer tool that can play a role in the entire life cycle of serverless applications without vendor lock-in;
- Serverless Registry hopes to provide a complete set of package management specifications for the serverless ecosystem, similar to pypi in Python, npm in Nodejs, etc., and will use this to open and share serverless packages and build a serverless ecosystem;
- The Serverless Developer Meetup hopes to create a community event that is most in line with Serverless developers. Through this event, we hope that more people can communicate with us and learn about Serverless-related products;

# Contribution

We very much hope that you can contribute to this project with us. Contributions include but are not limited to code maintenance, application/component contribution, documentation improvement, etc. For more details, please refer to [ 🏆 Contribution Guide](./CONTRIBUTING.md).

At the same time, we are also very grateful to all [ 👬 contributors](./CONTRIBUTORS.md) for their hard work and sweat in the Serverless Devs project.

# Specifications and licenses

Serverless Devs follow the [Apache-2.0 license](./LICENSE) open source license.

All files located in `node_modules` and external directories are externally maintained libraries used by this software and have their own licenses; we recommend that you read them as their terms may differ from [Apache-2.0 license](./LICENSE) terms are different.

> Serverless Devs adopts CNCF Code of Conduct. This open governance applies to all repos under kubevela org.

# Exchange community

<p align="center">
<br/><br/>

![](https://landscape.cncf.io/images/cncf-landscape-horizontal-color.svg)

<br/><br/>
Serverless Devs is a CNCF Sandbox project that can be viewed at <a href="https://landscape.cncf.io/?group=serverless&view-mode=grid&item=serverless--tools--serverless-devs-serverless">CNCF Cloud Native Landscape</a>.
</p>


If you have feedback about bugs or future expectations, you can post them in [Issues](https://github.com/serverless-devs/serverless-devs/issues) and [Discussions](https://github.com/serverless-devs/serverless-devs/discussions) for feedback and exchanges. If you'd like to join our discussion group or keep up to date with Serverless Devs, you can do so through the following channels:

<p align="center">

| <img src="https://img.alicdn.com/imgextra/i2/O1CN01zifTV61Mkg9QRNBUs_!!6000000001473-2-tps-466-462.png" width="200px" > | <img src="https://img.alicdn.com/imgextra/i3/O1CN016kRQ1A24zePZnV87T_!!6000000007462-0-tps-528-528.jpg" width="200px" > | <img src="https://img.alicdn.com/imgextra/i1/O1CN01ECE9wN1RMvgS6d1JM_!!6000000002098-0-tps-881-877.jpg" width="200px" > |
|--- | --- | --- |
| <center>Follow WeChat Official Account: `serverless`</center> | <center>Contact WeChat Assistant: `xiaojiangwh`</center> | <center>Join DingTalk Group: `33947367`</center> | 

</p>

-----------

> Serverless Devs developer tools follow [Serverless Devs Model](./spec/readme.md) , more model/specification information can refer to [Serverless Registry Model](./spec/en/0.0.2/serverless_registry_model/readme.md) , [Serverless User Model](./spec/en/0.0.2/serverless_user_model/readme.md) and [Serverless Package Model](./spec/en/0.0.2/serverless_package_model/readme.md).

> Privacy statement: In order to provide developers with an optimized user experience, Serverless Devs will collect some client-side error messages to help the community optimize tools. Of course, these error messages are all desensitized error messages. If you still have doubts or If you don't want to use this feature, you can disable it with the command `s set analysis disable`.

