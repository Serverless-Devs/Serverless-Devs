# Description file (YAML) specification

> This document follows the [Serverless User Model](../../spec/en/0.0.2/serverless_user_model/readme.md) and related specifications. 

- [Overview](#Overview)
- [Formats and specifications of description files](#Formats-and-specifications-of-description-files)
    - [Metadata](#Metadata)
    - [Variable assignment](#Variable-assignment)
    - [Service order](#Service-order)
    - [Behavior description](#Behavior-description)

## Overview

In non-CLI modes, resource or behavior description files must be provided based on the Serverless Devs specifications when you perform operations on applications and components. A description file must conform to the following conditions:

- The extension name can be `.yaml` or `.yml`.
- The format must conform to the [YAML specifications](https://yaml.org/spec/1.2.2/)

> 👉  For projects for which environment isolation is required by using description files, we recommend that you name the file in the `s-${ENV}.yaml` or `s-${ENV}.yml` format. Example: `s-prod.yaml`. 

By default, Serverless Devs uses the `s.yaml` or `s.yml` files as the description file. The `s.yaml` files take precedence over the s.yml files. When both `s.yaml` and `s.yml` files exist in a serverless application, the system preferentially identifies and uses the `s.yaml` files. 

You can also specify the description file by using `-t, --template [templatePath]`. For example, if the description file of an application in the production environment is `s-prod.yml`, you can add the `-t s-prod.yml` or `--template s-prod.yml` parameter when you run commands. 

## Formats and specifications of description files

The following code shows the format of the resource and behavior description files that are supported by Serverless Devs:

```yaml
edition: 1.0.0          #  The version of the YAML syntax. The version complies with the semantic versioning specification.
name: applicationName   #  The name of the application.
access: xxx-account1    #  The alias of the key.

vars: # [Global variable for services]
  Key: Value

Service: # Multiple services can be included.
  ServiceName: # The name of the service.
    access: xxx-account1      #  Alias of the key, which can be omitted if the alias is the same as the key of the project.
    component: componentName  #  The name of the component.
    props: serviceProp        #  The property value of the component.
    actions: serviceActions   #  The custom execution logic.
```

Example：

```yaml
edition: 1.0.0        #  The version of the YAML syntax. The version complies with the semantic versioning specification.
name: FullStack       #  Project name
access: xxx-account1  #  Alias of the key

vars: # [Global variables for services]
  logo: https://image.aliyun.com/xxxx.png

services:
  nextjs-portal: #  Service name
    access: xxx-account1  #  Key alias, which can be omitted if the alias is the same as the project key
    component: vue-component  # Component name
    props: #  Property value of the component
      src: ./frontend_src
      url: url
    actions: # Custom execution logic
      pre-deploy: # Run before the deploy operation
        - run: s exec -- publish  # Command line to run
          path: ./backend_src # Path to run the command line
        - run: s build  # Command line to run
          path: ./backend_src # Path to run the command line
      post-deploy: # Run after the deploy operation
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
    component: serverless-gateway # The route component that maps HTTP URLs to services
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
| name      | The name of the application                                  |
| access    | The alias of the key. You can use the key  information that is configured by using the [config command](command/config.md#config-add-command) and [the key information that is configured   to environment variables](command/config.md#Configure-keys-by-using-environment-variables). |
| vars      | Global variables, which can be used by  services. Global variables are in the form of key-value. |
| Service   | The services that are contained in the  application. The value of this parameter is in the form of key-value. |

Parameters in the services parameter:

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| access    | The alias of the key, which can be omitted  if the alias is the same as the key of the project. |
| component | Component                                                    |
| actions   | Custom execution logic                                       |
| props     | Property value of the component                              |

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

Example：

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

-----------

> For more information about how to deploy an application with a few clicks or how to deploy a specific service in an application, see the [custom command user guide](command/custom.md).
