---
title: Yaml VS Cli
description: 'Serverless Devs Yaml mode Cli mode comparison'
position: 4
category: 'Overview'
---

# Yaml mode Cli mode comparison

Serverless Devs developer tools fundamentally provide two ways to use them.
- Yaml mode: a mode that needs to rely on resource description documents to operate
- Cli mode: can be executed directly in any directory without relying on resource description documents;

The core difference between the two is:

1. If you want to use Yaml mode, you must have the `s.yaml`/`s.yml` file in the current directory, or the resource description file specified by `-t`/`--template`;
2. If you want to try the Cli mode, it must be done in the format of `s cli component name method parameter`, and no Yaml file is required at this time;

As a very simple example, if there is an application's resource description file `s.yaml` as follows:

````yaml
name: myApp
edition: 3.0.0
access: "myaccess"

resources:
  website-starter:
    component: devsapp/website
    props:
      bucket: testbucket
  backend-starter:
    component: devsapp/demo
    props:
      service:
        name: serviceName
      function:
        name: functionName
      region: cn-hangzhou
````

At this point, you can execute `s deploy` to deploy the `myApp` application. If you execute `s backend-starter deploy`, you can deploy the `backend-starter` project/service under the `myApp` application.

At this point, during the deployment process, the required related parameters can be read through the Yaml file.

However, in some cases, it is not convenient to directly use the Yaml file of the Serverless Devs specification (for example, to synchronize online resources to the local, or to convert the Yaml of Funcraft to the Yaml of Serverless Devs), you can choose pure command at this time Line form, i.e. `s cli` mode.

In `s cli` mode, since resource description files such as Yaml cannot be read, many parameters need to be filled in by yourself. There are two ways to fill in:

1. Assign the relevant Yaml parameters through the `-p`/`--prop` parameters naturally supported by `s cli`. For example, the `s backend-starter deploy` in the above case can be rewritten as:
    ```shell script
    s cli devsapp/demo -p "{\"service\":{\"name\":\"serviceName\"},\"function\":{\"name\":\"functionName\"},\ "region\":\"cn-hangzhou\"}"
    ````
2. Through some parameters supported by the demo component itself, for example, through `s cli devsapp/demo -h`, you can get help information, some of which are as follows:
    ```shell script
      --region [region] [C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/ cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu- west-1/us-west-1/us-east-1/ap-south-1
      --service-name [serviceName] [C-Required] Specify the fc service name
      --function-name [functionName] [Optional] Specify the fc function name
    ````
    At this point, the above functions can be achieved with the following commands:
    ```shell script
    s cli devsapp/demo --region cn-hangzhou --service-name serviceName --function-name functionName
    ````

## Feature comparison

| Mode | How to use | Advantages | Disadvantages | Applicable scenarios |
| --- | --- | --- | --- | --- |
| Yaml mode | In the application directory with a Yaml file that conforms to the Serverless Devs specification and has a resource/behavior description, execute the command corresponding to the component to use it directly, such as `s deploy`, `s servicename build`, etc. | Yes One-click deployment of a complete application (for example, a certain application specifies multiple services, which can be deployed with one click through this command); at the same time, through the resource/behavior description document, the application can be described in a better, simpler and clearer manner; | Need to learn the Yaml specification, and sometimes it will be more complicated to combine with some automated processes; | Operations such as deployment, operation and maintenance, especially batch operations are more suitable; |
| Pure Cli mode | Triggered by subcommand `cli` in any directory, the same applies to all components, such as `s cli deploy -p "{/"function/": /"function-name/"}"`, `s cli fc api listFunctions --service-name my-service` | Relatively speaking, it can be simpler and quicker to use the tool, and it can be easily combined with the automated process, reducing the learning difficulty of the Yaml format/specification | For For some complex projects, it is necessary to write too many parameters in the command line, and the probability of error will be higher; | More suitable for project management, self-directed operation |

## Design ideas

> ❓ Why both Yaml mode and Cli mode exist?
> 💬 Because in the long-term practice process, we found that it is relatively simpler and more convenient to describe resources through Yaml. For example, K8S, etc. are also described through Yaml; however, in some cases, Yaml files also It may become a burden. For example, if you want to view the function list under a certain service, and view the service list under a certain region, it is too bloated to complete an additional Yaml file for such a simple thing. Therefore, in In the Serverless Devs project, two usage methods are retained.