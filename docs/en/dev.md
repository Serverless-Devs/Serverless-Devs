# Serverless Devs developer guides

Serverless Devs is a development tool that consists of a wide variety of components. Serverless Devs provides an ecosystem for serverless development based on community efforts and enables developers to develop serverless applications by using custom components.

The common process to develop a package consists of the following steps:

- [Initialize a package](#Initialize a package)
- [Develop projects](#Develop projects)
- [Publish a package](#Publish a package)


## Initialize a package

You can use `s init` commands to select the `application`, `component`, or `plugin`. The three objects have the following differences:

-----

Serverless Devs Tool is a project where components and plug-ins coexist. The following table lists the differences between components and plug-ins.

|     | Component | plug-in |
|  ----  | ----  |  ----  |
| Self-contained use | Yes | No |
| Dependent | On projects | On components |

For further explanation, see the following example.

```yaml
# This code block creates an application.
edition: 1.0.0
name: FullStack
access: xxx-account1

services:
  nextjs-portal:
    component: fc # fc is a component.
    props:
      src: ./frontend_src
      url: ${backend.output.url}
    actions:
      pre-deploy:
        - plugin: plugin-name # This is a plug-in, which is executed before the deploy method is executed.
```

In the YAML file, the name of the project is `Projectname`, and this project depends on the `stest` component. Before the project executes the `deploy` method, a component called `stst_plugin` must be executed. The deploy method is defined by the `stest` component. The following figure shows the relationship between components, plug-ins, and YAML files.

![](https://images.devsapp.cn/s-tool/zh/component-application-plugin-2.jpg)

Multiple projects can be deployed in a YAML file. Each project corresponds to a component that deploys the project. However, a plug-in may be required for some components to better perform a task. For example, assume that you are deploying a static website project. You can use the `Website` component to deploy the project online. However, if the project is a Vue project, you must run the `npm build` command before you deploy the project. In this case, you can add another plug-in on top of the `Website` component to deploy the project. This method is useful in project engineering or in the CICD process.

Then, what is an application? An application can be defined in a broader sense to include resource description files (or YAML files) and the code supplied with the files. The following figure shows an example of the application architecture.

![](https://images.devsapp.cn/s-tool/zh/component-application-plugin-3.jpg)

An application can be a `hello_world` program, an audio and video processing tool, or the capability to deploy an online transcoding service.

The concepts of components, applications, and plug-ins are easy to understand. The following section shows an example of their relationship:

For example, assume that an application is a camera app on your phone that consists of multiple components such as those to turn on the camera, take photos, and store photos. Before photos are stored in your phone, information about the photos needs to be extracted, such as when and where the photos are taken. The information cannot be extracted by the component that stores the photos. Therefore, we must add a dedicated plug-in to extract the information.

The differences between components, plug-ins, and applications may be significant in some cases and trivial in others. Instead of focusing on their differences, we recommend that you take priority in simplicity, efficiency, and convenience.

-----

## Develop projects

During project development, you must strictly abide by the rules in the following section:


### Application development conventions

#### Development conventions

The following development conventions are for beta releases only. However, later development conventions will incorporate these conventions. The conventions will be improved over time in coordination with suggestions and input from users like you.

Project directories must comply with the following rules:

```
|- src # The directory name must not be changed.
|   └── The application directory.  
|- publish.yaml: The descriptions of project resources.   
|- readme.md: The description of the specified project.  
|- version.md: The version updates.
```
#### publish.yaml

This is the description document of the project. The system will read the document and copy relevant information when you publish the resource. You must enter information carefully.

```yaml
Type: Application
Name: Name
Provider:
  -The name of the cloud service provider # Alibaba/Baidu/Huawei/AWS/Google Cloud/Azure/Vercel/Tencent
Version: Version number. Example: 0.0.1
Description:
  zh: The brief introduction or description
  en: English
HomePage: The address of the project homepage.
Tags: # The details of tags.
  - zh: Deploy functions
    en: English
Category: Category # Cloud essentials/web frameworks/web applications/artificial intelligence/audio & video processing/image & text processing/monitoring & alerting/data technology/IoT/get started/others
Service: # The used services.
  - Name: Service name # Function Compute/Container Service/Container Registry/Message Queue/Serverless Workflow/Alibaba Cloud CDN/Object Storage Service/Tablestore/Message Service/Log Service/API Gateway/Database/Alibaba Cloud DNS/Application Service/others
    # Runtime: Python 3.6. You must configure a runtime if the service is a function.
    Authorities: # Permissions
      - zh: Create functions # The required permission.
        en: English
```

Valid values of some parameters:

* Provider:
   ```Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, AWS, Azure, Google Cloud, or others```

* Type:
   ```Cloud essentials, web frameworks, web applications, artificial intelligence, audio & video processing, image & text processing, monitoring & alerting, data technology, IoT, get started, and others```

* Service:
   ```Function Compute, Container Service, Container Registry, Message Queue, Serverless Workflow, Alibaba Cloud CDN, Object Storage Service, Tablestore, Message Service, Log Service, API Gateway, Database, Alibaba Cloud DNS, Application Service, and others```

* Runtime:
   ```Node.JS, Python, PHP, Java, Go, and others```

##### readme.md

This is a brief introduction to the project. You can write a complete description document for your project in this part so that everyone can use your project easily and quickly.

##### version.md

This document introduces version updates of your project.

#### Project procedure

The following example is used to describe every detail of project development. If you have any questions, you can contact me through the anycodes_02 WeChat account.

Run the `s init` command in a command-line interface (CLI) and select `Application` to create an initialization project.

### Component development conventions

#### Development conventions

The following development conventions are for beta releases only. However, later development conventions will incorporate these conventions. The conventions will be improved over time in coordination with suggestions and input from users like you.

Project directories must comply with the following rules:

```
|- src # The directory name can be changed.
|   └──  The code directory.  
|- package.json: The main function must be defined.   
|- publish.yaml: The descriptions of project resources.   
|- readme.md: The description of the specified project.  
|- version.md: The version updates.
```
#### publish.yaml

This is the description document of the project. The system will read the document and copy relevant information when you publish the resource. You must enter information carefully.

```yaml
Type: Component
Name: Name
Provider:
  -The name of the cloud service provider
Version: Version number. Example: 0.0.1
Description: The brief introduction or description
HomePage: The address of the project homepage.
Tags: # The details of tags.
  - Deploy functions
  - Deploy components
Category: Category # Cloud essentials/web frameworks/web applications/artificial intelligence/audio & video processing/image & text processing/monitoring & alerting/data technology/IoT/get started/others
Service: # The used services
  - Name: Service name # Function Compute/Container Service/Container Registry/Message Queue/Serverless Workflow/Alibaba Cloud CDN/Object Storage Service/Tablestore/Message Service/Log Service/API Gateway/Database/Alibaba Cloud DNS/Application Service/others
    # Runtime: Python 3.6. You must configure a runtime if the service is a function.
    Authorities: # The description of permissions.
      - Create functions # The required permissions.
Commands: # Commands in the following format: Command: The description of the command. Examples:
  deploy: Deploy functions
  invoke: Invoke functions
Properties:
  Region: # Parameter
    Description: The description of the parameter.
    Required: true# The parameter is required. Valid values: true and false.
    Type: # The type of the parameter.
      - String
```

Valid values of some parameters:

* Provider:
   ```Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, AWS, Azure, Google Cloud, or others```

* Type:
   ```Cloud essentials, web frameworks, web applications, artificial intelligence, audio & video processing, image & text processing, monitoring & alerting, data technology, IoT, get started, and others```

* Service:
   ```Function Compute, Container Service, Container Registry, Message Queue, Serverless Workflow, Alibaba Cloud CDN, Object Storage Service, Tablestore, Message Service, Log Service, API Gateway, Database, Alibaba Cloud DNS, Application Service, and others```

* Runtime:
   ```Node.JS, Python, PHP, Java, Go, and others```

* Properties:   Required parameters:   
   ```Description, Required, Type```    Optional parameters:    
   ```Example, Default```    The Type can be String or List. Valid values:    
   ```String, Number, List, Enum, Struct, Boolean, Null, Any```    The complex type can be `List<Type>`   When the Type is List, aliases can be added for different elements. Example: `Type[Alias]`

##### readme.md

This is a brief introduction to the project. You can write a complete description document for your project in this part so that everyone can use your project easily and quickly.

##### version.md

This document introduces version updates of your project.

#### Project procedure

The following example is used to describe every detail of project development. If you have any questions, you can contact me through the anycodes_02 WeChat account.

Run the `s init` command in a CLI and select `Application` to create an initialization project.

For example, the YAML file is in the following format:

```yaml
edition: 1.0.0        # The YAML specification version, which conforms to semantic versioning.
name: FullStack       #  The project name.
access: xxx-account1  #  The alias of the key.

services:
  HexoComponent:
    component: hexo
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
```

When a user runs the `s deploy mytest -a -b abc` command, the following `inputs` are passed to the `deploy` method as parameters:

```
{
    "Command": 'deploy',
    "Project": {
        ProjectName: 'HexoComponent',
        Component: 'hexo',
        Provider: 'alibaba',
        AccessAlias: 'release'
    },
    "Credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********",
    },
    "Properties": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "Args": "mytest -a -b abc"
}
```

For more information about the core capabilities that are required to develop components, see https://github.com/Serverless-Devs/s-core.


### Plug-in development conventions

#### Development conventions

The following development conventions are for beta releases only. However, later development conventions will incorporate these conventions. The conventions will be improved over time in coordination with suggestions and input from users like you.

Project directories must comply with the following rules:

```
|- src # The directory name can be changed.
|   └── The plug-in directory.  
|- package.json: The main function must be defined.
|- publish.yaml: The descriptions of project resources.   
|- readme.md: The description of the specified project.  
|- version.md: The version updates.
```
#### publish.yaml

This is the description document of the project. The system will read the document and copy relevant information when you publish the resource. You must enter information carefully.

```yaml
Type: Plugin
Name: Name
Version: Version number. Example: 0.0.1
Description: The brief introduction or description
HomePage: The address of the project homepage.
Tags: # The details of tags.
  - Deploy functions
  - Deploy components
Category: Category # Cloud essentials/web frameworks/web applications/artificial intelligence/audio & video processing/image & text processing/monitoring & alerting/data technology/IoT/get started/others
```

Valid values of some parameters:

* Type:
   ```Cloud essentials, web frameworks, web applications, artificial intelligence, audio & video processing, image & text processing, monitoring & alerting, data technology, IoT, get started, and others```

##### readme.md

This is a brief introduction to the project. You can write a complete description document for your project in this part so that everyone can use your project easily and quickly.

##### version.md

This document introduces version updates of your project.

#### Project procedure

The following example is used to describe every detail of project development. If you have any questions, you can contact me through the anycodes_02 WeChat account.

Run the `s init` command in a CLI and select `Plugin` to create an initialization project.



## Publish a package

It is very easy to publish packages. After project development is completed, you can push your code to GitHub or upload it to a private source.

To use a package without publishing the package:    
If you do not want to publish a package, but rather keep it for your own use, you can reference the absolute path of the project to use it. Example:

```shell script
edition: 1.0.0        # The YAML specification version, which conforms to semantic versioning.
name: FullStack       #  The project name.
access: xxx-account1  #  The alias of the key.

services:
  nextjs-portal: #  The service name.
    component: ./my-full-stack-component-path
    props: # The property values of the component.
      src: ./frontend_src
      url: ${backend.output.url}
```
