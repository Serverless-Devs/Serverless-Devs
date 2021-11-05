# 阿里云密钥获取

阿里云官网：https://www.aliyun.com   
AccountId获取页面：https://account.console.aliyun.com/#/secure   
获取密钥页面：https://usercenter.console.aliyun.com/#/manage/ak

- 打开 [AccountId获取页面](https://account.console.aliyun.com/#/secure) 获取AccountId ：
  ![AccountId获取页面](https://images.devsapp.cn/access/aliyun-accountid.jpg)

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)
 
  
> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. Github）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) 。    
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html?spm=5176.2020520153.0.0.57f1336a8PQ1KR) ，使用 RAM 子用户 AccessKey 来进行 API 调用。

----

## 安全建议

- 创建独立的RAM用户   
企业只需使用一个云账号。通过RAM为名下的不同操作员创建独立的RAM用户，进行分权管理，不使用云账号进行日常运维管理。

  详情请参见[创建RAM用户](https://help.aliyun.com/document_detail/93720.html?spm=a2c4g.11186623.2.15.c79a1723Vwyvig#task-187540) 。

- 将控制台用户与API用户分离    
  不建议给一个RAM用户同时创建用于控制台操作的登录密码和用于API操作的访问密钥。

  应用程序账号：只需要通过OpenAPI访问云资源，创建访问密钥即可。   
  员工账号：只需要通过控制台操作云资源，设置登录密码即可。      
  详情请参见[创建RAM用户](https://help.aliyun.com/document_detail/93720.html?spm=a2c4g.11186623.2.16.c79a1723Vwyvig#task-187540) 。

- 创建用户并进行分组   
  当云账号下有多个RAM用户时，可以通过创建用户组对职责相同的RAM用户进行分类并授权。   

  详情请参见[创建用户组](https://help.aliyun.com/document_detail/93724.html?spm=a2c4g.11186623.2.17.c79a1723Vwyvig#task-187540) 。

- 给不同用户组分配最小权限   
  您可以使用系统策略为用户或用户组绑定合理的权限策略，如果您需要更精细粒度的权限策略，也可以选择使用自定义策略。通过为用户或用户组授予最小权限，可以更好的限制用户对资源的操作权限。   

  详情请参见[创建自定义策略](https://help.aliyun.com/document_detail/93733.html?spm=a2c4g.11186623.2.18.c79a1723Vwyvig#task-glf-vwf-xdb) 。

- 为用户登录配置强密码策略   
  您可以通过RAM控制台设置密码策略，如密码长度、密码中必须包含元素、密码有效期等。如果允许RAM用户更改登录密码，那么应该要求RAM用户创建强密码并且定期轮换登录密码或访问密钥。   

  详情请参见[设置RAM用户安全策略](https://help.aliyun.com/document_detail/116414.html?spm=a2c4g.11186623.2.19.c79a1723Vwyvig#task-188786) 。

- 为云账号开启多因素认证    
  开启多因素认证（Multi-factor authentication，MFA）可以提高账号的安全性，在用户名和密码之外再增加一层安全保护。启用MFA后，用户登录阿里云时，系统将要求输入两层安全要素：   

  第一安全要素：用户名和密码   
  第二安全要素：多因素认证设备生成的验证码   
  详情请参见[为云账号设置多因素认证](https://help.aliyun.com/document_detail/28635.html?spm=a2c4g.11186623.2.20.c79a1723Vwyvig#task-u2b-ww2-xdb) 。

- 为用户开启SSO单点登录功能    
  开启SSO单点登录后，企业内部账号进行统一的身份认证，实现使用企业本地账号登录阿里云才能访问相应资源。   

  详情请参见[SSO概览](https://help.aliyun.com/document_detail/93684.html?spm=a2c4g.11186623.2.21.c79a1723Vwyvig#concept-etn-fjc-mfb) 。

- 不要为云账号创建访问密钥     
  由于云账号对名下资源有完全控制权限，AccessKey与登录密码具有同样的权力，AccessKey用于程序访问，登录密码用于控制台登录。为了避免因访问密钥泄露带来的信息泄露，不建议您创建云账号访问密钥并使用该密钥进行日常工作。   

  您可以通过为RAM用户创建访问密钥，使用RAM用户进行日常工作。   

  详情请参见[为RAM用户创建访问密钥](https://help.aliyun.com/document_detail/116401.html?spm=a2c4g.11186623.2.22.c79a1723Vwyvig#task-188766) 。

- 使用策略限制条件来增强安全性    
  要求用户必须使用安全信道（例如：SSL）、在指定时间范围或在指定源IP条件下才能操作指定的云资源。   

  详情请参见[权限策略基本元素](https://help.aliyun.com/document_detail/93738.html?spm=a2c4g.11186623.2.23.c79a1723Vwyvig#concept-xg5-51g-xdb) 。
  
- 集中控制云资源    
  阿里云默认云账号是资源的拥有者，掌握完全控制权。RAM用户对资源只有使用权，没有所有权。这一特性可以方便您对用户创建的实例或数据进行集中控制。   

  当用户离开组织：只需要将对应的账号移除，即可撤销所有权限。   
  当用户加入组织：只需创建新的账号，设置登录密码或访问密钥并为RAM用户授权。   
  详情请参见为[RAM用户授权](https://help.aliyun.com/document_detail/116146.html?spm=a2c4g.11186623.2.24.c79a1723Vwyvig#task-187800) 。

- 使用STS给用户授权临时权限   
  STS （Security Token Service）是RAM的一个扩展授权服务，使用STS访问令牌可以给用户授予临时权限，您可以根据需要来定义访问令牌的权限和自动过期时间，可以让授权更加可控。   

  详情请参见[什么是STS](https://help.aliyun.com/document_detail/28756.html?spm=a2c4g.11186623.2.25.c79a1723Vwyvig#concept-ong-5nv-xdb) 。