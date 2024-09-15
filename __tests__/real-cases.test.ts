import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');


// error: actions: component time out
let cwd = path.resolve(__dirname, './fixtures/action-case');
let template = path.resolve(cwd, './s.yaml');
test.skip('s deploy', async () => {
  const res = spawnSync(s, ['deploy', '-t', template]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});
