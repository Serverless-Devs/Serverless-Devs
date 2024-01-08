---
title: Clean Command
description: 'Clean Command'
position: 3
category: 'Commands'
---
# Clean Command
The `s clean` command is designated to clear the cache and associated functionalities within Serverless Devs. With this command, you're able to cleanse the environment, eliminate unused dependencies, and remove relevant cached data.
- [Command Overview](#command-overview)
    - [Parameters](#parameters)
    - [Usage Examples](#usage-examples)
- [Cautions](#cautions)
## Command Overview
To access help information, execute `s clean -h`:
```shell script
$ s clean -h
Usage: s clean [options]
Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
  Example:
    $ s clean --component fc api
    $ s clean --all
  Tips:
    Get all installed component: s component
    
📖  Document: https://serverless.help/t/s/clean
Options:
  --all                           Clean up the environment
  --logs                          Clean logs
  --cache [dirName]               Delete the <dirName> file in the cache
  --component [componentName]     Remove component (like: fc, fc@0.0.1)
  -h, --help                      Display help for command
```
### Parameters
Navigate through the command's options with ease, each tailored for a specific aspect of the clean-up process:
| Parameter | Abbreviation | Required | Description |
|-----|-----|-----|-----|
| all |  | Optional | Initiates a comprehensive environment clean-up |
| logs |  | Optional | Targets log files for cleaning |
| cache |  | Optional | Specifies and removes a <dirName> within the cache |
| component |  | Optional | Deletes a particular component (e.g., fc, fc@0.0.1) |
### Usage Examples
To purge a specific component, employ the `--component` flag alongside the name of the component:
```shell script
$ s clean --component fc api
[2023-******][INFO][s_cli] Component [fc api] has been cleaned up successfully.
```
For cache removal, utilize the `--cache` option as demonstrated below:
```shell script
$ s clean --cache 
[2023-******][INFO][s_cli] Cache cleaned up successfully.
```
Log file clean-up can be achieved through the `--logs` parameter:
```shell script
$ s clean --logs
[2023-******][INFO][s_cli] Logs cleaned up successfully.
```
For an all-encompassing clean-up, the `--all` parameter is at your disposal:
```shell script
$ s clean --all       
[2023-******][INFO][s_cli] Component cleaned up successfully.
[2023-******][INFO][s_cli] Cache cleaned up successfully.
[2023-******][INFO][s_cli] Logs cleaned up successfully.
[2023-******][INFO][s_cli] The environment of Serverless Devs has been cleaned up successfully.
```
## Cautions
Please note the following protocols when executing a component-specific clean-up:
1. The system will first assess if there are any corresponding components within the current Registry cache and proceed to clear them.
2. Following that, the system will purge the ultimate Registry cache, the Github Registry, eradicating any components that match the criteria.
