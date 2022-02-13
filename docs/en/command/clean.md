---
title: Clean command
description: 'Clean command'
position: 7
category: 'Commands'
---

# Clean command

The `clean` command can be used to clean up the cache of Serverless Devs. You can use this command to clean up the environment, dependency packages that are not used, and the cache. 

- [Command-description](#Command-description)
    - [Parameter description](#Parameter-description)
    - [Example](#Example)
- [Precautions](#Precautions)

## Command description

After you execute the `s clean -h` command, we can view the help information:

```shell script
$ s clean -h
Usage: s cli [options]

Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
    
    Example:
        $ s clean --component fc-api
        $ s clean --all

    Tips:
        Get all installed component: s component

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/clean.md

Options:
  --all                         Clean up the environment
  --cache [dirName]             Delete the <dirName> file in the cache
  --component [componentName]   Remove component (like: fc, fc@0.0.1)
  -h, --help                    Display help for command
```

### Parameter description

| Parameter | Abbreviation | Required | Description |
|-----|-----|-----|-----|
| all |  | No | Cleans the environment. |
| cache |  | No | Deletes the <dirName> files in the cache. |
| component |  | No | Deletes a component. You can use a component name or [Component name@Version]. |


### Example

If you want to clean a component, you can specify the component name in the `--component` command. For example:

```shell script
$ s clean --component fc-api
Component [fc-api] has been cleaned up successfully.
```

If you want to clean up the environment, you can use the `--all` parameter. For example:

```shell script
$ s clean --all       
The environment of Serverless Devs has been cleaned up successfully.
```

## Precautions
When you clean up a component, the system follows the following logic: 
1. First, the system checks and cleans the components that meet the condition in the Registry cache. 
2. Then, the system checks and cleans the component that meets the condition in the GitHub Registry cache.
