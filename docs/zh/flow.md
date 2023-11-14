---
title: Yaml Flow
description: '操作顺序'
position: 4
category: '使用文档'
---

# Yaml Flow

flow表示执行流程或顺序，主要是key-list形式组成，例如：
```yaml
flow:
  deploy: # 支持正则
    - [project_a]
    - [project_b, project_c]
```
表示的是，在进行deploy操作时先部署project_a，然后同时（并行）部署project_b, project_c；

这里的key也支持正则，比如

```yaml
flow:
  ${regex('.')}: # 支持正则
    - [project_a]
    - [project_b, project_c]
```
本质上是将`regex`接收的参数value执行 `new RegExp('value').test('当前执行的指令')`， 比如:  `new RegExp('.').test('deploy')`, 如果匹配成功，则按照指定的flow进行操作，如果匹配不成功，则按照系统分析出的顺序进行操作。

> 如果用户指定了`flow`, 按照指定的流程进行部署，没在流程中的不进行额外的操作·

