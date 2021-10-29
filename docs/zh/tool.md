# 开发者工具设计文档

## Exit Code 定义

| code | 含义 |
| --- | --- |
| 0 | 正常退出 |
| 100 | Serverless Devs 工具本身错误退出 |
| 101 | Serverless Devs 工具组件执行时，组件错误引起的退出 |

## 命令行设计规范

Serverless Devs 作为 Serverless 领域的开发者工具，其输出的标准化和规范化会在一定程度上对用户体验有比较明显的影响。

关于 Serverless Devs 命令行设计规范，可以参考 [cli_design.md](./cli_design.md) 