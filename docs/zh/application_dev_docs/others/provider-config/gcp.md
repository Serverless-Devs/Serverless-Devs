# Google Cloud密钥获取

Google Cloud官网：https://cloud.google.com       

- 打开 [Google Cloud官网](https://cloud.google.com) 进行登录，选择对应项目，进入到项目中：
  ![获取密钥页面](https://images.devsapp.cn/access/google-console.jpg)
- 点击左侧的【服务账号】：
  ![](https://images.devsapp.cn/access/google-service.jpg)
- 再点击上面的【创建服务账号】：
  ![](https://images.devsapp.cn/access/google-add.jpg)
- 创建完成会下载对应文件】：
  ![](https://images.devsapp.cn/access/google-access.jpg)
- 将该文件存储到本地，并将存储的绝对路径配置到`s`工具所需的`PrivateKeyData`中

> 当您在应用中使用 API 密钥时，请确保其在存储和传输期间均安全无虞。公开泄露凭据可能会导致您的帐号遭盗用，这可能会使您的帐号产生预料之外的费用。为帮助确保 API 密钥的安全，请遵循以下最佳做法：
> - 不要直接在代码中嵌入 API 密钥。嵌入代码中的 API 密钥可能会被意外泄露给公众。例如，您可能忘记从共享的代码中移除密钥。您可以将 API 密钥存储在环境变量或应用的源代码树之外的文件中，而不是将 API 密钥嵌入应用中。
> - 不要将 API 密钥存储在应用的源代码树内的文件中。如果将 API 密钥存储在文件中，请将文件保留在应用的源代码树之外，这有助于确保密钥最终不会进入源代码控制系统。 如果您使用公共源代码管理系统（如 GitHub），这种做法尤为重要。
> - 设置应用和 [API 密钥限制](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions) 。 通过添加限制，您可以降低 API 密钥被盗用时造成的影响。
> - 删除不需要的 API 密钥以最大限度地减少遭到攻击的风险。
> - 定期重新生成 API 密钥。您可以在[“凭据”页面](https://console.cloud.google.com/apis/credentials?_ga=2.119850376.1642904664.1603769673-1032325965.1594091682) 中，针对每个密钥点击重新生成密钥，从而重新生成 API 密钥。然后，更新您的应用以使用新生成的密钥。生成替换密钥后，旧密钥将在 24 小时后失效。
> - 公开发布代码前，先检查您的代码，确保您的代码不包含 API 密钥或任何其他私密信息，然后再公开代码。
