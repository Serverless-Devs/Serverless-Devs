---
title: Cli command
description: 'Cli command'
position: 4
category: 'Commands'
---

# Cli command

The `cli` command allows you to directly use Serverless Devs components in CLI mode, instead of the YAML mode.

- [Command description](#Command-description)
- [Common modes](#Common-modes)
    - [Support for common components](#Support-for-common-components)
    - [Support for specific components](#Support-for-specific-components)

> For more information about the differences between the YAML mode and the CLI mode, see [Compare the YAML mode with the CLI mode](./../yaml_and_cli.md)

## Command description

After you run the `s cli -h` command, the following help information is returned:

```shell script
$ s cli -h
Usage: s cli [component] [method] [options]

Directly use serverless devs to use components, develop and manage applications without yaml configuration.
    
    Example:
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"
    
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/cli.md

Options:
  -a, --access [aliasName]  Specify the access alias name
  -p, --props [jsonString]  The json string of props
  -h, --help                Display help for command
```

Method:

```shell script
s cli [The component name, such as fc or fc-api.] [The method of the component.] -p/--props [The YAML attribute (JSON string) of the method] -a/--access [The information about the specified key.] [Other settings]
```


## Common modes

### Support for common components

In `cli` mode, you can use the `-p, --props [jsonString]` parameter to configure general support for the component. 

For example, you specify the following description in the `s.yaml` of a Serverless Devs application:


```yaml
edition: 1.0.0
access: "myaccess"

services:
  website-starter:
    component: devsapp/website
    props:
      bucket: testbucket
      src:
        codeUri: ./
        publishDir: ./build
        index: index.html
      region: cn-hangzhou
      hosts:
        - host: auto
```

You can also use `s website-starter deploy` to deploy `website-starter`. 

In this case, if you deploy website-starter in `cli` mode, the preceding YAML file is not required. However, you need to write the complete information about parameters in CLI mode. Example:

```shell script
s cli devsapp/website deploy -p "{\"bucket\":\"testbucket\",\"src\":{\"codeUri\":\"./\",\"publishDir\":\"./build\",\"index\":\"index.html\"},\"region\":\"cn-hangzhou\",\"hosts\":[{\"host\":\"auto\"}]}" -a myaccess
```

### Support for specific components

Among the existing components of Serverless Devs, some excellent components, such as the fc-api component, for CLI mode already exist. You can use this component together with Alibaba Cloud Function Compute API operations to perform specified actions:
- If you want to view functions of a service in Alibaba Cloud Function Compute in a region, run the following command:
    ```shell script
    s cli fc-api listFunctions --service-name my-service --region cn-beijing -a myaccess
    ```
- You can run the following command in CLI mode to update code for functions：
    ```shell script
    s cli fc-api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --code '{"zipFile":"./"}'
    ```

In addition, many components that use the YAML mode can deliver better performance. Under certain conditions, you can also perform additional optimization for CLI mode. For example, if you want to synchronize the on- and off-premises resources of the `fc` component, you can run the following command:

```shell script
s cli fc sync --region cn-shanghai --service-name myService --type config
```