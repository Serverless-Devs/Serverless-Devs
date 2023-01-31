---
title: Package model
description: 'Package model'
position: 4
category: 'Package model'
---

# Pacakge model

The Pacakge Model section introduces the Serverless Package Model (SPM) construction model, including:

- [The composition of the model](#The-composition-of-the-model)
- [Model specification](#model-specification)
    - [Component model specification](#component-model-specification)
        - [Component model metadata](#component-model-metadata)
            - [Parameter details](#parameter-details)
                - [Provider](#Provider)
                - [Category](#Category)
                - [Service](#Service)
                - [Commands](#Commands)
                - [Properties](#Properties)
        - [Component model code specification](#Component-model-code-specification)
    - [Application model specification](#application-model-specification)
        - [Apply Model Metadata](#Apply-Model-Metadata)
            - [Parameter details](#parameter-details-1)
                - [Provider](#Provider-1)
                - [Category](#Category-1)
                - [Service](#Service-1)
                - [Parameters](#Parameters)
    - [Plugin model specification](#plugin-model-specification)
        - [Plugin model metadata](#plugin-model-metadata)
            - [Parameter details](#parameter-details-2)
                - [Provider](#Provider-2)
                - [Category](#Category-2)
                - [Service](#Service-2)
                - [Parameters](#Parameters-1)
## The composition of the model

The Serverless Package Model consists of two parts:

- Component Model: The component model, that is, through Serverless Devs, can be referenced by the application and perform predetermined functions according to the user's input. For example, an FC component is referenced in an application, then at this time, the user can deploy the function by passing in the Deploy command, and the FC component here needs to be built on the basis of the component model, that is, it must conform to the development specification of the component ;
- Application Model: An application model, that is, an application case that can be initialized through Serverless Devs. Usually, an application case includes a yaml file, which can include one or more components to complete a business together. The application mentioned here needs to be built on the basis of the application model, or needs to conform to the application development specification;

## Model specification

### Component Model Specification

The Component Model, that is, the component model, needs to be standardized and defined through the specified file. Here, the recommended component model directory structure is:

````
|- src # directory name can be changed
| └── code directory
|- package.json: need to define main
|- publish.yaml: the resource description of the project
|- readme.md: Project Introduction
|- version.md: Version update content
````

in:

| Contents | Required | Meaning |
| --- | --- | --- |
| src | Recommended to exist | The unified placement function is implemented, of course, it can also be replaced with other names, or tiled under the project, but it is recommended to use src for unified storage |
| package.json | Must exist | Node.js package.json, which needs to describe the location of the component's entry file |
| publish.yaml | Must exist | Development identification documentation for Serverless Devs Package |
| readme.md | must exist | a description of the component, or help documentation |
| version.md| Recommended to exist | Description of the version, such as the update content of the current version, etc. |


#### Component model metadata

Component model metadata will be described in `publish.yaml` and identified and referenced on the Serverless Registry and Serverless Devs developer tools side.

The basic format of the `publish.yaml` file is as follows:

````yaml
Edition: 0.0.2
Type: Component
Name: name
Provider:
  - Cloud vendor name
Version: version, such as 0.0.1
Description: short description/introduction
HomePage: Project home page address
Tags: #tagdetails
  - deploy function
  - deploy components
Category: Category # Basic Cloud Service/Web Framework/Full Stack Application/Artificial Intelligence/Audio and Video Processing/Graphic and Text Processing/Monitoring Alarm/Big Data/IoT/Beginners/Others
Service: # Service used
  Service name: # Function Compute/Container Service/Image Service/Message Queue/Workflow/CDN/Object Storage/Table Store/MNS/Log Service/API Gateway/Database/Analysis Service/Cloud Application/Other
    # Runtime: Python 3.6 If the service is a function, you need to add Runtime
    Authorities: #authority description
      - Permissions required to create a function #
Commands: # command, the format is command: command description, for example:
  deploy: deploy function
  invoke: invoke the function
Properties:
  type: object
  additionalProperties: false
  required: # Required fields
    - region
    - service
  properties:
    region: # enum type
      default: cn-hangzhou
      title: region # name
      enum: # enumeration
        - cn-beijing
        - cn-hangzhou
````

##### Parameter details

| Contents | Required | Structure | Meaning |
| --- | --- | --- | --- |
| Edition | Yes | String | The current version of Yaml, 0.0.2 is recommended |
| Type | is | String | Type, including Component and Application, Plugin three values, here is the value Component |
| Name | is | String | Component name |
| Provider | Yes | List<String> | Cloud vendor information supported by the component |
| Version | is | String | Component version number, e.g. 0.0.1 |
| Description | is | String | Component description (short description in one sentence) |
| HomePage | No | String | The home page of the component, you can fill in the warehouse address of the component |
| Tags | no | List<String> | tags of components |
| Category | is | String | Category of the component |
| Service | Yes | Struct | Description of services and related permissions required by the component, for example, the component requires products/services such as function computing, serverless workflow as support |
| Commands | Yes | Struct | Commands supported by the component |
| Properties | Yes | Struct | The parameter description of the component, the property definition of the component, strictly abide by the Json Schema specification standard |

###### Provider

Value range: `Alibaba Cloud`, `Baidu Smart Cloud`, `Huawei Cloud`, `Tencent Cloud`, `AWS`, `Azure`, `Google Cloud`, `Others`

Format reference:
````yaml
Provider:
    - Ali Cloud
    - Baidu Smart Cloud
````
    
###### Category

Value range: `Basic cloud service`, `Web framework`, `full stack application`, `artificial intelligence`, `audio and video processing`, `graphics and text processing`, `monitoring alarm`, `big data`, `IoT `, `Beginners`, `Others`

Format reference:
````yaml
Category: Basic Cloud Services
````

###### Service

Value range: `Function Compute`, `Container Service`, `Image Service`, `Message Queue`, `Workflow`, `CDN`, `Object Storage`, `Table Store`, `MNS`, `Log Service` `, `API Gateway`, `Database`, `Analysis Service`, `Cloud Application`, `Others`

Format reference:
````yaml
Service: # Service used
  Function calculation:
    # Runtime: Python 3.6 If the service is a function, you need to add Runtime, the values ​​include: Node.JS, Python, PHP, Java, Go, others
    Authorities: #authority description
      - Permissions required to create a function #
````

###### Commands

The commands supported by the component have two forms:

- Form one:
    ````
    Commands:
        demo: example command
        test: test command
    ````
- Form two:
        ````
    Commands:
        Deploy & Build:
            deploy: project deployment
            build: project build
        Others:
            demo: example command
            test: test command
    ````
    
###### Properties

The format of the Properties parameter strictly follows the standard of JSON Scheme. For the specific format, please refer to the following cases:
    
````yaml
Properties:
  type: object
  additionalProperties: false
  required: # Required fields
    - region
    - service
  properties:
    region: # enum type
      default: cn-hangzhou
      title: region # name
      enum: # enumeration
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
        - cn-qingdao
    service:
      title: service configuration # name
      type: object # type
      properties:
        name: # Regular check
          title: name
          description: Can only contain letters, numbers, underscores and dashes. Cannot start with a number or a dash. The length is between 1-128.
          type: string
          pattern: '^[a-zA-Z0-9-_]{1,128}$'
        internetAccess: # boolean value
          title: allow public network access
          description: Whether the function in the configuration service can access the Internet
          default: true
          type: boolean
        logConfig: # complex type title: log configuration
          oneOf: # Only one of them can take effect
            - title: autoconfig
              enum:
                - auto
            - logConfig:
                type: object
                title: log configuration
                additionalProperties: true
                required:
                  - project
                  - logstore
                properties:
                  project:
                    type: string
                    title: log item
                    default: ''
                    examples:
                      - xx-project
                  logstore:
                    type: string
                    title: log repository
                    default: ''
                    examples:
                      - xx-logstore
                  logBeginRule:
                    title: Log Splitting Rules
                    default: None
                    enum:
                      - DefaultRegex
                      - None
                  enableRequestMetrics:
                    type: boolean
                    title: request-level metrics
                    default: true # default value
                  enableInstanceMetrics:
                    type: boolean
                    title: instance-level metrics
                    default: false
                    examples:
                      - true
````

#### Component model code specification

In the component model, the code composition specification has two parts:
- The address of the entry file needs to be clearly described in `package.json`; for example `{"main": "./dist/index.js"}`;
- Implement the corresponding user method in the code. For example, Package developers hope that users can deploy the project through the deploy command, then they can implement a deploy method and implement the corresponding deployment capabilities in the method;

For the code specification part, you can refer to the following cases:

```typescript
import logger from './common/logger';
import { InputProps } from './common/entity';

export default class ComponentDemo {
  /**
   * demo instance
   * @param inputs
   * @returns
   */
  public async test(inputs: InputProps) {
    logger.debug(`input: ${JSON.stringify(inputs.props)}`);
    logger.info('command test');
    return { hello: 'world' };
  }
}
````

The structure of the input parameter `inputs` is:

````json
{
    "command": "",
    "project": {
        "projectName": "",
        "component": "",
        "provider": "",
        "access": ""
    },
    "credentials": {},
    "props": {},
    "args": "",
    "argsObj": []
}
````

| Contents | Meaning |
| --- | --- |
| command | The command executed by the user |
| project | User's project basic information |
| credentials | User's key information |
| props | User-configured properties/parameters |
| args| Arguments passed by the user (in string form) |
| argsObj| Arguments passed by the user (parsed, passed as an array) |


In the above case code, you can see that there is a test method, which is the method of function implementation. At this time, when the user uses the test command, the system will call the method with parameters. Take a real case as an example:

The component name is `hexo`, the core code of the component is as shown above, and it has a test method. At this time, the Yaml on the user side is:

````yaml
edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: FullStack # Project name
access: xxx-account1 # key alias

services:
  HexoComponent:
    component: hexo
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
````

When the user executes `s test mytest -a -b abc`, at this time, the `test` method in the component code, the received `inputs` parameter is actually:

````json
{
    "command": "test",
    "project": {
        "projectName": "HexoComponent",
        "component": "hexo",
        "provider": "alibaba",
        "access": "release"
    },
    "credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********"
    },
    "props": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "args": "mytest -a -b abc",
    "argsObj": [
      "mytest", "-a", "-b", "abc"
    ]
}
````

At this point, the test method will print log information, etc., and return the final result to the command line tool: `{ "hello": "world" }`

### Apply model specification

Application Model, that is, the application model, requires the specification and definition of the model through the specified file. Here, the recommended directory structure of the application model is:

````
|- src # The directory name cannot be changed
| └── Application Catalog
| └── s.yml: application description file
|- publish.yaml: the resource description of the project
|- readme.md: Project Introduction
|- version.md: Version update content
````

in:

| Contents | Required | Meaning |
| --- | --- | --- |
| src | must exist | application directory |
| s.yml | Must exist | The resource description Yaml of the application needs to conform to the publish and yaml specifications corresponding to the application |
| publish.yaml | Must exist | Development identification documentation for Serverless Devs Package |
| readme.md | Must exist | Description of the application, or help document information |
| version.md| Recommended to exist | Description of the version, such as the update content of the current version, etc. |

#### Apply model metadata

Application model metadata will be described in `publish.yaml` and identified and initialized on the side of Serverless Registry and Serverless Devs developer tools.

The basic format of the `publish.yaml` file is as follows:

````yaml
Edition: 0.0.2
Type: Application
Name: name
Provider:
  - Cloud vendor name
Version: version, such as 0.0.1
Description: short description/introduction
HomePage: Project home page address
Tags: #tagdetails
  - deploy function
  - deploy components
Category: Category # Basic Cloud Service/Web Framework/Full Stack Application/Artificial Intelligence/Audio and Video Processing/Graphic and Text Processing/Monitoring Alarm/Big Data/IoT/Beginners/Others
Service: # Service used
  Service name: # Function Compute/Container Service/Image Service/Message Queue/Workflow/CDN/Object Storage/Table Storage/MNS/Log Service/API Gateway/Database/Analysis Service/Cloud Application/Other
    # Runtime: Python 3.6 If the service is a function, you need to add Runtime
    Authorities: #authority description
      - Permissions required to create a function #
Parameters: # Standard JSON Scheme
  type: object
  additionalProperties: false # Do not allow to add other properties
  required: # Required fields
    - mysqlName
    - regionName
  properties:
    mysqlName: # Regular check
      type: string, # type
      description: Mysql connection string # description
      title: Mysql connection string
      pattern: '^mysql:.*$' # regular expression
````

##### Parameter details

| Contents | Required | Structure | Meaning |
| --- | --- | --- | --- |
| Edition | Yes | String | The current version of Yaml, 0.0.2 is recommended |
| Type | is | String | Type, including Component and Application, Plugin three values, here is the value Application |
| Name | is | String | Component name |
| Provider | Yes | List<String> | Cloud vendor information supported by the component |
| Version | is | String | Component version number, e.g. 0.0.1 |
| Description | is | String | Component description (short description in one sentence) |
| HomePage | No | String | The home page of the component, you can fill in the warehouse address of the component |
| Tags | no | List<String> | tags of components |
| Category | is | String | Category of the component |
| Service | Yes | Struct | Description of services and related permissions required by the component, for example, the component requires products/services such as function computing, serverless workflow as support |
| Parameters | Yes | Struct | Fields that need to be filled in Yaml in the application, strictly follow the Json Schema specification standard |

###### Provider

Value range: `Alibaba Cloud`, `Baidu Smart Cloud`, `Huawei Cloud`, `Tencent Cloud`, `AWS`, `Azure`, `Google Cloud`, `Others`

Format reference:
````yaml
Provider:
    - Ali Cloud
    - Baidu Smart Cloud
````

###### Category

Value range: `Basic cloud service`, `Web framework`, `full stack application`, `artificial intelligence`, `audio and video processing`, `graphics and text processing`, `monitoring alarm`, `big data`, `IoT `, `Beginners`, `Others`

Format reference:
````yaml
Category: Basic Cloud Services
````

###### Service

Value range: `Function Compute`, `Container Service`, `Image Service`, `Message Queue`, `Workflow`, `CDN`, `Object Storage`, `Table Store`, `MNS`, `Log Service` `, `API Gateway`, `Database`, `Analysis Service`, `Cloud Application`, `Others`

Format reference:
````yaml
Service: # Service used
  Function calculation:
    # Runtime: Python 3.6 If the service is a function, you need to add Runtime, the values ​​include: Node.JS, Python, PHP, Java, Go, others
    Authorities: #authority description
      - Permissions required to create a function #
````

    
###### Parameters

In the application model, although there is already a complete `s.yaml` to describe the application information, there are actually situations such as the following:
- Some parameters in `s.yaml` need to be filled in by the user. For example, some applications need to connect to the database. In this case, the user needs to fill in the parameters when initializing the application;
- Although some parameters in `s.yaml` have default values, they still require user attention, or users need to customize in some cases;
Therefore, the Serverless Package model provides the `Parameters` parameter for the Application type. Through this parameter, you can describe the relevant parameters in `s.yaml`, for example:
    
````yaml
Parameters: # Standard JSON Scheme
  type: object
  additionalProperties: false # Do not allow to add other properties
  required: # Required fields
    - mysqlName
    - regionName
  properties:
    mysqlName: # Regular check
      type: string, # type
      description: Mysql connection string # description
      title: Mysql connection string
      pattern: '^mysql:.*$' # regular expression
    regionName: # enumeration type
      type: string,
      description: Region Region
      default: cn-hangzhou # default value
      title: Territory
      enum: # enumeration type
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
````

At this point, the field can be referenced in `s.yaml`, for example:
    
````yaml
edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: component-test # project name
vars: # [Global variables, available to each service]
  domain: xxxx.yyy.com

services:
  component-test:
    component: demo
    props:
      name: {{ inputsrgs }}
````
    
For compatibility with [spec 0.0.1](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/en/0.0.1/serverless_package_model/package_model.md#%E5%BA%94%E7%94%A8%E6%A8%A1%E5%9E%8B%E8%A7%84%E8%8C%83), about the special format definition of `s.yaml`, in the current version:
1. If there is content similar to `'{{ bucket | alibaba oss bucket }}'` in `s.yaml`, the user is directly reminded to enter a parameter such as bucket as a required parameter in Yaml, and the ` The content "alibaba oss bucket" after |` is used to explain the meaning of this parameter;
2. If content similar to `"{{ access }}"` exists in `s.yaml`, then judge whether the `Parameters` parameter and related Key exist in `publish.yaml`:
    - If it exists, it will be corresponding by default;
    - If it does not exist, directly remind the user that a parameter such as access needs to be input as a necessary parameter in Yaml;

> Regarding the format of the Parameters parameter, strictly follow the specification standard of JSON Scheme. For more usage examples, see the [Pacakge Model - Parameters Parameters](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/zh/0.0.2/serverless_package_model/publish_model.md)documentation

### Plugin Model Specification

Plugin Model, that is, the plug-in model, requires the specification and definition of the model through the specified file. Here, the recommended plugin model directory structure is:

````
|- src # directory name can be changed
| └── code directory
|- package.json: need to define main
|- publish.yaml: the resource description of the project
|- readme.md: Project Introduction
|- version.md: Version update content
````

in:

| Contents | Required | Meaning |
| --- | --- | --- |
| src | Recommended to exist | The unified placement function is implemented, of course, it can also be replaced with other names, or tiled under the project, but it is recommended to use src for unified storage |
| package.json | Must exist | Node.js package.json, which needs to describe the location of the component's entry file |
| publish.yaml | Must exist | Development identification documentation for Serverless Devs Package |
| readme.md | must exist | a description of the plugin, or help documentation |
| version.md| Recommended to exist | Description of the version, such as the update content of the current version, etc. |

#### plugin model metadata

The plugin model metadata will be described in `publish.yaml` and identified and initialized on the Serverless Registry and Serverless Devs developer tools side.

The basic format of the `publish.yaml` file is as follows:

````yaml
Edition: 0.0.2
Type: Plugin
Name: name
Provider:
  - Cloud vendor name
Version: version, such as 0.0.1
Description: short description/introduction
HomePage: Project home page address
Tags: #tagdetails
  - deploy function
  - deploy components
Category: Category # Basic Cloud Service/Web Framework/Full Stack Application/Artificial Intelligence/Audio and Video Processing/Graphic and Text Processing/Monitoring Alarm/Big Data/IoT/Beginners/Others
Service: # Service used
  Service name: # Function Compute/Container Service/Image Service/Message Queue/Workflow/CDN/Object Storage/Table Storage/MNS/Log Service/API Gateway/Database/Analysis Service/Cloud Application/Other
    # Runtime: Python 3.6 If the service is a function, you need to add Runtime
    Authorities: #authority description
      - Permissions required to create a function #
Parameters: # Standard JSON Scheme
  type: object
  additionalProperties: false # Do not allow to add other properties
  required: # Required fields
    - mysqlName
    - regionName
  properties:
    mysqlName: # Regular check
      type: string, # type
      description: Mysql connection string # description
      title: Mysql connection string
      pattern: '^mysql:.*$' # regular expression
````

##### Parameter details

| Contents | Required | Structure | Meaning |
| --- | --- | --- | --- |
| Edition | Yes | String | The current version of Yaml, 0.0.2 is recommended |
| Type | is | String | Type, including Component and Application, Plugin three values, here is the value Application |
| Name | is | String | Component name |
| Provider | Yes | List<String> | Cloud vendor information supported by the component |
| Version | is | String | Component version number, e.g. 0.0.1 |
| Description | is | String | Component description (short description in one sentence) |
| HomePage | No | String | The home page of the component, you can fill in the warehouse address of the component |
| Tags | no | List<String> | tags of components |
| Category | is | String | Category of the component |
| Service | Yes | Struct | Description of services and related permissions required by the component, for example, the component requires products/services such as function computing, serverless workflow as support |
| Parameters | Yes | Struct | Fields that need to be filled in Yaml in the application, strictly follow the Json Schema specification standard |

###### Provider

Value range: `Alibaba Cloud`, `Baidu Smart Cloud`, `Huawei Cloud`, `Tencent Cloud`, `AWS`, `Azure`, `Google Cloud`, `Others`

Format reference:
````yaml
Provider:
    - Ali Cloud
    - Baidu Smart Cloud
````

###### Category

Value range: `Basic cloud service`, `Web framework`, `full stack application`, `artificial intelligence`, `audio and video processing`, `graphics and text processing`, `monitoring alarm`, `big data`, `IoT `, `Beginners`, `Others`

Format reference:
````yaml
Category: Basic Cloud Services
````

###### Service

Value range: `Function Compute`, `Container Service`, `Image Service`, `Message Queue`, `Workflow`, `CDN`, `Object Storage`, `Table Store`, `MNS`, `Log Service` `, `API Gateway`, `Database`, `Analysis Service`, `Cloud Application`, `Others`

Format reference:
````yaml
Service: # Service used
  Function calculation:
    # Runtime: Python 3.6 If the service is a function, you need to add Runtime, the values ​​include: Node.JS, Python, PHP, Java, Go, others
    Authorities: #authority description
      - create function # all
required permissions
````

    
###### Parameters

In the plug-in model, the parameter information of the plug-in can be defined through `Parameters`:
    
````yaml
Parameters: # Standard JSON Scheme
  type: object
  additionalProperties: false # Do not allow to add other properties
  required: # Required fields
    - mysqlName
    - regionName
  properties:
    mysqlName: # Regular check
      type: string, # type
      description: Mysql connection string # description
      title: Mysql connection string
      pattern: '^mysql:.*$' # regular expression
    regionName: # enumeration type
      type: string,
      description: Region Region
      default: cn-hangzhou # default value
      title: Territory
      enum: # enumeration type
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
````

#### Plugin Model Code Specification

In the plugin model, the code composition specification has two parts:
- The address of the entry file needs to be clearly described in `package.json`; for example `{"main": "./dist/index.js"}`;
- Implement methods such as default in code.

For the code specification part, you can refer to the following cases:

````javascript
const core = require("@serverless-devs/core");
const { lodash, fse, rimraf } = core;
/**
 * Plugin plugin entry
 * @param inputs The entry parameters of the component
 * @param args custom parameters for plugins
 * @return inputs
 */

module.exports = async function index(inputs, args) {
  return lodash.merge(inputs, {
    props: {
      function: {
        runtime: "custom",
        codeUri: path.join(__dirname, "./code"),
        customRuntimeConfig: {
          command: ["node"],
          args: ["/code/index.js"],
        },
      },
    },
  });
};
````

In the above case, the plugin method has two input parameters, `inputs` and `args`. The structure is:

- `inputs` parameter:
    ````json
    {
        "command": "",
        "project": {
            "projectName": "",
            "component": "",
            "provider": "",
            "access": ""
        },
        "credentials": {},
        "props": {},
        "args": "",
        "argsObj": [],
        "services": [],
        "output": {}
    }
    ````
    
    | Contents | Meaning |
    | --- | --- |
    | command | The command executed by the user |
    | project | User's project basic information |
    | credentials | User's key information |
    | props | User-configured properties/parameters |
    | args| Arguments passed by the user (in string form) |
    | argsObj| Arguments passed by the user (parsed, passed as an array) |
    | services| Record the passing parameters for the service |
    | output| If the plugin is used before the component is executed, there is no parameter. If the plugin is used after the component is executed, there is this parameter. This parameter indicates the output result of the component |

- The `args` parameter is the input parameter of the plugin, the format is `object`


Since the returned result (`reutrn`) may be used as the input of the component, the format is basically consistent with the overall specification of inputs (no `outputs` object), namely:

````json
{
    "command": "",
    "project": {
        "projectName": "",
        "component": "",
        "provider": "",
        "access": ""
    },
    "credentials": {},
    "props": {},
    "args": "",
    "argsObj": [],
    "services": [],
    "plugin": {}
}
````

For example, in the above case, the returned content is:
````javascript
return lodash.merge(inputs, {
    props: {
      function: {
        runtime: "custom",
        codeUri: path.join(__dirname, "./code"),
        customRuntimeConfig: {
          command: ["node"],
          args: ["/code/index.js"],
        },
      },
    },
  });
````

The original structure will be returned, and some parameters with heavy props will be upgraded.

Take a real case as an example:

The component name is `hexo`, the core code of the component is as shown above, and it has a test method. At this time, the Yaml on the user side is:

````yaml
edition: 1.0.0 # Command-line YAML specification version, following the Semantic Versioning specification
name: FullStack # Project name
access: xxx-account1 # key alias

services:
  HexoComponent:
    component: hexo
    actions:
      - pre-deploy:
          - plugin: test
            args:
              key: value
    props:
      region: 'cn-hangzhou'
      codeUri: './src'
````

When the user executes `s test mytest -a -b abc`, at this time, the default method in the plugin code, the received `inputs` parameter is actually:

````json
{
    "command": "test",
    "project": {
        "projectName": "HexoComponent",
        "component": "hexo",
        "provider": "alibaba",
        "access": "release"
    },
    "credentials": {
        "AccountID": "********",
        "AccessKeyID": "********",
        "AccessKeySecret": "********"
    },
    "props": {
        "Region": "cn-hangzhou",
        "CodeUri": "./src"
    },
    "args": "mytest -a -b abc",
    "argsObj": [
      "mytest", "-a", "-b", "abc"
    ]
}
````

The `args` parameter is actually:

````json
{
  "key": "value"
}
````
