---
title: Registry Command
description: 'Registry Command'
position: 10
category: 'Commands'
---
# Registry Command

The `registry` command is used to publish templates to [Serverless Registry](https://registry.serverless-devs.com) and manage related content.

- [Command Overview](#command-overview)
- [login Command](#registry-login-command)
  - [Parameter Analysis](#parameter-analysis)
  - [Operational Examples](#operational-examples)
- [publish Command](#registry-publish-command)
  - [Operational Examples](#operational-examples-1)
- [list Command](#registry-list-command)
  - [Parameter Analysis](#parameter-analysis-1)
  - [Operational Examples](#operational-examples-2)
- [detail Command](#registry-detail-command)
  - [Parameter Analysis](#parameter-analysis-2)
  - [Operational Examples](#operational-examples-3)
- [delete Command](#registry-delete-command)
  - [Parameter Analysis](#parameter-analysis-3)
  - [Operational Examples](#operational-examples-4)

## Command Overview

You can view related help information by executing `s registry -h`:

```shell script
Usage: s registry [commands] [options]
You can manage Serverless Packages on Serverless Registry.
📖  Document: https://serverless.help/t/s/registry
Options:
  -h, --help                      Display help for command
Commands:
  login [options]                 😃  Login to Serverless Registry
  publish                         ✅  Publish a Serverless Package to Serverless Registry
  list [options]                  🐵  List the packages you have published
  detail [options]                🌱  View specific package details
  delete [options]                ❌  Delete a specific package
  help [command]                  display help for command
```

This command includes five sub-commands:

- [login: Log in to Serverless Registry](#registry-login-command)
- [publish: Publish a Serverless Package](#registry-publish-command)
- [list: View the Serverless Packages you have published](#registry-list-command)
- [detail: View details of a specific Serverless Package](#registry-detail-command)
- [delete: Delete a published Serverless Package](#registry-delete-command)

## registry login Command

This command allows you to log in to [Serverless Registry](https://registry.serverless-devs.com).
Executing `s registry login -h` displays the help documentation:

```shell script
Usage: s registry login [options]
Login to Serverless Registry.
Example:
  $ s registry login
  $ s registry login --token xxxxxxxxxxxxxxx
  $ s registry login --retoken
   
📖  Document: https://serverless.help/t/s/registry-login
Options:
  --token <token>                 Login by token
  --retoken                       Reset login token
  -h, --help                      Display help for command
```

### Parameter Analysis

| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| token | - | Optional | Log in using the specified token |
| retoken | - | Optional | Reset the login token |

### Operational Examples

There are two modes for login:

- Mode 1: If you already have the token information after logging in, you can use `s registry login --token <token>` to directly configure the token.
- Mode 2: If you do not have the token information or have not registered on Serverless Registry, you can directly open the browser and follow the prompts for login authorization using `s registry login`.
If the Serverless Registry Token information leaks for some reason, you can reset the token using `s registry login --retoken`.

## registry publish Command

This command publishes projects that comply with the Serverless Package specification.
Executing `s registry publish -h` displays the help documentation:

```shell script
Usage: s registry publish [options]
Publish to Serverless Registry.
Example:
  $ s registry publish
   
📖  Document: https://serverless.help/t/s/registry-publish
Options:
  -h, --help                      Display help for command
```

### Operational Examples

Under proper configuration, executing `s registry publish` in the root directory of the component will result in:

```shell script
$ s registry publish
Package complete.
```

## registry list Command

This command lists the components published by the account currently logged in to [Serverless Registry](https://registry.serverless-devs.com).
Executing `s registry list -h` displays the help documentation:

```shell script
Usage: s registry list [options]
View the components published by the current login to the Serverless Registry account.
Example:
  $ s registry list
   
📖  Document: https://serverless.help/t/s/registry-list
Options:
  --category <category>           category ID
  --tag <tag>                     Tag ID
  --search <search>               Search keyword
  --page <number>                 Page number (default: "1")
  -h, --help                      Display help for command
```

### Parameter Analysis

| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| category | - | Optional | Filter by category ID |
| tag | - | Optional | Filter by tag ID |
| search | - | Optional | Filter by search keyword |
| page | - | Optional | Specify the page number to view |

### Operational Examples

You can view the components published by the account logged in to [Serverless Registry](https://registry.serverless-devs.com) using the `s registry list` command. For example:

```shell script
$ s registry list
- 
  id:           9
  type:         Component
  name:         aliyun_oss_bucket
  description:  Deploying Alibaba Cloud resources via Alibaba Cloud ROS
  show:         Public
  organization: 
    id:   1
    name: Alibaba Cloud Function Compute (FC)
  user: 
    id:       3
    username: ******
  download:     0
  provider: 
    - Alibaba Cloud
  platform:     3
  category: 
    id:   3
    name: Basic Cloud Services
  tags: 
    - ROS
    - IAC
-
...
```

The `list` command outputs all components. When there are too many components, you can filter them using the `category`, `tag`, and `page` parameters or search for specific components using the `search` parameter.

## registry detail Command

This command is used to view information about a specified package.
Executing `s registry detail -h` displays the help documentation:

```shell script
Usage: s registry detail [options]
View package details.
Example:
  $ s registry detail --package-name fc3
   
📖  Document: https://serverless.help/t/s/registry-detail
Options:
  --package-name <name>           Serverless Package name
  --page <number>                 Page number (default: "1")
  -h, --help                      Display help for command
```

### Parameter Analysis

| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| package-name | - | Mandatory | Specify the package to view |
| page | - | Optional | Specify the page number to view |

### Operational Examples

To view detailed information about a specific package, use `s registry detail --package-name <package-name>`. For example:

```shell script
$ s registry detail --package-name fc3
- 
  platform:    3
  tag_name:    0.0.8
  created_at:  ******
  zipball_url: ******
- 
  platform:    3
  tag_name:    dev.0.56
  created_at:  ******
  zipball_url: ******
- 
...
```

If there are too many results, you can use the `page` parameter to view them in pages. For example:

```shell script
$ s registry detail --package-name fc3 --page 2
- 
  platform:    3
  tag_name:    dev.0.41
  created_at:  ******
  zipball_url: ******
- 
...
```

## registry delete Command

This command allows you to delete a published Serverless Package.
Executing `s registry delete -h` displays the help documentation:

```shell script
Usage: s registry delete [options]
Delete package version.
Example:
  $ s registry delete --name fc --version-id 1.0.1
   
📖  Document: https://serverless.help/t/s/registry-delete
Options:
  --name <name>                   Serverless Package name
  --version-id <version-id>       Serverless Package version
  -h, --help                      Display help for command
```

### Parameter Analysis

| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| name | - | Mandatory | Specify the name of the package to delete |
| version-id | - | Mandatory | Specify the version of the package to delete |

### Operational Examples

Using `s registry delete --name <name> --version-id <version-id>` you can delete a specific version of a particular package. If the package does not exist or the version is incorrect, it will prompt:

```shell script
$ s registry delete --name fc --version-id 1.0.1
 
Error Message:
Specified resource not found
```
