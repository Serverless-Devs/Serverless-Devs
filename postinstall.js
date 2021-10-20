process.noDeprecation = true;

const core = require('./lib/utils/core').default;
(async () => {
  await core.loadComponent('devsapp/fc');
  await core.loadComponent('devsapp/fc-base-sdk');
  await core.loadComponent('devsapp/fc-build');
  await core.loadComponent('devsapp/fc-common');
  await core.loadComponent('devsapp/fc-default');
  await core.loadComponent('devsapp/fc-deploy');
  await core.loadComponent('devsapp/fc-domain');
  await core.loadComponent('devsapp/fc-info');
  await core.loadComponent('devsapp/stdout-formatter');
  process.exit();
})().catch(() => {
  process.exit(1);
});
