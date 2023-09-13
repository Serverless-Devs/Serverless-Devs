import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, '../bin/s');

test('s config get from env', async () => {
  const res = spawnSync(s, ['config', 'get'], {
    cwd: __dirname,
    env: {
      ...process.env,
      AccountID: '123',
      AccessKeyID: '123',
      AccessKeySecret: '123',
    },
  });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('$system_environment_access');
});
