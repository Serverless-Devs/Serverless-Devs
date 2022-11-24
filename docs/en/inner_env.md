---
title: built-in environment variable
description: 'Serverless Devs built-in environment variables'
position: 11
category: 'Overview'
---

## Set the key through the environment variable
Configure by specifying the name of the environment variable: for example, there is currently an Alibaba Cloud key pair:

   - AccountID: temp_accountid
   - AccessKeyID: temp_accesskeyid
   - AccessKeySecret: temp_accesskeysecret
     At this time, you can name the key as `********_serverless_devs_access` in the environment variable, such as `default_serverless_devs_access`, and the value as a JSON string, such as:
   - Key: `default_serverless_devs_access`
   - Value: `{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`
     At this point, you can specify the key `default_serverless_devs_access` when configuring the key, for example `${env(default_serverless_devs_access)}`

   The configuration in `s.yaml` is as follows:

   ```
   edition: 1.0.0 # Command line YAML specification version, following the Semantic Versioning specification
   name: fcDeployApp # project name
   access: default_serverless_devs_access # secret key alias

   services:
     fc-deploy-test:
       component: fc-deploy # component name
       props: # Component property values
         region: cn-shenzhen
         service:
           name: fc-deploy-service
   ```

## Set output via environment variable
By default, execution such as `s deploy` will output in the terminal. This default behavior can be controlled by the environment variable `default_serverless_devs_auto_log`
```
export default_serverless_devs_auto_log = false
```

## Load a specific version of the component through the environment variable
By default, Serverless-Devs will load the latest version of the component, which can be controlled by `core_load_serverless_devs_component`
```
export core_load_serverless_devs_component="devsapp/fc@dev,devsapp/fc-plan@dev"
```