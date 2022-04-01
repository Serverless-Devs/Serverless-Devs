---
title: Overview and terms
description: 'Overview and terms'
position: 3
category: 'Package model'
---

# Overview and terms

Serverless Package Model (SPM) defines the model that Package developers need to use and the specification to which the Package developers must conform. From the perspective of composition, SPM includes Application and Component. From the perspective of file trees, SPM includes publish.yaml files for self-description and business code.

## Package category

![picture alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648712870514_20220331074750683504.png)

Packages are divided into three categories:

- Component: A component is a module that implements specific services, such as function deployment, application debugging, etc. Usually, a business corresponds to a component, which implements different functions through different methods and different parameters; components can be inherited.
  > Example: Alibaba Cloud Function Compute (FC) component, there are many methods such as `deploy`, `invoke`, `instance`, `logs`, etc. Users can specify different methods and input corresponding parameters to achieve different function; the Function Compute (FC) component relies on the `fc-deploy` component to implement the function deployment capability, and the `fc-logs` component to implement the function log viewing capability;
- Plugin: A plug-in is a lightweight business implementation module. Usually, a plug-in can implement a lightweight capability. It is executed before and after the component is executed, and the parameters are processed.
  > Example: Before deploying a business, it needs to be compiled. When the source code directory configured by the user is `./code`, it is compiled through the compilation plugin, and the product is placed in the `./dist` directory. The plug-in can process the input parameters configured by the user according to the specification, and then pass it to the component for deployment and other operations;
- Application: Application refers to the user's serverless application or business. Usually, a Yaml represents an application, and a group of Yaml represents different environments of an application; an application can include multiple services, and each service can only correspond to one Component, before and after the component, there can be multiple plug-ins involved;
  > Example: If the user has `s.release.yaml` locally, it means that it is a Serverless application and it is an online environment. In addition, the application also has a `s.dev.yaml` which is the Yaml used in the development environment. In this application, there are 3 services, service 1 and service 3 use component 1, service 2 uses component 2, and service 1 will execute plug-in 1 and plug-in 2 before execution, and service 2 will execute plug-in 1 before execution. And plugin 3, service 3 will execute plugin 4 before execution, and plugin 5 will be executed after execution;

The relationship of the three in a process:

![Picture alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1648714969453_20220331082249601987.png)

The similarities and differences between components and plugins:

- Same: both are codes or scripts that implement specific business logic;
- different:
    - Different positioning:
        - Components are complete business logic, relatively heavy and can be used alone;
        - The plug-in is a lightweight plug-in, used with the component, and plays a role before and after the component is executed;
    - behave differently:
        - Components will have different methods and different parameters to achieve different functions;
        - The plug-in has only a fixed method. Although it can accept different parameters, the degree of freedom and flexibility is relatively low, and the degree of professionalism is relatively high;

## Package and Package Model

Package consists of standard code that can implement a feature or represent a component or an application. Package Model represents a specification and a group of rules. 

- Package consist of the code that conforms to the SPM specification, which is used to implement model features, including but not limited to deploying business logics to the Serverless platform and debugging the Serverless application code.
- Package Model is the Package development specification of Serverless Devs. Only Serverless Package that conforms to the specification can be recognized by Serverless Devs developer tools and can be published to Serverless Registry platforms that follow the Serverless Registry Model specification.