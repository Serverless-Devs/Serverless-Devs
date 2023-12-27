const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');

// 读取 package.json 文件
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 更新 name 属性
packageJson.name = '@serverless-devs/s3';

// 将更新后的对象写回 package.json 文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');