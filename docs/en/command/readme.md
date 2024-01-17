---
title: Command Operation Documentation
description: 'Serverless Devs Command Operation Documentation'
position: 2
category: 'Commands'
---
# Command Operation Documentation

- [Preface](#preface)
- [Global Parameters](#global-parameters)
- [Command Details](#command-details)
  - [config: Key Configuration](./config.md)
  - [init: Project Initialization](./init.md)
  - [cli: Pure Command Line Mode](./cli.md)
  - [clean: Tool Cleanup](./clean.md)
  - [component: Component Information](./component.md)
  - [set: Tool Configuration](./set.md)
  - [custom: Custom Commands](./custom.md)
  - [registry: Template Management](./registry.md)
  - [preview: Preview Render Results](./preview.md)
  - [verify: Verify Yaml Content](./verify.md)

## Preface

Serverless Devs can invoke the corresponding help documentation for commands using `-h`. For example, to view help information for the `s` command, you can use: `s -h`

```shell script
$ s -h
😃  Welcome to the Serverless Devs

Usage: s [options] [command]

Options:
  --debug                         Open debug model
  --skip-actions                  Skip the extends section
  -t, --template <path>           Specify the template file
  -a, --access <aliasName>        Specify the access alias name
  -o, --output <outputFormat>     Specify the output format (choices: "default", "json", "yaml", "raw")
  --output-file <outputFilePath>  Specify the output file path
  --env <envName>                 Specify the env name
  --no-verify                     Do not verify yaml
  --silent                        Silent mode
  -v, --version                   Output the version number
  -h, --help                      Display help for command

Commands:
  config                          👤  Configure venders account
  env                             🌱  Environment operation
  set                             🔧  Settings for the tool
  registry                        🚢  Serverless registry platform
  preview                         👀  Preview Yaml render results
  component                       🔌  Installed component information
  clean [options]                 💥  Clean up the environment
  init [options]                  💞  Initializing a serverless project
  verify                          🔭  Verify Yaml content
  <custom>                        🧭  Custom Commands


🙌   Quick Start:      https://docs.serverless-devs.com/quick-start
🌟   Github Repo:      https://github.com/Serverless-Devs/Serverless-Devs
💡   Documentation:    https://docs.serverless-devs.com
🚀   Example Projects: https://registry.serverless-devs.com
📝   Feedback:         https://github.com/Serverless-Devs/Serverless-Devs/issues
```

## Global Parameters

| Full Parameter | Abbreviation | Default Value | Meaning | Notes |
|-----|-----|-----|-----|-----|
| template | t | `s.yaml`/`s.yml` | Specify the resource description file |  |
| access | a | Specified in `yaml` or `default` | Specify the key information for the deployment | Can use keys configured via [config command](./command/config.md#config-add-command), as well as [keys configured in environment variables](./command/config.md#setting-keys-via-environment-variables) |
| skip-actions | - | - | Skip the `actions` module set in `yaml` | - |
| debug | - | - | Enable `Debug` mode | Enabling `Debug` mode allows viewing more information about tool execution |
| output | o | `default` | Specify the data output format | Supports `default`, `json`, `yaml`, `raw` formats |
| version | v | - | View version information | - |
| help | h | - | View help information | - |
| silent | - | - | Silent mode | Will only output component execution results |
| env | - | - | Specify the environment | Used in multi-environment scenarios |
| output-file | - | - | Specify the output file path | - |
| no-verify | - | - | Do not verify `yaml` file | - |

## Command Details

- [config: Key Configuration](./config.md)
- [init: Project Initialization](./init.md)
- [cli: Pure Command Line Mode](./cli.md)
- [clean: Tool Cleanup](./clean.md)
- [set: Tool Configuration](./set.md)
- [component: Component Information](./component.md)
- [custom: Custom Commands](./custom.md)
- [registry: Template Management](./registry.md)
- [preview: Preview Render Results](./preview.md)
- [verify: Verify Yaml Content](./verify.md)
