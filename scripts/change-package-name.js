const fs = require('fs');
const packageJsonPath = '../package.json';

// 读取 package.json 文件
const packageJson = require(packageJsonPath);

// 更新 name 属性
packageJson.name = '@serverless-devs/s';

// 将更新后的对象写回 package.json 文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');