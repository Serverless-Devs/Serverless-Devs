---
title: Cli Command
description: 'Cli Command'
position: 4
category: 'Commands'
---
# Cli Command

The `cli` command provides a command line interface within Yamlized, allowing direct use of Serverless Devs components via the CLI without the dependence on Yaml files.

- [Command Overview](#command-overview)
- [Common Usage Patterns](#common-usage-patterns)
  - [General Component Support](#general-component-support)
  - [Specific Component Support](#specific-component-support)

> For insights into the differences between Yaml mode and Cli mode, as well as their respective use cases, please consult the [Yaml Mode vs. Cli Mode Comparison](./../yaml_and_cli.md) document.
>
## Command Overview

Executing `s cli -h` displays the relevant help information:

```shell script
$ s cli -h
Usage: s cli [options]
Utilize Serverless Devs components for application development and management without the need for yaml configuration.
  
  Examples:
    $ s cli fc3 info --region cn-hangzhou --function-name  test -a myAccess
    $ s cli fc3 invoke --region cn-hangzhou --function-name  test -e "{"key" : "val"}" -a myAccess
    
📖  Documentation: https://serverless.help/t/s/
Options:
  -p, --props <jsonString>        JSON string of props
  -h, --help                      Display help for command
```

Typical usage involves:

```shell script
s cli [component name, e.g., fc, fc api, etc.] [component method] -p/--props [Yaml property equivalent for the method (JSON string)] -a/--access [specify key info] [additional settings]
```

## Common Usage Patterns

### General Component Support

In Cli mode, you can support components by using the `-p, --props [jsonString]` parameter.
For instance, a Serverless Devs application might be described like so:

```yaml
edition: 3.0.0
access: "myaccess"
resources:
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

This setup's `website-starter` segment can normally be deployed with `s website-starter deploy`.
However, to deploy via `cli` mode, you bypass the Yaml file and directly input complete parameter details on the command line:

```shell script
s cli devsapp/website deploy -p "{\"bucket\":\"testbucket\",\"src\":{\"codeUri\":\"./\",\"publishDir\":\"./build\",\"index\":\"index.html\"},\"region\":\"cn-hangzhou\",\"hosts\":[{\"host\":\"auto\"}]}" -a myaccess
```

### Specific Component Support

Serverless Devs offers several well-designed components that are optimized for Cli mode. For example, the `fc3` component is prioritized for command line usage, facilitating quick interactions with certain Aliyun Function Compute (FC) service interfaces, such as:

- Listing functions within a specified function and region:

   ```bash
    s cli fc3 info --region cn-hangzhou --function-name  test -a myAccess
    ```

- Invoking function via the command line:

    ```bash
    s cli fc3 invoke --region cn-hangzhou --function-name  test -e "{\"key\" : \"val\"}" -a myAccess
    ```

Furthermore, several components that typically support Yaml mode may also offer an optimized pure command line interface for specific operations. An example is the `fc3` component, which provides commands for resource synchronization:

```bash
$ s cli fc3 sync -h
Usage: s cli fc3 sync [options]

Synchronize online resources to offline resources.

Examples with Yaml:
  $ s sync
  $ s sync --target-dir ./test --qualifier testAlias

Examples with CLI:
  $ s cli fc3 sync --region cn-hangzhou --function-name test -a default
  $ s cli fc3 sync --region cn-hangzhou --function-name s1\$f1 -a default
...
```
