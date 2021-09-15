# 源规范

## 源地址

默认：[https://api.github.com/repos/](https://api.github.com/repos/)

## 获取最新版本

- Method：GET
- URI：{package-name}/releases/latest
- Response：
    ```
    {
        "tag_name": "1.1.13",
        "name": "Release 1.1.13",
        "created_at": "2021-01-04T07:41:23Z",
        "published_at": "2021-01-04T07:43:44Z",
        "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
        "body": "- 中文\r\n  - 修复边界条件下临时密钥获取失败的BUG\r\n- English: \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
    }
    ```
  
## 查询版本
- Method：GET
- URI：{package-name}/releases
- Response：
    ```
    [
        {
            "tag_name": "1.1.13",
            "name": "Release 1.1.13",
            "created_at": "2021-01-04T07:41:23Z",
            "published_at": "2021-01-04T07:43:44Z",
            "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
            "body": "- 中文\r\n  - 修复边界条件下临时密钥获取失败的BUG\r\n- English: \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
        }
     ]
    ```
## 下载组件
- URI：{package-name}/zipball/{version}
- Response：组件压缩包
