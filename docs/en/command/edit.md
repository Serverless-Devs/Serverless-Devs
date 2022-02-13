---
title: Edit command
description: 'Edit command'
position: 6
category: 'Commands'
---

# Edit command

The `edit` commands are used to edit serverless applications.

- [Command description](#Command-description)
    - [Parameter description](#Parameter-description)
    - [Considerations](#Considerations)

## Command description

After you run the `s edit -h` command, the following help information is returned:

```shell script
$ s edit -h
Usage: s edit

Application editing.

    Example:
        $ s edit
        
📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/en/command/edit.md

Options:
  -t, --template [templatePath]  Specify the template file
  -h, --help                     Display help for command
```

### Parameter description

| Parameter | Abbreviation | Default value | Description                                    |
| --------- | ------------ | ------------- | ---------------------------------------------- |
| template  | t            | s.yaml/s.yml  | Specifies  the description file of a resource. |



### Considerations
Before you run the `s edit` command, make sure that the following conditions are met: 
1. A YAML file that meets the Serverless Devs requirements exists in this project. You can specify this file by running the `-t, --template [templatePath]` command. The default value of the template parameter is `s.yaml/s.yml`. 
2. A browser that supports visual resource editing is installed on your computer.
