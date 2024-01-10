---
title: Init Command
description: 'Init Command'
position: 8
category: 'Commands'
---
# Init Command

The `init` command is used to scaffold a Serverless project.

- [Command Overview](#command-overview)
  - [Parameter Analysis](#parameter-analysis)
  - [Initialize Project](#initialize-project)
    - [Interactive Initialization](#interactive-initialization)
    - [Direct Initialization](#direct-initialization)
      - [Initialize Registry Application](#initialize-registry-application)
      - [Initialize Repository Application](#initialize-repository-application)

## Command Overview

After executing `s init -h`, you can view related help information:

```shell script
$ s init -h
Usage: s init [options]
Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.
Example:
    $ s init
    $ s init <project> 
    $ s init <project> -d my_dir
    $ s init <project> --app-name my-express
    $ s init <project> --parameters '{"serviceName":"websiteService"}'
    $ s init git@github.com:foo/bar.git
    $ s init https://github.com/foo/bar.git
    
📖  Documentation: https://serverless.help/t/s/init
🚀  More applications: https://registry.serverless-devs.com
Options:
  -d, --dir <dir>                 Where to output the initialized app into (default: ./<ProjectName> )
  -r, --registry <url>            Use specify registry
  --uri <uri>                     Use specify uri, Eg: remote url, local dir, local zip file
  -y                              Assume that the answer to any question which would be asked is yes
  --parameters <parameters>       Initialize with custom parameters
  --app-name <appName>            Modify default Application name
  --no-overwrite                  Only overwrite files with the same name
  -h, --help                      Display help for command
```

### Parameter Analysis

| Full Parameter | Abbreviation | Default Value | Description |
|-----|-----|-----|-----|
| dir | d | `./<ProjectName>` | Path/directory where the project is initialized |
| registry | -r | <http://registry.devsapp.cn/simple> | Source configuration address, similar to specifying pip source in Python or NPM source in Node.js |
| uri | - | - | Address of a remote or local file |
| - | y | - | Assume yes as the answer to all questions |
| parameters |  | {"serviceName":"websiteService"} | Parameters for initialization |
| appName |  | my-express | Application/project name |
| no-overwrite | - | - | Only overwrite files with the same name, do not delete other files |

### Initialize Project

#### Interactive Initialization

By running `s init`, you can directly enter the project initialization guide module:

```shell script
$ s init
🚀  More applications: https://registry.serverless-devs.com
? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Huawei Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

At this point, you simply select the corresponding option and follow the instructions. For example, if you choose `Alibaba Cloud Serverless`, you can see the application template categories under Alibaba Cloud Serverless products:

```shell script
? Hello, serverlesser. Which template do you like? (Use arrow keys or type to search)
❯ Quick start [Deploy a Hello World function to FaaS] 
  Custom runtime example [Deploy function to FaaS with custom runtime] 
  Container example [Deploy function to FaaS with custom-container] 
  Custom domain example [Deploy function to FaaS with custom domain] 
```

You can then continue to select specific applications within a category to initialize. For instance, after choosing `Quick start`, you can see specific template applications under that category:

```shell script
? Which template do you like? (Use arrow keys or type to search)
❯ Node.js 
  Python3 
  Java 
  Go 
  Dotnet 
(Move up and down to reveal more choices)
```

Selecting `Node.js` will complete the creation:

```shell script
$ s init                                         
🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome
🚀  More applications: https://registry.serverless-devs.com
? Hello Serverless for Cloud Vendors Alibaba Cloud Serverless
? Hello, serverlesser. Which template do you like? Quick start [Deploy a Hello World function to FaaS]
? Which template do you like? Node.js
......
💞  Document ❤ Star: https://github.com/Serverless-Devs/Serverless-Devs
🚀  More applications: https://registry.serverless-devs.com
```

For more information about the applications corresponding to the default source, please refer to [Serverless Registry](https://registry.serverless-devs.com/).

#### Direct Initialization

Using `s init [name | url]`, you can obtain template projects from the configured `Registry` or specified repository `Url`.

##### Initialize Registry Application

Taking the default `Registry` as an example, you can initialize the corresponding sample project: `start-fc-http-nodejs12` by using the command `s init start-fc-http-nodejs12`:

```shell script
$ s init start-fc-http-nodejs12
🚀  More applications: https://registry.serverless-devs.com
? Please input your project name (init dir) start-fc-http-nodejs12
Downloading[/simple/start-fc-http-nodejs12/zipball/1.1.23]...
......
💞  Document ❤ Star: https://github.com/Serverless-Devs/Serverless-Devs
🚀  More applications: https://registry.serverless-devs.com
```

##### Initialize Repository Application

Taking the Github repository `https://github.com/devsapp/start-fc` as an example, you can initialize the sample project with the command `s init https://github.com/devsapp/start-fc.git`:

```shell script
$ s init https://github.com/devsapp/start-fc.git
🚀  More applications: https://registry.serverless-devs.com
Cloning into 'start-fc'...
remote: Enumerating objects: 6403, done.
remote: Counting objects: 100% (1693/1693), done.
remote: Compressing objects: 100% (953/953), done.
remote: Total 6403 (delta 863), reused 1462 (delta 667), pack-reused 4710
Receiving objects: 100% (6403/6403), 33.25 MiB | 3.57 MiB/s, done.
```
