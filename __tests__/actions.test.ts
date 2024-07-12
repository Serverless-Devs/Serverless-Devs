import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/action-case');
const template = path.resolve(cwd, './s.yaml');

test('s deploy', async () => {
  const res = spawnSync(s, ['deploy', '-t', template]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});
