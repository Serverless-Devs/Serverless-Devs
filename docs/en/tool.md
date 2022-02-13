---
title: Tool design guide
description: 'Serverless Devs Tool design guide'
position: 8
category: 'Overview'
---

# Tool design guide

- [Exit codes](#Exit-Code-definition)
- [CLI design specification](#CLI-design-specification)
- [Priorities](#Priorities)
    - [YAML file priority specification](#YAML-file-priority-specification)
    - [Service deployment order within an application](#Service-deployment-order-within-an-application)
    - [Usage order and specification of keys](#Usage-order-and-specification-of-keys)
- [Configure keys by using environment variables](#Configure-keys-by-using-environment-variables)
- [Troubleshooting powered by artificial intelligence](#troubleshooting-powered-by-artificial-intelligence-ai)

## Exit Code definition

| Code | Description                                       |
| ---- | ------------------------------------------------- |
| 0    | Normal  exit                                      |
| 100  | Exit  caused by a Serverless Devs error           |
| 101  | Exit  caused by a Serverless Devs component error |

## CLI design specification

Serverless Devs is a developer tool in the serverless field. The standardization and normalization brought by Serverless Devs have significant impact on user experience. 

For more information about the CLI design specification in Serverless Devs, see [cli_design.md](cli_design.md)


## Priorities

Some parameters and variables in Serverless Devs have default values. This section describes the priorities of the parameters and variables. In this section, the priorities of the items are listed in descending order. `YAML file priority specification` is used as an example.

- YAML files that are specified by the `-t/--template` parameter.
- Default YAML files (`s.yaml` and `s.yml`). The priority of `s.yaml` files are higher than that of `s.yml` files.

When Serverless Devs uses resource description files, Serverless Devs preferentially selects the YAML files that are specified by the `-t` or `--template` parameter before Serverless Devs uses the default YAML files (`s.yaml` and `s.yml`). `s.yaml` takes a higher priority than `s.yml`.

### YAML file priority specification

- YAML files that are specified by the `-t` or `--template` parameter.
- Default YAML files (`s.yaml` and `s.yml` files). The priority of `s.yaml` files are higher than that of `s.yml` files.



### Service deployment order within an application

- Dependent services.
- Other services, which are deployed from top to bottom.

> The following example describes a YAML file:
> ```yaml
> edition: 1.0.0    # The version of the YAML syntax. The version complies with the semantic versioning specification.
> name: FullStack    # The name of the project.
> access: xxx-account1 # The alias of the key.
> 
> services:
>   nextjs-portal: # The name of the service.
>     component: vue-component # The name of the component.
>     props: # Property value of the component.
>       src: ./frontend_src
>       url: url
> 
>   assets:
>     component: static
>     props:
>       www: "./public"
> 
>   gateway:
>     component: serverless-gateway # The route component that maps HTTP URLs to services.
>     props:
>       routes:
>         - url: ${assets.output.url}
> ```
> You can analyze dependencies for each service in the YAML file. The dependency analysis shows that the `nextjs-portal` and `assets` services have no additional dependencies. The `gateway` service depends on the `assets` service by using the `${assets.output.url}` magic variable. In this case, `gateway` is preferentially deployed. Then `nextjs-portal` and `assets` are deployed from top to bottom. Therefore, the following deployment order applies: `gateway` -> `nextjs-portal` -> `assets`.


### Usage order and specification of keys

- The key information specified by the `-a/--access` parameter
- The `default` key information
- The key information that is configured by using the `default_serverless_devs_access` environment variable
- No key information, or prompt for key information configuration

The following chart describes the process to obtain the key information.

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635841483040_20211102082444588067.png)



## Configure keys by using environment variables

Serverless Devs allows you to easily set key information by using environment variables. You can use the following methods to configure keys by using environment variables:

1. Use a command to introduce the keys in environment variables. For example, environment variables contain the following content: `ALIBABA_CLOUD_ACCOUNT_ID`, `ALIBABA_CLOUD_ACCESS_KEY_ID`, `ALIBABA_CLOUD_ACCESS_KEY_SECRET`. You can use the `s config add` command to add keys: 

```shell script
s config add -a default-aliyun -kl AccountID,AccessKeyID,AccessKeySecret -il ${ALIBABA_CLOUD_ACCOUNT_ID},${ALIBABA_CLOUD_ACCESS_KEY_ID},${ALIBABA_CLOUD_ACCESS_KEY_SECRET}.
```


2. Configure keys by using specified environment variables. For example, for the following key pairs:
    - AccountID: temp_accountid
    - AccessKeyID: temp_accesskeyid
    - AccessKeySecret: temp_accesskeysecret    

    You can name the key as a `*********_serverless_devs_access` in the environment variable, and set the value to a string in JSON format. In the following example, `default_serverless_devs_access` is used.
    - Key: `default_serverless_devs_access`
    - Value: `{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`
 
    In this case, you can specify the `default_serverless_devs_access` key when you configure keys. Example: `${env(default_serverless_devs_access)}`.
​    
    When you configure `s.yaml` file, conform to the following format: 
    ```
    edition: 1.0.0          #  The version of the YAML syntax. The version complies with the semantic versioning specification.
    name: fcDeployApp       #  The name of the project. 
    access: default_serverless_devs_access  #  The alias of the key.

    services:
      fc-deploy-test:
        component: fc-deploy  # Component name
        props: #  Property value of the component
          region: cn-shenzhen
          service:
            name: fc-deploy-service
    ```

## Troubleshooting powered by artificial intelligence (AI)

Serverless Devs provides AI-powered capabilities to troubleshoot errors. If you encounter a Serverless Devs error, the system performs data masking on the error and obtains solutions through API operations. Example:

If you have a format issue in the current YAML file of a project, run the `s deploy` command in the project: 

```shell script
$ s deploy

ERROR:
TypeError: Cannot convert undefined or null to object

AI Tips:
You can try to solve the problem through: http://qa.devsapp.cn/7867adf78017601dffd8c3611c90cadf.html

TraceId:     a483e74739551640838688289
Environment: @serverless-devs/s: 2.0.96, @serverless-devs/core: 0.1.23, darwin-x64, node-v12.15.0
Documents:   https://www.serverless-devs.com
Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions
Issues:      https://github.com/Serverless-Devs/Serverless-Devs/issues

Please copy traceId: a483e74739551640838688289 and join Dingding group: 33947367 for consultation.
You can run 's clean --cache' to prune Serverless devs.
And run again with the '--debug' option or 's -h' to get more logs.
```


The content shown in the following figure appears on the system notification page.

![图片alt](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1640838881038_20211230043441520071.png)

> Note: When you use this feature, Serverless Devs collects and processes errors of the client. Data masking is performed on these errors for privacy. If you do not want to use this feature, run the `s set analysis disable` command to disable this feature. 
