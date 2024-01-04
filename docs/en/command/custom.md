---
title: Custom command
description: 'Custom command'
position: 10
category: 'Commands'
---
# Custom command

- [application-level operations](#application-level-operations)
- [service-level operations](#service-level operations)
- [Notes](#Notes)

You can run custom commands based on the component types. Function Compute provides components that support capabilities such as function deployment, application development, and project testing. You can use Serverless Devs together with the components to meet your business requirements. 

The following sample code shows the content of a YAML description file of a resource of or an operation on an application.

````yaml
edition: 3.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: FullStack # Project name
access: xxx-account1

services:
  backend: # service name
    component: django-component # component name
    props: # property value of the component
      src: ./backend_src
      url: url
  user—frontend: # service name
    component: vue-component # component name
    props: # property value of the component
      src: ./frontend_src_user
      url: url
  admin-frontend: # service name
    component: vue-component # component name
    props: # property value of the component
      src: ./frontend_src_admin
      url: url
````

The following information can be seen from the Yaml file:
1. The name of the application is `FullStack` and will use the key `xxx-account1`;
2. The app has three services:
    - `backend` service: uses the `django-component` component
    - `user-frontend` service: uses the `vue-component` component
    - `admin-frontend` service: uses `vue-component` component
    
If the custom commands supported by the `django-component` component and the `vue-component` component at this time are:

| | `django-component` | `vue-component` |
| --- | --- | --- |
| `deploy` | support | support |
| `remove` | support | support |
| `test` | supported | not supported |

Then you can implement [application-level operations](#application-level operations) and [service-level operations](#service-level operations) through custom commands.

## Application level operations

Under the current project, you can execute `s [custom command]` to implement the operation of applying latitude.

- When executing `s deploy` or `s remove`, the components corresponding to the three services `backend`, `user-frontend`, and `admin-frontend` support the `deploy` and `remove` methods, so at this time The system will follow the [service order defined by the Serverless User Model] (../../../spec/en/0.0.2/serverless_user_model/3.user_model.md#service order), and carry out the corresponding three services respectively `deploy` or `remove` operation of the component; **At this time, the `exit code` of the system is 0;**
- When executing `s test`, since the components corresponding to the two services `user-frontend` and `admin-frontend` do not support the `test` method, the system will execute the component corresponding to `backend` at this time (`django-component` `) `test` operation; **At this time, the system will warn the two services `user-frontend` and `admin-frontend`, but no error will be reported, and the final `exit code` is 0;**
- If any of the three services `backend`, `user-frontend` and `admin-frontend` have an error during the execution of the relevant command, the system will report an error and terminate the next operation. **At this time, the `exit code` of the system is 101;**

> About Serverless Devs developer tools, related Exit Code, you can refer to [Developer Tools Design Document](../tool.md)

## Service level operations

Under the current project, you can execute `s [service name] [custom command]` to implement service-level operations.

- Execute `s backend deploy`, etc., you can perform `deploy` related operations for the service `backend`. **If the operation is successfully completed, the `exit code` of the system is 0; otherwise, an error occurs, and the `exit code` of the system ` is 101**;
- Execute `s admin-frontend test`, because the `test` method corresponding to the service `admin-frontend` does not exist, ** At this time, the system will consider that the component method is not found, and the `exit code` of the system is 100**;

## Precautions

In the above [application level operations](#application-level-operations) and [service level operations](#service-level-operations), it is not difficult to find that some components do not include corresponding methods, but in [application level operations](#application-level-operation) and [service level operation](#service-level-operation) are different. The design idea here is mainly to ensure the fluency of [application-level operation](#application-level-operation). So the rules are usually as follows:

1. [Application level operation](#application-level-operation) is more of a batch operation, which will follow the service order defined by [Serverless User Model](../../../spec/en/0.0.2/serverless_user_model/3.user_model.md#service-sequence) to operate all services under the application separately; therefore, if there is a component corresponding to a service that does not include the current method, the "batch operation" will be used as the reason to skip. This service, continue to execute after warning, **At this time, the `exit code` of the system is 0;**
2. [Service level operation](#service-level-operation) is more of a specific operation for a service under a certain application. If the corresponding method cannot be found at this time, it means that this operation is meaningless. It will wake up the error report, **At this time, the `exit code` of the system is 100;**