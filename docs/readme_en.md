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

**Serverless Devs** is an open source serverless developer platform dedicated to providing developers with a powerful toolchain system. Through this platform, developers can not only experience multi-cloud serverless products with one click, deploy serverless projects at an extreme speed, but also manage projects in the entire life cycle of serverless applications, and combine Serverless Devs with other tools/platforms very simply and quickly to further Improve R&D, operation and maintenance efficiency.

![picture alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635319587379_20211027072627561648.png)

> For more introduction to Serverless Devs, please refer to [Project Introduction Document](./en/readme.md)

# Quick start

❶ Install Node.js(>=14.14.0) and NPM package management tool;
❷ Install Serverless Devs developer tools;
```shell script
$ npm install @serverless-devs/s -g
````
❸ Execute the command `s` in the command line and press Enter to start your Serverless journey;

> For more details, please refer to [Serverless Devs Installation Documentation](./en/quick_start.md) and [Quick Start Guide](./en/quick_start.md)

# Documentation


- Hosted
  - Alibaba Cloud Function Compute (FC): [Project repository](https://github.com/devsapp/fc)
  - AWS Lambda: [Project repository](https://github.com/devscomp/lambda)
  - Baidu Intelligent Cloud Function Computing (CFC): [Project Repository](https://github.com/xinwuyun/cfc)
  - HUAWEI CLOUD Function Workflow (FG): [Project Repository](https://github.com/zy-linn/fgs-component)
  - Tencent Cloud Function (SCF): [Project repository](https://github.com/devscomp/scf)
- Installable
  - OpenFunction(of): [Project repository](https://github.com/OpenFunction/serverless-devs)
  - Laf: Coming soon...

> If you want to contribute Packages (including components and applications) to Serverless Devs, you can refer to [Package Development Documentation](en/package_dev.md)

> Serverless Devs naturally supports Yaml mode and Cli mode. For the differences and trial scenarios, please refer to the document [ **Yaml mode Cli mode comparison**](./en/yaml_and_cli.md); about [**Exit Code define**](./en/tool.md#exit-code-definition) , [**Yaml file priority specification**](./en/tool.md#yaml-file-priority-specification) , [* *Key usage order and specification**](./en/tool.md#Usage-order-and-specification-of-keys) , [**Setting keys through environment variables**](./en/tool.md#Configure-keys-by-using-environment-variables) For more details about project design, please refer to [**Developer tool design document**](./en/tool.md)

# Related resources

FaaS platforms/products currently supported by the Serverless Devs project:

- Alibaba Cloud Function Compute (FC): [Project repository](https://github.com/devsapp/fc)
- AWS Lambda: [Project repository](https://github.com/devscomp/lambda)
- Baidu Intelligent Cloud Function Computing (CFC): [Project Repository](https://github.com/xinwuyun/cfc)
- HUAWEI CLOUD Function Workflow (FG): [Project Repository](https://github.com/zy-linn/fgs-component)
- Tencent Cloud Function (SCF): [Project repository](https://github.com/devscomp/scf)

> Although the above FaaS platforms/products have been contributed or are under continuous maintenance, we still welcome everyone to contribute/maintain. In addition, other FaaS platforms/products (such as Google Cloud Platform Functions, Azure Functions, etc.) , we also very much hope that the small partners in the community can participate in the development and contribution.

> 🚀 Besides, the Serverless Devs project also has many excellent components and applications, you can refer to [Awesome](./en/awesome.md)

# Project expectations

- Serverless Devs hopes to provide serverless developers with a serverless developer tool that can play a role in the entire life cycle of serverless applications without vendor lock-in;
- Serverless Registry hopes to provide a complete set of package management specifications for the serverless ecosystem, similar to pypi in Python, npm in Nodejs, etc., and will use this to open and share serverless packages and build a serverless ecosystem;
- The Serverless Developer Meetup hopes to create a community event that is most in line with Serverless developers. Through this event, we hope that more people can communicate with us and learn about Serverless-related products;

# Contribution

We very much hope that you can contribute to this project with us. Contributions include but are not limited to code maintenance, application/component contribution, documentation improvement, etc. For more details, please refer to [ 🏆 Contribution Guide](../CONTRIBUTING.md).

At the same time, we are also very grateful to all [ 👬 contributors](../CONTRIBUTORS.md) for their hard work and sweat in the Serverless Devs project.

# Specifications and licenses

Serverless Devs follow the [Apache-2.0 license](../LICENSE) open source license.

All files located in `node_modules` and external directories are externally maintained libraries used by this software and have their own licenses; we recommend that you read them as their terms may differ from [Apache-2.0 license](../LICENSE) terms are different.

> Serverless Devs adopts CNCF Code of Conduct. This open governance applies to all repos under kubevela org.

# Exchange community

<p align="center">
<br/><br/>
<img src="https://landscape.cncf.io/images/left-logo.svg" width="150"/>&nbsp;&nbsp;<img src="https://landscape.cncf.io/images /right-logo.svg" width="200"/>&nbsp;&nbsp;
<br/><br/>
Serverless Devs is a CNCF Sandbox project that can be viewed at <a href="https://landscape.cncf.io/serverless?license=apache-license-2-0">CNCF Cloud Native Landscape</a>.
</p>


If you have feedback about bugs or future expectations, you can post them in [Issues](https://github.com/serverless-devs/serverless-devs/issues) and [Discussions](https://github.com/ serverless-devs/serverless-devs/discussions) for feedback and exchanges. If you'd like to join our discussion group or keep up to date with Serverless Devs, you can do so through the following channels:

<p align="center">

| <img src="https://img.alicdn.com/imgextra/i2/O1CN01zifTV61Mkg9QRNBUs_!!6000000001473-2-tps-466-462.png" width="200px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="200px" > | <img src="https://img.alicdn.com/imgextra/i1/O1CN01ECE9wN1RMvgS6d1JM_!!6000000002098-0-tps-881-877.jpg" width="200px" > |
|--- | --- | --- |
| <center>Follow WeChat Official Account: `serverless`</center> | <center>Contact WeChat Assistant: `xiaojiangwh`</center> | <center>Join DingTalk Group: `33947367`</center> |

</p>

-------------

> Serverless Devs developer tools follow [Serverless Devs Model](../spec/readme.md) , more model/specification information can refer to [Serverless Registry Model](../spec/en/0.0.2/serverless_registry_model/readme.md) , [Serverless User Model](../spec/en/0.0.2/serverless_user_model/readme.md) and [Serverless Package Model](../spec/en/0.0.2/serverless_package_model/readme.md);

> Privacy statement: In order to provide developers with an optimized user experience, Serverless Devs will collect some client-side error messages to help the community optimize tools. Of course, these error messages are all desensitized error messages. If you still have doubts or If you don't want to use this feature, you can disable it with the command `s set analysis disable`.
