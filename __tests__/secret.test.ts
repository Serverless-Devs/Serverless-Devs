import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/secret');

test('s secret add', async () => {
  const res = spawnSync(s, ['secret', 'add', '--key', 'test', '--value', 'test'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('Secret [test] has been successfully added.');
});

test('s secret add fail', async () => {
  const res = spawnSync(s, ['secret', 'add', '--key', 'test', '--value', 'test'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('The secret test already exists, please use --force to overwrite');
});

test('s secret add -f', async () => {
  const res = spawnSync(s, ['secret', 'add', '--key', 'test', '--value', 'test', '-f'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('Secret [test] has been successfully added.');
});

test('s secret delete', async () => {
  spawnSync(s, ['secret', 'add', '--key', 'test2', '--value', 'test2'], { cwd });
  const res = spawnSync(s, ['secret', 'delete', '--key', 'test2']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('Secret [test2] has been successfully deleted.');
});

test('s secret get', async () => {
  const res = spawnSync(s, ['secret', 'get'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('test');
});

test('s secret get --key', async () => {
  const res = spawnSync(s, ['secret', 'get', '--key', 'test'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('****');
});

test('s preview with ${secret}, ${this.vars} and ${resources.xx.vars}', async () => {
  const res = spawnSync(s, ['preview'], { cwd });
  const stdout = res.stdout.toString();
  const status = res.status;
  console.log(stdout);
  expect(stdout).toContain('${secret(\'test\')}');
  expect(status).toBe(0);
});
