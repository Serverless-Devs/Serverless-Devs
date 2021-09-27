# Github Action 与 Serverless Devs

当我们在体验Serverless之后，欲将项目真真实实的部署到Serverless架构时，CI/CD是我们很多人绕不开的话题，那么基于Serverless Devs这款工具，如何快速的和Github Action进行有机结合，实现CI/CD的能力呢？

## CI/CD的“脚手架”

现在有很多的脚手架，但是Serverless CI/CD的脚手架应该还是少数的，而Serverless Devs为我们提供了一个CI/CD的脚手架，以Github Action为例，我们可以执行代码，快速在项目下初始化CI/CD模板。

例如，当前我的项目结构：

![image](https://user-images.githubusercontent.com/21079031/120759969-27bccf80-c546-11eb-9260-64724df2e5f5.png)

此时，我只需要告诉Serverless Devs，我要生成一个Github Action模板即可：

```
s cli cicd github
```

![image](https://user-images.githubusercontent.com/21079031/120760086-48852500-c546-11eb-9c38-66dbfd82e632.png)

我们可以看到，系统会在当前项目创建相对应的CI/CD模板：

![image](https://user-images.githubusercontent.com/21079031/120760172-681c4d80-c546-11eb-9551-ba3e060e2947.png)

至此，我们完成了第一个步骤，初始化一个CI/CD的模板。

## 流程配置

### Yml文件配置

系统所为我们生成的模板文件实际上是一个非常简单的案例：

```yaml
name: Serverless Devs Project CI/CD

on:
  push:
    branches: [ master ]

jobs:
  serverless-devs-cd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm install -g @serverless-devs/s
      # 默认密钥配置指令是阿里云密钥配置指令，更多可以参考：
      # 如何通过Github Action使用Serverless Devs做CI/CD：http://short.devsapp.cn/cicd/github/action/usage
      # Serverless Devs的官网是通过Serverless Devs部署的: http://short.devsapp.cn/cicd/github/action/practice
      - run: s config add --AccountID ${{secrets.AccountID}} --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a default
      - run: s deploy
```

整个核心流程是：
1. 下载`serverless-devs`
2. 配置密钥信息
3. 项目部署（执行`s deploy`命令）

但是在实际生产过程中，我们可能需要自定义使用一些功能，此时可以参考Github Action的文档：https://docs.github.com/cn/actions

例如，我在下载`serverless-devs`之后，配置密钥之后，我需要进行`build`等操作，操作之后，我在删除临时生成的文件夹"./abc"，此时我们可以：

```yaml
...
      - run: npm install
      - run: npm install -g @serverless-devs/s
      # 默认密钥配置指令是阿里云密钥配置指令，更多可以参考：
      # 如何通过Github Action使用Serverless Devs做CI/CD：http://short.devsapp.cn/cicd/github/action/usage
      # Serverless Devs的官网是通过Serverless Devs部署的: http://short.devsapp.cn/cicd/github/action/practice
      - run: s config add --AccountID ${{secrets.AccountID}} --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a default
      - run: s build
      - run: rm -rf ./abc
      - run: s deploy
```

所以，具体的流程，我们完全可以根据需求自定义。

### 账号信息配置

在上一个流程中，我们涉及到密钥信息的配置，我们可以使用Serverless Devs为我们提供的`s config add`命令进行。

例如，阿里云的账号体系需要`AccountID`,`AccessKeyID`,`AccessKeySecret`等内容，此时我们可以：

1. 将密钥信息配置到Github Secrets中

![image](https://user-images.githubusercontent.com/21079031/120761131-71f28080-c547-11eb-9bb8-e08dafabb4ee.png)

我们创建多对密钥信息：

![image](https://user-images.githubusercontent.com/21079031/120761249-93ec0300-c547-11eb-9c0d-904fb85b4201.png)

例如，我此处配置了三对密钥：

- `ALIYUN_ACCOUNT_ID`对应阿里云密钥体系中的`AccountID`；
- `ALIYUN_ACCESS_KEY_ID`对应阿里云密钥体系中的`AccessKeyID`；
- `ALIYUN_ACCESS_KEY_SECRET`对应阿里云密钥体系中的`AccessKeySecret`

![image](https://user-images.githubusercontent.com/21079031/120761347-ae25e100-c547-11eb-9bcd-4fc742671bc5.png)

我此时则可以对应配置：

```
s config add --AccountID ${{secrets.ALIYUN_ACCOUNT_ID}} --AccessKeyID ${{secrets.ALIYUN_ACCESS_KEY_ID}} --AccessKeySecret ${{secrets.ALIYUN_ACCESS_KEY_SECRET}} -a website_access
```

> 密钥中的别名有什么？
> 密钥中的别名，是为了帮助Serverless Devs更快的识别出你要用的密钥信息，主要是在Yaml中体现，例如：
> ![image](https://user-images.githubusercontent.com/21079031/120762524-eb3ea300-c548-11eb-83ec-73dabc2029c9.png)
> 在此处配置的密钥信息（默认是default），如果此处配置了密钥别名是"default"，那么系统就会在执行相关操作的时候，去获取名为"default"的密钥信息；

> 我的一个应用中，涉及到部署到多个平台，需要多个密钥信息，如何配置？   
> 例如，当存在项目：
> ![image](https://user-images.githubusercontent.com/21079031/120762886-45d7ff00-c549-11eb-8d01-743ad858d611.png)
> 此时，该app中涉及到两个Service，分别用了不同的组件以及不同的密钥内容`website_access`, `fc_access`    
> 我们可以通过配置多个密钥信息来进行CI/CD的配置
> 1. 在Github Secrets处配置对应的Key-Value
> 2. 在生成的`.github/workflow/serverless-devs.yml`文件中配置密钥信息：
> ```
> s config add -kl tempToken1,tempToken2 -il tempValue1,tempValue2 -a website_access
> s config add -kl tempToken3,tempToken4 -il tempValue3,tempValue4 -a fc_access
> ```

# Others

Best practices：
- [🍉 阿里云Custom Container的CI/CD最佳实践案例](http://www.serverless-devs.com/blog/aliyun-custom-container-ci-cd)
- [🍉 只更新代码，然后发布版本：基于Serverless Devs原子化操作阿里云函数计算](http://www.serverless-devs.com/blog/serverless-devs-update-fc-code)
