---
title: Verify Command
description: 'Verify Command'
position: 13
category: 'Commands'
---
# Verify Command

The `verify` command is used to validate the content (format and values) of a Serverless Devs Yaml file.

- [Command Overview](#command-overview)
    - [Functional Principle](#functional-principle)
    - [Operation Examples](#operation-examples)
        - [Without Component Support](#without-component-support)
        - [With Component Support](#with-component-support)

## Command Overview

After executing `s verify -h`, you can view the related help information:

```shell script
Usage: s verify [commands] [options]
Verify Yaml format and values.
📖  Document: https://serverless.help/t/s/verify
Options:
  -h, --help                      Display help for command
```

### Functional Principle

The functionality of the `verify` command includes two parts:

1. Serverless Devs tool side: Performs basic checks on the Yaml file's format, magic variables, and versions. This part of the functionality is similar to the `preview` command.
2. Component side: The component provides a method, according to certain conventions, to conduct a more detailed truth verification of all resource attribute values in the Yaml file, such as whether the type is correct and whether the value exists in the enumeration options.

The convention method and development examples for the component side can be found here: [Serverless Devs Component Development Specification](https://docs.serverless-devs.com/serverless-devs/development-manual/component#约定方法).

### Operation Examples

#### Without Component Support

If the component in the Yaml file does not provide the convention method, Serverless Devs will only perform basic validation on the Yaml file (by default, this is the `s.yaml` file in the current directory, which can also be specified with `-t` for other files and `--env` for specifying the environment), and it will prompt for errors in the Yaml file. If there are no errors, the prompt will be as follows:

```shell script
$ s verify
Verify [s.yaml] success!
```

If there are errors, they will be reported. Here is an example of a magic variable resolution failure:

```shell script
$ s verify -t s.yaml
 
Error Message:
anonymous:1:1
 >> 1| ${vars.region}
RuntimeError: ${vars.region} not found
```

#### With Component Support

When the component in the Yaml file provides the convention method, Serverless Devs will not only perform basic validation but will also conduct truth verification of all resources in the Yaml file and prompt for existing errors. Below is an example using the method provided by the [fc3](https://github.com/devsapp/fc3) component to check resource properties, where the value type is incorrect:

Partial content of `s.yaml` is as follows:

```yaml
...
resources:
  demo:
    component: fc3
    props: # Component property values
      ...
      memorySize: 128
      timeout: this is a string
...
```

As seen above, the value of the `timeout` property is `this is a string`, but the type of this property is `integer`, so it will result in an error. Executing the `s verify` command, the prompt will be as follows:

```shell script
$ s verify
 
Error Message:
demo/props/timeout must be integer
```

In addition, it can also detect enumeration items. Suppose `s.yaml` content is as follows:

```yaml
...
resources:
  demo:
    component: fc3
    props: # Component property values
      ...
      runtime: "nodejs4"
      ...
```

The value of the `runtime` property is `nodejs4`, but this value is not included in the enumeration options of that property, thus it will result in an error and prompt all of the enumeration options. Executing the `s verify` command, the prompt will be as follows:

```shell script
$ s verify
 
Error Message:
demo/props/runtime must be equal to one of the allowed values: custom, custom-container, custom.debian10, dotnetcore2.1, dotnetcore3.1, go1, java11, java8, nodejs10, nodejs12, nodejs14, nodejs16, php7.2, python2.7, python3, python3.10, python3.9
```
