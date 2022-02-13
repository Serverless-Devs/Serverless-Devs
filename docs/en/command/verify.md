---
title: Verify command
description: 'Verify command'
position: 5
category: 'Commands'
---
# Verify command

The verify commands are used to `verify` the formats of serverless applications.

- [Command description](#Command-description)
    - [Parameter description](#Parameter-description)
    - [Example](#Example)

## Command description

After you run the `s verify -h` command, the following help information is returned：

```shell script
$ s verify -h
Usage: s verify

Application verification.

    Example:
        $ s verify
        
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/verify.md

Options:
  -t, --template [templatePath]  Specify the template file
  -h, --help                     Display help for command
```

### Parameter description

| Parameter | Abbreviation | Default value | Description |
|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | Specifies the description file of a resource. |  |  

### Example

You can run the `s verify` command to verify the format of an application：

```shell script
# Sample success responses： 

 ✅  Format verification passed.

# Sample error responses： 
 ❌ Format verification failed.
      key               Your Value Type                 Target Type             Description
     CodeUri               String                        Struct                    The description of the parameter.

# Magic variables exist in the command output:
 ✴️ Format validation unknown: 
     key               Your Value Type               Target Type           Description
     CodeUri             Unknown                       Struct                 The description of the parameter.

 ❓There may be dependencies between components, and you need to deploy them before you can determine the format.
```