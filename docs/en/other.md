## Introduction
Alibaba Cloud Serverless held a meetup on April 26, 2021. During this meetup, our project manager Jiangyu introduced the functional specifications of the new Serverless Devs version, also referred to as S. The introduction covered the **new multi-source code management feature, more simplified instruction sets, optimized configuration specifications, and support for multiple frameworks**. Some participants raised questions about programmable code and Infrastructure as code (IaC). Some asked whether S supports the features offered by AWS Serverless Application Model (SAM). The answer is yes. However, no details were given at the meetup due to the time constraints. This guide gives a more detailed introduction of component development in S.
## Concepts
First, let's talk about the concept of components in S. The toolset of S consists of a core instruction parser, parsing specifications, applications, and components. Components are first-class citizens in S and implement the core functional logic. The parser uses built-in parsing rules and the configuration file (s.yaml) of applications to generate input parameters for components, determine the execution sequence, and return execution results.
You can also run components without the need to configure the components. For example, you can use the following command to directly run a component method.
```bash
s cli <component> <method>
```
The component developer determines whether a component is executed based on configurations or by directly calling commands.
Most development framework components need to be used together with configuration files, which means you need to create applications to use the components. These applications are prefixed with start in the app marketplace. However, you can directly run the s cli command to use functional components such as the Function Compute API component fc-api, and the components that are used to register accounts and publish components. In most cases, you can run the **s cli <component> -d** command to view the usage documentation. You can directly copy the execution commands to use the components.
## Development basics
The components of S are developed based on TypeScript and conform to the standard npm package specification. Frontend developers can directly use the components. In the parser, the components are introduced, instantiated, and invoked based on the CommonJS specification. The official templates provide basic capabilities such as logging, documentation, and localization. You can quickly build a standard component in S based on official component templates.
## Detailed introduction
The following section describes in detail how to create, debug, and publish a component.
Before you start, you must install the latest version of [S](https://github.com/Serverless-Devs/Serverless-Devs) and the [ncc](https://github.com/vercel/ncc) compiler.
```bash
npm i @serverless-devs/s -g
```
```bash
npm i -g @vercel/ncc
```
### Initializing
```bash
s init
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/1.png)
Select Component and enter a component name to complete the initialization.
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/2.png)
The following figure shows the directory structure.
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/3.png)
### Installing dependencies
```bash
cd <project dir> && npm i  && npm start
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/4.png)
After the project is started, the doc directory is generated based on the annotations in the source code, and then the TypeScript source code is compiled and monitored. Two directories, lib and doc, are generated.
### Debugging
```bash
cd example && s
```
Go to the example directory and run the following s command. Verify that a custom command named component-test is generated.
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/5.png)
Run the following command:
```bash
s component-test -h
```
You need to specify the document that is required to execute the command.
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/6.png)
Run the following command:
```bash
s component-test test
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/7.png)
Add a Hello World function, compile the file, and then run the file. Note that you must run the npm run doc command in the component root directory.
```bash
s component-test -h
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/8.png)
Verify that the new function is added to the document.
### Publishing
Before you start, you must have a Serverless Devs account. You can run the following command to create an account.
```bash
s cli platform register
```
After you create an account, you can directly use your account to publish applications and components. You must go to the component root directory to publish a component.
```bash
npm run publish
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/9.gif)
### Component testing
#### Method 1:
Go to the example directory and set the value of the component parameter to the name of the component that you want to publish.
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/10.png)
Run the following command in the current directory:
```bash
s component-test -h
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/11.gif)
Verify that the component is downloaded. If a success message appears, the component is ready for use.

#### Method 2:
Use the component without configurations and invoke the component in a random directory.
```bash
s cli <component name> -d
```
![image](https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/12.png)

## Conclusion
The preceding steps demonstrate how to quickly build a component in S and share the component with other developers on Serverless Hub.
I have developed [a component for static site hosting](https://github.com/devsapp/static-site). You can look into the source code to deepen your understanding of component development.
Back to our topic. The components in S are highly scalable and can be programmed in a flexible manner. Why do we say that component development in S belongs to the cloud-oriented programming paradigm? The reason is that S is designed to serve the cloud-native serverless ecosystem and provide a platform that connects the end to the cloud.
We believe that, in the future, all developers will maintain a close relationship with the cloud and use the elasticity and unlimited computing power provided by the cloud for development and production.
We also believe that cloud service providers will provide APIs to openly share cloud resources for everyone to use, similar to necessities such as water, electricity, and coal. The issue is, except for a small number of software service providers who specialize in cloud service integration and individual developers who are engaged in related aspects, most developers only need the ability to use cloud resources and do not want to engage in development work that is not business required for this purpose. As a solution, S provides tools that aim to bridge this gap and bring cloud integration developers and cloud service users together. Cloud service developers can utilize the open capabilities offered by the cloud to develop code, build a series of business application scenarios, and share them on Serverless Hub. Cloud service users no longer need to waste time or energy on cloud asset management. Thanks to the ready-made application components on Serverless Hub, they can focus on improving their business capabilities. Cloud vendor lock-in does not occur in S, which means developers can perform complex management operations across clouds from different providers. In the future, it is expected that most enterprises will adopt hybrid cloud deployments, which will make S a more valuable project.
We look forward to more developers joining us and developing more components and even core code for the parser.
## Postscript

- To view a video introduction of component development, see https://example-static.oss-cn-beijing.aliyuncs.com/component-discussions/video.mov.
- Join Serverless Devs and become a commiter

We firmly believe that frontend-oriented serverless development will become more mainstream in the future. This includes frontend and backend integration, Jamstack sites, and function APIs.
Serverless Devs aims to accelerate the process and let more developers reap the benefits of serverless development. The community needs more participants. We hope that more developers will join us to make the community stronger.
Requirements

- Have a strong passion for learning new things and an interest in serverless development.
- Follow the trends of Serverless Devs and have 2 to 3 hours free for coding each week.
- Creative personality with the ability to create components or applications based on real-life scenarios, or well-experienced in JavaScript coding or open source command-line tool development and SDK development.

Benefits

- Have access to the latest information about serverless development.
- Contributors are prioritized for recruitment.
- Chances to be invited as special guests to Serverless Devs meetup events and share your stories.
