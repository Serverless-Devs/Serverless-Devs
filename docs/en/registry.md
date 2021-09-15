# Source code specifications

## Source code address

Default address: [https://api.github.com/repos/](https://api.github.com/repos/)

## Get the latest version

- Method: GET
- URI: {package-name}/releases/latest
- Response:
   ```
   {
       "tag_name": "1.1.13",
       "name": "Release 1.1.13",
       "created_at": "2021-01-04T07:41:23Z",
       "published_at": "2021-01-04T07:43:44Z",
       "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
       "body": "- 中文\r\n  - 修复边界条件下临时密钥获取失败的BUG\r\n- English: Fixed the bug where the temporary key cannot be retrieved in boundary conditions. \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
   }
   ```

## Query versions
- Method: GET
- URI: {package-name}/releases
- Response:
   ```
   [
       {
           "tag_name": "1.1.13",
           "name": "Release 1.1.13",
           "created_at": "2021-01-04T07:41:23Z",
           "published_at": "2021-01-04T07:43:44Z",
           "zipball_url": "https://api.github.com/repos/Serverless-Devs/Serverless-Devs/zipball/1.1.13",
           "body": "- 中文\r\n  - 修复边界条件下临时密钥获取失败的BUG\r\n- English: Fixed the bug where the temporary key cannot be retrieved in boundary conditions. \r\n  - Fix the bug that the temporary key acquisition fails under boundary conditions"
       }
    ]
   ```
## Download components
- URI: {package-name}/zipball/{version}
- Response: component package
