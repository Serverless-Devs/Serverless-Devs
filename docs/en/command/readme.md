---
title: User guide of commands
description: 'Serverless Devs User guide of commands'
position: 1
category: 'Commands'
---

# User guide of commands

- [Background information](#Background-information)
- [Supported parameters](#Supported-parameters)
- [Supported commands](#Supported-commands)
    - [**Config**: Run the config command to configure a key](config.md)
    - [**Init**: Run the init command to initialize a project](init.md)
    - [**Cli**: Run the cli command to use the CLI mode](cli.md)
    - [**Verify**: Run the verify command to verify the format of an application](verify.md)
    - [**Edit**: Run the edit command to edit an application](edit.md)
    - [**Clean**: Run the clean command to clean a tool](clean.md)
    - [**Component**: Run the component command to query the information about a component](component.md)
    - [**Set**: Run the set command to configure a tool](set.md)
    - [**Custom**: Run the custom command to use a custom command](custom.md)

## Background information

Serverless Devs allows you to run a command that contains the `-h` parameter to query the help information about a command. For example, you can run the` s -h` command to query the help information about the `s` command.

```shell script
$ s -h
🚀  Welcome to the Serverless Devs.

Options
  --debug                        Open debug model.              
  --skip-actions                 Skip the extends section.      
  -t, --template <path>          Specify the template file.     
  -a, --access <aliasName>       Specify the access alias name. 
  -o, --output <outputFormat>    Specify the output format: json, yaml, raw.  
  -v, --version                  Output the version number.     
  -h, --help                     Display help for command.      

Commands
  config                         👤  Configure vendors account.                
  init                           💞  Initializing a serverless project.        
  cli                            🐚  Command line operation without yaml mode. 
  verify                         🔎  Verify the application.                   
  set                            🔧  Settings for the tool.                    
  clean                          💥  Clean up the environment.                 
  component                      🔌  Installed component information.          
  edit                           🙌  Application editing.                      


Examples
  init                           Perform [s init] fast experience Serverless Devs. 

🧭  More information: https://github.com/Serverless-Devs/Serverless-Devs
🚀  More applications: https://registry.serverless-devs.com
```

## Supported parameters

| Parameter    | Abbreviation | Default value                                                | Description                                                  | Remarks                                                      |
| ------------ | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| template     | t            | s.yaml/s.yml                                                 | Specifies the description file of a  resource.               |                                                              |
| access       | a            | the value of the access parameter specified in a YAML file/default | Specifies the information about the key.                     | You can use the key information that is  configured by using [the config command](command/config.md#config-add-command) or [environment variables](command/config.md#Configure keys by using environment variables). |
| skip-actions | -            | -                                                            | Skips the actions section that is specified in the YAML file. | -                                                            |
| debug        | -            | -                                                            | Enables the debug mode.                                      | After you enable the debug mode, you can obtain a larger amount of information about the  execution process of a tool. |
| output       | o           | `default`                     |  Specifies the output format. | Support: `default`, `json`, `yaml`, `raw`                  | 
| version      | v            | -                                                            | Queries the version information.                             | -                                                            |
| help         | h            | -                                                            | Queries the help information.                                | -                                                            |

## Supported commands

- [**Config**: Run the config command to configure a key](config.md)
- [**Init**: Run the init command to initialize a project](init.md)
- [**Cli**: Run the cli command to use the CLI mode](cli.md)
- [**Verify**: Run the verify command to verify the format of an application](verify.md)
- [**Edit**: Run the edit command to edit an application](edit.md)
- [**Clean**: Run the clean command to clean a tool](clean.md)
- [**Set**: Run the set command to configure a tool](set.md)
- [**Component**: Run the component command to query the information about a component](component.md)
- [**Custom**: Run the custom command to use a custom command](custom.md)