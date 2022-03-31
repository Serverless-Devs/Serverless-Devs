---
title: Overview and terms
description: 'Overview and terms'
position: 3
category: 'Registry model'
---

# Overview and terms

This topic describes SRM and its terms. Serverless Registry Model (SRM) is an important concept in Serverless Devs Model (SDM). SRM builds a serverless ecosystem for developers. Serverless Devs allows developers to pull application cases, or download and use components from Serverless Registry. The Serverless Registry must conform to the SRM specification. 

## Model overview

This specification proposes a model that defines Serverless Registry

Serverless Registry is an abstract concept that hosts a serverless ecosystem. Similar to PyPI, and Node.js npm, Serverless Registry is used to share serverless packages with the public. 

The current version of Serverless Registry defines the following content: - Serverless Registry hosts both applications and components. -Applications and components have metadata with different data structures on Serverless Registry. - Serverless Registry applications can be queried and obtained through standard API operations. - Serverless Registry can only host packages, including applications and components, that conform to [Serverless Package Model specification.](../serverless_package_model) -The content that is carried by Serverless Registry can be extended in later versions. - You can add permission authentication policies in Serverless Registry based on the needs of registry builders and organizations. - Different versions of packages, including applications and components, can be used in Serverless Registry. Packages can be added and deleted.