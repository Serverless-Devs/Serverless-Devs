---
title: Intro
description: 'Serverless Devs Model (SDM) V0.0.2 is the document that is initiated and written by developers in the Serverless Devs community. The document introduces the models and models of the Serverless toolchain system. This document is written based on the following modules in the Serverless toolchain system: Registry model, Package model, and User model'
position: 1
category: 'Intro'
---

# Serverless Devs Model(SDM) v0.0.2 documentation

- Version：v0.0.2
- Author：
    - Initiator：
        - [Anycodes](https://github.com/anycodes)
    - Contributor：
        - [heimanba](https://github.com/heimanba)
        - [lowkeyrd](https://github.com/lowkeyrd)
        - [hanxie](https://github.com/hanxie-crypto)
- Date：2021.12.29
- Content：
    - [Serverless Registry Model](./serverless_registry_model)
    - [Serverless Package Model](./serverless_package_model)
    - [Serverless User Model](./serverless_user_model)

## Introduction

Serverless Devs Model (SDM) V0.0.2 is the document that is initiated and written by developers in the Serverless Devs community. The document introduces the models and models of the Serverless toolchain system. This document is written based on the following modules in the Serverless toolchain system: **Registry model**, **Package model**, and **User model**. 
![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631773288370_20210916062130083859.png)

The preceding figure shows that the developers of Serverless Devs are classified into the following roles: 
-**Package developer**: develops or provides components that conform to the Serverless Package Model specification. Package developers also share applications by publishing applications to related registries. 
-**Serverless developer**: develops Serverless applications by using public applications that are developed by Package developers or using different components, and deploy the developed applications to different serverless platforms. They can also perform different operations on the applications, including but not limited to building, observing, stress testing, and debugging.

As you can find in the preceding figure, the two words component and application appear frequently. 
- **Component**: refers to a block of code that follows the Serverless Package Model specification that is developed and published by Package developers. The code block is referenced in an application, loaded in Serverless Devs tools, and executed to perform specified operations based on the predefined rules. For example, you can deploy your code on Serverless Devs, build and package Serverless applications, and debug Serverless applications. 
- **Application**: refers to an application that is shared and published to Serverless Registry by Package developers for more people to learn and use. For example, a contributor has contributed an application that is used to recognize cats and dogs, or an individual developer has developed a facial recognition application. An application can use one or more components, and the application is deployed on Serverless Devs by using Serverless Devs developer tools. For example, you have developed an application that is used to recognize cats and dogs. In the application, you use the Lambda component to deploy service logics to FaaS and the Website component to deploy frontend code to Object Storage Service (OSS).

The Serverless Devs Model contains the following modules:

- **Registry model**: an open Serverless Registry Model. Package developers can publish their components and applications to be shared to registries. Serverless Registry Model supports GitHub Registry, Gitee Registry, and Serverless Registry. You can also use a private registry that is built based on the Registry model specification. For more information, see [Serverless Registry Model](serverless_registry_model).
- **Package model**: a specification for Serverless Package. Package developers must conform to the specification to develop components or share applications. Otherwise, the developed components and shared applications cannot be identified and loaded by Serverless Devs and the components also cannot be referenced by applications. For more information, see [Serverless Package Model](serverless_package_model).
- **User Model**: the conventions to which Serverless developers must conform when they develop applications. This can ensure that Serverless Devs developer tools can accurately identify the related content and load the related component as expected. For more information, see [Serverless User Model](serverless_user_model).

## Updates

- Development package model
    - Updated the Commands specification
    - Changed the Properties specification to the JSON Schema specification

## Community

### Contribution

For more information, see [Contribution guidelines](../../../CONTRIBUTING.md). 


## Protocol

Serverless Devs is an open source project that follows the [Massachusetts Institute of Technology (Apache 2.0)](../../../LICENSE) protocol. 

The node_modules used by Serverless Devs and other third-party dependency libraries may follow protocols that are different from the Apache 2.0 protocol. We recommend that you read and understand the terms in these protocols because the terms may be different from those in the Apache 2.0 protocol. 