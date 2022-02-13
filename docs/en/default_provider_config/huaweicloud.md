---
title: Huawei Cloud key acquisition
description: 'Huawei Cloud key acq4isition'
position: 7
category: 'Access Configuration'
---
# Huawei cloud key acquisition

Huawei Cloud official website: https://www.huaweicloud.com/

- Open the [HUAWEI CLOUD official website](https://www.huaweicloud.com/) to log in. After logging in, select [My Credentials] in the upper right corner and then [Access Key] on the left:
  ![Get key page](https://images.devsapp.cn/access/huawei-page.jpg)
- Click Add Access Key, a prompt box will pop up for relevant security verification. After passing, you can see:
  ![](https://images.devsapp.cn/access/huawei-download.jpg)
- After downloading, you can see your own key information:
  ![](https://images.devsapp.cn/access/huawei-access.jpg)

> If the access key is leaked, there will be a risk of data leakage, and each access key can only be downloaded once. For account security, it is recommended that you periodically replace and properly store the access key.

------

## Security advice

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