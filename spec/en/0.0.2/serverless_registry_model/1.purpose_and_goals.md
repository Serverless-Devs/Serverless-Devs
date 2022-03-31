---
title: Objectives
description: 'Objectives'
position: 2
category: 'Registry model'
---

# Objectives

Serverless Registry Model (SRM) is used to define a registry specification based on the serverless architecture. Serverless Registry is similar to Python Package Index (PyPI) and node package manager (npm) in Node.js. With SRM, serverless packages are open to and can be shared with communities to build a serverless ecosystem.

The following table compares Serverless Registry, PyPI, and Node.js npm.



|                            | Serverless Registry                                         | PyPI                                        | Nodejs npm                            |
| -------------------------- | ----------------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| Storage  content           | Serverless  packages, including components and applications | Python  packages                            | Nodejs  packages                      |
| Open                       | Yes                                                         | Yes                                         | Yes                                   |
| Official  source           | registry.devsapp.cn/simple                                  | pypi.python.org                             | registry.npmjs.org                    |
| Examples  of other sources | **Github registry** **Gitee  registry**                     | Tsinghua  Open Source Mirror, Douban source | tnpm cnpm                             |
| Private  deployment        | Supported                                                   | Supported                                   | Supported                             |
| Tool                       | Serverless  Devs                                            | pip                                         | npm                                   |
| Command                    | s                                                           | pip                                         | npm                                   |
| Usage                      | Direct  reference in s.yaml                                 | Reference  in code after installation       | Reference  in code after installation |

This specification provides rules on how to develop and deploy serverless applications. This specification also helps you create a public or private Serverless Registry, which can be used by using Serverless Devs. With this specification, serverless application developers can efficiently use serverless products on different platforms with ease. 