---
title: Cli specification
description: 'Serverless Devs Command line design specification'
position: 10
category: 'Overview'
---


# Command line design specification

Serverless Devs, as a developer tool in the serverless field, the standardization and standardization of its output will have a more obvious impact on the user experience to a certain extent.

This document will standardize and upgrade the output of Serverless Devs command line tools through some text and cases.

## Specification details

The canonical goals of the output format are:

- Clearer
- More concise
- Does not affect the function and practicality

Based on the above three principles, we can use examples to illustrate the normal output form and the abnormal output form.

### Basic output

The basic output form includes two parts as a whole:

1. Project implementation phase

The project execution phase mainly includes a basic format:

```
⌛ Steps for process
====================
```

The rewrite mechanism is used to continuously update the output content. After each project is executed, the corresponding result can be output. Example:

```
⌛ Steps for process
====================
✔ Pre-action completed (10s)
```

2. Result output stage

The project execution phase mainly includes a basic format:

```
🚀 Result for process
====================
```

The specific project output is output in the format of `Yaml`. When outputting, the project name should be underlined. If there is no output, the project will be ended directly. Example:

```
🚀 Result for process
====================
✔ MyProject deployed (11s)
fc-deploy-test:
  region: cn-hangzhou
  service:
    name: fc-deploy-service
    memorySize: 128
```

#### Single item output example

![render1629447409205](https://user-images.githubusercontent.com/21079031/130204631-174a5af5-5550-4e7f-bc3b-d6d23681ce61.gif)


#### Multi-project output example

![render1629448703505](https://user-images.githubusercontent.com/21079031/130206222-8674550e-2ecf-4e19-9dac-d81a8ab11b02.gif)


### Debug mode

When the user enters the debug mode with `--debug`, very detailed information will be printed on the console, but the information will be printed out in gray to maintain the overall sense of hierarchy:

![render1629448900851](https://user-images.githubusercontent.com/21079031/130206327-b25c444f-d336-4dc3-8dfe-39a5329e4b13.gif)



### Error output

When an error occurs in execution, Serverless Devs must sense and output the corresponding content:

```
⌛ Steps for process
====================
✔ MyProject pre-action completed (10s)
✖ MyProject failed to deploy:

Error Message:
t[r] is not a function

Env: darwin, node v15.14.0
Docs: https://github.com/serverless-devs/docs
Bugs: https://github.com/Serverless-Devs/Serverless-Devs/issues
Logs: ~/demo/demo/demo/s.log
```

The dynamic effects are:

![render1629447327225](https://user-images.githubusercontent.com/21079031/130204744-be670d4b-0c1a-4128-aafe-3e8871b3ef58.gif)
