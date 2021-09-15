# Serverless Devs CLI help documentation

<div align="center"> <img src="https://images.devsapp.cn/devs-github/logo.jpg" width="100%"/> </div>

<p align="center">
  <span>Use Serverless like a mobile phone</span><br>
  <span> <a href="./readme_zh.md">中文文档</a> ｜English </span>
</p>

## Project introduction

```text
  _________                               .__                         ________                     
 /   _____/ ______________  __ ___________|  |   ____   ______ ______ \______ \   _______  ________
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/  |    |  \_/ __ \  \/ /  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \   |    `   \  ___/\   /\___ \
/_______  /\___  >__|    \_/  \___  >__|  |____/\___  >____  >____  > /_______  /\___  >\_//____  >
        \/     \/                 \/                \/     \/     \/          \/     \/         \/
```

Serverless Devs is an open source serverless platform that provides a robust set of tools for developers. Developers can use Serverless Devs to experience serverless products on multiple clouds and deploy serverless projects.



### Support for mainstream serverless services and frameworks

Serverless Devs is a developer platform where components and plug-ins are provided. Serverless Devs allows each user to use the services and frameworks of serverless projects in a pluggable manner and participate in the development of components and plug-ins. Serverless Devs provides friendly support for both industry-grade serverless services and open source serverless frameworks. Developers can quickly get started with mainstream serverless services and frameworks without the need to learn all serverless tools.

### Flexible and open

Serverless Devs can describe resources in Alibaba Cloud services such as Function Compute, API Gateway, and Object Storage Service. It can also describe actions such as install, build, and publish by using the plug-ins and hooks provided by Serverless Devs. Serverless Devs does not restrict component commands. Developers are encouraged to develop more capabilities for different components to deal with more complicated scenarios. For example, Alibaba Cloud Function Compute components support conventional capabilities such as function deployment and removal, as well as customized capabilities such as log querying, metric querying, local building, dependency installation, and debugging. Such a flexible and open platform is especially useful for automated deployment and operations and maintenance (O&M). You can improve the O&M efficiency of your serverless projects by 90% if you integrate Serverless Devs into the full lifecycle of your projects.


## Help documentation

- [Installation](./en/install.md)
- [Command Instruction](./en/command.md)
- [Yaml Specification](./en/yaml.md)
- [Package Dev](./en/dev.md)
- [Registry](./en/registry.md)

## References

[https://github.com/Serverless-Devs/package-awesome/blob/main/README_zh.md](https://github.com/Serverless-Devs/package-awesome/blob/main/README_zh.md)

## Get started

### Steps to deploy a blog system for beginners

- Download the command-line tool: `npm install -g @serverless-devs/s`
- Initialize a template project: `s init devsapp/start-zblog`
- Deploy the project: `cd start-zblog && s deploy`

### Steps to build an enterprise website for beginners

- Download the command-line tool: `npm install -g @serverless-devs/s`
- Initialize a template project: `s init devsapp/start-metinfo`
- Deploy the project: `cd start-metinfo && s deploy`

For more examples, enter `s init`.
