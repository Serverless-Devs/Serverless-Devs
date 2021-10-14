/** @format */
const { execSync } = require('child_process');

function init() {
  try {
    execSync('npm install @serverless-devs/s -g');
    process.exit();
  } catch (error) {
    execSync('yarn global add @serverless-devs/s');
    process.exit();
  }
}

try {
  init();
} catch (error) {
  process.exit(1);
}
