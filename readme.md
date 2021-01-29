# Welcome to Serverless Devs

<div align=center> <img src="https://images.serverlessfans.com/devs-github/logo.jpg" width="100%"/> </div>

<p align="center">
  <a href="https://www.npmjs.com/package/@serverless-devs/s">
    <img src="https://img.shields.io/npm/v/@serverless-devs/s" alt="npm version">
  </a>
  <a href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
  </a>
</p>

<p align="center">
  <span>Use serverless like a mobile phone</span><br>
  <span> <a href="readme_zh.md">中文文档</a> ｜ English</span>
</p>

- [:thumbsup: Project advantage ](#project-advantages)
- [:iphone: Perform Serverless like a mobile phone ](#perform-serverless-like-a-mobile-phone)
- [:house_with_garden: Use scenarios ](#use-scenarios)
- [:heavy_check_mark: Fast entry installation and use ](#fast-entry-installation-and-use)
- [:running: Quick start experience](#quick-start-experience)
- [:book: Use documentation](#use-documentation)

Serverless Devs is an open-source and Serverless developer platform, dedicated to providing developers with a powerful tool chain system. Through this platform, developers can experience multi-cloud Serverless products in one click and quickly deploy Serverless projects.

Serverless DevTools include Serverless DevTools and Serverless Devs App Store(Serverless Application Center):

**Serverless Devs Tool** is a tool that can double the development and O & M efficiency for Serverless developers. By using this tool, developers can perform application creation, project development, testing, release, and deployment tasks in a simpler and faster manner, enabling end-to-end management of projects.

**Serverless Devs App Store** web + is an application center that integrates online search, one-click deployment, and visual editing of Serverless Applications. The application center contains a large number of production-level project and case templates. You can select from these templates and deploy each project to the specified Apsara stack platform with one click.

## Project advantages

### Supports mainstream Serverless services/frameworks

Serverless Devs is a Serverless developer platform with components and plugins. In this platform, each user can pluggable different Serverless services and frameworks, at the same time, each user can participate in the development of components and plugins. In Serverless Devs, both industrial-grade Serverless services and various open-source Serverless frameworks are well supported. Without the need to study and learn about every Serverless tool on the market, developers can get started with mainstream Serverless services and frameworks simply by using Serverless Devs.

### Visual editing and deployment

Serverless Devs is a complete visual editing and deployment process. In the Serverless Devs App Store, users can quickly search for desired application cases or components using keywords, visually edit the project configuration, and complete project deployment with a mouse click.

For project experience, development, and O & M, under the auspices of the application center and visual editing and deployment, the overall deployment time of the Serverless project is nearly doubled. At the same time, Serverless Devs App Store is an open-source co-construction platform for developers. All users can publish their components and applications in the application center for learning, reference, and use by more people.

| ![](https://images.serverlessfans.com/devs-github/app-store.jpg) | ![](https://images.serverlessfans.com/devs-github/app-store-edit.jpg) |
| ------ | ------ |

### Flexible and open use

Unlike most developer tools, Serverless Devs can describe resources such as function compute, API Gateway, and OSS during project description, you can also use plugins and hooks provided by Serverless Devs to Install, Build, and Publish code. In addition, Serverless Devs does not restrict the commands for each component. Instead, developers are encouraged to develop different capabilities for different components to cope with more complex scenarios. For example, Alibaba Cloud function Compute components, in addition to deploying and removing functions, function compute also supports custom features such as log query, metric query, local construction, dependency installation, and debugging.

The flexible and open use of Serverless Devs plays an important role in areas such as automated deployment and O & M, and organically integrates Serverless Devs with the full lifecycle of a project, it improves the development and O & M efficiency of Serverless projects by 90%.

## Perform Serverless like a mobile phone

We can use Serverless Devs in the same way as we would use a mobile phone. When using a mobile phone, we need to search and download various applications in the mobile application market and install them in the mobile phone for use. For the Serverless Devs development platform, we can call up the Serverless Devs App Store via quick gui, search and download the components/plugins to the Serverless Devs Tool to start using Serverless, as shown in the figure:

<div align=center> <img src="https://images.serverlessfans.com/devs-github/cli-app-like-phone-v2.png" width="100%"/> </div>

## Use scenarios

Serverless Devs is a multi-cloud and multi-resource end-to-end/lifecycle management platform. With the joint action of componentization and plugin, the platform can participate in the whole process of project creation, development, debugging, deployment, and maintenance. Taking Alibaba Cloud function compute as an example:

<div align=center> <img src="https://images.serverlessfans.com/devs-github/use.png" width="100%"/> </div>

You can use the command line tool or application center to initially create a project. During project development, you can perform local debugging to verify local development; you can debug projects locally, remotely, and through log querying. When deploying projects, you can install dependencies, the process of project construction and so on to build a complete deployment package, the project is deployed; In the later operation and maintenance mitigation, the project health can be checked through the indicator query, you can locate problems by using methods such as log query, release the versions, aliases, and phased release by using the capabilities such as Project release;

## Fast entry installation and use

### Quick installation

Only for Mac/Linux

```bash
curl -o- -L http://cli.so/install.sh | bash
```

### Npm based installation

npm package-based installation: this installation mode is suitable for Windows, Mac, and Linux platforms that already have npm pre-installed.

Run the following command to install the Serverless Devs Tool on Windows, Mac, or Linux.

```bash
$ npm install @serverless-devs/s -g
```

> Instructions
> - If you run this command on Linux or MacOS with the Error message "Error: EACCES: permission denied", run the sudo npm install @ serverless-devs/s -g command.
> - If the installation process is slow, run npm -- registry = https://registry.npm.taobao.org install @ serverless-devs-g to install the npm repository on Taobao.

After the installation is completed, run the s command in the control terminal to view version information.

```
jiangyu@B-165MLVDL-0004 ~ % s

Usage: s [options] [command]

  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \
/_______  /\___  >__|    \_/  \___  >__|  |____/\___  >____  >____  >
        \/     \/                 \/                \/     \/     \/

Welcome to the Serverless Devs Tool.
You can use the corresponding function through the following instructions.


Options:
  -v, --version   Output the version number
  --skip-extends  Skip the extends section
  -h, --help      Display help for command

Commands:
  config          Configure cloud service account.
  gui             Start GUI service.
  init            Initializing a project.
  search          Search the package.
  platform        Publish a(an) Component/Plugin/Application.
  set             Settings for the tool.
```


## Quick start experience


<div align=center>

| <div align=center> <a href="https://images.serverlessfans.com/s-tool/demo/poem.mp4"> <img src="https://images.serverlessfans.com/devs-github/cli.jpg" width="80%"/> </a> </div> | <div align=center> <a href="https://images.serverlessfans.com/s-gui/docs/app-store.mp4">  <img src="https://images.serverlessfans.com/devs-github/app-store.jpg" width="80%"/> </a> </div> |
| ------ | ------ |
| <p align="center"> <span> Click the picture to play the CLI video <br> <a href="https://github.com/Serverless-Devs/docs/blob/master/Serverless-Devs-Tool/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B.md"> You can also click here to view the CLI entry case </a> </span> </p> | <p align="center"> <span> Click on the picture to play the video <br>  <a href="https://github.com/Serverless-Devs/docs/blob/master/Serverless-Devs-App-Store/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B.md"> You can also click here to view the application center entry case </a> </span> </p> |

</div>


## Use documentation

> You can also directly visit our documentation page：
> - Document address：[https://www.serverless-devs.com/docs_en/](https://www.serverless-devs.com/docs_en/)

* [Introduction ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/serverless_devs_introduce.md)
* [Quickstart ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/quick_start.md)
* CLI
   * Getting started
      * [Quickstart ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/quick_start.md)
      * [Installation ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/install.md)
      * [Account configuration ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/access_config.md)
      * [Configure Yaml ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/yaml_format.md)
   * Instruction document
      * [Config ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/config.md)
      * [Init ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/init.md)
      * [Search ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/search.md)
      * [Set ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/set.md)
      * [Platform ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/platform.md)
      * [GUI ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/gui.md)
      * [Extensive ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/tool/commands/more_command.md)
* Application Center
   * Getting started
      * [Quickstart ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/app-store/quick_start.md)
      * [Application Center ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/app-store/serverless_devs_app_store_introduce.md)
      * [Package Summary ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/app-store/package_awesome.md)
   * Application awesome
      * [Components ](https://github.com/Serverless-Devs-Awesome/Components)
      * [Application ](https://github.com/Serverless-Devs-Awesome/Applications)
      * [Plugins ](https://github.com/Serverless-Devs-Awesome/Plugins)
* References
   * [The concept of Package ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/package/package_type.md)
   * [Package Development Guide ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/package/package_dev.md)
   * Package Dev documentation
      * [Component ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/package/devs_docs/component.md)
      * [Application ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/package/devs_docs/application.md)
      * [Plugin ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/package/devs_docs/plugin.md)
   * Method for obtaining the key (certificate) of a cloud vendor
      * [Alibaba Cloud ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/alibaba_cloud.md)
      * [Baidu Cloud ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/baidu_cloud.md)
      * [AWS ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/aws.md)
      * [Azure ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/azure.md)
      * [Google Cloud ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/google_cloud.md)
      * [Huawei Cloud ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/huawei_cloud.md)
      * [Tencent Cloud ](https://github.com/Serverless-Devs/docs/blob/master/docs/en/others/access/tencent_cloud.md)
* Common questions and answers:
   * [Common questions and answers ](https://github.com/Serverless-Devs/docs/blob/master/faq_en.md)

## Contact us

<div align=center>

| <div align=center>  <img src="https://images.serverlessfans.com/devs-github/wechat-helper.png" width="200px"/> </div> | <div align=center>  <img src="https://images.serverlessfans.com/devs-github/dingtalk-group.png" width="200px"/> </div> |
| ------ | ------ |
| <p align="center"> <span>WeChat scan code to add a small assistant to the group</span> </p> | <p align="center"> <span>Scan the QR code to enter the discussion group</span> </p> |

</div>

- Other ways of contact：
  - Website：
    - https://www.serverless.cn
    - https://www.serverless-devs.com
  - Email：service@serverlessfans.com
