---
title: Preview Command
description: 'Preview Command'
position: 9
category: 'Commands'
---
# Preview Command
The `preview` command is used to preview the rendering results of Serverless Devs Yaml files.
- [Command Explanation](#command-explanation)
    - [Parameter Analysis](#parameter-analysis)
    - [Operational Examples](#operational-examples)
## Command Explanation
After executing `s preview -h`, you can view the relevant help information:
```shell script
Usage: s preview [options]
Application preview.
  
  Example:
    $ s preview
    
📖  Document: https://serverless.help/t/s/preview
Options:
  --env <envName>                 Specify the environment name
  -h, --help                      Display help for command
```
### Parameter Analysis
| Full Parameter | Abbreviation | Required | Meaning |
|-----|-----|-----|-----|
| env | - | Optional | Specify the environment for execution |
### Operational Examples
By executing the `s preview` command, you can view the rendering results of the resource description Yaml file. For example, if the original content of `s.yaml` is as follows:
```yaml
edition: 3.0.0 #  Command line YAML specification version, following Semantic Versioning
name: framework #  Project name
access: "default"
vars:
  region: cn-huhehaote
resources:
  next_demo:
    component: fc3
    props: # Component properties
      region: ${vars.region}
      function:
        functionName: "next-start-hello"
        runtime: "nodejs16"
        code: ./code
        environmentVariables:
          name: ${this.name}
          code: ${this.props.function.code}
  demo:
    component: fc3
    props: # Component properties
      region: ${vars.region}
      function:
        functionName: "start-hello"
        runtime: "nodejs16"
        code: ./code
```
Then the result of executing `s preview` would be:
```yaml
edition:   3.0.0
name:      framework
access:    default
vars: 
  region: cn-huhehaote
resources: 
  next_demo: 
    component: fc3
    props: 
      region:   cn-huhehaote
      function: 
        functionName:         next-start-hello
        runtime:              nodejs16
        code:                 ./code
        environmentVariables: 
          name:      next_demo
          code:      ./code
  demo: 
    component: fc3
    props: 
      region:   cn-huhehaote
      function: 
        functionName: start-hello
        runtime:      nodejs16
        code:         ./code
```
