---
title: Registry model
description: 'Registry model'
position: 4
category: 'Registry model'
---


# Registry model

This topic describes the build mode of Serverless Registry Model (SRM).

- [Metadata specification](#Metadata-specification)
- [Registry specification](#Registry-specification)

## Metadata specification

Serverless Registry obtains and stores the following package information.

| Data name   | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| Name        | String | The name of the package.                                     |
| Type        | String | Component/Application                                        |
| Version     | String | Package version, which conforms  to the following format: Major.Minor.Patch. |
| PublishTime | Number | Timestamp of publication. Unit:  second.                     |
| VersionBody | String | Description of the version.                                  |

> In addition to the preceding basic specification, Serverless Registry providers and organizations can store more data based on business requirements, including package contributor IDs, which can be used for authentication and package status.

## Registry specification

The following figure shows the process on how package developers and serverless developers publish and use packages.

![](https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1631783208215_20210916090651949970.png)

As shown in the preceding figure, package developers must provide packages to Serverless Registry based on the [Serverless Package Model specification](../serverless_package_model). Serverless developers must download and use packages by using Serverless Devs. The following items describe the key specification of this process:

- Serverless Registry only accepts the ZIP files of components and applications that are contributed by package developers. The code and other content included in the ZIP packages conform to [Serverless Package Model specification](../serverless_package_model).
- You must follow the following specification to query the package versions and download the packages, including applications and components. that are published on Serverless Registry:
    - Query all versions:
        - Method：GET
        - URI：{package-name}/releases
        - Response：
            ```
            {
                "tag_name": "1.1.13",
                "created_at": "2021-01-04T07:41:23Z",
                "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
                "body": "- English: \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
            }
            ```
    - Query the latest version:
        - Method：GET
        - URI：{package-name}/releases/latest
        - Response：
            ```
            {
                "tag_name": "1.1.13",
                "created_at": "2021-01-04T07:41:23Z",
                "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
                "body": "- English: \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
            }
            ```
    - Download a package:
        - Method：GET
        - URI：{package-name}/zipball/{version}
        - Response：component compression packages

> In addition to the preceding basic specification, Serverless Registry providers and organizations can provide capabilities to update and delete packages and to change permissions 
