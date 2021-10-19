const core = require('./lib/utils/core').default;
(async () => {
  await core.loadComponent('devsapp/fc');
  await core.loadComponent('devsapp/fc-deploy');
  await core.loadComponent('devsapp/fc-build');
  process.exit();
})().catch(() => {
  process.exit(1);
});
