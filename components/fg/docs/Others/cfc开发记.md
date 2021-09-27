# 项目报告

# 一、项目信息

+ 项目名称：Serverless Devs 云厂商组件开发
+ 项目描述：Serverless devs是一个无厂商锁定的Serverless开发者工具，目前已经支持阿里云、腾讯云、AWS等多家云厂商的Serverless产品，希望通过本项目可以进一步拓展云厂商的组件。

# 二、项目进度

## 2.1.已完成工作：

1. [百度云函数CFC组件](https://github.com/xinwuyun/cfc)开发
2. [start-cfc](https://github.com/xinwuyun/start-cfc)编写
3. 华为云函数组件部分开发

## 2.2.遇到的问题及解决方案

### 项目上手初期对Serverless-devs设计架构不够熟悉

通过阅读项目文档、代码、社区文章并与及时老师进行文字或会议沟通。

### 代码初期参考项目[scf组件](https://github.com/devscomp/scf)开发存在耦合性过高的问题

问题细节：[初期代码](https://github.com/xinwuyun/cfc/blob/e44a2803ac2daf32a91cad3c72c671a19483ec4d/src/index.ts)存在该问题，所有逻辑放在一个文件下，一个功能（部署函数、部署触发器等）对应一个函数耦合性过高，不同函数间有较多重复代码，不仅给debug带来难度，而且不容易实现更高级的功能

解决方案：不再参考[scf组件](https://github.com/devscomp/scf)，参考阿里云函数组件[devsapp/fc](https://github.com/devsapp/fc)的最佳实践，符合如下结构

+ 底层资源层

![image-20210815202814139](https://gitee.com/xinwuyun/myimage/raw/master/img/image-20210815202814139.png)

+ 业务层（以`s deploy`为例）

<img src="https://gitee.com/xinwuyun/myimage/raw/master/img/未命名文件 (1).png" alt="未命名文件 (1)" style="zoom:50%;" />

这也为后续华为云函数的组件开发提供了思路：由于华为没有提供api，所以底层用`client.ts`封装华为提供的api，其他部分思路与CFC一致。

### 代码设计和编写原则

代码涉及和编写必须遵循以下原则：

- 用户角度：引用导师的话：“一切以用户用的爽为前提”，下面简单罗列我遇到的。

  - `s.yaml`信息易获取，不应出现某个字段用户难以确认。
  - 输出信息要友好，提供中间关键流程信息。
  - 指令执行最终结果要提供关键信息
  - 不能简单地将错误信息抛给用户，应当用足够简短的语言阐明出错原因并提供解决问题的方法
  - 复杂的流程留给组件，简单的流程留给用户

- 开发者角度：

  - 代码耦合性：首先就是遵循上述原则，进行良好的封装，降低代码耦合性；其次，对于底层函数会重复利用的逻辑也要进行封装，比如`handleInput`,`handleOutput`

  - 可维护性：代码在debug模式下，应输出（`logger.debug`）足够的信息以反映整个业务流程的进行，具体体现为

    - 底层函数![image-20210815210534491](https://gitee.com/xinwuyun/myimage/raw/master/img/image-20210815210534491.png)

    调用时，调用成功和失败都要有返回；

    - 业务流程的各个阶段都应有较为详细的信息输出和提醒
    - 错误尽量在最底层`throw`，方便寻找错误

  - 健壮性：依照编写好`publish.yaml`，对`s.yaml`中数据进行在`handleInput()`中进行检查，尽量考虑到各种输入情况，出错时指出错误原因和改正方法

  - 可理解性：提供足够的`internal document`，**这方面还有待提升**。

  - 一致性：进行相同动作时的成功信息输出和错误信息输出应当遵循相同的格式，比如可以查看如下代码。

    - ```javascript
      /**
         * 创建函数
         * @param props
         * @returns res
         * @returns functionBrn
         */
        async create(props) {
          /**
          * 输入参数处理
          * 此处省略
          **/
          const vm = core.spinner(`Function ${props.functionName} creating.`);
          await deleteZip(props.code.codeUri + '/hello.zip');
          // 进行请求
          const response = await Client.cfcClient
            .createFunction(body)
            .then((response) => {
              vm.succeed(`Function ${props.functionName} created.`);
              return response.body;
            })
            .catch((err) => {
              vm.fail(`Function ${props.functionName} creating failed.`);
              throw new Error(err.message.Message);
            });
          // 处理返回
          // 返回funcitonBrn用于创建触发器
          return this.handleResponse(response);
        }
      
        /**
         * 更新代码
         * @param props
         * @returns res
         * @returns functionBrn
         */
        async updateCode(props) {
          /**
          * 1. 输入参数处理
          * 此处省略
          **/
          const vm2 = core.spinner('Function code updating...');
      		
          /**
          * 2. 调用API，并保留返回值
          * 内部提供调用成功信息 vm.succeed; 失败信息 vm.fail
          **/
          const response = await Client.cfcClient
            .updateFunctionCode(functionName, body)
            .then(function (response) {
              vm2.succeed(`Function ${functionName} code updated`);
              return response.body;
            })
            .catch(function (err) {
              vm2.fail('Function deploy failed');
              throw new Error(err.message.Message);
            });
          // 3. 处理返回
          // 返回funcitonBrn用于创建触发器
          return this.handleResponse(response);
        }
      ```

      代码包括两个函数，代码结构均是：1. 输入参数处理；2. 调用api，保留返回参数，输出错误信息；3. 处理返回，使用相同的`handleResponse`，提高代码复用性，降低耦合性。

### 官方SDK问题

开发过程中发现，官方SDK存在一些bug和不合理处：

1. 触发器的创建需要提供`functionBrn`，这可以从官网控制台获取，但是此处为了方便用户调用`sdk`的获取函数信息功能，利用`functionName`获取`functionBrn`

2. 触发器更新需要提供`relationId`，该字段不同于`functionBrn`，除了调用`API`无法通过官网控制台获得。但是，此处我们不希望用户调用api。所以，deploy trigger时：

   1. 获取`s.yaml`中触发器关键信息，底层调用`api`遍历触发器列表，通过一个或多个字段判断触发器是否已经上线
   2. 若没有上线则可以获得`relationId`，利用该`relationId`，用于更新触发器

   这样，用户只需要提供`functionName`和触发器必要信息

3. 百度sdk无法**创建**crontab触发器，初步分析是sdk或api识别cron表达式有问题，但是可以**更新crontab触发器**。

   > 无法解决，所以参数处理时识别到crontab触发器时`throw new Error`

### 华为云函数组件的API封装问题

结合已有sdk源码进行nodejs简单封装，时间问题，可能仅封装部分必须功能。

## 2.3.心得总结

简单总结一下

+ 阅读大佬的代码能够收获很多，同时也不难发现，大佬的代码也会存在一定bug和不合理性。比如，fc-deploy的代码能够看出一些我也曾出现的高耦合性问题。
+ 对前人（也没太前好像）成果取其精华，而有问题的部分则需要思考出更合适的实现方式
+ 刘宇导师技术能力强且非常耐心，提供的建议和提出的问题都十分的中肯和凝练，学到了很多。老师工作繁忙同时还能不断更新博客、公众号和写书，给最近压力很大的我不少激励
+ 开发过程中，对serverless-devs的理解加深了，感受到了这一工具的创新性，同时也更加深刻感受到了serverless架构的优越性。社区的大佬很强，开发出了如此多的组件，赋予了它如此强大的能力👍（向大佬的方向前进！！）
+ 能够做到目前的成果还算有一定成就感，上大学至今第一次参与到社区贡献，之后一定要把CFC组件和之后编写的组件一直维护下去

### 2.4.后续安排

华为云函数组件预计9月份开学前完成，期间也阅读其他厂商函数计算的文档为后续组件开发做准备，尽量加快开发速度。对社区的贡献不会停止
