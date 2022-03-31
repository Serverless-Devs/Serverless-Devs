---
title: 目的和目标
description: '目的和目标'
position: 2
category: 'Registry模型'
---

# 目的和目标

Serverless Registry Model(简称SRM，下文将使用SRM代替)的目标是定义一种 Serverless 架构下的 Registry 的规范，与 Python 中的 pypi， Nodejs 中的 npm 等类似，将以此来开放和分享 Serverless Package，建设 Serverless 生态。

为了让大家更简单的理解 Serverless Registry， 可以通过与 Python Pypi， Nodejs NPM 的对比，进行深入探索：

|  |  **Serverless Reigstry**   | Python Pypi  | Nodejs NPM  |
|  ----  | ----  | ----  |  ----  |
| 存储内容  | **Serverless packages**<br>**(包括 Components 和 Application)** | Python packages | Nodejs packages |
| 是否开放标准  | **是** |  是 |  是 |
| 官方源 | **registry.devsapp.cn/simple** | pypi.python.org | registry.npmjs.org |
| 其它源举例 | **Github registry** <br> **Gitee registry** | 清华源 <br> 豆瓣源 | tnpm <br> cnpm |
| 是否支持私有化 | **支持** | 支持 | 支持 |
| 配套工具 | **Serverless Devs 开发者工具** | Python包管理工具(pip) | Node.js打包管理工具(npm) |
| 配套命令 | **s** | pip | npm |
| 如何使用 | 在`s.yaml`中直接引用 | 安装之后，在代码中引用 | 安装之后，在代码中引用 |

本规范，提供了对 Serverless 应用开发和部署的相关生态的支持，通过本规范可以快速的创建公开的/私有化的 Serverless Registry，并通过 Serverless Devs 开发者工具 进行使用，助力 Serverless 应用开发者可以更简单，更快速，更方便的使用不同平台的 Serverless 产品，可以提升功能效能。
