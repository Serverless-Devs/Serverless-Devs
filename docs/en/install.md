# Installation guide

## Install by using a command-line tool

You can use package manager [npm](https://www.npmjs.com/). This method is suitable for Windows, macOS, and Linux platforms that have preinstalled npm. To install Serverless Devs Tool on Windows, macOS, or Linux, run the following command:

```shell script
$ npm install @serverless-devs/s -g
```
You can also use package manager [yarn](https://yarnpkg.com/).

```shell script
$ yarn global add @serverless-devs/s
```



> **Notes**:
> - If the "could not find command" error message appears when you run the preceding command in a Linux or macOS system, run the `ln -s THE PATH OF SERVERLESS-DEVS /usr/bin` command to resolve the error.  
> - If the "Error EACCES: permission denied" error message appears when you run the preceding command in a Linux or macOS system, run the sudo npm install @serverless-devs/s -g command to resolve the error.
> - If the installation takes a long period of time, you can run the following command to use the Taobao npm repository: npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g.

## Install by using a script

For quick installation on macOS or Linux, run the following command:

```shell script
$ curl -o- -L http://cli.so/install.sh | bash
```


