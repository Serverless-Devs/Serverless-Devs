---
title: Set Command
description: 'Set Command'
position: 11
category: 'Commands'
---
# Set Command
The `set` command is used to configure the tool's settings.
- [Command Explanation](#command-explanation)
- [set proxy Command](#set-proxy-command)
- [set analysis Command](#set-analysis-command)
- [set log Command](#set-log-command)
## Command Explanation
When you execute `s set -h`, you can view the corresponding help information:
```shell script
$ s set -h
Usage: s set [commands] [options]
You can make some default settings for the tool here.
📖  Document: https://serverless.help/t/s/set
Options:
  -h, --help                      Display help for command
Commands:
  proxy [options]                 🔧  Set proxy information
  analysis                        👉  Set to enable or disable analysis
  log                             🔊  Set to enable or disable log
```
This command includes three sub-commands:
- [proxy: Configure the global proxy for Serverless Devs](#set-proxy-command)
- [analysis: Configure the data analysis actions performed by Serverless Devs](#set-analysis-command)
- [log: Configure the logging actions of Serverless Devs](#set-log-command)
## set proxy Command
This command sets a global proxy for HTTP requests.
Executing `s set proxy -h` displays the help documentation:
```shell script
$ s set proxy -h
Usage: s set proxy [options]
Set proxy information.
Example:
   $ s set proxy
   $ s set proxy --http_proxy xxxx:xxx --https_proxy xxxx:xxx
   $ s set proxy --enable
   
📖  Document: https://serverless.help/t/s/set
Options:
  --enable                           whether to enable proxy
  --no-enable                        whether to disable proxy
  --http_proxy <http_proxy_value>    Specify the http_proxy.
  --https_proxy <https_proxy_value>  Specify the https_proxy.
  -h, --help                         Display help for command
```
There are two methods to set the proxy:
1. Direct configuration, for example: `s set proxy --http_proxy xxxx:xxx --https_proxy xxxx:xxx --enable`
2. Through an interactive method:
   ```shell script
   $ s set proxy
   ? Please enter http_proxy:  xxxx:xxx
   ? Please enter https_proxy:  xxxx:xxx
   ? Do you want to enable proxy Yes
   ```
## set analysis Command
This command configures the data analysis capabilities of the Serverless Devs developer tool.
Executing `s set analysis -h` displays the help documentation:
```shell script
$ s set analysis -h
Usage: s set analysis [options]
Set analysis action.
    Example:
        $ s set analysis
        $ s set analysis disable
        
📖  Document: https://serverless.help/t/s/set
Options:
  -h, --help  Display help for command
```
There are two methods to set analysis:
1. Direct configuration, for example: `s set analysis disable`
2. Through an interactive method:
    ```shell script
    $ s set analysis
    
    📝 Current analysis action: enable
    
    ? Choose an action? (Use arrow keys)
    ❯ enable
      disable
    ```
    At this point, you just need to select the corresponding option to operate in a guided manner.
> 🙊 Note: The system default for analysis is: `enable`
## set log Command
This command configures the log writing capabilities of the Serverless Devs developer tool.
Executing `s set log -h` displays the help documentation:
```shell script
$ s set log -h
Usage: s set log [options]
Set log action.
  Example:
    $ s set log
    $ s set log enable
    $ s set log disable
        
📖  Document: https://serverless.help/t/s/set
Options:
  -h, --help  Display help for command
```
There are two methods to set log:
1. Direct configuration, for example: `s set log disable`
2. Through an interactive method:
    ```shell script
    $ s set log
    
    📝 Current log action: enable
    
    ? Choose an action? (Use arrow keys)
    ❯ enable
      disable
    ```
    At this point, you just need to select the corresponding option to operate in a guided manner.
> 🙊 Note: The system default for log is: `enable`
