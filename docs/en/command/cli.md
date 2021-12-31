# Cli command

The `cli` command is a Yamlized command line mode, that is, the components of Serverless Devs can be used directly through the command line without relying on the Yaml file.

- [Command resolution](#Command-resolution)
- [Common Mode](#Common-Mode)
    - [Common component support](#Common-component-support)
    - [Support for specific components] (#Support-for-specific-components)

> The difference between Yaml mode and Cli mode and trial scenarios, please refer to the document [Yaml mode Cli mode comparison](./../yaml_and_cli.md)

## Command analysis

After we execute `s cli -h`, we can view related help information:

```shell script
$ s cli -h
Usage: s cli [component] [method] [options]

Directly use serverless devs to use components, develop and manage applications without yaml configuration.
    
    Example:
        $ s cli fc-api listServices
        $ s cli fc-api listFunctions --service-name my-service
        $ s cli fc-api deploy -p "{/"function/": /"function-name/"}"
    
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/cli.md

Options:
  -a, --access [aliasName] Specify the access alias name
  -p, --props [jsonString] The json string of props
  -h, --help Display help for command
```

The main methods of use are:

```shell script
s cli [component name, such as fc, fc-api, etc.] [component method] -p/--props [Yaml property corresponding to this method (JSON string)] -a/--access [specify key information] [Other settings]
```


## Common patterns

### Common component support

In the `cli` mode, you can pass the `-p, --props [jsonString]` parameter to support the components in general.

For example, a Serverless Devs application can be described by the following `s.yaml`:

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
        -host: auto
```

In addition, you can use `s website-starter deploy` to deploy the `website-starter` part.

At this point, if you deploy through the `cli` mode, you don't need to rely on the above Yaml, but you need to write the complete parameter information in the command line:

```shell script
s cli devsapp/website deploy -p "{\"bucket\":\"testbucket\",\"src\":{\"codeUri\":\"./\",\"publishDir\":\" ./build\",\"index\":\"index.html\"},\"region\":\"cn-hangzhou\",\"hosts\":[{\"host\":\ "auto\"}]}" -a myaccess
```

### Specific component support

Among the existing components of Serverless Devs, there are already some excellent components designed for the Cli mode. For example, the `fc-api` component is a command-line mode priority component. Through this component, you can quickly use Ali Some interfaces of cloud function computing to perform operations, such as:

-View the list of functions under a certain service in a certain area of ​​Alibaba Cloud Function Computing:
    ```shell script
    s cli fc-api listFunctions --service-name my-service --region cn-beijing -a myaccess
    ```
-Update the function code through pure command line form:
    ```shell script
    s cli fc-api updateFunction --region cn-hangzhou --serviceName fc-deploy-service --functionName http-trigger-function --code'{"zipFile":"./"}'
    ```

In addition, many components can have better support for the Yaml mode, and in some cases, the pure command line mode will be optimized for additional design, such as the online and offline resource synchronization operation of the `fc` component:
```shell script
s cli fc sync --region cn-shanghai --service-name myService --type config
```
