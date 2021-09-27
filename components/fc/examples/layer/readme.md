### 使用步骤

1. 在 code 目录安装依赖

2. 执行 s layer publish --layer-name testName --code ./code/node_modules , 然后会返回层的 arn

3. 在需要绑定层的函数下新增配置：
````
layers: 
  - <layer arn>
environmentVariables:
  NODE_PATH: /opt
````
Q：为什么需要新增这个 NODE_PATH 呢？
A：请参考 [层的简介](https://help.aliyun.com/document_detail/193057.html)， 然后我们上传是指定目录下的所有文件，参考 [issue](https://github.com/devsapp/fc/issues/225)

4. 在 s.yaml 同级目录下，新建 .fcignore 文件，内容填充
````
code/node_modules/
````
或者在代码目录下，新建 .fcignore 文件，内容填充
````
node_modules/
````

5. 执行 s deploy