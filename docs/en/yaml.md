---
title: Specification
description: 'Serverless Devs Description file (YAML) specification'
position: 3
category: 'Overview'
---

# Description file (YAML) specification

> This document follows the [Serverless User Model](../../spec/en/0.0.2/serverless_user_model/readme.md) and related specifications. 

- [Overview](#Overview)
- [Formats and specifications of description files](#Formats-and-specifications-of-description-files)
    - [Metadata](#Metadata)
    - [Variable assignment](#Variable-assignment)
    - [Special variables](#Special-variables)
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

actions: globalActions #  Customize global execution logic

services: # Multiple services can be included.
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

actions: # Customize global execution logic
  pre-deploy: # Run before the project deploy
    - run: npm install # Command line to run
      path: ./src # Path to run the command line
  success-deploy: # Run after the project deploy succeeded
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  fail-deploy: # Run after the project deploy failed
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  complete-deploy: # Run after the project deploy complete
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 


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
| actions   | Customize global execution logic |
| services  | The services that are contained in the  application. The value of this parameter is in the form of key-value. |

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
- Gets the config variable for the current configuration: ${config(AccountID)}
  The essence is to get the variable value in `s config get`
- Gets information about the current module: ${this.xx}
  Take Yaml as an example:
  ```
  edition: 1.0.0
  name: NextProject
  access: default-access

  services:
    nextjs-portal:
      component: fc
      actions:
        pre-deploy:
          - run: s invoke ${this.props.url}
            path: ./backend_src
      props:
        codeUri: ./frontend_src
        url: url
  ```
  In `nextjs-portal` Application :
    - Use `${this.name}` means `nextjs-portal`
    - Use `${this.props.codeUri}` means `./frontend_src`
    - Use `${this.access}` means `default-access`;


### Special-variables
In Serverless-Devs, some special variables have specific purposes, and developers do not have special requirements, so avoid using special variables
- `${aliyun-cli}`
  Acts in the value of `access`, obtains the default `profile` from [aliyun cli](https://github.com/aliyun/aliyun-cli), and takes effect

> Execute `aliyun configure list` to view the currently valid `profile`

### Service order

If there are too many services in the YAML file of a serverless application model, the system analyzes the deployment order by default. To deploy service in an order, two steps are required:
1.	Analyze project dependencies.
2.	Services with dependencies are deployed based on dependencies. Services without dependencies are deployed from top to bottom based on the YAML configurations.

### Behavior description

#### Global actions

The basic format of global actions is:

```yaml
actions: # Customize global execution logic
  pre-command: # Run before the project deploy
    - run: npm install # Command line to run
      path: ./src # Path to run the command line
  success-command: # Run after the project deploy succeeded
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  fail-command: # Run after the project deploy failed
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  complete-command: # Run after the project deploy complete
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
```

E.g:

```yaml
actions: # Customize global execution logic
  pre-deploy: # Run before the project deploy
    - run: npm install # Command line to run
      path: ./src # Path to run the command line
  success-deploy: # Run after the project deploy succeeded
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  fail-deploy: # Run after the project deploy failed
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  complete-deploy: # Run after the project deploy complete
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
```

When the Serverless Devs developer tools execute related commands, the global 'pre-command' operation will be executed before the project executes the relevant command, the global 'success-command' operation will be executed after the project execution is successful, the global 'fail-command' operation will be executed after the project execution fails, and the global 'complete-command' operation will be executed after the project execution is completed.

Take the following Yaml as an example:

```yaml
edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: FullStack # Project name
access: default  # The alias of the key.

actions: # Customize global execution logic
  pre-deploy: # Run before the project deploy
    - run: npm install # Command line to run
      path: ./src # Path to run the command line
  success-deploy: # Run after the project deploy succeeded
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  fail-deploy: # Run after the project deploy failed
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  complete-deploy: # Run after the project deploy complete
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 

services:
  nextjs-portal: # service name
    access: xxx-account1 # Secret key alias, if it is the same as the project's access, it can be omitted
    component: vue-component # component name
    props: # property value of the component
      src: ./frontend_src
      url: url
```

When the developer executes the 'deploy' command in the current application, the system will operate in the following order:
1. Execute the global 'pre-deploy' command: execute 'npm install' in the './' directory
2. Call the `deploy` method of the component `vue-component`, and pass the `props` and the basic information of the project into the `deploy` method of the component `vue-component`
3. If step '2' is executed successfully, the global 'success-deploy' operation is executed, and if the execution fails, the global 'fail-deploy' operation is executed, regardless of success or failure, as long as the execution is completed, the global 'complete-deploy' operation must be executed.

The above sequence is only applicable to the premise that there is no error in the whole process. If there is an error in the process, the system will report an error and terminate the execution of the subsequent process.

Regarding the positioning and difference of "run" and "plugin" in "actions":

- 'run', which needs to specify the execution directory, is just a 'hook' capability, which can be considered as a simple execution command (that is, a command to invoke the system);
- 'plugin', which is a lightweight plugin that typically only supports one capability per plugin;

> Note: Only 'run' and 'plugin' are supported in global actions.

#### Service actions

In the Yaml file corresponding to the Serverless Application model, corresponding behavior operations can be provided for the service. The basic format is:

````yaml
actions: # custom execution logic
  pre-command: # run before the command
    - run: command # The operation to run
      path: ./path # The path to run the operation on
    - component: pgo # The component to be executed, the format is: component name command parameter
    - plugin: website-fc # plugin to use
      args: # Arguments for the plugin
        key: value
  post-command: # run after the command
    - run: command # The operation to run
      path: ./path # The path to run the operation on
    - component: pgo # The component to be executed, the format is: component name command parameter
    - plugin: website-fc # plugin to use
      args: # Arguments for the plugin
        key: value
````

E.g:

````yaml
actions: # custom execution logic
  pre-deploy: # run before deploy
    - run: npm install # command line to run
      path: ./backend_src # The path where the command line runs
    - component: fc build --use-docker # command line to run
  post-deploy: # run after deploy
    - plugin: fc-warm
      args:
        corn: '********'
````

When the Serverless Devs developer tool executes the service, it will execute the `pre-command` operation in sequence before the related command line, and then execute the `post-command` operation after all the content is executed.

Take the following Yaml as an example:

```yaml
edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: FullStack # Project name

services:
  nextjs-portal: # service name
    access: xxx-account1 # Secret key alias, if it is the same as the project's access, it can be omitted
    component: vue-component # component name
    props: # property value of the component
      src: ./frontend_src
      url: url
    actions: # custom execution logic
      pre-deploy: # run before deploy
        - run: npm install # command line to run
          path: ./backend_src # The path where the command line runs
        - component: fc build --use-docker # command line to run
      post-deploy: # run after deploy
        - plugin: fc-warm
          args:
            key: value
```

When the developer executes the `deploy` command under the current application, the system will operate in the following order:
1. Execute `npm install` in the `./backend_src` directory
2. For the project `nextjs-portal`, use the `build` method of the `fc` component, and the input parameter is `--use-docker` (that is, in the `docker` environment, build the project `nextjs-portal` )
3. Call the `deploy` method of the component `vue-component`, and pass the `props` and the basic information of the project into the `deploy` method of the component `vue-component`
4. Pass the deployment output and other information to the plugin `fc-warm`, and pass in `{"corn": "********"}` as a parameter

The above sequence is only applicable to the premise that there is no error in the whole process. If there is an error in the process, the system will report an error and terminate the execution of the subsequent process.

Regarding the positioning and difference of `run`, `component` and `plugin` in `actions`:
- `run`, you need to specify the execution directory, which is just a `hook` capability, which can be considered as a simple execution command (that is, a command to invoke the system);
- `component`, the format is `component name command parameter`, which will pass the key information, attribute information, etc. used by the current project to the specified component method;
- `plugin` is a lightweight plugin, each plugin usually only supports one capability, and the biggest difference from `component` is that it can modify properties. For example, the user configures a `k-v` in `props` as: `codeUri: ./code`:
    - After using `component`, the current information (`codeUri: ./code`) will continue to be the parameters of project execution and will not change;
    - After using `plugin`, the current information (`codeUri: ./code`) may be changed, and the changed content is used as the parameter of project execution;

Concrete examples of the three:
- If Yaml is:
    ```yaml
    edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
    name: FullStack # Project name
    
    services:
      nextjs-portal: # service name
        component: test-component # component name
        props: # property value of the component
          src: ./frontend_src
          url: url
    ```
    After the user executes `s deploy -a mytest`, the system will send the key `mytest` and the parameters of `props` (`{"src": "./frontend_src", "url": "url"}`) passed to the `deploy` method of the component `test-component`;

- If Yaml is:
    ```yaml
    edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
    name: FullStack # Project name
    
    services:
      nextjs-portal: # service name
        component: test-component # component name
        actions: # custom execution logic
          pre-deploy: # run before deploy
            - run: s build
              path: ./
        props: # property value of the component
          src: ./frontend_src
          url: url
    ```
    After the user executes `s deploy -a mytest`, the system will:
    - Execute `s build` in the `./` directory. At this time, the `-a mytest` parameter will not be directly passed to the `s build` method. It can be considered that a certain command is executed purely, and there is no inheritance and association of related states. ;
    - Pass the key `mytest`, and the parameters of `props` (`{"src": "./frontend_src", "url": "url"}`) to the `deploy` method of the component `test-component` ;

- If Yaml is:
    ```yaml
    edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
    name: FullStack # Project name
    
    services:
      nextjs-portal: # service name
        component: test-component # component name
        actions: # custom execution logic
          pre-deploy: # run before deploy
            - component: fc build
        props: # property value of the component
          src: ./frontend_src
          url: url
    ```
    After the user executes `s deploy -a mytest`, the system will:
    - Pass the key `mytest`, and the parameters of `props` (`{"src": "./frontend_src", "url": "url"}`) to the `build` method of the component `fc`;
    - Pass the key `mytest`, and the parameters of `props` (`{"src": "./frontend_src", "url": "url"}`) to the `deploy` method of the component `test-component`

- If Yaml is:
   ```yaml
    edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
    name: FullStack # Project name
    
    services:
      nextjs-portal: # service name
        component: test-component # component name
        actions: # custom execution logic
          pre-deploy: # run before deploy
            - plugin: qbuild
              args:
                key: value
        props: # property value of the component
          src: ./frontend_src
          url: url
    ```
    After the user executes `s deploy -a mytest`, the system will:
    - put the key `mytest`, and the parameters of `props` (`{"src": "./frontend_src", "url": "url"}`), the parameters of `plugin` (`{"key": "value"}`) is passed to the plugin `qbuild`, at this time the plugin `qbuild` performs related business processing, and the processing is completed:
        - If the returned information modifies `props`, the key `mytest` and the modified `props` will be passed to the `deploy` method of the component `test-component`;
        - If the returned information has not modified `props`, then the key `mytest` and the original `props` will be passed to the `deploy` method of the component `test-component`;

-------------

> For more information about how to deploy an application with a few clicks or how to deploy a specific service in an application, see the [custom command user guide](command/custom.md).

#### actions wildcard

Both global actions and service actions support wildcards, and the tool will recognize the content in the magic variable regex to match the current execution method. For example, the global `pre-${regex(.)}` indicates that the project will execute the action of `pre` before executing any method.

```yaml
actions: # Customize global execution logic
  pre-deploy: # Run before the project executes any methods
    - run: npm install # Command line to run
      path: ./src # Path to run the command line
  success-deploy: # Run after the project executes any methods succeeded
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  fail-deploy: # Run after the project executes any methods failed
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
  complete-deploy: # Run after the project executes any methods complete
    - plugin: dingding-robot # plugin to use
      args: # Arguments for the plugin
        key: value 
```