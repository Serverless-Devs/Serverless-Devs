---
title: Package development
description: 'Serverless Devs Package development documentation'
position: 6
category: 'Overview'
---


# Package development documentation


- [Component development instructions](#Component-development-instructions)
- [Application development instructions](#Application-development-instructions)
- [Plugin development instructions](#Plugin-development-instructions)

> Note: 
> - By default, templates for developing Serverless Devs components and applications are integrated into Serverless Devs developer tools. Package developers can directly use the templates. 
> - The development of Package must follow [Serverless Package Model](../../spec/en/0.0.2/serverless_registry_model/readme.md) and conform to relevant specifications. This way, the developers can use Serverless Registry and Serverless Devs to work for future development. 
> - For the best practices in developing Serverless Devs applications and components, refer to : 
>   - [community forum #62](https://github.com/Serverless-Devs/Serverless-Devs/discussions/62);
>   - [community forum #407](https://github.com/Serverless-Devs/Serverless-Devs/discussions/407);
>   - [community forum #439](https://github.com/Serverless-Devs/Serverless-Devs/discussions/439); 

## Component development instructions

> The development of Serverless Devs components is strictly in line with the [component model specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Component-model-specification) in [Serverless Package Model](../../spec/en/0.0.2/serverless_package_model/readme.md). In the [component model specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Component-model-specification), the instructions on [component model metadata](../../spec/en/0.0.2/serverless_package_model/package_model.md#Component-model-specification) and [component model code specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Component-model-metadata) are described. 

> 🐵 Note: When you develop Serverless Devs components, you need the following capabilities when you develop Serverless Devs components. The capabilities include but not limited to: 
> - Obtain user key pair information. 
> - Generate more standardized outputs. 
> - Capability to parse parameters input by users. 
> ......   
> You can obtain these capabilities from the [Core package](https://github.com/Serverless-Devs/core) that is provided by Serverless Devs. For more information about the [Core package](https://github.com/Serverless-Devs/core), see [Development documentation of the Core package](https://github.com/Serverless-Devs/core).

The component development cases of Serverless Devs are integrated into the Serverless Devs CLI tool. You can use the CLI tool to initialize a component project that is not developed. Developers only need to run the `s init` command, and the following command output is returned:

```shell script

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

Select the last line `Dev Template for Serverless Devs` and press the Enter key. The following command output is returned: 

```shell script
$ s init

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Application Scaffolding 
  Component Scaffolding 
```

Select `Component Scaffolding` and press the Enter key. The project of a Serverless Devs component is initialized. You can run the following command to view the file tree:

```shell script
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____LICENSE
|____.signore
|____example
| |____s.yaml
|____readme.md
|____publish.yaml
|____.gitignore
|____package.json
|____tsconfig.json
|____src
| |____common
| | |____entity.ts
| | |____logger.ts
| |____index.ts
```

The following table describes the directories in the file tree.

| Directory     | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| LICENSE       | The default license for the project. The  default license follows the Massachusetts Institute of Technology (MIT) open  source protocol. We recommend that you use the default license. |
| .signore      | The file that can be ignored in your  package when you publish a project. The .signore file is similar to the .npmignore file that you can use to keep the ignored file out of your  package when you publish npm packages. |
| example       | The test application of the component.                       |
| publish.yaml  | The file that is required for the project.  The file is identifiable for developers of the Serverless Devs Package. |
| .gitignore    | The file that can be ignored when the  project is committed to GitHub. |
| package.json  | The package.json file of the Node.js  runtime environment. The detailed position of the component handler is  described in the file. |
| tsconfig.json | The tsconfig.json file of a TypeScript  project, which describes the information that is required to compile the  TypeScript project. |
| src           | The directory that is used to store the  source code files of users. |
| readme.md     | The description of the project version,  such as the updates of the current version. |


Developers can use the code in the src directory for development. By default, the initialization project is a TypeScript project. This way, developers need to run the `npm run build` command to compile the code into JavaScript. After the code of the project is compiled into JavaScript, developers also need to write the `publish.yaml` file. After the preceding operations are complete, you can commit the project to different sources. For example, if you want to commit the project to GitHub Registry, you can create a repository named `Public` in GitHub, store the compiled code into the repository, and then publish a version. In this case, the application is available on Serverless Devs clients. 

## Application development instructions

> The development of Serverless Devs applications must strictly conform to the [application model specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Application-model-specification) in [Serverless Package Model](../../spec/en/0.0.2/serverless_package_model/readme.md). In the [application model specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Application-model-specification), the instructions on [application model metadata](../../spec/en/0.0.2/serverless_package_model/package_model.md#Application-model-metadata) are described. 

The component development cases of Serverless Devs are integrated into the Serverless Devs CLI tool. You can use the CLI tool to initialize an application project that is not developed. Developers only need to run the s init command, and the following command output is returned:

```shell script

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

Select the last line `Dev Template for Serverless Devs` and press the Enter key. The following command output is returned: 


```shell script
$ s init

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Application Scaffolding 
  Component Scaffolding 
```

Select the `Application Scaffolding` and press the Enter key. The project of a Serverless Devs application is initialized. You can view the file tree by using the following command:

```shell script
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____readme.md
|____version.md
|____publish.yaml
|____src
| |____s.yaml
| |____index.js
```

The following table describes the directories in the file tree: 

| Directory    | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| readme.md    | Description of the component, or help  documentations.       |
| version.md   | The description of the project version,  such as the updates of the current version. |
| publish.yaml | The file that is a required for the  project. The file is identifiable for developers of Serverless Devs Package. |
| src          | The directory where the application is  located, which needs to include s.yaml and related application code. |


Developers can develop applications by using the code stored in the src directory and write the `publish.yaml` file for the project. After the preceding operations are complete, you can commit the project to different sources. For example, if you want to commit the project to GitHub Registry, you can create a repository named `Public` in GitHub, store the compiled code into the repository, and then publish a version. In this case, the application is available on Serverless Devs clients.

## Plugin development instructions

> The development of Serverless Devs plugin is strictly in line with the [plugin model specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Plugin-model-specification) in [Serverless Package Model](../../spec/en/0.0.2/serverless_package_model/readme.md). In the [plugin model specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Plugin-model-specification), the instructions on [plugin model metadata](../../spec/en/0.0.2/serverless_package_model/package_model.md#Plugin-model-specification) and [plugin model code specification](../../spec/en/0.0.2/serverless_package_model/package_model.md#Plugin-model-metadata) are described. 

The component development cases of Serverless Devs are integrated into the Serverless Devs CLI tool. You can use the CLI tool to initialize a plugin project that is not developed. Developers only need to run the `s init` command, and the following command output is returned:

```shell script

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

Select the last line `Dev Template for Serverless Devs` and press the Enter key. The following command output is returned: 

```shell script
$ s init

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
❯ Application Scaffolding 
  Component Scaffolding 
  Plugin Scaffolding 
```

Select `Plugin Scaffolding` and press the Enter key. The project of a Serverless Devs component is initialized. You can run the following command to view the file tree:

```shell script
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____LICENSE
|____.signore
|____example
| |____s.yaml
|____readme.md
|____publish.yaml
|____.gitignore
|____package.json
|____src
| |____common
| | |____entity.ts
| | |____logger.ts
| |____index.ts
```

The following table describes the directories in the file tree.

| Directory     | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| LICENSE       | The default license for the project. The  default license follows the Massachusetts Institute of Technology (MIT) open  source protocol. We recommend that you use the default license. |
| .signore      | The file that can be ignored in your  package when you publish a project. The .signore file is similar to the .npmignore file that you can use to keep the ignored file out of your  package when you publish npm packages. |
| example       | The test application of the component.                       |
| publish.yaml  | The file that is required for the project.  The file is identifiable for developers of the Serverless Devs Package. |
| .gitignore    | The file that can be ignored when the  project is committed to GitHub. |
| package.json  | The package.json file of the Node.js  runtime environment. The detailed position of the plugin handler is  described in the file. |
| src           | The directory that is used to store the  source code files of users. |
| readme.md     | The description of the project version,  such as the updates of the current version. |


Developers can use the code in the src directory for development. By default, the initialization project is a TypeScript project. This way, developers need to run the `npm run build` command to compile the code into JavaScript. After the code of the project is compiled into JavaScript, developers also need to write the `publish.yaml` file. After the preceding operations are complete, you can commit the project to different sources. For example, if you want to commit the project to GitHub Registry, you can create a repository named `Public` in GitHub, store the compiled code into the repository, and then publish a version. In this case, the application is available on Serverless Devs clients. 

