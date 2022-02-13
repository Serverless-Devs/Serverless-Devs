---
title: Google Cloud key acquisition
description: 'Google Cloud key acq4isition'
position: 6
category: 'Access Configuration'
---
# Google Cloud key acquisition

Google Cloud official website: https://cloud.google.com

- Open [Google Cloud official website](https://cloud.google.com) to log in, select the corresponding project, and enter the project:
  ![Get key page](https://images.devsapp.cn/access/google-console.jpg)
- Click on the [Service Account] on the left:
  ![](https://images.devsapp.cn/access/google-service.jpg)
- Then click [Create Service Account] above:
  ![](https://images.devsapp.cn/access/google-add.jpg)
- The corresponding file will be downloaded after creation]:
  ![](https://images.devsapp.cn/access/google-access.jpg)
- Store the file locally and configure the absolute path of the storage to the `PrivateKeyData` required by the `s` tool

> When you use an API key in your app, make sure it's safe in storage and in transit. Publicly compromised credentials may lead to your account being compromised, which may result in unexpected charges to your account. To help keep your API keys safe, follow these best practices:
> - Do not embed API keys directly in code. API keys embedded in code can be accidentally leaked to the public. For example, you may have forgotten to remove the key from the shared code. Instead of embedding the API key in your app, you can store your API key in an environment variable or in a file outside of your app's source tree.
> - Do not store API keys in files within your app's source tree. If you store your API key in a file, keep the file outside of your app's source tree to help ensure that the key doesn't end up in source control. This is especially important if you use a public source control system such as GitHub.
> - Set up apps and [API key restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions). By adding limits, you can reduce the impact of API key theft.
> - Remove unwanted API keys to minimize the risk of being attacked.
> - Periodically regenerate API keys. You can regenerate keys by clicking Regenerate keys for each key in the [Credentials page](https://console.cloud.google.com/apis/credentials?_ga=2.119850376.1642904664.1603769673-1032325965.1594091682) API key. Then, update your app to use the newly generated key. After a replacement key is generated, the old key will expire after 24 hours.
> - Before releasing your code publicly, check your code to make sure it does not contain API keys or any other private information before making your code publicly available.