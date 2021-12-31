# Get secret key

Alicloud's official website：https://www.aliyun.com   
The page to get your AliCloud AccountId：https://account.console.aliyun.com/#/secure   
The page to get the secret key：https://usercenter.console.aliyun.com/#/manage/ak

- Open [The page to get your AliCloud AccountId](https://account.console.aliyun.com/#/secure) to get your AccountId ：
  ![AccountId获取页面](https://images.devsapp.cn/access/aliyun-accountid.jpg)

- Open [The page to get the secret key](https://usercenter.console.aliyun.com/#/manage/ak) to get the secret key ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)


> AccessKey of your cloud account is the secret key to access Alibaba Cloud APIs. Since the AccessKey has full permissions of your cloud account, please make sure you keep it well. To avoid the AccessKey being used by others to cause [Sensitive information leakage](https://www.alibabacloud.com/help/doc-detail/54059.htm) , do not release your AccessKey to any external channels (for example, Github)    
> We strongly recommend you use the AccessKeys of RAM users in API calls, according to [Alibaba Cloud account security best practices](https://www.alibabacloud.com/help/doc-detail/102600.html) .

------

## Security Recommendations

- Create separate RAM users.

  You require only one Alibaba Cloud account. You can create separate RAM users for your employees. Then, you can attach different policies to the RAM users. This ensures fine-grained access control. You do not need to use your Alibaba Cloud account for daily permission management.

  For more information, see [Create a RAM user](https://www.alibabacloud.com/help/doc-detail/93720.htm).

- Separate console users from API users.

  We recommend that you do not create a logon password for console operations and an AccessKey pair for API operations for a RAM user at the same time.

  - To allow an application to access cloud resources by calling API operations, you only need to create an AccessKey pair for the application.
  - To allow an employee to manage cloud resources by using the console, you only need to set a logon password for the employee.

  For more information, see [Create a RAM user](https://www.alibabacloud.com/help/doc-detail/93720.htm).

- Create and group RAM users.

  If your Alibaba Cloud account has multiple RAM users, you can group the RAM users based on their responsibilities and grant permissions to the groups.

  For more information, see [Create a RAM user group](https://www.alibabacloud.com/help/en/doc-detail/93724.htm?spm=a2c63.p38356.0.0.7e7e2d2flQBnKu#task-187540).

- Grant the minimum permissions to different RAM user groups.

  You can attach system policies to RAM users or RAM user groups. You can also create custom policies and attach them to RAM users or RAM user groups for fine-grained access control. By granting the minimum permissions to different RAM users or RAM user groups, you can better manage access permissions on cloud resources.

  For more information, see [Create a custom policy](https://www.alibabacloud.com/help/en/doc-detail/93733.htm).

- Configure strong logon password policies.

  You can configure logon password policies that specify the minimum length, mandatory characters, and validation period for RAM users in the RAM console. If you authorize a RAM user to change the logon password, the RAM user must create a strong logon password and rotate the password or AccessKey pair on a regular basis.

  For more information, see [Set RAM user security policies](https://www.alibabacloud.com/help/doc-detail/116414.htm#task-188786).

- Enable an MFA device for your Alibaba Cloud account.

  You can enable a multi-factor authentication (MFA) device for your Alibaba Cloud account to enhance the account security. After you enable an MFA device, the following two security factors are required when a RAM user logs on to Alibaba Cloud:

  1. Username and password
  2. Verification code provided by the MFA device

  For more information, see [Enable an MFA device for an Alibaba Cloud account](https://www.alibabacloud.com/help/doc-detail/28635.htm#task-u2b-ww2-xdb).

- Enable SSO for RAM users. 

  After single sign-on (SSO) is enabled,all the internal accounts of your enterprise will be authenticated. Then, RAM users can log on to Alibaba Cloud to access resources only by using an internal account.

  For more information, see [SSO overview](https://www.alibabacloud.com/help/doc-detail/93684.htm#concept-etn-fjc-mfb).

- Do not create an AccessKey pair for your Alibaba Cloud account.

  Your Alibaba Cloud account has full permissions on your resources. The AccessKey pair of your Alibaba Cloud account has the same permissions as the logon password. The AccessKey pair is used for programmatic access whereas the logon password is used to log on to the console. To prevent information leaks due to the disclosure of the AccessKey pair, we recommend that you do not create an AccessKey for your Alibaba Cloud account.You can create an AccessKey pair for your RAM users and grant the RAM user the relevant permissions.

  For more information, see [Create an AccessKey pair for a RAM user](https://www.alibabacloud.com/help/doc-detail/116401.htm#task-188766).

- Specify the condition element in policies to enhance security.

  You can specify the condition element in a policy to allow RAM users to use your resources only when the condition is met. For example, you can specify that the RAM user must use a secure channel (for example, SSL), use a specified source IP address, or use your resources within a specified period of time.

  For more information, see [Policy elements](https://www.alibabacloud.com/help/doc-detail/93738.htm#concept-xg5-51g-xdb).

- Manage permissions on your cloud resources.

  All your resources are in your Alibaba Cloud account. The RAM users of your Alibaba Cloud account can use the resources, but do not own the resources. This allows you to manage instances or other resources created by the RAM users.

  - If you no longer require an existing RAM user, you can delete the RAM user to revoke all permissions granted to the RAM user.
  - If you require a new RAM user, you can create a RAM user, set a logon password or AccessKey pair for the RAM user, and then grant the RAM user the relevant permissions.

  For more information, see [Grant permissions to a RAM user](https://www.alibabacloud.com/help/doc-detail/116146.htm#task-187800).

- Use STS to grant temporary permissions to RAM users. Security Token Service (STS) is an extended authorization service of RAM. You can use STS tokens to grant temporary permissions to RAM users and specify the permission and automatic expiration time of the tokens.

  For more information, see [What is STS?](https://www.alibabacloud.com/help/doc-detail/28756.htm#reference-ong-5nv-xdb).
