> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、服务名、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# shltest 帮助文档

<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=shltest&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=shltest" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=shltest&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=shltest" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=shltest&type=packageDownload">
  </a>
</p>

<description>

简短的描述/介绍

</description>

<codeUrl>

- [:smiley_cat: 代码](https://github.com/xsahxl/apptest)

</codeUrl>
<preview>

- [:eyes: 预览](https://github.com/xsahxl/apptest)

</preview>

## 前期准备

使用该项目，您需要有开通以下服务：

<service>

| 服务                   | 备注             |
| ---------------------- | ---------------- |
| 函数计算 FC            | 为什么需要该服务 |
| 对象存储 OSS           | 为什么需要该服务 |
| 日志服务 SLS           | 为什么需要该服务 |
| 文件存储 NAS           | 为什么需要该服务 |
| 容器镜像服务 CR        | 为什么需要该服务 |
| 专有网络 VPC           | 为什么需要该服务 |
| 事件总线 EventBridge   | 为什么需要该服务 |
| 表格存储 Tablestore    | 为什么需要该服务 |
| Serverless应用引擎 SAE | 为什么需要该服务 |
| CDN                    | 为什么需要该服务 |
| 云数据库RDS MySQL 版   | 为什么需要该服务 |
| 视频点播               | 为什么需要该服务 |
| 视频直播               | 为什么需要该服务 |
| 智能媒体服务           | 为什么需要该服务 |
| 媒体处理               | 为什么需要该服务 |
| 低代码音视频工厂       | 为什么需要该服务 |
| 音视频通信 RTC         | 为什么需要该服务 |

</service>

推荐您拥有以下的产品权限 / 策略：
<auth>

| 服务/业务 | 权限               | 备注                         |
| --------- | ------------------ | ---------------------------- |
| 函数计算  | AliyunFCFullAccess | 需要创建函数处理核心业务逻辑 |

</auth>

<remark>

您还需要注意：  
当前应用目前只支持标准的 PNG 格式图片进行压缩。

</remark>

<disclaimers>

免责声明：  
本项目采用了 [pngquant](https://pngquant.org/)作为技术实现方案，以开源形式进行组件共享，具体的使用所需遵循的协议，请参考 pngquant 项目。

</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=shltest) ，
  [![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=shltest) 该应用。
   
</appcenter>
<deploy>
    
- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
  - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://docs.serverless-devs.com/fc/config) ；
  - 初始化项目：`s init shltest -d shltest `
  - 进入项目，并进行项目部署：`cd shltest && s deploy - y`
   
</deploy>

## 应用详情

<appdetail id="flushContent">

当前应用仅支持 PNG 图片的压缩，压缩效果如下：

![](http://image.editor.devsapp.cn/evBw7lh8ktv6xDBzSSzvjr1ykchAF9hG41gf1ek1sk8tr4355A/srZyhix55GBkGzC4CShk.png)

</appdetail>

## 使用文档

<usedetail id="flushContent">

部署当前应用之后，可以通过返回的地址进行测试，也可以通过api进行调用。

# 返回的地址进行测试

只需要通过选择文件（需要选择 PNG 格式的图片），点击图片压缩即可看到压缩结果：

![](http://image.editor.devsapp.cn/evBw7lh8ktv6xDBzSSzvjr1ykchAF9hG41gf1ek1sk8tr4355A/Ce6jtsiyvDsgAZjDFAr5.png)

# 通过api进行调用

地址：`http://你的域名/compress`

参数：

```
  Headers:
     Content-type: application/json
  Body:
     image: 图片Base64后的字符串(base64后最大不可以超过5M)
     min_quality: 质量区间，默认65
     max_quality: 质量区间，默认80
     speed: 压缩速度（默认3，最高10）
```

案例：

```
import requests
import base64
def getResult(imagePath):
    with open(imagePath, 'rb') as f:
        data = f.read()
    image = str(base64.b64encode(data), encoding='utf-8')
    data = json.dumps({"image": 'data:image/png;base64,'+image, "min_quality": "65", "max_quality": "80", "speed": "3"})
    txt = requests.post("http://localhost:7291/compress", data=data,
                        headers={'Content-Type': 'application/json'})
    return txt.content.decode("utf-8")
print(getResult("./test.png"))
```

</usedetail>

<devgroup>

## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <center>微信公众号：`serverless`</center>                                                                                         | <center>微信小助手：`xiaojiangwh`</center>                                                                                        | <center>钉钉交流群：`33947367`</center>                                                                                           |

</p>
</devgroup>
