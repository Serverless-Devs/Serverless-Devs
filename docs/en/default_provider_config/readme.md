---
title: Cloud vendor key configuration
description: 'Serverless Devs Cloud vendor key configuration'
position: 1
category: 'Access Configuration'
---

# Cloud vendor key configuration

- [Alibaba Cloud](#alicloud-key-acquisition)
- [Baidu Cloud](#baidu-cloud-key-acquisition)
- [AWS](#aws-key-acquisition)
- [Azure](#azure-key-acquisition)
- [Google Cloud](#google-cloud-key-acquisition)
- [HUAWEI CLOUD](#huawei-cloud-key-acquisition)
- [Tencent Cloud](#tencent-cloud-key-acquisition)


## Alicloud key acquisition

Alicloud's official website：https://www.aliyun.com   

The page to get the secret key：https://usercenter.console.aliyun.com/#/manage/ak

Open [The page to get the secret key](https://usercenter.console.aliyun.com/#/manage/ak) to get the secret key ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)


> AccessKey of your cloud account is the secret key to access Alibaba Cloud APIs. Since the AccessKey has full permissions of your cloud account, please make sure you keep it well. To avoid the AccessKey being used by others to cause [Sensitive information leakage](https://www.alibabacloud.com/help/doc-detail/54059.htm) , do not release your AccessKey to any external channels (for example, Github)    
> We strongly recommend you use the AccessKeys of RAM users in API calls, according to [Alibaba Cloud account security best practices](https://www.alibabacloud.com/help/doc-detail/102600.html) .

------

Security Recommendations

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

## Baidu cloud key acquisition

Baidu Cloud official website: https://cloud.baidu.com/

- Open [Baidu Cloud Official Website](https://cloud.baidu.com/) to log in, after logging in, select the security authentication in the upper right corner:
   ![Get key page](https://images.devsapp.cn/access/baidu-login.jpg)
- Click "Show" on the right side of the Access Key ID to view the corresponding Secret Access Key, and click "Hide" to hide the corresponding Secret Access Key:
   ![Get key](https://images.devsapp.cn/access/baidu-access.jpg)

## AWS key acquisition

AWS official website: https://www.AWS.com

- Open [AWS official website](https://www.AWS.com) to log in, and select [My Credentials] in the upper right corner after logging in:
   ![Get key page](https://images.devsapp.cn/access/aws-page.jpg)
- Click [Access Keys], and [Create New Access Keys]:
   ![](https://images.devsapp.cn/access/aws-create.jpg)
- After completion, you can see the key details:
   ![](https://images.devsapp.cn/access/aws-access.jpg)

> To help protect your security, keep your private access key safe and never share it with others.

## Azure key acquisition

Azure official website: https://www.azure.com

- Enter the management interface of the created Azure Web App through [Azure Network](https://portal.azure.com/) and then enter the Identity management interface
- Search the Key Vault keyword in the search bar at the top of the Azure website and enter the Key Vault management interface
    ![](https://images.devsapp.cn/access/azure-page.jpg)
- Click to enter the created Azure Key Vault instance and enter the Access Policies management interface
- Click the Add Access Policy button, add permissions for the principal that needs to be authorized, and then click the Save button.

## Google Cloud key acquisition

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

## Huawei cloud key acquisition

Huawei Cloud official website: https://www.huaweicloud.com/

- Open the [HUAWEI CLOUD official website](https://www.huaweicloud.com/) to log in. After logging in, select [My Credentials] in the upper right corner and then [Access Key] on the left:
  ![Get key page](https://images.devsapp.cn/access/huawei-page.jpg)
- Click Add Access Key, a prompt box will pop up for relevant security verification. After passing, you can see:
  ![](https://images.devsapp.cn/access/huawei-download.jpg)
- After downloading, you can see your own key information:
  ![](https://images.devsapp.cn/access/huawei-access.jpg)

> If the access key is leaked, there will be a risk of data leakage, and each access key can only be downloaded once. For account security, it is recommended that you periodically replace and properly store the access key.

------

Security advice

- Do not create access keys for HUAWEI CLOUD accounts
Your HUAWEI CLOUD account is the subject of your HUAWEI CLOUD resource ownership and resource usage billing, and has full access rights to the resources and cloud services it owns. Both the password and the access key (AK/SK) are the identity credentials of the account and have the same effect. The password is used to log in to the interface console and is the identity certificate you must have. The access key is used for programming calls using development tools. The second identity credential is of an auxiliary nature and is not required. To improve account security, it is recommended that you only log in to the console with a password, and do not create a second identity credential (access key) for your account to avoid information security risks caused by access key disclosure.

- Do not embed access keys into the code
When you use API, CLI, SDK and other development tools to access cloud services, do not directly embed the access key into the code to reduce the risk of the access key being leaked.

- Create separate IAM users
If anyone needs to access the resources in your HUAWEI CLOUD account, please do not share the account password with them. Instead, create a separate IAM user in your account and assign corresponding permissions to them. At the same time, use it as a HUAWEI CLOUD account. It is recommended that you do not use an account to access HUAWEI CLOUD, but create an IAM user for yourself and grant the user management permissions, so that you can use the IAM user instead of the account to perform daily management work and protect the security of the account.

- Grant least privilege
The principle of least privilege is a standard security recommendation. You can use the system permissions provided by IAM, or create a custom policy yourself, to grant only the permissions that are just enough for the users in the account to complete the work. The principle of least privilege can help you secure Control user access to HUAWEI CLOUD resources.

   At the same time, it is recommended to grant custom policies to IAM users who use development tools such as APIs, CLIs, and SDKs to access cloud services, and use fine-grained permission control to reduce the impact of access key leakage on your account.

- Enable virtual MFA function
Multi-Factor Authentication (MFA for short) is a very simple security practice method. It is recommended that you enable the MFA function for HUAWEI CLOUD accounts and users with higher privileges in your account. It can add an additional feature to the username and password. layer protection. When MFA is enabled, when users log in to the console, they will be asked to enter a username and password (first security factor), and a verification code from their MFA device (second security factor). The combination of these multiple elements will provide a higher level of security for your account and resources.

   MFA devices can be hardware-based or software-based. Currently, the system only supports software-based virtual MFA. Virtual MFA is an application that can generate a 6-digit authentication code. Such applications can run on mobile hardware devices (including smartphones). ,Very convenient.

- Set a strong password policy
Set a strong password policy on the IAM console, such as the minimum password length, the maximum number of consecutive occurrences of the same character in the password, and the password cannot be the same as the historical password to ensure that users use strong passwords with high complexity.

- Set sensitive actions
After setting sensitive operations, if you or the users in your account perform sensitive operations, such as deleting resources, generating access keys, etc., you need to enter a password and verification code for verification to avoid risks and losses caused by misoperation.

- Regularly modify identity credentials
If you don't know your password or access key has been compromised, modifying it regularly can minimize the risk of inadvertent disclosure.

   You can periodically rotate passwords by setting a password expiration policy. You and the users in your account must change the password within the set time. Otherwise, the password will become invalid. IAM will prompt the user to change the password 15 days before the password expires.
   Rotating the access key can be done by creating two access keys, using the two access keys as one master and one backup, first use the master access key 1, after a period of time, use the backup access key 2, and then use the control key. The desk deletes the master access key one and regenerates an access key that rotates periodically in your application.

- Remove unwanted credentials
   For IAM users who only need to log in to the console, access keys are not required, please do not create them, or delete access keys in time. You can also use the "last login time" of the IAM user in the account to determine whether the user's credentials are no longer required. For users who have not logged in for a long time, please modify their credentials in time, including changing passwords and deleting them. Access keys, you can also set an "Account Deactivation Policy" to control the automatic deactivation of accounts that have not been used for a long time.

## Tencent cloud key acquisition

Tencent Cloud official website: https://cloud.tencent.com/
Get key page: https://console.cloud.tencent.com/cam/capi

- Open the [Get Key Page](https://console.cloud.tencent.com/cam/capi) to get the key:
  ![Get the key page](https://images.devsapp.cn/access/tencent-access.jpg)


> Use the master account key to access your Tencent Cloud resources without restrictions. The leakage of the master account key may cause the loss of your cloud assets! It is strongly recommended that you refer to [Best Practice](https://cloud.tencent.com/document/product/598/10592) to stop using the main account to log in to the console or use the main account key to access the cloud API, please use the sub-account for Related resource operations. [How to create a sub-user](https://cloud.tencent.com/document/product/598/13674)

------

Security advice

- Turn on MFA protection
  To enhance account security, it is recommended that you bind MFA to all accounts; enable login protection and sensitive operation protection for both the main account and sub-account. MFA secondary verification is strongly recommended for those who support email login or WeChat login. After MFA is turned on, account login and sensitive operations require secondary verification. For related settings, please refer to: [Setting security protection for collaborators](https://cloud.tencent.com/document/product/598/36626), [Setting security protection for sub-users](https://cloud.tencent. com/document/product/598/36383).

- Access Tencent Cloud with a sub-account
  Please try not to use the identity credentials of the main account to access Tencent Cloud, and do not share the credentials with others. Under normal circumstances, you should create sub-accounts for all users who access Tencent Cloud, and authorize the corresponding management rights of the sub-accounts. For related settings, please refer to: [User Type](https://cloud.tencent.com/document/product/598/13665).

- Use groups to assign permissions to sub-accounts
  Define groups according to job responsibilities and assign corresponding administrative rights to groups. Then assign the user to the corresponding group. In this way, when you modify a group's permissions, the permissions of the associated users in the group change. In addition, when the organizational structure is adjusted, only the relationship between users and groups needs to be updated. For related settings, please refer to: [User Group](https://cloud.tencent.com/document/product/598/14985).

- Principle of least privilege
  The principle of least privilege is a standard security principle. That is, grant only the minimum permissions required to perform the task, and do not grant more unrelated permissions. For example, if a user is only a user of the CDN service, the user does not need to be granted the resource access permissions of other services (such as COS read and write permissions).

- Molecular accounts to manage users, permissions and resources
  It is recommended that the same sub-account not manage users, permissions, and resources at the same time. Some sub-accounts should be allowed to manage users, some sub-accounts to manage permissions, and some sub-accounts to manage other cloud resources.

- Periodic rotation of credentials
  It is recommended that you or your CAM users periodically rotate login passwords or cloud API keys. This can limit the time of impact in the event of a credential leak.
  For the main account password setting, please refer to: [Account Password](https://cloud.tencent.com/document/product/378/14623).
  For sub-user password settings, please refer to: [Sub-user reset password](https://cloud.tencent.com/document/product/598/36260).

- Remove unwanted certificates and permissions
  Remove certificates that the user does not need and permissions that the user no longer needs. Minimize the security risks posed by leaked access credentials.

- Use policy conditions to enhance security
Define more refined conditions for the policy as much as possible, constrain the scenarios in which the policy takes effect, and strengthen security. For example, the user must perform certain operations on the specified server at the specified time, etc.
  For related settings, please refer to: [Element reference condition](https://cloud.tencent.com/document/product/598/10603#6.-.E7.94.9F.E6.95.88.E6.9D.A1.E4.BB.B6.EF.BC.88condition.EF.BC.89).