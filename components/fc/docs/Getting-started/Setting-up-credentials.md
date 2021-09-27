# 配置阿里云密钥

您可以通过`s config`指令，进行密钥管理（包括密钥配置，删除，查看等），具体方法可以参考[相关文档](http://www.serverless-devs.com/docs/command#config%E6%8C%87%E4%BB%A4)

如果您想要在Serverless Devs开发者工具上配置阿里云密钥，您可以按照以下流程进行：

1. 执行`s config add`，并选择`Alibaba Cloud (alibaba)`选项；
2. 根据[提示: 🧭 Refer to the document for alibaba key:  http://config.devsapp.net/account/alibaba](http://www.serverless-devs.com/docs/provider-config/alibabacloud) ，获取阿里云密钥信息。   
也可以通过以下步骤在[函数计算首页](https://fc.console.aliyun.com/)快速获取密钥信息：
![](https://img.alicdn.com/tfs/TB13J02wp67gK0jSZPfXXahhFXa-2424-1380.png)
![](https://img.alicdn.com/tfs/TB1cYuGwuH2gK0jSZJnXXaT1FXa-2424-1380.png)
3. 按照命令行提醒，填入对应的`AccountID`, `AccessKeyID`, `AccessKeySecret`等信息，并推荐您为该密钥提供一个别名（`Alias`）以便于后续配置多密钥时可以更容易区分（密钥别名默认为`default`）。

> 注意：密钥信息为非常敏感信息，请您注意保护，切勿泄漏给他人使用。强烈推荐您根据阿里云访问控制的最佳实践文档，对密钥进行权限控制等。
> - [企业上云安全实践](https://help.aliyun.com/document_detail/102600.html?spm=a2c4g.11186623.6.705.17702d44PNMPMr)
> - [用户管理与分权](https://help.aliyun.com/document_detail/93742.html?spm=a2c4g.11186623.6.706.12594ba6Zl7pgC)
     
--------

# 高阶能力

- 为了便于该工具在CI/CD等自动化环境中发挥作用，Serverless Devs支持命令式密钥添加，例如：
    ```shell
    $ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ****** --aliasName ***
    ```

- 为了便于部分用户管理多种密钥信息，Serverless Devs支持多密钥管理，您在配置密钥的时候，可以为每个密钥配置别名信息（aliasName），即可在使用时指定使用某个密钥。
    - 例如您可以通过账号进行环境划分，配置密钥时可以配置别名为`release`的密钥和`dev`、`test`的密钥；
    - 再例如您可以通过对密钥进行权限控制，不同的密钥拥有不同的权限，可以做不同的事情，例如配置别名为`website-access`密钥，仅用于网站部署；配置别名为`fc-access`密钥，仅用于函数的部署等；
