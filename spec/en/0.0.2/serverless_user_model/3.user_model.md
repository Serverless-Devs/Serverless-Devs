---
title: Developer models
description: 'Developer models'
position: 4
category: 'User model'
---
# Developer models

The Serverless User Model (SUM) section describes the serverless application specifications and the specifications to use serverless package components. 

- [Serverless Application Model (SAM)](#Serverless-Application-Model-SAM)
    - [Metadata](#Metadata)
    - [Variable assignment](#Variable-assignment)
    - [Service order](#Service-order)
    - [Behavior description](#Behavior-description)
- [Specification for serverless package components](#Specification-for-serverless-package-components)

## Serverless Application Model (SAM)

SAM refers to the resource and behavior description files that can be identified by Serverless Devs. The files must conform to the `.yaml` and `.yml` file formats and YAML specification. At the same time, SAM specifies that a resource or behavior description file that can be recognized by Serverless Devs represents a serverless application. 

In addition, take note that the default YAML files that correspond to SAM are s.yaml and s.yml files. The priority of the `s.yaml` file format is greater than that of the `s.yml` file format. Therefore, when both `s.yaml` and `s.yml` files exist in a serverless application, the system preferentially identifies and uses the `s.yaml` file format, unless you specifies another YAML format as the default file format. 

The format of a YAML file of SAM must conform to the following format:


```yaml
edition: 1.0.0          #  The version of the YAML syntax. The version complies with the semantic versioning specification.
name: applicationName   #  Application name
access: xxx-account1    #  Key alias

vars: # [Global variables, which are used for services]
  Key: Value

Service:
  ServiceName: # Service name
    access: xxx-account1      #  Key alias, which can be omitted if the alias is the same as that of the project access key.
    component: componentName  #  Component name
    props: serviceProp        #  Property value of the component
    actions: serviceActions   #  Custom run logic
```

The following example describes a complete SAM:

```yaml
edition: 1.0.0        #  The version of the YAML syntax. The version complies with the semantic versioning specification.
name: FullStack       #  Project name
access: xxx-account1  #  Key alias

vars: # [Global variables, which are used for services.]
  logo: https://image.aliyun.com/xxxx.png

services:
  nextjs-portal: #  Service name
    access: xxx-account1  #  Key alias, which can be omitted if the alias is the same as the access key of the project
    component: vue-component  # Component name
    props: #  Property value of the component
      src: ./frontend_src
      url: url
    actions: # Custom run logic
      pre-deploy: # Run before the deploy operation.
        - run: s exec -- publish  # Command line to run.
          path: ./backend_src # Path to run the command line.
        - run: s build  # Command line to run
          path: ./backend_src # Path to run the command line
      post-deploy: # Run after deploy
        - run: s clean
          path: ./frontend_src

  assets:
    component: static
    props:
      cache-control: "public, max-age=604800, immutable"
      www: "./public"

  express-blog:
    component: express
    props:
      app: ./express-blog
      url: ${vars.domain}
    actions:
      pre-deploy:
        - run: npm run build
          path: ./express-blog

  gateway:
    component: serverless-gateway # Route component: the mapping rules between HTTP URLs and services
    props:
      routes:
        - route: /~assets
          value: ${assets.output.url}
        - route: /
          value: ${nextjs-portal.output.url}
          index: index.html
        - route: /~portal
          value: ${nextjs-portal.output.url}
          inex: index.html
        - route: /~blog
          value: ${express-blog.output.url}
```

### Metadata

Parameter description:

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| edition   | The version of the YAML syntax. The version  complies with the semantic versioning specification. |
| name      | Name                                                         |
| access    | Key alias                                                    |
| vars      | Global variables, which are used for  services, are in the key-value form. |
| Service   | The service that is contained in the  application. This parameter is in the key-value form. |

Parameters contained in the services parameter:

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| access    | The key alias, which can be omitted if it  is the same as the access key of the project. |
| component | Component                                                    |
| actions   | Custom run logic                                             |
| props     | Component property value                                     |

### Variable assignment

The YAML files of the serverless application model supports multiple variable formats:
- Get environment variables of the current server: env(ENV)，example: {env(secretId)}.
- Get the variables of an external document: file(path)，example: {file(./path)}.
- Get global variables :${ vars.*}.
- Get variables of another project :${ projectName.props.*}.
- Get result variables of another project in the YAML file: ${projectName.output.*}

### Service order

If there are too many services in the YAML file of a serverless application model, the system analyzes the deployment order by default. To deploy service in an order, two steps are required:
1.	Analyze project dependencies.
2.	Services with dependencies are deployed based on dependencies. Services without dependencies are deployed from top to bottom based on the YAML configurations.

### Behavior description

In the YAML file of a serverless application model, you can provide behavior operations for services. You need to comply with the following basic format:

```yaml
actions: # Custom run logic
  pre-command: # Run before the execution of the command.
    - run: command  # The operation to run
      path: ./path # Operation run path
  post-command: # Run after the command.
    - run: command  # The operation to run.
      path: ./path # The path of the operation

```

xample：

```yaml
actions: # Custom run logic
  pre-deploy: # Run before the deploy operation.
    - run: s exec -- publish  # Command line to run.
      path: ./backend_src # Run path of the command line
    - run: s build  # Command line to run
      path: ./backend_src # Path to run the command
  post-deploy: # Run after the deploy operation.
    - run: s clean
      path: ./frontend_src
```

When this service is executed by Serverless Devs, the pre-command operation is preferentially executed. After all the commands are executed, the post-command operation is executed. 

Example：

```yaml
edition: 1.0.0        #  The version of the YAML syntax. The version complies with the semantic versioning specification.
name: FullStack       #  Project name

services:
  nextjs-portal: #  Service name
    access: xxx-account1  #  The alias of the key, which can be omitted if the alias is the same as the access key the project
    component: vue-component  # Component name
    props: #  Property value of the component
      src: ./frontend_src
      url: url
    actions: # Custom run logic
      pre-deploy: # Run before the deploy operation.
        - run: s exec -- publish  # The command line to run
          path: ./backend_src # Path to run the command line
        - run: s build  # Command line to run
          path: ./backend_src # Path to run the command line
      post-deploy: # Run after the deploy operation
        - run: s clean
          path: ./frontend_src
```

After you run the `deploy` command in the application, the system performs the following operations in order: 
1. Run `s exec -- publish` in the `./backend_src` directory. 
2. Run `s build` in the `./backend_src` directory. 
3. Call the `deploy` method of the `vue-component` component and deliver `props` and the basic information of the project to the `deploy` method of the `vue-component` component. 
4. Run `s clean` in the `./frontend_src` directory.

If an error occurs in the process, the system reports an error and terminates the execution of the process. 

## Specification for serverless package components

The serverless developer model specifies the usage specification of serverless package components. In the following YAML file that conforms to SAM:

```yaml
edition: 1.0.0          #  The version of the YAML syntax. The version complies with the semantic versioning specification.
name: applicationName   #  Application name
access: xxx-account1    #  Key alias

vars: # [Global variables, which are used for services]
  Key: Value

Service:
  ServiceName: # Service name
    access: xxx-account1      #  Key alias, which can be omitted if the alias is the same as the project access key
    component: componentName  #  Component name
    props: serviceProp        #  Property value of the component
    actions: serviceActions   #  Custom run logic
```

In the specifications, you must specify the components that are used by services. The component formats are categorized into the following types: 
- Components such as the `FC` component in specified registries. 
- Components in GitHub repositories and issues release notes based on the specifications of serverless package components, such as `devsapp/fc`. 
- On-premises component paths that conform to the specifications of serverless package components, such as `./../start-component/`.