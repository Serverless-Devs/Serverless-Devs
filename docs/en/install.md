---
title: Installation
description: 'Serverless Devs Tool installation and upgrade'
position: 2
category: 'Overview'
---

# Tool installation and upgrade

- [Tool installation](#Tool-installation)
    - [Install via command line tool](#Install-via-command-line-tool)
    - [Install by downloading the binary](#Install by downloading the binary) --- Suitable for all platforms (Windows/Mac/Linux)
    - [Install via script](#Install-via-script)
- [Tool upgrade](#Tool-upgrade)


## Tool installation
### Install via command line tool

Install via [npm](https://www.npmjs.com/) package management: applicable to Windows, Mac, and Linux platforms that have been pre-installed with npm. Execute the following commands on Windows, Mac, and Linux platforms to install Serverless Devs Tool.

```shell script
$ npm install @serverless-devs/s3 -g
```
Or install via [yarn](https://yarnpkg.com/)

```shell script
$ yarn global add @serverless-devs/s
```

> **illustrate**:
> - If you execute the command under Linux or macOS and report an error and the error message is `Command not found`, please execute the command `ln -s serverless-devs installation location /usr/bin`, serverless-devs installation location can be found by `find / -name s`.
> - If an error is reported when executing this command under Linux and the error message is `Error: EACCES: permission denied`, please execute the command `sudo npm install @serverless-devs/s3 -g`.
> - If you have a slow installation process in mainland, you can consider using Taobao npm source. The installation command is `npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g`.

### Install by downloading the binary
Open the [releases](https://github.com/Serverless-Devs/Serverless-Devs/releases) page, select a release compressed package link corresponding to the platform in the latest version, and click to download directly.

After downloading locally, unzip it and use it directly.

#### Windows Platform

1. Find a latest release version (Release) and download the `s-*-win.exe.zip` file (where * represents the version number, such as 2.1.9).
2. Unzip the file `s-*-win.exe.zip` to get `s-*.win.exe` file, rename it to `s.exe`.
3. Just copy the s.exe file to the system PATH directory, for example: `C:\WINDOWS\System32`
4. Open the command terminal, execute `s.exe --version`, and check the returned version number to verify whether the installation is successful.


#### Linux platform
1. Find a latest release version (Release) and download the `s-*-linux.zip` file (where * represents the version number, such as 2.1.9).
2. Extract the zip file
```
$ unzip s-linux.zip
Archive: s-2.1.9-linux.zip
  inflating: s-2.1.9-linux
```
3. Move to PATH directory
```
$ mv s-*-linux /usr/local/bin/s
```

4. Verify version
```
$ s -v
@serverless-devs/s: 2.1.9
```


#### MacOS platform
1. Find the latest release version (Release) and download the `s-*-macos.zip` file (where * represents the version number, such as 2.1.9).
2. Extract the zip file
```
$ unzip s-macos.zip
Archive: s-2.1.9-macos.zip
  inflating: s-2.1.9-macos
```

3. Move to PATH directory
```
$ mv s-*-macos /usr/local/bin/s
```

4. Verify version
```
$ s -v
@serverless-devs/s: 2.1.9
```

### Install via script

For Mac/Linux users

```shell script
$ curl -o- -L http://cli.so/install.sh | bash
```

## Tool upgrade

Serverless Devs developer tools will be updated and upgraded from time to time. When developers use Serverless Devs developer tools, they can be aware of the latest version according to system reminders.

After the client perceives the system upgrade, the developer can use the command `npm i -g @serverless-devs/s` to update, or use [Release](https://github.com/Serverless-Devs/Serverless-Devs/releases) View the specific content of the upgrade to determine whether to perform this upgrade.

> For example: My current Serverless Devs version is `2.0.89`. After the system is upgraded, I will use the Serverless Devs developer tool, and the tool will give a corresponding reminder:
> ```shell script
>    ╭───────────────────────────────────────────────╮
>    │                                               │
>    │       Update available 2.0.89 → 2.0.90        │
>    │   Run npm i -g @serverless-devs/s to update   │
>    │                                               │
>    ╰───────────────────────────────────────────────╯
> ```
> At this point, just follow the reminder to update the tool.
