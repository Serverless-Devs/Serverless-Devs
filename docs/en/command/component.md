---
title: Component Command  
description: 'Component Command'
position: 5
category: 'Command'
---

# Component command

`component` is used to get the details of installed components.

- [Command Overview](#command-overview)
  - [Parameter](#parameter)
  - [Example](#example)

## Command Overview

When we execute `s component -h`, we can get help information:

```shell script
$ s component -h
Usage: s component [options]

Get details of installed components.
  
  Example:
    $ s component
    
📖  Document: https://serverless.help/t/s/component

Options:
  -h, --help                      Display help for command.
```

### Parameter

No parameters are required.

### Example

We can execute `s component` to get all installed components, for example:

```shell script
$ s component 

🔎 serverless registry [https://registry.serverless-devs.com] 
Component     Version           Size        Description 
fc            0.1.27            100 MB      Aliyun Function Compute Base Component 
devsapp/fc    0.1.27            100 MB      Aliyun Function Compute Base Component
fc api        0.0.44            100 MB      Function Compute api operation component
```
