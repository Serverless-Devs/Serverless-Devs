---
title: Tencent Cloud key acquisition
description: 'Tencent Cloud key acquisition'
position: 8
category: 'Access Configuration'
---

# Tencent cloud key acquisition

Tencent Cloud official website: https://cloud.tencent.com/
Get key page: https://console.cloud.tencent.com/cam/capi

- Open the [Get Key Page](https://console.cloud.tencent.com/cam/capi) to get the key:
  ![Get the key page](https://images.devsapp.cn/access/tencent-access.jpg)


> Use the master account key to access your Tencent Cloud resources without restrictions. The leakage of the master account key may cause the loss of your cloud assets! It is strongly recommended that you refer to [Best Practice](https://cloud.tencent.com/document/product/598/10592) to stop using the main account to log in to the console or use the main account key to access the cloud API, please use the sub-account for Related resource operations. [How to create a sub-user](https://cloud.tencent.com/document/product/598/13674)

------

## Security advice

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