# 配置百度云密钥



您可以通过`s config`指令，进行密钥管理（包括密钥配置，删除，查看等），具体方法可以参考[相关文档](http://www.serverless-devs.com/docs/command#config%E6%8C%87%E4%BB%A4)

如果您想要在Serverless Devs开发者工具上配置百度云密钥，您可以按照以下流程进行：

1. 执行`s config add`，并选择`Baidu Cloud (baiduyun)`选项；
2. 填入百度云密钥信息。通过以下步骤获取

  + 打开 [百度云官网](https://cloud.baidu.com/) 进行登录，登录后选择右上角安全认证 ： ![获取密钥页面](https://images.devsapp.cn/access/baidu-login.jpg)
  + 点击Access Key ID右侧的“显示”，可查看其对应的Secret Access Key，点击“隐藏”可隐藏对应的Secret Access Key: ![获取密钥](https://images.devsapp.cn/access/baidu-access.jpg)

3. 按照命令行提醒，填入对应的 `AccessKeyID`, `Secret Access Key`等信息，并推荐您为该密钥提供一个别名（`Alias`）以便于后续配置多密钥时可以更容易区分（密钥别名默认为`default`）。

