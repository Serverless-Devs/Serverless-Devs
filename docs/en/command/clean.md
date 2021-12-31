# Clean command

The `clean` command is to clean up the cache-related functions of Serverless Devs. You can use this command to clean up the environment, unused dependent packages, and related cache content.

- [Command resolution](#Command-resolution)
    - [Parameter analysis](#Parameter-analysis)
    - [Operation case](#Operation-case)
    
## Command analysis

After we execute `s clean -h`, we can view related help information:

```shell script
$ s clean -h
Usage: s cli [options]

Clean up the cache related functions of serverless devs. You can clean up the environment, unused dependent packages and related cache contents through this command.
    
    Example:
        $ s clean --component fc-api
        $ s clean --all

    Tips:
        Get all installed component: s component

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/clean.md

Options:
  --all Clean up the environment
  --cache [dirName] Delete the <dirName> file in the cache
  --component [componentName] Remove component (like: fc, fc@0.0.1)
  -h, --help Display help for command
```

### Parameter analysis

| Full name of the parameter | Abbreviation of the parameter | Required or not | Parameter meaning |
|-----|-----|-----|-----|
| all | | Optional | Clean up the environment |
| cache | | Optional | Delete the <dirName> file in the cache |
| component | | Optional | Delete the specified component, which can be the component name or [component name@version number] |

### Operation case

If you want to clean up a component, you can use the `--component` parameter and the specific component name to clean up, for example:

```shell script
$ s clean --component fc-api
Component [fc-api] has been cleaned up successfully.
```

If you want to clean up the overall environment, you can directly pass the `--all` parameter, for example:

```shell script
$ s clean --all
The environment of Serverless Devs has been cleaned up successfully.
```

## Precautions

When cleaning up the specified components, the system will clean up the components according to the specified logic:
1. The system will first determine the eligible components in the currently set Registry cache, and clean it up;
2. The system will clean up the existing eligible components in the system's final Registry cache (Github Registry);
