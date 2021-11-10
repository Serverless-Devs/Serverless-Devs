const core = require('../utils/core.js').default;
const { request, fse: fs, getRootHome } = core;
const path = require('path');
const cachePath = path.join(getRootHome(), 'cache');
const alibabaTemplatePath = path.join(cachePath, 'alibaba-template');
async function init() {
  fs.ensureDirSync(alibabaTemplatePath);
  const templatePath = path.join(alibabaTemplatePath, 'template.json');
  const lockPath = path.join(alibabaTemplatePath, 'update.lock');
  const data = await request('http://serverless.devsapp.cn/api/templates');
  fs.writeFileSync(templatePath, JSON.stringify(data, null, 2));
  fs.writeFileSync(lockPath, JSON.stringify({ currentTimestamp: Date.now() }, null, 2));
}

(async () => {
  await init();
  process.exit();
})().catch(() => {
  process.exit(1);
});
