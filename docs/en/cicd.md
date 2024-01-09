---
title: CICD
description: 'Sevrerless Devs Integration with CI and CD platforms and tools'
position: 5
category: 'Overview'
---

# Integration with CI and CD platforms and tools

- [Integration with GitHub Actions](#Integration-with-GitHub-Actions)
- [Integration with Gitee Go](#Integration-with-Gitee-Go)
- [Integration with Jenkins](#Integration-with-Jenkins)
- [Integration with Yunxiao](#Integration-with-Yunxiao)
- [Precautions](#Precautions)

## Integration with GitHub Actions

In YAML files of GitHub Actions, you can configure the capabilities of download, configuration, and command execution for Serverless Devs. 

For example, you can create a `.github/workflows/publish.yml` file in the repository. The following information describes the content of the file:

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
          node-version: 16
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm install -g @serverless-devs/s
      - run: s config add --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a default
      - run: s deploy -y --use-local
```

Description: 
- `run: npm install -g @serverless-devs/s`: Installs Serverless Devs of the latest version by using npm. 
- `run: s config add --AccessKeyID ${{secrets.AccessKeyID}} --AccessKeySecret ${{secrets.AccessKeySecret}} -a default`: Configures key information by using the config command. 
- `run: s deploy -y --use-local`: Deploys a project by using the deploy command. You can use the build command to build a project.

Notes: The key information can be obtained by using ${{secrets.*}}. You must configure the keys that are required and Key in GitHub Secrets. In the preceding example, Key for AccountID, AccessKeyID, and AccessKeySecret are required. Follow the following steps to configure the keys:

1. Configure key information in GitHub Secrets.
    ![](https://user-images.githubusercontent.com/21079031/120761131-71f28080-c547-11eb-9bb8-e08dafabb4ee.png)
2. Add key pairs. 
    ![](https://user-images.githubusercontent.com/21079031/120761249-93ec0300-c547-11eb-9c0d-904fb85b4201.png)
    In the example that is shown in the following figure, three key pairs are configured.
    ![](https://user-images.githubusercontent.com/21079031/120761347-ae25e100-c547-11eb-9bcd-4fc742671bc5.png)

> For more information about key configurations, see [Precautions](#Precautions).



## Integration with Gitee Go

After Gitee Go is enabled, you can configure the capabilities of download, configuration, and command execution for Serverless Devs in the YAML file of the pipeline. 

For example, you can create the flow file in a repository. The following information describes the content of the file:

```yaml
name: serverless-devs
displayName: 'Serverless Devs Project CI/CD'
triggers:                                  # Configure the pipeline trigger.
  push:                                    # Configure a master branch to trigger precise build when code is pushed.
    - matchType: PRECISE
      branch: master
commitMessage: ''                          # Match the commit message and determine whether to execute the pipeline.
stages:                                    # Configure the build stage.
  - stage:                                 # Define a stage for which the ID is deploy-stage and the name is Deploy Stage.
      name: deploy-stage
      displayName: 'Deploy Stage'
      failFast: false                      # Allow fail-fast errors. When a task fails in the stage, the whole stage is terminated.

      steps:                               # Configure the build steps.
        - step: npmbuild@1                 # Use npm to compile the environment.
          name: deploy-step                # Define a stage for which the ID is deploy-step and the name is Deploy Step.
          displayName: 'Deploy Step'
          inputs:                          # Configure the input parameters.
            nodeVersion: 14.15             # Specify the version of Node.js as 14.15.
            goals: |                       # Install dependencies. Configure topics, deploy parameters, and publish the deployment.
              node -v
              npm -v
              npm install -g @serverless-devs/s
              s config add --AccessKeyID $ACCESSKEYID --AccessKeySecret $ACCESSKEYSECRET -a default
              s deploy -y --use-local
```

Description: 
- `npm install -g @serverless-devs/s`: Installs Serverless Devs of the latest version by using npm. 
- `s config add --AccessKeyID $ACCESSKEYID --AccessKeySecret $ACCESSKEYSECRET -a default`: Configures key information by using the config command. 
- `s deploy -y --use-local`: Deploys a project by using the deploy command. You can use the build command to build a project.

Notes: You can obtain the key information by using the `$*` command. You must configure the keys that are required and `Key` in GitHub. For example, in the preceding example, Key for `ACCESSKEYID` and `ACCESSKEYSECRET` are required. Follow the following steps:

1. Open the page for environment variable management in Gitee.![img](file:////Users/jiangyu/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png)

2. Configure key pairs. 
    ![](https://user-images.githubusercontent.com/21079031/124719394-aa67ee80-df39-11eb-84ad-944ccf0486ba.png)
    In the example that is shown in the following figure, three key pairs are configured. 
    ![](https://user-images.githubusercontent.com/21079031/124719496-c9ff1700-df39-11eb-8ef6-4ccae28caefc.png)

> For more information about key configurations, see [Precautions](#Precautions).


## Integration with Jenkins

Before you integrate Serverless Devs with Jenkins, you must install and run Jenkins. For more information, see [Jenkins](https://www.jenkins.io/en/doc/pipeline/tour/getting-started/). 

After you start Jenkins, go to `http://localhost:8080` in a browser. Configure the basic configurations and credential information. The following figure shows the configurations.

![](https://img.alicdn.com/imgextra/i2/O1CN01tSgoo71Ne62AMGxqh_!!6000000001594-2-tps-3582-1048.png)

Add the key information based on your requirements. For example, you can add the following global credentials in Alibaba Cloud:

```
jenkins-alicloud-access-key-id : 阿里云 accessKeyId
jenkins-alicloud-access-key-secret : 阿里云 accessKeySecret
```

> Click [here](https://www.jenkins.io/en/doc/book/using/using-credentials/) to learn how to add credentials. 

You can add more configurations for Serverless Devs projects:

- Create the file `Jenkinsfile`     
    ```
    pipeline {
        agent {
            docker {
                image 'maven:3.3-jdk-8'
            }
        }
    
        environment {
            ALICLOUD_ACCESS = 'default'
            ALICLOUD_ACCESS_KEY_ID     = credentials('jenkins-alicloud-access-key-id')
            ALICLOUD_ACCESS_KEY_SECRET     = credentials('jenkins-alicloud-access-key-secret')
        }
    
        stages {
            stage('Setup') {
                steps {
                    sh 'scripts/setup.sh'
                }
            }
        }
    }
    ```
    Description:
    - In the environment part, the keys are processed based on the configurations
    – In the stages part, the `sh 'scripts/setup.sh'` command is run to execute the `scripts/setup.sh` file.
- To prepare the `scripts/setup.sh` file, create the file under the project: 
    ```shell script
    #!/usr/bin/env bash
    
    echo $(pwd)
    curl -o- -L http://cli.so/install.sh | bash
    
    source ~/.bashrc
    
    echo $ALICLOUD_ACCOUNT_ID
    s config add --AccessKeyID $ALICLOUD_ACCESS_KEY_ID --AccessKeySecret $ALICLOUD_ACCESS_KEY_SECRET -a $ALICLOUD_ACCESS
    
    (cd code && mvn package && echo $(pwd))
    
    s deploy -y --use-local --access $ALICLOUD_ACCESS
    ```
    The following information describes the content of the file:
    – `curl -o- -L http://cli.so/install.sh | bash`: Downloads and installs Serverless Devs.
    – `s config add --AccessKeyID $ALICLOUD_ACCESS_KEY_ID --AccessKeySecret $ALICLOUD_ACCESS_KEY_SECRET -a $ALICLOUD_ACCESS`: Configures key information.
    – `s deploy -y --use-local --access $ALICLOUD_ACCESS`: Run the deploy command to deploy the project or run the build command to build a project.

After the key configuration is complete, you can create a Jenkins pipeline for which the source is the destination GitHub address. Run the Jenkins pipeline. Then, you can get relevant results when the pipeline running ends. 

> For more information about key configurations, see [Precautions](#Precautions).

## Integration with Yunxiao

In Apsara DevOps, select Serverless Devs and enter the following content in a custom command:

```
# input your command here
npm install -g @serverless-devs/s
s config add --AccessKeyID ${ACCESSKEYID} --AccessKeySecret ${ACCESSKEYSECRET} -a default
s deploy -y --use-local
```

Description:

- `npm install -g @serverless-devs/s`: Install Serverless Devs of the latest version by using npm. The Serverless Devs in Apsara DevOps may be of an earlier version. You can run the command to install Serverless Devs of the latest version.
- `s config add --AccessKeyID ${ACCESSKEYID} --AccessKeySecret ${ACCESSKEYSECRET} -a default`: Configure key information by using the config command.
- `s deploy`: Run the deploy command to deploy projects or run the build command to build projects.

Example:

![image](https://user-images.githubusercontent.com/21079031/144697943-2ce9ea56-7af8-4c3b-945b-6897e6d744b5.png)

In the command, the following environment variables are referenced: `ACCESSKEYID` and `ACCESSKEYSECRET`. You need to add the following content in the environment variables.

![image](https://user-images.githubusercontent.com/21079031/144699074-3dad63d7-835f-4eb8-bd95-662de683dbbc.png)

> For more information about key configurations, see [Precautions](#Precautions).

## Precautions
  

- When you configure keys, the `s config add` command is used. The last parameter `-a default` is used to configure the alias of the key as `default`. Aliases must be consistent with the keys that are configured in the project. For example, aliases must be the same as the values of the `access` field in the `s.yaml` file.
- You can configure multiple keys and set aliases to the keys if the application is deployed in different platforms and accounts. After you configure aliases, you can use them in the `s.yaml` file.
- If you want to configure custom key information, you can use the `-il` and `-kl` parameters. For example, if you want to configure two pairs of keys and use custom keys, run the following commands:
  ```yaml
  s config add -kl tempToken1,tempToken2 -il tempValue1,tempValue2 -a website_access
  s config add -kl tempToken3,tempToken4 -il tempValue3,tempValue4 -a fc_access
  ```
