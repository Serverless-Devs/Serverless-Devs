<div align=center> <img src="https://images.devsapp.cn/devs-github/logo.jpg" width="100%"/> </div>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/v/@serverless-devs/s" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/dy/@serverless-devs/s" alt="npm download">
  </a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%2010.8.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
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

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

> For more information about Serverless Devs, please refer to [project introduction document](./docs/en/readme.md)

# Get started

❶ Install Node.js(>=10.8.0) and NPM tool；   
❷ Install Serverless Devs；   
```shell script
$ npm install @serverless-devs/s -g
```
❸ Execute the command `s` on the command line and press enter to start your Serverless journey；   

> For more details, please refer to [Serverless Devs installation document](./docs/en/install.md) and [Quick start guide](./docs/en/quick_start.md)

# Documentation

- [Installation documentation](./docs/en/install.md)
- [Command line operation](./docs/en/command/readme.md)
- [Yaml specification](./docs/en/yaml.md)
- [Configuration inheritance/multi-environment](./docs/en/extend.md)
- [CI/CD platform integration](./docs/en/cicd.md)

> If you want to contribute package (including components and Applications) to serverless devs, you can refer to [Package development document](./docs/en/package_dev.md)   

> Serverless devs naturally supports yaml mode and cli mode. For their differences and trial scenarios, please refer to the document [**Yaml mode and CLI mode comparison**](./docs/en/yaml_and_cli.md)；About [**Exit Code Definition**](./docs/en/tool.md#exit-code-definition) , [**Yaml File Priority Specification**](./docs/en/tool.md#yaml-file-priority-specification) , [**Key usage order and specification**](./docs/en/tool.md#Key-usage-order-and-specification) , [**Setting keys through environment variables** ](./docs/en/tool.md#Set-key-through-environment-variable) For more details about project design, please refer to [**Developer tool design document**](./docs/en/tool.md )

# Related resources

FaaS platforms/products currently supported by the Serverless Devs project:

- Hosted
  - Alibaba Cloud Function Compute (FC): [Project repository](https://github.com/devsapp/fc)
  - AWS Lambda: [Project repository](https://github.com/devscomp/lambda)
  - Baidu Intelligent Cloud Function Computing (CFC): [Project Repository](https://github.com/xinwuyun/cfc)
  - HUAWEI CLOUD Function Workflow (FG): [Project Repository](https://github.com/xinwuyun/fg)
  - Tencent Cloud Function (SCF): [Project repository](https://github.com/devscomp/scf)
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

# License

Serverless Devs follow the [MIT License](./LICENSE) open source license.

All files located in `node_modules` and external directories are externally maintained libraries used by this software and have their own licenses; we recommend that you read them as their terms may differ from the terms of the [MIT License](./LICENSE) different.

# Exchange community

If you have feedback about bugs or future expectations, you can post them in [Issues](https://github.com/serverless-devs/serverless-devs/issues) and [Discussions](https://github.com/serverless-devs/serverless-devs/discussions) for feedback and exchanges. If you want to join our discussion group or keep up to date with Serverless Devs, you can do so through the following channels:

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="200px" > |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <center>WeChat official account：`serverless`</center>       | <center>WeChat friend：`xiaojiangwh`</center>                | <center>DingTalk Group：`33947367`</center>                  |

</p>

-----------

> Serverless Devs developer tools follow [Serverless Devs Model](./spec/readme.md) , more model/specification information can refer to [Serverless Registry Model](./spec/en/0.0.2/serverless_registry_model/readme.md) , [Serverless User Model](./spec/en/0.0.2/serverless_user_model/readme.md) and [Serverless Package Model](./spec/en/0.0.2/serverless_package_model/readme.md).

> Privacy statement: In order to provide developers with an optimized user experience, Serverless Devs will collect some client-side error messages to help the community optimize tools. Of course, these error messages are all desensitized error messages. If you still have doubts or If you don't want to use this feature, you can disable it with the command `s set analysis disable`.
