---
title: Set command
description: 'Set command'
position: 9
category: 'Commands'
---
# Set command

The `set` commands are used to configure tools.

- [Command description](#Command-description)
- [set registry command](#set-registry-command)
- [set locale command](#set-locale-command)
- [set analysis command](#set-analysis-command)
- [set workspace command](#set-workspace-command)

## Command description

After you run the `s set -h` command, the following help information is returned:

```shell script
$ s set -h
Usage: s set [commands] [options]

You can make some default settings for the tool here.

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/set.md

Options:
  -h, --help  Display help for command

Commands:
  registry    👀 Set up a custom registry
  locale      🔧 Set up current language
  analysis    👉 Set to enable or disable analysis
```

The sample code contains the following subcommands:
- [registry: Configure repositories for Serverless Devs.](#set-registry-command)
- [locale: Configure the languages of Serverless Devs.](#set-locale-command)
- [analysis: Configure data analysis for Serverless Devs.](#set-analysis-command)

## set registry command

The set registry command is used to configure repositories for Serverless Devs. 

After you run the `s set registry -h` command, the following help information is returned:


```shell script
$ s set registry -h

Usage: s set registry [options]

Set registry information.

    Example:
        $ s set registry
        $ s set registry http://registry.devsapp.cn/simple

Options:
  -h, --help  Display help for command
```

You can use the following methods to run the set registry command: 
1. Provide Registry information directly, for example:`s set registry http://registry.devsapp.cn/simple`
2. Run the command in interactive mode. Example: 
    ```shell script
    $ s set registry
    
    🔎 Current registry: http://registry.devsapp.cn/simple
    
    ? Choose a registry? (Use arrow keys)
    ❯ serverless registry [http://registry.devsapp.cn/simple] 
      github registry [https://api.github.com/repos]
      gitee registry [http://gitee.registry.devsapp.cn/simple]
      custom registry 
    ```
    Then, follow instructions to select options based on your business requirements.

> You can use the following repositories: Github Registry, Gitee Registry, and Serverless Devs Registry. The following information describes the relationships among the three repositories: 
> - Github Registry: the ultimate default repository. Even if you do not configure Github Registry for your project, this repository is used when the required information cannot be found in the repository that you configure. 
> - Gitee Registry: the repository that Gitee and Alibaba Cloud jointly develop for Chinese users. 
> - Serverless Devs Registry: the default repository for the Serverless Devs community and the default repository for your project.    
> The following flowchart shows how data is loaded in Serverless Devs. 
> ![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635132866484_20211025033426634967.png)

> 🙊 Note: By default, the serverless registry is `serverless devs offical registry [http://registry.devsapp.cn/simple] `.

## set locale command

The set locale command is used to configure the languages of Serverless Devs. 

After you run the `s set locale -h` command, the following help information is returned:

```shell script
$ s set locale -h

Usage: s set locale [options]

Set language information.

    Example:
        $ s set locale
        $ s set locale zh

Options:
  -h, --help  Display help for command
```

There are two ways to set the locale:
1. Provide the language abbreviation directly, for example: `s set locale zh`
2. Switch language information through interactive methods:
     ```shell script
     $ s set locale
    
     💬 Current language: Chinese (zh)
    
     ? Choose a language? (Use arrow keys)
     ❯ Chinese (zh)
       English (en)
     ````
     At this point, you only need to select the corresponding option, and you can operate in a guided manner.

> 🙊 Note: The system default locale is: `zh`

## set analysis command

With this command, you can configure the data analysis capabilities of the Serverless Devs developer tools.

Execute the `s set analysis -h` command, you can see the help document

```shell script
$ s set analysis -h

Usage: s set analysis [options]

Set analysis action.

    Example:
        $ s set analysis
        $ s set analysis disable

Options:
  -h, --help  Display help for command
```

There are two ways to set up analysis:
1. Configure directly, for example: `s set analysis disable`
2. Through the interactive method, configure:
     ```shell script
     $ s set analysis
    
     📝 Current analysis action: enable
    
     ? Choose an action? (Use arrow keys)
     ❯ enable
       disable
     ````
     At this point, you only need to select the corresponding option, and you can operate in a guided manner.

> 🙊 Note: The system default analysis is: `enable`

## set workspace command

With this command, you can configure the default path of the Serverless Devs developer tools.

Execute the `s set workspace -h` command to see the help documentation

```shell script
$ s set workspace -h

Usage: s set workspace [options]

Set workspace path. Switching workspaces may make previously cached components and configured key information unavailable.

    Example:
        $ s set workspace
        $ s set workspace ~/.s

Options:
  -h, --help  Display help for command
```

There are two ways to set the workspace:
1. Configure directly, for example: `s set workspace ~/.s`
2. Through the interactive method, configure:
     ```shell script
     $ s set workspace
    
     📝 Current workspace path: ~/.s
    
     🙊 Switching workspaces may make previously cached components and configured key information unavailable.
     
     ? Please input an absolute path:
     ````
     At this point, you only need to select the corresponding option, and you can operate in a guided manner.



> 🙊 Note: The default workspace of the system is: `~/.s`