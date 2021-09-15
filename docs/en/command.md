# Commands

When you use the command-line tool, you can run `s` commands to get help information.

```shell script
$ s
Usage: s [options] [command]

  _________                               .__
 /   _____/ ______________  __ ___________|  |   ____   ______ ______
 \_____  \_/ __ \_  __ \  \/ // __ \_  __ \  | _/ __ \ /  ___//  ___/
 /        \  ___/|  | \/\   /\  ___/|  | \/  |_\  ___/ \___ \ \___ \
/_________/\_____>__|    \_/  \_____>__|  |____/\_____>______>______>

Welcome to the Serverless Devs.
You can use the corresponding function through the following instructions.

More:
📘 Documents: https://www.github.com/serverless-devs/docs
🙌 Discussions: https://github.com/Serverless-Devs/Serverless-Devs/discussions
⁉️  Issues: https://github.com/Serverless-Devs/Serverless-Devs/issues
👀 Current Registry: http://registry.devsapp.cn/simple

Quick start:
🍻 Can perform 's init' fast experience

Options:
  -v, --version   Output the version number
  --skip-actions  Skip the extends section
  --debug         Debug model
  -h, --help      Display help for command

Commands:
  config          👤 Configure cloud service account.
  init            💞 Initializing a project.
  cli             🐚 Command line operation through yaml free mode.
  set             🔧 Settings for the tool.
  exec            🚀 Subcommand execution analysis.

```

## config

You can run `config` commands to manage keys. For example, you can configure, check, modify, and delete keys.

You can run the `s config` command to get help information.

```shell script
Usage: s config [commands] [options]

You can configure provider accounts, including Alibaba Cloud, Baidu Cloud, Huawei Cloud, Tencent Cloud, etc.

Options:
  -h, --help  Display help for command

Commands:
  add         ➕ Add an account
  get         ✔️  Get accounts
  delete      ✖️  Delete an account
```

### config add

You can run the `config add` command to configure keys. By default, the system provides key templates used in popular cloud service providers. You can also use the `Custom` option to configure `Key-Value` pairs as custom keys.

You can use `-h/--help` to get help information.

```shell script
Usage: s config add [commands] [name]

You can add an account

    Example:
	$ s config add
	$ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ******
	$ s config add --AccessKey ****** --SecretKey ******

    Configuration parameters for cloud vendors:
	alibaba: AccountID, AccessKeyID, AccessKeySecret
	aws: AccessKeyID, SecretAccessKey
	baidu: AccessKeyID, SecretAccessKey
	huawei: AccessKey, SecretKey
	google: PrivateKeyData
	tencent: AccountID, SecretID, SecretKey

📘 How to get the key: https://github.com/Serverless-Devs/docs/tree/master/zh/others/provider-config


Options:
  --AccountID [AccountID]              AccountID of key information
  --AccessKeyID [AccessKeyID]          AccessKeyID of key information
  --AccessKeySecret [AccessKeySecret]  AccessKeySecret of key information
  --SecretAccessKey [SecretAccessKey]  SecretAccessKey of key information
  --AccessKey [AccessKey]              AccessKey of key information
  --SecretKey [SecretKey]              SecretKey of key information
  --SecretID [SecretID]                SecretID of key information
  --PrivateKeyData [PrivateKeyData]    PrivateKeyData of key information
  -kl , --keyList [keyList]            Keys of key information, like: -kl key1,key2,key3
  -il , --infoList [infoList]          Values of key information, like: -kl info1,info2,info3
  -a , --aliasName [name]              Key pair alias, if the alias is not set, use default instead
  -h, --help                           Display help for command
```

You can run the `config add` command to add a key:

```shell script
$ s config add

? Please select a provider: (Use arrow keys)
❯ Alibaba Cloud (alibaba)
  AWS (aws)
  Azure (azure)
  Baidu Cloud (baidu)
  Google Cloud (google)
  Huawei Cloud (huawei)
  Tencent Cloud (tencent)
  Custom (others)
```

After you select an option, the system guides you to add a key in an interactive manner:

```shell script
s config add

? Please select a provider: Alibaba Cloud (alibaba)
? AccountID **********
? AccessKeyID **********
? AccessKeySecret **********
? Please create alias for key pair. If not, please enter to skip default
```

You can also run a single command to add a key:
```shell script
$ s config add --AccessKeyID ****** --AccessKeySecret ****** --AccountID ******
```

Or you can add custom keys:
```shell script
$ s config add --AccessKeyID ****** -kl key1,key2,key3 -il info1,info2,info3
```

