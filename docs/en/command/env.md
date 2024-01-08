---
title: Env Command
description: 'Env Command'
position: 12
category: 'Commands'
---
# Env Command
The `env` command is used to manage configurations across multiple environments.
- [Command Explanation](#command-explanation)
- [env init Command](#env-init-command)
  - [Parameter Analysis](#parameter-analysis)
  - [Operational Examples](#operational-examples)
- [env list Command](#env-list-command)
  - [Operational Examples](#operational-examples-1)
- [env describe Command](#env-describe-command)
  - [Parameter Analysis](#parameter-analysis-1)
  - [Operational Examples](#operational-examples-2)
- [env destroy Command](#env-destroy-command)
  - [Parameter Analysis](#parameter-analysis-2)
  - [Operational Examples](#operational-examples-3)
- [env default Command](#env-default-command)
  - [Parameter Analysis](#parameter-analysis-3)
  - [Operational Examples](#operational-examples-4)
## Command Explanation
You can view the corresponding help information by executing `s env -h`:
```shell script
Usage: s env [commands] [options]
Managing multiple environments for serverless applications, such as testing, development, and production environments, is the best practice for serverless Devs for serverless environments.
Supported vendors: Alibaba Cloud
📖  Document: https://serverless.help/t/s/env
Options:
  -h, --help                      Display help for command
Commands
  init         🆕 Initialize a new environment
  list         🔣 View the list of existing environments  
  describe     ℹ️ Describe environmental information
  destroy      ↩️ Delete specified environment
  default      🔤 Set default environment
  up           🆙 Deploy designated environmental infrastructure
```
This command includes six sub-commands:
- [init: Initialize an environment](#env-init-command)
- [list: View the environment list for the current project](#env-list-command)
- [describe: View information for a specific environment](#env-describe-command)
- [destroy: Delete a specified environment](#env-destroy-command)
- [default: Set or view the default environment](#env-default-command)
- [up: Deploy resources for a specified environment](#env-up-command)
## env init Command
This command is used to initialize an environment.
Executing `s env init -h` displays the help documentation:
```shell script
Usage: s env init [options]
Initialize env.
    Example:
        $ s env init --name test --project demo --description 'This is a test environment' --type testing
📖  Document: https://serverless.help/t/s/env
Options:
  Options:
  --project <project>                  Specify the project of the environment
  -n, --name <name>                    Env name
  --description <description>          Specify the description of the environment
  --type <type>                        Specify the type of the environment, which must be one of testing, staging, and production. The default is testing (choices: "testing", "staging",
                                       "production")
  --overlays <jsonString>              Declare the differentiated configuration used in the environment, which is used to overwrite s.yaml during deployment
  --infra-stack-name <infraStackName>  Specify the infra stack name
  -h, --help                           Display help for command
```
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| project | - | Optional | Specify the project to which the environment belongs |
| name | n | Optional | Environment name |
| description | - | Optional | Environment description |
| type | - | Optional | Environment type, options are testing, staging, production |
| overlays | - | Optional | Differentiated configuration for the environment, used to override configuration items in s.yaml |
| infra-stack-name | - | Optional | Name of the environment's infrastructure stack |
### Operational Examples
There are two ways to initialize an environment:
- Without any parameters, using interactive mode to initialize the environment.
- Using command line mode to initialize the environment.
#### Interactive Mode
Executing `s env init` without parameters enters interactive mode for environment initialization:
```shell script
$ s env init
? Please specify the manifest file of the environment: env.yaml
? Please specify the project to which the environment belongs: framework
? Please input your environment name: dev
? Please input a description of the environment: 
? Please specify the type of environment: testing
? Please input the configuration of the service to be overridden by the environment(must be json string): 
? Please select an access: alibaba-access
? Do you want to apply InfraStack now? Yes
? Please select a region to deploy the environment. cn-hangzhou
? Please select the role name acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting for ready, 10 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting for ready, 20 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea has been successfully implemented.
Environment init successfully
```
This will generate an `env.yaml` file in the current directory, which is the configuration file for multiple environments, and its content is as follows:
```yaml
project: framework
environments:
  - access: alibaba-access
    name: dev
    description: ''
    type: testing
    infraStack:
      name: framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea
      region: cn-hangzhou
      role: acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
      description: Using Serverless Devs to deploy the infrastructure of project:framework
    overlays: null
```
#### Command Line Mode
Initialization can be performed directly according to the parameters when carrying `-n`, `--project`, etc. For example:
```shell
$ s env init -n dev2
Environment init successfully
```
Now, if you look at `env.yaml`, you'll see that there is an additional environment named `dev2` under `environments`:
```yaml
project: framework
environments:
  ...
  - access: default
    name: dev2
  ...
```
## env list Command
This command is used to view the environment list for the current project.
Executing `s env list -h` displays the help documentation:
```shell script
Usage: s env list [options]
Get env list.
Supported vendors: Alibaba Cloud
    Example:
        $ s env list
📖  Document: https://serverless.help/t/s/env
Options:
  -h, --help                      Display help for command
```
### Operational Examples
Executing `s env list` will show the current project's environment list:
```shell script
$ s env list
- 
  access:      alibaba-access
  name:        dev
  description: 
  type:        testing
  infraStack: 
    name:        framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea
    region:      cn-hangzhou
    role:        acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
    description: Using Serverless Devs to deploy the infrastructure of project:framework
  overlays:    null
- 
  access: default
  name:   dev2
```
## env describe Command
This command is used to view information for a specific environment.
Executing `s env describe -h` displays the help documentation:
```shell script
Usage: s env describe [options]
Describe specified env.
Supported vendors: Alibaba Cloud
    Example:
        $ s env describe --name test-env
📖  Document: https://serverless.help/t/s/env
Options:
  -n, --name <name>               Env name
  -h, --help                      Display help for command
```
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| name | n | Mandatory | Environment name |
### Operational Examples
To view detailed information about a specific environment, you can use `s env describe --name <name>`. For example:
```shell
$ s env describe --name dev
access:      alibaba-access
name:        dev
description: 
type:        testing
infraStack: 
  name:        framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea
  region:      cn-hangzhou
  role:        acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
  description: Using Serverless Devs to deploy the infrastructure of project:framework
overlays:    null
```
## env destroy Command
This command allows you to delete an environment.
Executing `s env destroy -h` displays the help documentation:
```shell
Usage: s env destroy [options]
Delete specified env.
Supported vendors: Alibaba Cloud
    Example:
        $ s env destroy --name test-env
📖  Document: https://serverless.help/t/s/env
Options:
  -n, --name <name>               Env name
  -h, --help                      Display help for command
```
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| name | n | Mandatory | Environment name |
### Operational Examples
Using `s env destroy --name <name>` allows you to delete a specific environment. For example:
```shell
$ s env destroy -n dev
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting to be removed, 10 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting to be removed, 20 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea has been successfully implemented.
The environment dev was destroyed successfully
```
If the environment does not exist, it will prompt:
```shell script
$ s env destroy -n dev
Error Message:
The environment dev was not found
```
## env default Command
This command is used to set or view the default environment.
Executing `s env default -h` displays the help documentation:
```shell
Usage: s env default [options]
Set or check default environment.
Supported vendors: Alibaba Cloud
    Example:
        $ s env default -n default
📖  Document: https://serverless.help/t/s/env
Options:
  -n, --name <name>               Env name
  -h, --help                      Display help for command
```
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| name | n | Optional | Environment name |
### Operational Examples
Using `s env default --name <name>` allows you to set the default environment. For example:
```shell
$ s env default --name dev
Set default env [dev] for project [framework] successfully
```
Subsequently, you can use `s env default` to view the current default environment. For example:
```shell
$ s env default
👉  Current default environment: dev
```
If no default environment has been set, it will prompt:
```shell
$ s env default
👉  No default environment.
```
