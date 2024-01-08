import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/remove');

test.only('remove', async () => {
  const template = path.resolve(__dirname, './fixtures/remove/s.yaml');
  const res = spawnSync(s, ['remove', '-t', template], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/data format is invalid/);
});