- Keys used in popular cloud service providers:

```
alibaba:    AccountID, AccessKeyID, AccessKeySecret,
aws:        AccessKeyID, SecretAccessKey,
baidu:      AccessKeyID, SecretAccessKey,
huawei:     AccessKeyID, SecretAccessKey,
azure:      KeyVaultName, TenantID, ClientID, ClientSecret,
tencent:    AccountID, SecretID, SecretKey,
google:     PrivateKeyData
```

- You can use environment variables to obtain keys. You must refer to the relevant documentation to determine the environment variables that store the `Key-Value` pairs.


### config get

You can run the `config get` command to obtain the keys that you configured.

You can use `-h/--help` to get help information.

```shell script
$ s config get -h

Usage: s config get [options] [name]

You can get accounts.

     Example:
        $ s config get -l
        $ s config get -a demo


Options:
  -a, --alias-name [name]  Key pair alia, if the alias is not set, use default instead
  -l, --list               Show user configuration list
  -h, --help               Display help for command
```

### config delete

You can run the `config delete` command to delete the keys that you configured.

You can use `-h/--help` to get help information.

```shell script
$ s config delete -h

Usage: s config delete [options] [name]

You can delete an account.

     Example:
        $ s config delete -a demo


Options:
  -a , --alias-name [name]  Key pair alia, if the alias is not set, use default instead
  -h,--help                 Display help for command
```


## init

You can use `init` commands to initialize serverless projects.

You can run the `s init -h` command to get help information.

```shell script
$ s init -h

Usage: s init [options] [name | url]

Initialize a new project based on a template. You can initialize the application that conforms to the serverless devs project specification through GitHub, or you can initialize the application provided by the source by configuring the source.

    Example:
        $ s init
        $ s init project
        $ s init git@github.com:foo/bar.git
        $ s init https://github.com/foo/bar.git    

Options:
  -d, --dir [dir]            Where to output the initialized app into (default: ./<ProjectName> )
  -r, --registry [url]       Use specify registry  
  -h, --help                 Display help for command
```

When you run the `s init` command, the system guides you to initialize a project in an interactive manner:

```shell script
$ s init
? Hello, serverlessor. Which template do you like? (Use arrow keys or type to search)

👋 Hello World Example
❯ Aliyun FC node.js12-http
  AWS Lambda nodejs12.x-http
  Tencent SCF nodejs12.x-http

🚢 Web Framework Example
  Express
  Flask
  Zblog
  Midway
  Malagu

🖥️  Static Website
  Vue
  React
  Docusaurus
  Hexo
  Vuepress

🍼 Serverless Dev template
  Application
  Component
```

## cli

You can run `cli` commands to directly use Serverless Devs components without the need to use YAML files.

You can run the `s cli -h` command to get help information.

```shell script
$ s cli -h

Usage: s cli [component] [command] [options]

Directly use serverless devs to use components, develop and manage applications without yaml configuration

    Example:
        $ s cli fc list-service
        $ s cli fc list-function --service-name my-service
        $ s cli fc deploy -p "{/"function/": /"function-name/"}" --service-name my-service

Options:
  -p, --param [component-config]     Component props which in Yaml file
  -h, --help                         Display help for command
```

## exec

You can use `exec` to run component subcommands.

You can run the `s exec -h` command to get help information.

```shell script
$ s exec -h

Usage: s exec [service-name] [options] -- [component-sub-command] [options]

Run a component sub command on an app

    Example:
        $ s exec fc -t test.yaml -- log --tail
        $ s exec fc -- deploy

Options:
  -h, --help                         Display help for command
```

In most cases, you can simplify exec commands. For example, `s exec fc -- deploy` can be simplified into `s fc deploy`. However, a command cannot be simplified when conflicts exist between Serverless Devs tools and certain component parameters. For example, `s exec fun -t test.yaml -- -t template.yaml`.

## set

You can run `set` commands to configure tools.

You can run the `s set -h` command to get help information.

```shell script
$ s set -h
Usage: s set [commands] [options]

You can make some default settings for the tool here.

Options:
  -h, --help  Display help for command

Commands:
  registry    👀 Set up a custom registry
```


### set registry

You can run this command to configure the source registry. You can use `-h/--help` to get help information.

```shell script
$ s set registry -h

Usage: s set registry [options]

Upload your usage habits to help us improve our products

    Example:
        $ s set registry default
        $ s set registry https://registry.serverlessfans.cn/

Options:
  -h, --help  Display help for command
```


